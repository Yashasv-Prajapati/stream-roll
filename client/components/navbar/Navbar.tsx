'use client'
import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon } from 'lucide-react';

interface NavbarProps{
  currentPath: string;
  isAuthenticated: boolean;
}

const Navbar = ({ currentPath, isAuthenticated }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Stream-Roll</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-white text-lg hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link href="/upload" className="text-white text-lg hover:text-gray-300 transition duration-300">
            Upload
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/share" className="text-white text-lg hover:text-gray-300 transition duration-300">
                Share
              </Link>
              <Link href="/profile" className="text-white text-lg hover:text-gray-300 transition duration-300">
                Profile
              </Link>
              <button className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && currentPath !== '/login' && (
            <Link href="/login" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Login
            </Link>
          )}
          {!isAuthenticated && currentPath !== '/signup' && (
            <Link href="/signup" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Sign Up
            </Link>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex text-center flex-col space-y-2 mt-4">
          <Link href="/" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/upload" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
            Upload
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/share" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Share
              </Link>
              <Link href="/profile" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <button className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && currentPath !== '/login' && (
            <Link href="/login" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
          {!isAuthenticated && currentPath !== '/signup' && (
            <Link href="/signup" className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
