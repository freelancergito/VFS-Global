export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  _id: string;
  userId: string;
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
  appointmentId?: string;
  paymentId?: string;
  submittedAt?: Date;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  _id: string;
  userId: string;
  applicationId: string;
  centerId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  createdAt: Date;
  updatedAt: Date;
}

export interface VisaCenter {
  _id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  workingHours: string;
  services: string[];
}

export interface Payment {
  _id: string;
  userId: string;
  applicationId: string;
  amount: number;
  currency: string;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: Date;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  active: boolean;
  expiresAt?: Date;
  createdAt: Date;
}
