import type { Request, Response } from 'express';
import type { Announcement } from '../../../types/announcement';
import { createAnnouncementRecord } from '../../../sql/general/createAnnouncementRecord.sql';

export async function createAnnouncementController(req: Request, res: Response) {
    try {
        const announcement:Announcement= req.body

        const theAnnouncement = await createAnnouncementRecord(announcement)

        return res.status(201).json({
            success: true,
            theAnnouncement: theAnnouncement
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}