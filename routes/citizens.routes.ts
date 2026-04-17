import { Router } from 'express';
import { getCitizenById } from '../controllers/citizens/getCitizenById.controller';
import { createCitizenController } from '../controllers/citizens/createCitizen.controller';
import { updateCitizenController } from '../controllers/citizens/updateCitizen.controller';
import { getAllCitizensController } from '../controllers/citizens/getAllCitizens.controller';
import { loginCitizenController } from '../controllers/citizens/loginCitizen.controller';
import { citizenValidateJwt } from '../middlewares/citizen_validate_jwt';

const router = Router()

router.get('/:id', getCitizenById)
router.get('/', getAllCitizensController)
router.post('/new', createCitizenController)
router.post('/login', loginCitizenController)
router.patch('/update', citizenValidateJwt, updateCitizenController)

export default router