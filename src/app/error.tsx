'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-radial from-[#1e1b4b] via-[#090d16] to-[#090d16] px-6 text-center select-none text-white">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-4 ring-red-500/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12 animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-red-400 via-rose-500 to-amber-500 bg-clip-text text-transparent">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-md text-base text-gray-400">
        An unexpected error occurred in our system. We have logged this issue and our team is investigating.
      </p>

      {error.digest && (
        <div className="mt-2 text-xs font-mono text-gray-500 bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800">
          ID: {error.digest}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 hover:scale-102 hover:shadow-indigo-500/25 active:scale-98 cursor-pointer"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-900/40 px-6 py-3 text-sm font-semibold text-gray-300 transition duration-200 hover:bg-gray-800 hover:text-white hover:scale-102 active:scale-98"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
