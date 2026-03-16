import type { Request, Response } from 'express';
import { getAllCitizens } from '../../sql/citizens/getAllCitizens.sql';

export async function getAllCitizensController(req: Request, res: Response) {
    try {
        const citizenData = await getAllCitizens()

        return res.status(200).json({
            message: "Members retrieved successfully",
            citizens: citizenData,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            error: error,
        })
        console.error(error)
    }
}