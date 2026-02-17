'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiCheck } from 'react-icons/fi';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const referenceNumber = searchParams?.get('ref') || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600 text-4xl" />
            </div>

            <h1 className="text-2xl font-bold text-[#003366] mb-4">
              Application Submitted Successfully!
            </h1>

            <p className="text-gray-600 mb-6">
              Your visa application has been submitted successfully. You will receive a confirmation email shortly.
            </p>

            {referenceNumber && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Your Reference Number:</p>
                <p className="text-2xl font-bold text-[#003366]">{referenceNumber}</p>
              </div>
            )}

            <div className="space-y-3">
              <Link
                href={`/track?ref=${referenceNumber}`}
                className="block w-full btn-primary"
              >
                Track Application
              </Link>
              <Link
                href="/appointments"
                className="block w-full btn-secondary"
              >
                Book Appointment
              </Link>
              <Link
                href="/dashboard"
                className="block w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div></div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
