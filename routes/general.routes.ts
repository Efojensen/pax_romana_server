import { Router } from 'express';
import {validateJwt} from '../middlewares/admin_validate_jwt';
import { getSubgroupsController } from '../controllers/general/subgroups/getSubgroups.controller';
import { updateSubgroupController } from '../controllers/general/subgroups/updateSubgroup.controller';
import { createSubgroupController } from '../controllers/general/subgroups/createSubgroup.controller';
import { getSubgroupByIdController } from '../controllers/general/subgroups/getSubgroupById.controller';
import { createAnnouncementController } from '../controllers/general/announcements/createAnnouncement.controller';
import { getAllAnnouncementController } from '../controllers/general/announcements/getAllAnnouncements.controller';
import { getAnnouncementByIdController } from '../controllers/general/announcements/getAnnouncementById.controller';

const router = Router();

router.get('/subgroups', getSubgroupsController);
router.get('/subgroups/:id', getSubgroupByIdController);
router.get('/announcements', getAllAnnouncementController);
router.get('/announcements/:id', getAnnouncementByIdController);
// TODO: Make a controller to update an announcement
// TODO: Make a controller to get recent announcements
// TODO: Make a controller to get announcements for a subgroup
router.post('/subgroups/new', validateJwt, createSubgroupController);
router.post('/announcements/new', validateJwt,createAnnouncementController);
router.patch('/subgroups/:id/update', validateJwt, updateSubgroupController);

export default router;