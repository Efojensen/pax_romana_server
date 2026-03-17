import { Router } from 'express';
import { getCitizenById } from '../controllers/citizens/getCitizenById.controller';
import { createCitizenController } from '../controllers/citizens/createCitizen.controller';
import { getAllCitizensController } from '../controllers/citizens/getAllCitizens.controller';

const router = Router()

router.get('/:id', getCitizenById)
router.get('/', getAllCitizensController)
router.post('/new', createCitizenController)

export default router