'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { FiUsers, FiFileText, FiCalendar, FiCheck, FiX, FiSearch, FiDownload, FiLogOut } from 'react-icons/fi';

interface Application {
  _id: string;
  referenceNumber: string;
  status: string;
  fromCountry: string;
  toCountry: string;
  visaType: string;
  userId: { email: string; firstName: string; lastName: string };
  createdAt: string;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_process: 'bg-yellow-100 text-yellow-800',
  processed: 'bg-green-100 text-green-800',
  ready_for_collection: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusOptions = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_process', label: 'Under Process' },
  { value: 'processed', label: 'Processed' },
  { value: 'ready_for_collection', label: 'Ready for Collection' },
  { value: 'rejected', label: 'Rejected' },
];

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [appsRes, usersRes] = await Promise.all([
        fetch('/api/applications', {
          headers: { Cookie: `token=${token}` },
        }),
        fetch('/api/admin/users', {
          headers: { Cookie: `token=${token}` },
        }),
      ]);

      const appsData = await appsRes.json();
      const usersData = await usersRes.json();

      if (appsData.applications) setApplications(appsData.applications);
      if (usersData.users) setUsers(usersData.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (appId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({ status }),
      });

      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status } : app
      ));
      setSelectedApp(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Reference', 'Status', 'Visa Type', 'From', 'To', 'Email', 'Date'];
    const rows = filteredApplications.map(app => [
      app.referenceNumber,
      app.status,
      app.visaType,
      app.fromCountry,
      app.toCountry,
      app.userId?.email || '',
      new Date(app.createdAt).toLocaleDateString()
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#003366] text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">VFS Global - Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.firstName}</span>
            <Link href="/dashboard" className="hover:underline flex items-center gap-1">
              <FiLogOut /> Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-[#003366] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiFileText /> Applications
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-[#003366] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiUsers /> Users
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === 'applications' && (
              <button
                onClick={exportToCSV}
                className="btn-secondary flex items-center gap-2"
              >
                <FiDownload /> Export CSV
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto"></div>
            </div>
          ) : activeTab === 'applications' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reference</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Applicant</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Visa Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Route</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-[#003366]">
                        {app.referenceNumber}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {app.userId?.firstName} {app.userId?.lastName}
                        <p className="text-xs text-gray-500">{app.userId?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">{app.visaType}</td>
                      <td className="px-4 py-3 text-sm">{app.fromCountry} → {app.toCountry}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || 'bg-gray-100'}`}>
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-[#0066cc] hover:underline text-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{u.firstName} {u.lastName}</td>
                      <td className="px-4 py-3 text-sm">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#003366] mb-4">
              Update Application Status
            </h3>
            <p className="text-gray-600 mb-4">
              Reference: <span className="font-semibold">{selectedApp.referenceNumber}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Current Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedApp.status]}`}>
                {selectedApp.status.replace(/_/g, ' ')}
              </span>
            </p>

            <div className="space-y-2 mb-6">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => updateApplicationStatus(selectedApp._id, status.value)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedApp.status === status.value
                      ? 'bg-[#003366] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedApp(null)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
