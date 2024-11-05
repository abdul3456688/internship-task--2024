// src/features/role/models/roleModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IRole } from '../types';

export interface IRoleDocument extends IRole, Document {
  roleName: string;
}

const RoleSchema: Schema = new Schema({

  roleName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Role = mongoose.model<IRoleDocument>('Role', RoleSchema);

export default Role;
