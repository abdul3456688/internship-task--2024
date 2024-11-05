// src/APIs/designations/index.ts

import { Router } from 'express'
import {createDesignation, deleteDesignation, getAllDesignations, updateDesignation} from './controllers/designationController'
import { createDesignationValidation } from './validations/designationValidation'

const router = Router();

// Define routes
router.route('/').post(createDesignationValidation, createDesignation);
router.route('/').get(getAllDesignations);
router.route('/:designationId').put(updateDesignation);
router.route('/:designationId').delete(deleteDesignation);

export default router;

