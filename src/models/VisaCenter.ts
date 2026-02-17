import mongoose, { Schema, Document } from 'mongoose';

export interface IVisaCenter extends Document {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  workingHours: string;
  services: string[];
}

const visaCenterSchema = new Schema<IVisaCenter>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    workingHours: {
      type: String,
      required: true,
    },
    services: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

export const VisaCenter = mongoose.models.VisaCenter || mongoose.model<IVisaCenter>('VisaCenter', visaCenterSchema);
