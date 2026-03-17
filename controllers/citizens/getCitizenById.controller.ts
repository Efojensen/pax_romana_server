import type { Request, Response } from 'express'
import { getCitizenByIdQuery } from '../../sql/citizens/getCitizenById.sql'

export async function getCitizenById(req: Request, res: Response) {
    try {
        const citizenID = String(req.params.id)

        if (!citizenID || citizenID === undefined) {
            return res.status(404).json({
                message: 'citizen id not provided',
                success: false
            })
        }

        const paxCitizen = await getCitizenByIdQuery(citizenID)

        if (!paxCitizen) {
            return res.status(404).json({
                message: "No citizen with that ID was found",
                success: false,
            });
        }

        return res.status(200).json({
            paxCitizen,
            message: "citizen found",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error. Please check your inputs and try again",
            success: false
        })
        console.error(error);
    }
}