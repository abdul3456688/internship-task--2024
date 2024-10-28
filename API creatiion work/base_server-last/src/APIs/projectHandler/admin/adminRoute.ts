import { Router } from 'express'
import asyncHandler from '../../../handlers/async'
import adminController from './controller'

const router = Router()

router.route('/').get(asyncHandler(adminController.viewAllProjects))
router.route('/:projectID').get(asyncHandler(adminController.getProjectByID))

export default router
