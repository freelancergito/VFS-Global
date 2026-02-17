'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiSearch, FiCheck, FiClock, FiX, FiFileText, FiAlertCircle } from 'react-icons/fi';

const statusSteps = [
  { key: 'submitted', label: 'Application Submitted', icon: FiFileText },
  { key: 'under_process', label: 'Under Process', icon: FiClock },
  { key: 'processed', label: 'Processed', icon: FiCheck },
  { key: 'ready_for_collection', label: 'Ready for Collection', icon: FiCheck },
];

function TrackPageContent() {
  const searchParams = useSearchParams();
  const [referenceNumber, setReferenceNumber] = useState(searchParams?.get('ref') || '');
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber) return;

    setLoading(true);
    setError('');
    setApplication(null);

    try {
      const res = await fetch(`/api/track?referenceNumber=${referenceNumber}`);
      const data = await res.json();

      if (res.ok) {
        setApplication(data.application);
      } else {
        setError(data.message || 'Application not found');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (status: string) => {
    const index = statusSteps.findIndex((s) => s.key === status);
    return index >= 0 ? index : 0;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#003366] text-center mb-8">
            Track Your Application
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter Application Reference Number"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !referenceNumber}
                className="btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Tracking...' : <><FiSearch /> Track</>}
              </button>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                <FiAlertCircle /> {error}
              </div>
            )}
          </div>

          {application && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#003366]">
                  Application Status
                </h2>
                <p className="text-gray-600 mt-1">
                  Reference: <span className="font-semibold">{application.referenceNumber}</span>
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {statusSteps.map((step, index) => {
                    const stepIndex = getCurrentStepIndex(application.status);
                    const isCompleted = index < stepIndex;
                    const isCurrent = index === stepIndex;
                    const StepIcon = step.icon;

                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isCurrent
                              ? 'bg-[#003366] text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {isCompleted ? <FiCheck /> : <StepIcon />}
                        </div>
                        <span
                          className={`text-xs text-center ${
                            isCurrent ? 'font-semibold text-[#003366]' : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {application.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <FiX className="mx-auto text-red-500 text-2xl mb-2" />
                    <p className="text-red-700 font-semibold">Application Rejected</p>
                    <p className="text-sm text-red-600">Please contact the visa office for more information</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-[#003366] mb-3">Application Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Visa Type:</span> {application.visaType}</p>
                    <p><span className="font-medium">From:</span> {application.fromCountry}</p>
                    <p><span className="font-medium">To:</span> {application.toCountry}</p>
                    <p><span className="font-medium">Submitted:</span> {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-[#003366] mb-3">Applicant Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {application.personalDetails?.firstName} {application.personalDetails?.lastName}</p>
                    <p><span className="font-medium">Passport:</span> {application.passportDetails?.passportNumber}</p>
                    <p><span className="font-medium">Nationality:</span> {application.personalDetails?.nationality}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-500 text-center">
                  For any queries, please contact our support team or visit your nearest visa application center.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need help?{' '}
              <Link href="/centers" className="text-[#0066cc] hover:underline">
                Find a Visa Center
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div></div>}>
      <TrackPageContent />
    </Suspense>
  );
}
