// src/APIs/designations/models/designationModel.ts

import { Schema, model, Document } from 'mongoose';

interface IDesignation extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const designationSchema = new Schema<IDesignation>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` before saving
designationSchema.pre<IDesignation>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const DesignationModel = model<IDesignation>('Designation', designationSchema);

export default DesignationModel;
