import { Request, Response, NextFunction } from 'express';

export const validateSchema = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({ error: validation.error.message });
            }
            next();
        } catch (error) {
            return res.status(500).json({ error: "Erro de validação" });
        }
    };
};