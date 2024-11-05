// src/index.ts
import express from 'express';
import { Router } from 'express'



// Import role controllers
import { createRoleController,getRolesController,updateRoleController,deleteRoleController } from '../role/controllers/roleController';

const router = Router()


const app = express();
app.use(express.json());



// Role routes
router.route('/').post(createRoleController);
router.route('/').get(getRolesController);
router.route('/:_id').put(updateRoleController);
router.route('/:_id').delete(deleteRoleController);

export default router
