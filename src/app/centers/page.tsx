'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiMapPin, FiPhone, FiClock, FiMail } from 'react-icons/fi';

const visaCenters = [
  { id: '1', name: 'VFS Global Visa Application Center', city: 'New York', address: '123 Visa Street, Manhattan, NY 10001', phone: '+1-212-555-0100', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
  { id: '2', name: 'VFS Global Visa Application Center', city: 'Los Angeles', address: '456 Application Ave, Downtown, LA 90012', phone: '+1-213-555-0200', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Premium Lounge'] },
  { id: '3', name: 'VFS Global Visa Application Center', city: 'Chicago', address: '789 Processing Blvd, Loop, Chicago 60601', phone: '+1-312-555-0300', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
  { id: '4', name: 'VFS Global Visa Application Center', city: 'Houston', address: '321 Embassy Row, Galleria, Houston 77056', phone: '+1-713-555-0400', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Courier Services'] },
  { id: '5', name: 'VFS Global Visa Application Center', city: 'Miami', address: '654 Consulate Way, Brickell, Miami 33131', phone: '+1-305-555-0500', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
  { id: '6', name: 'VFS Global Visa Application Center', city: 'San Francisco', address: '987 Gateway Plaza, Financial District, SF 94105', phone: '+1-415-555-0600', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Premium Lounge'] },
  { id: '7', name: 'VFS Global Visa Application Center', city: 'Seattle', address: '147 Pike Street, Downtown, Seattle 98101', phone: '+1-206-555-0700', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics'] },
  { id: '8', name: 'VFS Global Visa Application Center', city: 'Washington DC', address: '2100 Pennsylvania Ave NW, Washington DC 20037', phone: '+1-202-555-0800', hours: '08:00 - 16:00', services: ['Visa Processing', 'Document Verification', 'Biometrics', 'Diplomatic Services'] },
];

export default function CentersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#003366] text-center mb-4">
            Visa Application Centers
          </h1>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Find the nearest VFS Global visa application center to submit your application and provide biometrics
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visaCenters.map((center) => (
              <div key={center.id} className="card hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-[#003366] mb-3">
                  {center.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="flex items-start gap-2 text-gray-600">
                    <FiMapPin className="mt-1 flex-shrink-0" />
                    <span>{center.address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FiPhone className="flex-shrink-0" />
                    {center.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FiClock className="flex-shrink-0" />
                    {center.hours}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Available Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {center.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-blue-50 text-[#003366] text-xs rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#003366] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-blue-100 mb-6">
              Our customer service team is available to help you with any queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+1-800-VFS-GLOBAL" className="btn-accent">
                Call: +1-800-VFS-GLOBAL
              </a>
              <a href="mailto:info@vfsglobalservices.com" className="bg-white text-[#003366] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                <FiMail /> Email Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
