// src/APIs/designations/controllers/designationController.ts

import { Request, Response } from 'express';
import { designationService } from '../services/designationService';
import { CreateDesignationInput } from '../types';

export const createDesignation = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { title, description }: CreateDesignationInput = req.body;

    const newDesignation = await designationService.createDesignation({ title, description });
    return res.status(201).json(newDesignation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'An error occurred while creating the designation', error: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export const getAllDesignations = async (req: Request, res: Response): Promise<Response | void> => {
  console.log('Received request:', req.method, req.url); // Debugging log
  try {
    const designations = await designationService.getAllDesignations();
    return res.status(200).json(designations);
  } catch (error) {
    console.error('Error retrieving designations:', error); // Log the error for debugging
    return res.status(500).json({ message: 'An error occurred while retrieving designations' });
  }
};

export const updateDesignation = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { designationId } = req.params;
    const updatedDesignation = await designationService.updateDesignation(designationId, req.body);
    if (!updatedDesignation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    return res.status(200).json(updatedDesignation);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the designation' });
  }
};

export const deleteDesignation = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { designationId } = req.params;
    const deletedDesignation = await designationService.deleteDesignation(designationId);
    if (!deletedDesignation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting the designation' });
  }
};
