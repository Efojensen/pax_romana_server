import type { Request, Response } from 'express'
import type { CitizenData } from '../../types/citizen';
import { findAdminByID } from '../../sql/admins/findAdminById';
import { updateCitizenProfile } from '../../sql/citizens/updateCitizenProfile.sql';

export async function updateAdminProfileController(req: Request, res: Response) {
    try {
        const id = String(req.params.id);

        let existingAdmin = await findAdminByID(id);

        if (!existingAdmin) {
            console.log("Admin not found. ID:", id);
            return res.status(404).json({
                message: 'admin not found. please try again',
                success: false
            });
        };

        const value: CitizenData = req.body;

        const successfulEdit = await updateCitizenProfile(id, value)

        return res.status(200).json({
            message: "admin profile updated successfully",
            admin: successfulEdit,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal server error. please check your inputs and try again',
            success: false
        });
        console.error(error);
    }
}