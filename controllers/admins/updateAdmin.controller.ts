import type { Request, Response } from 'express'
import { findAdminByID } from '../../sql/admins/findAdminById';
import { findExistingAdminByUsername } from '../../sql/admins/findExistingAdmin.sql';
import { updateAdminProfile } from '../../sql/admins/updateProfile.sql';

export async function updateAdminProfileController(req: Request, res: Response) {
    try {
        const id = String(req.params.adminID);

        let existingAdmin = await findAdminByID(id);

        if (!existingAdmin.length) {
            console.log("Admin not found. ID:", id);
            return res.status(404)
                .json({
                    message: 'Admin not found. Please try again',
                    success: false
                });
        };

        const { value } = req.body;

        const successfulEdit = await updateAdminProfile(id, value)

        console.log(successfulEdit);

        return res.status(200)
            .send({
                message: "Admin profile updated successfully",
                admin: successfulEdit,
                success: true
            });

    } catch (error) {
        console.error(error);
        res.status(500)
            .send({
                message: 'Internal Server Error. Please check your inputs and try again',
                success: false
            });
    }
}