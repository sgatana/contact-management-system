import type { NextFunction, Response } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ?? 500;
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
