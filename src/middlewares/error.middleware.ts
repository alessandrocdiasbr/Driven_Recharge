import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      details: error.message,
    });
  }

  if (error.message.includes('not found')) {
    return res.status(404).json({
      message: error.message,
    });
  }

  if (error.message.includes('already exists')) {
    return res.status(409).json({
      message: error.message,
    });
  }

  res.status(500).json({ message: 'Internal server error' });
}