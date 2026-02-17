'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { countries, visaTypes, genders, maritalStatuses, purposesOfVisit, entryTypes, accommodationTypes } from '@/lib/data';
import { FiCheck, FiSave, FiArrowRight, FiArrowLeft, FiUpload, FiFile } from 'react-icons/fi';

const steps = [
  { id: 1, name: 'Personal Details' },
  { id: 2, name: 'Passport Information' },
  { id: 3, name: 'Travel Details' },
  { id: 4, name: 'Documents' },
  { id: 5, name: 'Review & Submit' },
];

interface FormData {
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
}

const initialFormData: FormData = {
  fromCountry: '',
  toCountry: '',
  visaType: '',
  personalDetails: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    countryOfBirth: '',
    maritalStatus: '',
  },
  passportDetails: {
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuePlace: '',
    passportIssueCountry: '',
  },
  travelDetails: {
    purposeOfVisit: '',
    entryType: '',
    arrivalDate: '',
    departureDate: '',
    portOfArrival: '',
    accommodationType: '',
    accommodationAddress: '',
  },
  documents: {
    passport: '',
    photo: '',
    financialDocs: '',
    travelInsurance: '',
    accommodationProof: '',
    employmentProof: '',
  },
};

function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const from = searchParams?.get('from') || '';
    const to = searchParams?.get('to') || '';
    const visaType = searchParams?.get('visaType') || '';

    setFormData((prev) => ({
      ...prev,
      fromCountry: from || prev.fromCountry,
      toCountry: to || prev.toCountry,
      visaType: visaType || prev.visaType,
    }));
  }, [user, searchParams, router]);

  const handleChange = (section: keyof FormData | 'personalDetails' | 'passportDetails' | 'travelDetails' | 'documents', field: string, value: string) => {
    if (section === 'personalDetails' || section === 'passportDetails' || section === 'travelDetails' || section === 'documents') {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as object),
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Application saved as draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({ ...formData, status: 'submitted' }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/apply/success?ref=${data.application.referenceNumber}`);
      }
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#003366] mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.personalDetails.firstName}
                  onChange={(e) => handleChange('personalDetails', 'firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.personalDetails.lastName}
                  onChange={(e) => handleChange('personalDetails', 'lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Birth *</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.personalDetails.dateOfBirth}
                  onChange={(e) => handleChange('personalDetails', 'dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Gender *</label>
                <select
                  className="input-field"
                  value={formData.personalDetails.gender}
                  onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nationality *</label>
                <select
                  className="input-field"
                  value={formData.personalDetails.nationality}
                  onChange={(e) => handleChange('personalDetails', 'nationality', e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Country of Birth *</label>
                <select
                  className="input-field"
                  value={formData.personalDetails.countryOfBirth}
                  onChange={(e) => handleChange('personalDetails', 'countryOfBirth', e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Marital Status *</label>
                <select
                  className="input-field"
                  value={formData.personalDetails.maritalStatus}
                  onChange={(e) => handleChange('personalDetails', 'maritalStatus', e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  {maritalStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#003366] mb-6">Passport Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Passport Number *</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.passportDetails.passportNumber}
                  onChange={(e) => handleChange('passportDetails', 'passportNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Issue *</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.passportDetails.passportIssueDate}
                  onChange={(e) => handleChange('passportDetails', 'passportIssueDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Expiry *</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.passportDetails.passportExpiryDate}
                  onChange={(e) => handleChange('passportDetails', 'passportExpiryDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Place of Issue *</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.passportDetails.passportIssuePlace}
                  onChange={(e) => handleChange('passportDetails', 'passportIssuePlace', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Country of Issue *</label>
                <select
                  className="input-field"
                  value={formData.passportDetails.passportIssueCountry}
                  onChange={(e) => handleChange('passportDetails', 'passportIssueCountry', e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#003366] mb-6">Travel Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Purpose of Visit *</label>
                <select
                  className="input-field"
                  value={formData.travelDetails.purposeOfVisit}
                  onChange={(e) => handleChange('travelDetails', 'purposeOfVisit', e.target.value)}
                  required
                >
                  <option value="">Select Purpose</option>
                  {purposesOfVisit.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Entry Type *</label>
                <select
                  className="input-field"
                  value={formData.travelDetails.entryType}
                  onChange={(e) => handleChange('travelDetails', 'entryType', e.target.value)}
                  required
                >
                  <option value="">Select Entry Type</option>
                  {entryTypes.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Arrival Date *</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.travelDetails.arrivalDate}
                  onChange={(e) => handleChange('travelDetails', 'arrivalDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Departure Date *</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.travelDetails.departureDate}
                  onChange={(e) => handleChange('travelDetails', 'departureDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Port of Arrival *</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.travelDetails.portOfArrival}
                  onChange={(e) => handleChange('travelDetails', 'portOfArrival', e.target.value)}
                  placeholder="Airport or Port name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Accommodation Type *</label>
                <select
                  className="input-field"
                  value={formData.travelDetails.accommodationType}
                  onChange={(e) => handleChange('travelDetails', 'accommodationType', e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  {accommodationTypes.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Accommodation Address *</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={formData.travelDetails.accommodationAddress}
                  onChange={(e) => handleChange('travelDetails', 'accommodationAddress', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#003366] mb-6">Document Upload</h2>
            <p className="text-gray-600 mb-6">Please upload the required documents in PDF, JPG, or PNG format (max 5MB each)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'passport', label: 'Passport Copy *' },
                { key: 'photo', label: 'Passport Photo *' },
                { key: 'financialDocs', label: 'Financial Documents *' },
                { key: 'travelInsurance', label: 'Travel Insurance' },
                { key: 'accommodationProof', label: 'Accommodation Proof' },
                { key: 'employmentProof', label: 'Employment/Business Proof' },
              ].map((doc) => (
                <div key={doc.key}>
                  <label className="block text-gray-700 font-medium mb-2">{doc.label}</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0066cc] transition-colors cursor-pointer">
                    <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#003366] mb-6">Review Your Application</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-[#003366] mb-2">Application Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><span className="font-medium">From:</span> {formData.fromCountry}</p>
                <p><span className="font-medium">To:</span> {formData.toCountry}</p>
                <p><span className="font-medium">Visa Type:</span> {formData.visaType}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-[#003366] mb-3">Personal Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Name: {formData.personalDetails.firstName} {formData.personalDetails.lastName}</p>
                  <p>DOB: {formData.personalDetails.dateOfBirth}</p>
                  <p>Gender: {formData.personalDetails.gender}</p>
                  <p>Nationality: {formData.personalDetails.nationality}</p>
                  <p>Marital Status: {formData.personalDetails.maritalStatus}</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-[#003366] mb-3">Passport Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Passport No: {formData.passportDetails.passportNumber}</p>
                  <p>Issue Date: {formData.passportDetails.passportIssueDate}</p>
                  <p>Expiry Date: {formData.passportDetails.passportExpiryDate}</p>
                  <p>Issue Country: {formData.passportDetails.passportIssueCountry}</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-[#003366] mb-3">Travel Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Purpose: {formData.travelDetails.purposeOfVisit}</p>
                  <p>Entry Type: {formData.travelDetails.entryType}</p>
                  <p>Arrival: {formData.travelDetails.arrivalDate}</p>
                  <p>Departure: {formData.travelDetails.departureDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <p className="text-amber-800 text-sm">
                By submitting this application, I confirm that all information provided is true and accurate. 
                I agree to the Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#003366]">Visa Application</h1>
            <p className="text-gray-600 mt-2">Complete all steps to submit your visa application</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-[#003366] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? <FiCheck /> : step.id}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:block ${currentStep >= step.id ? 'text-[#003366]' : 'text-gray-500'}`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-1 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Applying From</label>
                  <select
                    className="input-field"
                    value={formData.fromCountry}
                    onChange={(e) => handleChange('fromCountry', '', e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Destination</label>
                  <select
                    className="input-field"
                    value={formData.toCountry}
                    onChange={(e) => handleChange('toCountry', '', e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Visa Type</label>
                  <select
                    className="input-field"
                    value={formData.visaType}
                    onChange={(e) => handleChange('visaType', '', e.target.value)}
                  >
                    <option value="">Select Visa Type</option>
                    {visaTypes.map((v) => <option key={v.code} value={v.name}>{v.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 flex items-center gap-2"
              >
                <FiArrowLeft /> Previous
              </button>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                >
                  <FiSave /> {saving ? 'Saving...' : 'Save Draft'}
                </button>

                {currentStep < steps.length ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="btn-primary flex items-center gap-2"
                  >
                    Next <FiArrowRight />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-accent flex items-center gap-2"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'} <FiCheck />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div></div>}>
      <ApplyForm />
    </Suspense>
  );
}
