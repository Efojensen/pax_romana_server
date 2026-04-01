import { Router } from 'express';
import {validateJwt} from '../middlewares/validate_jwt';
import { getSubgroupsController } from '../controllers/general/subgroups/getSubgroups.controller';
import { updateSubgroupController } from '../controllers/general/subgroups/updateSubgroup.controller';
import { createSubgroupController } from '../controllers/general/subgroups/createSubgroup.controller';
import { createAnnouncementController } from '../controllers/general/announcements/createAnnouncement.controller';
import { getAllAnnouncementController } from '../controllers/general/announcements/getAllAnnouncements.controller';

const router = Router();

router.get('/subgroups', getSubgroupsController)
router.get('/announcements', getAllAnnouncementController);
router.post('/subgroups/new', validateJwt, createSubgroupController)
router.post('/announcements/new', validateJwt,createAnnouncementController);
router.patch('/subgroups/:id/update', validateJwt, updateSubgroupController);

export default router;