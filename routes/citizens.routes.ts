import { Router } from 'express';
import { createCitizenController } from '../controllers/citizens/createCitizen.controller';

const router = Router()

router.post('/new', createCitizenController)

export default router