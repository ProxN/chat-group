import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, PROD } from '../constants';

export const generateToken = (userId: string) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: PROD,
    sameSite: 'lax',
  });
};
