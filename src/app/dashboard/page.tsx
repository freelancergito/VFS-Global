'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiFileText, FiCalendar, FiClock, FiPlus, FiCheck, FiX } from 'react-icons/fi';

interface Application {
  _id: string;
  referenceNumber: string;
  status: string;
  fromCountry: string;
  toCountry: string;
  visaType: string;
  createdAt: string;
}

interface Appointment {
  _id: string;
  applicationId: { referenceNumber: string; visaType: string };
  centerId: { name: string; city: string };
  date: string;
  time: string;
  status: string;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_process: 'bg-yellow-100 text-yellow-800',
  processed: 'bg-green-100 text-green-800',
  ready_for_collection: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [appsRes, apptsRes] = await Promise.all([
        fetch('/api/applications', {
          headers: { Cookie: `token=${token}` },
        }),
        fetch('/api/appointments', {
          headers: { Cookie: `token=${token}` },
        }),
      ]);

      const appsData = await appsRes.json();
      const apptsData = await apptsRes.json();

      if (appsData.applications) {
        setApplications(appsData.applications);
      }
      if (apptsData.appointments) {
        setAppointments(apptsData.appointments);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#003366]">
              Welcome, {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 mt-2">Manage your visa applications and appointments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Link href="/apply" className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center">
                  <FiPlus className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">New Application</h3>
                  <p className="text-sm text-gray-600">Start a new visa application</p>
                </div>
              </div>
            </Link>

            <Link href="/appointments" className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FiCalendar className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule your visit</p>
                </div>
              </div>
            </Link>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FiFileText className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">{applications.length}</h3>
                  <p className="text-sm text-gray-600">Total Applications</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <FiClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">{appointments.filter(a => a.status === 'scheduled').length}</h3>
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#003366]">My Applications</h2>
                <Link href="/apply" className="text-[#0066cc] font-medium hover:underline">
                  View All
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <FiFileText className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500">No applications yet</p>
                  <Link href="/apply" className="btn-primary inline-block mt-4">
                    Start Application
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-[#003366]">{app.visaType} Visa</p>
                          <p className="text-sm text-gray-500">
                            {app.fromCountry} → {app.toCountry}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                          {app.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">Ref: {app.referenceNumber}</span>
                        <Link href={`/apply/${app._id}`} className="text-[#0066cc] text-sm font-medium hover:underline">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#003366]">My Appointments</h2>
                <Link href="/appointments" className="text-[#0066cc] font-medium hover:underline">
                  View All
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <FiCalendar className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500">No appointments yet</p>
                  <Link href="/appointments" className="btn-primary inline-block mt-4">
                    Book Appointment
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.slice(0, 5).map((appt) => (
                    <div key={appt._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-[#003366]">
                            {appt.applicationId?.visaType || 'Visa'} Application
                          </p>
                          <p className="text-sm text-gray-500">
                            {appt.centerId?.name}, {appt.centerId?.city}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appt.status] || 'bg-gray-100 text-gray-800'}`}>
                          {appt.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span>📅 {appt.date}</span>
                        <span>🕒 {appt.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
