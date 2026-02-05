import type { Request, Response } from 'express';

export async function createAdminController(req: Request, res: Response) {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            photo_url
        } = req.body;
    } catch (error) {
        
    }
}