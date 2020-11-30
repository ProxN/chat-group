import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import User from '../../entities/User';
import { Context } from '../../types/context';

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (!req.user) return null;
    return req.user;
  }
}

export default UserResolver;
