import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateSchema = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(400).json({
                error: 'Erro de validação',
                details: error.details.map(detail => detail.message),
            });
        } else {
            next(); 
        }
    };
};
