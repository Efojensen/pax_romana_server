import { Router } from 'express'
import { getAdminById } from '../controllers/admins/getAdminById.controller'
import { loginAdminController } from '../controllers/admins/loginAdmin.controller'
import { createAdminController } from '../controllers/admins/createAdmin.controller'
import { getAllAdminsController } from '../controllers/admins/getAllAdmins.controller'
import { updateAdminProfileController } from '../controllers/admins/updateAdmin.controller'
import { getDashboardStatistics } from '../controllers/admins/getDashboardStatistics.controller'

const router = Router()

router.get('/:adminID', getAdminById)
router.get('/', getAllAdminsController)
router.post('/new', createAdminController)
router.post('/login', loginAdminController)
router.get('/stats', getDashboardStatistics)
router.patch('/:id/update', updateAdminProfileController)

export default router