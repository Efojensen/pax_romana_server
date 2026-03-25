import { Router } from 'express';
import {validateJwt} from '../middlewares/validate_jwt';
import { createAnnouncementController } from '../controllers/general/announcements/createAnnouncement.controller';
import { getAllAnnouncementController } from '../controllers/general/announcements/getAllAnnouncements.controller';
import { createSubgroupController } from '../controllers/general/subgroups/createSubgroup.controller';
import { getSubgroupsController } from '../controllers/general/subgroups/getSubgroups.controller';

const router = Router();

router.get('/subgroups', getSubgroupsController)
router.get('/announcements', getAllAnnouncementController);
router.post('/subgroups/new', validateJwt, createSubgroupController)
router.post('/announcements/new', validateJwt,createAnnouncementController);

export default router;