import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { createUser, getUserByEmail } from '../models/users';
import { generateAccessToken } from '../middlewares/auth';
import { User } from '../schemas/authSchema';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body as User;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400);
      throw new Error('Email already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.send(400);
    throw new Error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401);
      throw new Error('Invalid Credentials');
    }
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    if (!isMatchingPassword) {
      res.status(403);
      throw new Error('Invalid Password');
    }
    return res.status(200).json({
      email,
      username: user.username,
      accessToken: generateAccessToken(email),
    });
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};
