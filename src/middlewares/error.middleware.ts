import { Request, Response, NextFunction } from 'express';

interface ValidationError extends Error {
  details?: string[] | string;
}

export function errorHandler(
  error: Error | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  
  if (error.name === 'ValidationError') {
    const validationError = error as ValidationError;
    return res.status(400).json({
      message: 'Erro de validação',
      details: validationError.details || error.message,
    });
  }
  
  if (error.message.includes('violates foreign key constraint') && 
      error.message.includes('carrier_id')) {
    return res.status(400).json({
      message: 'Operadora inválida',
      details: 'O ID da operadora fornecido não existe no sistema'
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

  if (error.message.includes('Maximum number of phones')) {
    return res.status(400).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}