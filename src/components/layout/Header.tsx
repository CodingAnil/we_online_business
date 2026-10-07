'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Search, Menu, X, User, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              WeOnline
            </span>
          </Link>

          {/* Desktop Search Button / Preview */}
          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition duration-200 w-64"
          >
            <Search className="h-4 w-4" />
            <span>Search businesses...</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-teal-400 transition"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-teal-400 transition"
          >
            Contact
          </Link>

          <span className="h-4 w-px bg-gray-200 dark:bg-gray-800" />

          {status === 'loading' ? (
            <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link
                href={session.user.role === 'admin' ? '/admin' : '/dashboard'}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-950 dark:text-white transition duration-200"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition duration-200"
              >
                <span>List Your Business</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide bg-rose-500 text-white animate-pulse">Free</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-red-500 transition duration-200 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-teal-400 transition"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition duration-200"
              >
                <span>List Your Business</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide bg-rose-500 text-white animate-pulse">Free</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/search"
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090d16] px-4 py-4 space-y-3">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-150 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-150 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Contact
          </Link>

          <hr className="border-gray-200 dark:border-gray-800 my-2" />

          {session ? (
            <div className="space-y-2">
              <Link
                href={session.user.role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-150 dark:hover:bg-gray-800"
              >
                <LayoutDashboard className="h-5 w-5 text-indigo-500" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-150 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <User className="h-5 w-5 text-gray-400" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-base font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md"
              >
                <span>List Your Business</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide bg-rose-500 text-white animate-pulse">Free</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
