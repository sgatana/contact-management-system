import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Provide a valid email address'),
    username: z.string({ required_error: 'Username is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(4, { message: 'Password must be greater than 4 characters!' }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Provide a valid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(4, { message: 'Password must be greater than 4 characters!' }),
  }),
});

export type User = {
  email: string;
  username: string;
  password: string;
};
