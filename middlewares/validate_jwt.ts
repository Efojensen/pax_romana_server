import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { AdminData } from '../types/citizen';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env['JWT_SECRET'] as string);

        if (typeof decoded === "string") {
            return res.sendStatus(403);
        }

        req.admin = decoded as AdminData;
        next();
    } catch {
        return res.sendStatus(403);
    }
};