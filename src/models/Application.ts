import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  referenceNumber: string;
  status: 'draft' | 'submitted' | 'under_process' | 'processed' | 'ready_for_collection' | 'rejected';
  fromCountry: string;
  toCountry: string;
  visaType: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    countryOfBirth: string;
    maritalStatus: string;
  };
  passportDetails: {
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportIssuePlace: string;
    passportIssueCountry: string;
  };
  travelDetails: {
    purposeOfVisit: string;
    entryType: string;
    arrivalDate: string;
    departureDate: string;
    portOfArrival: string;
    accommodationType: string;
    accommodationAddress: string;
  };
  documents: {
    passport: string;
    photo: string;
    financialDocs: string;
    travelInsurance: string;
    accommodationProof: string;
    employmentProof: string;
  };
  appointmentId?: mongoose.Types.ObjectId;
  paymentId?: mongoose.Types.ObjectId;
  submittedAt?: Date;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_process', 'processed', 'ready_for_collection', 'rejected'],
      default: 'draft',
    },
    fromCountry: {
      type: String,
      required: true,
    },
    toCountry: {
      type: String,
      required: true,
    },
    visaType: {
      type: String,
      required: true,
    },
    personalDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      gender: { type: String, required: true },
      nationality: { type: String, required: true },
      countryOfBirth: { type: String, required: true },
      maritalStatus: { type: String, required: true },
    },
    passportDetails: {
      passportNumber: { type: String, required: true },
      passportIssueDate: { type: String, required: true },
      passportExpiryDate: { type: String, required: true },
      passportIssuePlace: { type: String, required: true },
      passportIssueCountry: { type: String, required: true },
    },
    travelDetails: {
      purposeOfVisit: { type: String, required: true },
      entryType: { type: String, required: true },
      arrivalDate: { type: String, required: true },
      departureDate: { type: String, required: true },
      portOfArrival: { type: String, required: true },
      accommodationType: { type: String, required: true },
      accommodationAddress: { type: String, required: true },
    },
    documents: {
      passport: { type: String, default: '' },
      photo: { type: String, default: '' },
      financialDocs: { type: String, default: '' },
      travelInsurance: { type: String, default: '' },
      accommodationProof: { type: String, default: '' },
      employmentProof: { type: String, default: '' },
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    submittedAt: {
      type: Date,
    },
    processedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', applicationSchema);
