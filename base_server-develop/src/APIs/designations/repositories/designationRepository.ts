// src/APIs/designations/repositories/designationRepository.ts

import DesignationModel from '../models/designationModel';
import { CreateDesignationInput, Designation } from '../types';

export const designationRepository = {
  create: async (data: CreateDesignationInput): Promise<Designation> => {
    const designation = new DesignationModel(data);
    const savedDesignation = await designation.save();

    // Map the Mongoose document to your Designation type
    return {
      id: savedDesignation.id.toString(), // Convert ObjectId to string
      title: savedDesignation.title,
      description: savedDesignation.description,
      createdAt: savedDesignation.createdAt,
      updatedAt: savedDesignation.updatedAt,
    };
  },

  findAll: async (): Promise<Designation[]> => {
    const designations = await DesignationModel.find();
    // Map the Mongoose documents to your Designation type
    return designations.map((designation) => ({
      id: designation.id.toString(),
      title: designation.title,
      description: designation.description,
      createdAt: designation.createdAt,
      updatedAt: designation.updatedAt,
    }));
  },

  findById: async (id: string): Promise<Designation | null> => {
    const designation = await DesignationModel.findById(id);
    if (!designation) return null;

    // Map the Mongoose document to your Designation type
    return {
      id: designation.id.toString(),
      title: designation.title,
      description: designation.description,
      createdAt: designation.createdAt,
      updatedAt: designation.updatedAt,
    };
  },

  update: async (id: string, data: Partial<CreateDesignationInput>): Promise<Designation | null> => {
    const updatedDesignation = await DesignationModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedDesignation) return null;

    // Map the Mongoose document to your Designation type
    return {
      id: updatedDesignation.id.toString(),
      title: updatedDesignation.title,
      description: updatedDesignation.description,
      createdAt: updatedDesignation.createdAt,
      updatedAt: updatedDesignation.updatedAt,
    };
  },

  remove: async (id: string): Promise<Designation | null> => {
    const deletedDesignation = await DesignationModel.findByIdAndDelete(id);
    if (!deletedDesignation) return null;

    // Map the Mongoose document to your Designation type
    return {
      id: deletedDesignation.id.toString(),
      title: deletedDesignation.title,
      description: deletedDesignation.description,
      createdAt: deletedDesignation.createdAt,
      updatedAt: deletedDesignation.updatedAt,
    };
  },
};
