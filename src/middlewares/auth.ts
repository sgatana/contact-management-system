import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ENV from '../config/env';

const { JWT_TOKEN_SECRET: secret } = ENV;

export const generateAccessToken = (email: string) => {
  return jwt.sign({ email }, secret, { expiresIn: '7d' });
};

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];
      jwt.verify(token, secret as string, (err: any) => {
        if (err) return res.status(403).json({ error: 'Not Authorized' });
        next();
      });
    } catch (error) {
      res.status(401);
      throw new Error('Not authenticated');
    }
  }
};
