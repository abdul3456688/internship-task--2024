// src/features/role/services/roleService.ts
import { createRole, getRoles, updateRole, deleteRole } from '../repositories/roleRepository';
import { IRoleCreate, IRoleUpdate} from '../types';
import { IRoleDocument } from '../models/roleModel';

export const createRoleService = async (data: IRoleCreate) => {
  return createRole(data);
};

export const getRolesService = async () => {
  return getRoles();
};

export const updateRoleService = async (roleId: string, data: IRoleUpdate): Promise<IRoleDocument | null> => {
  return updateRole(roleId, data);
};

export const deleteRoleService = async (roleId: string) => {
  return deleteRole(roleId);
};
