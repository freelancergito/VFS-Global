'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { countries, visaTypes } from '@/lib/data';
import { FiSearch, FiMapPin, FiCalendar, FiFileText, FiCheckCircle } from 'react-icons/fi';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  priority: string;
}

export default function Home() {
  const router = useRouter();
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => {
        if (data.announcements) {
          setAnnouncements(data.announcements);
        }
      })
      .catch(() => {});
  }, []);

  const handleStartApplication = () => {
    if (fromCountry && toCountry) {
      router.push(`/apply?from=${fromCountry}&to=${toCountry}`);
    } else {
      router.push('/apply');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {announcements.length > 0 && (
        <div className="mt-16 bg-amber-50 border-l-4 border-amber-500 p-4">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-amber-800 font-medium">
              <span className="font-bold">Announcement:</span> {announcements[0].title}
            </p>
          </div>
        </div>
      )}

      <main className="flex-1">
        <section className="bg-gradient-to-r from-[#003366] to-[#004080] text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Apply for Your Visa Online
              </h1>
              <p className="text-xl text-blue-100">
                Simple, secure, and convenient visa application services
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Country You Are Applying From
                  </label>
                  <select
                    className="input-field"
                    value={fromCountry}
                    onChange={(e) => setFromCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Destination Country
                  </label>
                  <select
                    className="input-field"
                    value={toCountry}
                    onChange={(e) => setToCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleStartApplication}
                className="w-full btn-accent text-lg"
              >
                Start Application
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/track" className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiSearch className="text-[#003366] text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#003366]">Track Application</h3>
                </div>
                <p className="text-gray-600">
                  Check the status of your visa application using your reference number
                </p>
              </Link>

              <Link href="/appointments" className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCalendar className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#003366]">Book Appointment</h3>
                </div>
                <p className="text-gray-600">
                  Schedule an appointment at your nearest visa application center
                </p>
              </Link>

              <Link href="/apply" className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiFileText className="text-orange-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#003366]">New Application</h3>
                </div>
                <p className="text-gray-600">
                  Start a new visa application for your travel needs
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#003366] mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visaTypes.slice(0, 8).map((visa) => (
                <div key={visa.code} className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-[#003366] mb-2">
                    {visa.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Apply for {visa.name.toLowerCase()} and start your journey
                  </p>
                  <Link
                    href={`/apply?visaType=${visa.code}`}
                    className="text-[#0066cc] font-medium mt-2 inline-block hover:underline"
                  >
                    Apply Now →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#003366] mb-12">
              Why Choose VFS Global?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#003366] mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600">
                  Industry-leading security measures to protect your personal data
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#003366] mb-2">
                  Global Network
                </h3>
                <p className="text-gray-600">
                  Over 3,000 visa application centers in 140+ countries
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#003366] mb-2">
                  Easy Scheduling
                </h3>
                <p className="text-gray-600">
                  Book appointments online at your convenience
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
