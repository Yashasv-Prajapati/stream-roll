"use client";
import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, Search } from "lucide-react";

const NavbarAuthenticated = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
      <div className="md:mx-4 flex justify-between items-center">
        <div className="hidden md:block text-white text-2xl font-bold">
          <Link href="/">Stream-Roll</Link>
        </div>
        <form
          action="/browse"
          method="get"
          className="w-full max-w-lg flex mb-8"
        >
          <input
            type="text"
            name="search"
            placeholder="Search for videos..."
            className="w-full p-2 rounded-l-lg border-none focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-500 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Search
          </button>
        </form>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/upload"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Upload
          </Link>

          <Link
            href="/profile"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Profile
          </Link>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Logout
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex text-center flex-col space-y-2 mt-4">
          <Link
            href="/"
            className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/upload"
            className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Upload
          </Link>
          <Link
            href="/profile"
            className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarAuthenticated;
