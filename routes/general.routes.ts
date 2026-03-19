import { Router } from 'express';
import { createAnnouncementController } from '../controllers/general/announcements/createAnnouncement.controller';
import { getAllAnnouncementController } from '../controllers/general/announcements/getAllAnnouncements.controller';

const router = Router();

router.get('/announcements', getAllAnnouncementController);
router.post('/announcements/new', createAnnouncementController);

export default router;