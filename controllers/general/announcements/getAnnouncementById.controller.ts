import type { Request, Response } from 'express';
import { getAnnouncementByIdQuery } from '../../../sql/general/announcements/getAnnouncementById.sql';

export async function getAnnouncementByIdController(req: Request, res: Response) {
    try {
        const id = String(req.params.id)
        const announcement = await getAnnouncementByIdQuery(id)

        return res.status(200).json({
            success: true,
            announcement
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false
        })
    }
}