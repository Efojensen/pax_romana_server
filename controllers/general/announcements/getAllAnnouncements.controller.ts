import type { Request, Response } from 'express';
import { getAllAnnouncementsQuery } from '../../../sql/general/getAllAnnouncements.sql';

export async function getAllAnnouncementController(req: Request, res: Response) {
    try {
        const announcements = await getAllAnnouncementsQuery()

        return res.status(200).json({
            success: true,
            announcements
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false
        })
    }
}