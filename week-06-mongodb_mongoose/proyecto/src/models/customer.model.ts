import { Schema, model } from 'mongoose';

export interface ICustomer {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del cliente es requerido'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 100,
      unique: true,
      sparse: true,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

export const Customer = model<ICustomer>('Customer', customerSchema);
