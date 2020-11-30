import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { AuthChecker } from 'type-graphql';
import User from '../entities/User';
import { Context } from '../types/context';
import { JWT_SECRET } from '../constants';

interface IDecodeToken {
  id: string;
  iat: number;
  exp: number;
}

const checkToken = (auth: string) => {
  let token;
  if (auth && auth.startsWith('Bearer')) {
    token = auth.split(' ')[1];
  } else {
    token = auth;
  }

  return token;
};

const authChecker: AuthChecker<Context> = async ({ context }) => {
  const { req } = context;

  const token = req.headers.authorization
    ? checkToken(req.headers.authorization)
    : req.cookies.token;

  if (!token) {
    return false;
  }

  const decodeToken = (await promisify(jwt.verify)(token, JWT_SECRET as string)) as IDecodeToken;

  const user = await User.findOne(decodeToken.id);

  if (!user) return false;

  if (user.passwordChangedAfter(decodeToken.iat)) return false;

  req.user = user;
  return true;
};

export default authChecker;
