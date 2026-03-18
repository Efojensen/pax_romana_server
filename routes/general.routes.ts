import { Router } from 'express';
import { createAnnouncementController } from '../controllers/general/announcements/createAnnouncementController.controller';

const router = Router()

router.post('/announcements', createAnnouncementController)

export default router;