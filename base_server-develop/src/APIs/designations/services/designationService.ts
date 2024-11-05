// src/APIs/designations/services/designationService.ts

import { designationRepository } from '../repositories/designationRepository';
import { CreateDesignationInput, Designation } from '../types';

export const designationService = {
  createDesignation: async (data: CreateDesignationInput): Promise<Designation> => {
    return await designationRepository.create(data);
  },

  getAllDesignations: async (): Promise<Designation[]> => {
    return await designationRepository.findAll();
  },

  updateDesignation: async (id: string, data: Partial<CreateDesignationInput>): Promise<Designation | null> => {
    return await designationRepository.update(id, data);
  },

  deleteDesignation: async (id: string): Promise<Designation | null> => {
    return await designationRepository.remove(id);
  },
};
