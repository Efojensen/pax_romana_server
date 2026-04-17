import jwt from 'jsonwebtoken';
import type { CitizenType } from '../types/citizen';
import type { Request, Response, NextFunction } from 'express';

export const citizenValidateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({
        success: false,
        message: 'invalid token'
    });

    try {
        const decoded = jwt.verify(token, process.env['JWT_SECRET'] as string);

        if (typeof decoded === "string") {
            return res.sendStatus(403);
        }

        req.citizen = decoded as CitizenType;
        next();
    } catch {
        return res.sendStatus(403);
    }
};