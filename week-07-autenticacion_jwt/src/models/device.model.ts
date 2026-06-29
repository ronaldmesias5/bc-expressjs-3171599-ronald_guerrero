import { Schema, model, Types } from 'mongoose';

export interface IDevice {
  brand: string;
  model: string;
  issue: string;
  status: 'PENDING' | 'IN_REPAIR' | 'COMPLETED' | 'DELIVERED';
  estimatedCost?: number;
  finalCost?: number;
  customer: Types.ObjectId;
  entryDate: Date;
  exitDate?: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new Schema<IDevice>(
  {
    brand: {
      type: String,
      required: [true, 'La marca es requerida'],
      trim: true,
      maxlength: 100,
    },
    model: {
      type: String,
      required: [true, 'El modelo es requerido'],
      trim: true,
      maxlength: 100,
    },
    issue: {
      type: String,
      required: [true, 'La descripción del problema es requerida'],
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_REPAIR', 'COMPLETED', 'DELIVERED'],
      default: 'PENDING',
    },
    estimatedCost: {
      type: Number,
      min: 0,
    },
    finalCost: {
      type: Number,
      min: 0,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'El cliente es requerido'],
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
    exitDate: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const DeviceModel = model<IDevice>('Device', deviceSchema);
