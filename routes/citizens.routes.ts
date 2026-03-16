import { Router } from 'express';
import { createCitizenController } from '../controllers/citizens/createCitizen.controller';
import { getAllCitizensController } from '../controllers/citizens/getAllCitizens.controller';

const router = Router()

router.post('/new', createCitizenController)
router.get('/', getAllCitizensController)

export default router