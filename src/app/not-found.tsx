import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-radial from-[#1e1b4b] via-[#090d16] to-[#090d16] px-6 text-center select-none text-white">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 ring-4 ring-indigo-500/20">
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-500 to-teal-400 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-base text-gray-400">
        Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, deleted, or never existed.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 hover:scale-102 hover:shadow-indigo-500/25 active:scale-98"
        >
          Go Back Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-900/40 px-6 py-3 text-sm font-semibold text-gray-300 transition duration-200 hover:bg-gray-800 hover:text-white hover:scale-102 active:scale-98"
        >
          Search Businesses
        </Link>
      </div>
    </div>
  );
}
