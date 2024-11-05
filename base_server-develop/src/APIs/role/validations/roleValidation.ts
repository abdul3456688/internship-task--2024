// src/features/role/validations/roleValidation.ts
import Joi from 'joi';
import { IRoleCreate, IRoleUpdate } from '../types';

export const createRoleValidation = (data: IRoleCreate) => {
  const schema = Joi.object({
  
    roleName: Joi.string().required()
  });
  return schema.validate(data);
};
export const updateRoleValidation = (data: IRoleUpdate) => {
  const schema = Joi.object({
    roleName: Joi.string().optional(),
  });
  return schema.validate(data);
};