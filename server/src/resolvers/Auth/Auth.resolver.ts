import { Arg, Args, Mutation, Ctx, Resolver, ObjectType, Field, ArgsType } from 'type-graphql';
import crypto from 'crypto';
import { MoreThan } from 'typeorm';
import User from '../../entities/User';
import * as authErrors from './errors';
import { ErrorResponse } from '../../types/errorType';
import { Context } from '../../types/context';
import validate, { isEmail } from '../../utils/validateAuth';
import { generateToken, setTokenCookie } from '../../utils/token';
import sendEmail from '../../utils/sendEmail';
import Channel from '../../entities/Channel';
import Members from '../../entities/Members';

@ObjectType()
export class AuthResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ArgsType()
export class LoginRegisterInputs {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => String, { nullable: true })
  name?: string;
}

@ArgsType()
export class ResetPasswordInputs {
  @Field()
  resetToken!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class ForgotPassRes extends ErrorResponse {
  @Field(() => Boolean, { nullable: true })
  emailSent?: boolean;
}

@Resolver()
class AuthResolver {
  @Mutation(() => AuthResponse)
  async register(
    @Args() { email, password, name }: LoginRegisterInputs,
    @Ctx() { res }: Context
  ): Promise<AuthResponse> {
    const error = validate(email, password);
    if (error) {
      return { error };
    }

    if (!name) {
      return {
        error: authErrors.RequiredName,
      };
    }

    let user;
    try {
      user = await User.create({ email, password, name }).save();

      let channel = await Channel.findOne({ where: { name: 'welcome' } });
      if (!channel) {
        channel = await Channel.create({ name: 'welcome', description: 'Welecome Channel' }).save();
      }
      await Members.create({
        userId: user.id,
        channelId: channel.id,
      }).save();

      const token = generateToken(user.id);
      setTokenCookie(res, token);
    } catch (err) {
      if (err.code === '23505') {
        return { error: authErrors.EmailAlready };
      }
    }
    return { user };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args() { email, password }: LoginRegisterInputs,
    @Ctx() { res }: Context
  ): Promise<AuthResponse> {
    const error = validate(email, password);
    if (error) {
      return { error };
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password, user.password))) {
      return { error: authErrors.IncorrectEmailOrPassword };
    }

    const token = generateToken(user.id);
    setTokenCookie(res, token);

    return { user };
  }

  @Mutation(() => ForgotPassRes)
  async forgotPassword(@Arg('email') email: string): Promise<ForgotPassRes> {
    if (!isEmail(email)) {
      return { error: authErrors.ValidEmail };
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: authErrors.EmailNotExists };
    }

    const resetToken = user.createResetToken();

    const resetURL = `http://localhost:3000/reset_password/${resetToken}`;

    await sendEmail({
      subject: 'Reset your password!!',
      to: user.email,
      message: `Reset your password using this link:${resetURL}`,
    });

    await user.save();

    return { emailSent: true };
  }

  @Mutation(() => AuthResponse)
  async resetPassword(
    @Args() { resetToken, password }: ResetPasswordInputs,
    @Ctx() { res }: Context
  ): Promise<AuthResponse> {
    if (!password) {
      return { error: authErrors.EmptyPassword };
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
      where: { passwordResetToekn: hashedToken, passwordResetExpires: MoreThan(new Date()) },
    });

    if (!user) {
      return { error: authErrors.InvalidToken };
    }

    user.password = password;
    user.passwordResetExpires = null;
    user.passwordResetToekn = null;
    user.passwordChanged = new Date();
    await user.save();

    const token = generateToken(user.id);
    setTokenCookie(res, token);

    return { user };
  }
}

export default AuthResolver;
