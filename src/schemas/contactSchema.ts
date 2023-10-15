import z from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(1, { message: 'Name must be greater than 1 characters!' }),
    lastName: z.string().optional(),
    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .min(6, { message: 'Password must be greater than 6 characters!' }),
    email: z.string().optional(),
    isActive: z.boolean().optional(),
    type: z.string().optional(),
  }),
});

export type Contact = {
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    email?: string;
    type?: 'Mobile' | 'Work' | 'Home';
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}