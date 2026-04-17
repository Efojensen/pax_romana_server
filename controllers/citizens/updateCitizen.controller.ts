import type { Request, Response } from 'express'
import type { CitizenData } from '../../types/citizen';
import { updateCitizenProfile } from '../../sql/citizens/updateCitizenProfile.sql';

export async function updateCitizenController(req: Request, res: Response) {
    try {
        const id = req.citizen?.id
        console.log("citizen id: ",id)

        if (!id) {
            return res.status(400).json({
                message: 'id not provided',
                success: false
            })
        }

        const value: CitizenData = req.body;

        const successfulEdit = await updateCitizenProfile(id, value)

        return res.status(200).json({
            message: "citizen profile updated successfully",
            paxCitizen: successfulEdit,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error. Please check your inputs and try again',
            success: false
        });
        console.error(error);
    }
}