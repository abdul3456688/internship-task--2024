// src/features/role/repositories/roleRepository.ts
import Role, { IRoleDocument } from '../models/roleModel';
import { IRoleCreate, IRoleUpdate } from '../types';

export const createRole = async (data: IRoleCreate): Promise<IRoleDocument> => {
  const newRole = new Role(data);
  return newRole.save();
};

export const getRoles = async (): Promise<IRoleDocument[]> => {
  return Role.find();
};

export const updateRole = async (roleId: string, data: IRoleUpdate): Promise<IRoleDocument | null> => {
  return Role.findByIdAndUpdate(roleId, data);
};

export const deleteRole = async (roleId: string): Promise<IRoleDocument | null> => {
  return Role.findByIdAndDelete(roleId);
};
