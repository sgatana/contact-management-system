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
     return res.json({error: 'Email already registered'});
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email).select('+password');
    if (!user) {
      res.status(401);
      return res.json({ error: 'Invalid Credentials' });
    }
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    if (!isMatchingPassword) {
      res.status(403);
      return res.json({ error: 'Invalid Password' });
    }
    return res.status(200).json({
      email,
      username: user.username,
      accessToken: generateAccessToken(email),
    });
  } catch (error) {
    res.status(401);
    res.json({ error: 'Invalid Credentialsss' });
  }
};
