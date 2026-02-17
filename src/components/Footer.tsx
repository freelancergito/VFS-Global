'use client';

import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">VFS Global</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for visa application services. We provide
              efficient and reliable visa processing solutions for individuals
              and businesses worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-400 hover:text-white text-sm">
                  Track Application
                </Link>
              </li>
              <li>
                <Link href="/centers" className="text-gray-400 hover:text-white text-sm">
                  Visa Centers
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white text-sm">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white text-sm">
                  Tourist Visa
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white text-sm">
                  Business Visa
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white text-sm">
                  Student Visa
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white text-sm">
                  Work Visa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiPhone />
                +1-800-VFS-GLOBAL
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMail />
                info@vfsglobalservices.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMapPin />
                Global Headquarters, Switzerland
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} VFS Global Services. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
