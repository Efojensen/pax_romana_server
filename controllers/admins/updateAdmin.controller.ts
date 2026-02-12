import type { Request, Response } from 'express'
import { findAdminByID } from '../../sql/admins/findAdminById';
import { findExistingAdminByUsername } from '../../sql/admins/findExistingAdmin.sql';

export async function updateAdminProfileController(req: Request, res: Response) {
    try {
        const { value } = req.body;

        const id = String(req.params.adminID);
        const attribute = req.params.attribute;

        let existingAdmin = await findAdminByID(id);

        if (!existingAdmin.length) {
            console.log("Admin not found. ID:", id);
            return res.status(404)
                .send({
                    message: 'Admin not found. Please try again',
                    success: false
                });
        };

        // check for existing admin usernames
        if (attribute === "username") {
            existingAdmin = await findExistingAdminByUsername(value);
            if (existingAdmin.length && id !== existingAdmin[0].id) {
                console.log("Username already in use");
                return res.status(409)
                    .json({
                        message: "Username already in use. Please try again",
                        success: false
                    });
            }
        };

        const successfulEdit = await updateProfile('admin', attribute, value, id);

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