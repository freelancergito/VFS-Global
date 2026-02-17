'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#003366] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-[#003366] font-bold text-xl">VFS Global</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/track" className="text-gray-700 hover:text-[#003366] font-medium">
              Track Application
            </Link>
            <Link href="/centers" className="text-gray-700 hover:text-[#003366] font-medium">
              Visa Centers
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-[#003366] font-medium flex items-center gap-2"
                >
                  <FiUser />
                  {user.firstName}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-[#003366] font-medium flex items-center gap-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#003366] font-medium"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/track"
                className="text-gray-700 hover:text-[#003366] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Application
              </Link>
              <Link
                href="/centers"
                className="text-gray-700 hover:text-[#003366] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Visa Centers
              </Link>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-[#003366] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-[#003366] font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-[#003366] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
