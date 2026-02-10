import type { Request, Response } from 'express'
import { findAdminByID } from '../../sql/admins/findAdminById'

export async function getAdminById(req: Request, res: Response) {
    try {
        const adminID = String(req.params.id)

        const admin = findAdminByID(adminID)

        if (!admin) {
            return res.status(404)
                .send({
                    message: "No admin with that ID was found",
                    success: false,
                });
        }

        return res.status(200)
            .send({
                message: "Admin found",
                success: true,
                admin
            });
    } catch (error) {
        console.error(error);
        res.status(500)
            .send({
                message: "Internal Server error. Please check your inputs and try again",
                success: false
            })
    }
}