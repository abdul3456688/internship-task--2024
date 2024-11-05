// src/APIs/designations/validations/designationValidation.ts

import { body } from 'express-validator';

export const createDesignationValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];
