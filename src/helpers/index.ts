import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      const errorMessage = JSON.parse(err.message);
      return res.status(400).json({
        message: errorMessage[0].message,
      });
    }
  };

export default validate;

// Encryption and Decryption Functions
export const encrypt = (text: string) => {
  return Buffer.from(text, 'utf8').toString('base64');
};

export const decrypt = (encryptedString: string) => {
  return Buffer.from(encryptedString, 'base64').toString('utf8');
};
