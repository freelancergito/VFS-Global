'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiCalendar, FiMapPin, FiClock, FiCheck, FiArrowLeft } from 'react-icons/fi';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

const visaCenters = [
  { id: '1', name: 'VFS Global Visa Application Center', city: 'New York', address: '123 Visa Street, Manhattan' },
  { id: '2', name: 'VFS Global Visa Application Center', city: 'Los Angeles', address: '456 Application Ave, Downtown' },
  { id: '3', name: 'VFS Global Visa Application Center', city: 'Chicago', address: '789 Processing Blvd, Loop' },
  { id: '4', name: 'VFS Global Visa Application Center', city: 'Houston', address: '321 Embassy Row, Galleria' },
  { id: '5', name: 'VFS Global Visa Application Center', city: 'Miami', address: '654 Consulate Way, Brickell' },
  { id: '6', name: 'VFS Global Visa Application Center', city: 'San Francisco', address: '987 Gateway Plaza, Financial District' },
];

interface Application {
  _id: string;
  referenceNumber: string;
  visaType: string;
  status: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<string>('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchApplications();
  }, [user, router]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/applications', {
        headers: { Cookie: `token=${token}` },
      });
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications.filter((a: Application) => a.status === 'submitted'));
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates.slice(0, 14);
  };

  const handleBookAppointment = async () => {
    if (!selectedCenter || !selectedDate || !selectedTime || !selectedApplication) {
      alert('Please select all options');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({
          applicationId: selectedApplication,
          centerId: selectedCenter,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (res.ok) {
        setStep(4);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#0066cc] mb-6 hover:underline">
            <FiArrowLeft /> Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-[#003366] mb-8">Book Appointment</h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step > s ? 'bg-green-500 text-white' : step === s ? 'bg-[#003366] text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s ? <FiCheck /> : s}
                  </div>
                  <span className={`ml-2 hidden sm:block ${step >= s ? 'text-[#003366]' : 'text-gray-500'}`}>
                    {s === 1 ? 'Application' : s === 2 ? 'Center & Date' : 'Time & Confirm'}
                  </span>
                  {s < 3 && <div className={`w-12 sm:w-20 h-1 mx-2 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003366] mb-4">Select Application</h2>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No submitted applications found</p>
                    <Link href="/apply" className="btn-primary inline-block">
                      Start New Application
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.map((app) => (
                      <div
                        key={app._id}
                        onClick={() => setSelectedApplication(app._id)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedApplication === app._id
                            ? 'border-[#003366] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked={selectedApplication === app._id}
                            onChange={() => setSelectedApplication(app._id)}
                            className="w-4 h-4 text-[#003366]"
                          />
                          <div>
                            <p className="font-semibold">{app.visaType} Visa</p>
                            <p className="text-sm text-gray-500">Ref: {app.referenceNumber}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedApplication}
                  className="w-full btn-primary mt-6 disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003366] mb-4">Select Visa Application Center</h2>
                <div className="space-y-3 mb-6">
                  {visaCenters.map((center) => (
                    <div
                      key={center.id}
                      onClick={() => setSelectedCenter(center.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCenter === center.id
                          ? 'border-[#003366] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          checked={selectedCenter === center.id}
                          onChange={() => setSelectedCenter(center.id)}
                          className="mt-1"
                        />
                        <div>
                          <p className="font-semibold">{center.name}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <FiMapPin /> {center.city}
                          </p>
                          <p className="text-sm text-gray-500">{center.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-[#003366] mb-4">Select Date</h2>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
                  {generateDates().map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-2 rounded-lg text-center text-sm transition-all ${
                        selectedDate === date
                          ? 'bg-[#003366] text-white'
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedCenter || !selectedDate}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003366] mb-4">Select Time Slot</h2>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg text-center text-sm transition-all ${
                        selectedTime === time
                          ? 'bg-[#003366] text-white'
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-[#003366] mb-2">Appointment Summary</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Date:</span> {selectedDate}</p>
                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                    <p><span className="font-medium">Center:</span> {visaCenters.find(c => c.id === selectedCenter)?.name}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                    Back
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={!selectedTime || loading}
                    className="btn-accent flex-1 disabled:opacity-50"
                  >
                    {loading ? 'Booking...' : 'Confirm Appointment'}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheck className="text-green-600 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-[#003366] mb-4">
                  Appointment Booked Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  A confirmation email has been sent to your registered email address.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-sm mx-auto">
                  <p className="font-semibold mb-2">Appointment Details</p>
                  <p className="text-sm">📅 {selectedDate}</p>
                  <p className="text-sm">🕒 {selectedTime}</p>
                  <p className="text-sm">📍 {visaCenters.find(c => c.id === selectedCenter)?.name}, {visaCenters.find(c => c.id === selectedCenter)?.city}</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                  <button onClick={() => { setStep(1); setSelectedApplication(''); setSelectedCenter(''); setSelectedDate(''); setSelectedTime(''); }} className="btn-secondary">
                    Book Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
