// src/APIs/designations/types.ts

export interface Designation {
    id: string; // Unique identifier for the designation
    title: string; // Title of the designation
    description: string; // Description of the designation
    createdAt: Date; // Date when the designation was created
    updatedAt: Date; // Date when the designation was last updated
    _id?: string; // Optional field to accommodate Mongoose _id
  }
  
  export interface CreateDesignationInput {
    title: string; // Title of the designation
    description: string; // Description of the designation
  }
  