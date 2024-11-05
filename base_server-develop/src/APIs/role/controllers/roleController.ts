// src/features/role/controllers/roleController.ts
import { Request, Response } from 'express';
import { createRoleService,updateRoleService, getRolesService, deleteRoleService } from '../services/roleService';
import { IRoleCreate } from '../types';
import { updateRoleValidation } from '../validations/roleValidation';





// POST /api/roles - Create a new role
export const createRoleController = async (req: Request, res: Response) => {
  const data: IRoleCreate = req.body;

  try {
    const newRole = await createRoleService(data);
    return res.status(201).json(newRole);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating role', error: err });
  }
};
// GET /api/roles - Get all roles
export const getRolesController = async (_req: Request, res: Response) => {
  try {
    const roles = await getRolesService();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching roles', error: err });
  }
};

// PUT /api/roles/:roleId - Update a role
export const updateRoleController = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const data = req.body;

  // Validate the incoming request body
  const { error } = updateRoleValidation(data);
  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }

  try {
    const updatedRole = await updateRoleService(_id, data);
    
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.status(200).json("Role updated successfully");
  } catch (err) {
    return res.status(500).json({ message: 'Error updating role', error: err });
  }
};

// DELETE /api/roles/:roleId - Delete a role
export const deleteRoleController = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const deletedRole = await deleteRoleService(_id);
    if (!deletedRole) return res.status(404).json({ message: 'Role not found' });
    return res.status(200).json({message:"Role deleetd successfully"})

  } catch (err) {
    return res.status(500).json({ message: 'Error deleting role', error: err });
  }
};
