import { Router } from 'express';
import { createAnnouncementController } from '../controllers/general/announcements/createAnnouncement.controller';

const router = Router()

router.post('/announcements/new', createAnnouncementController)

export default router;