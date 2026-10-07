import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#090d16] border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                WeOnline
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Connecting customers with trusted local businesses, service providers, and professionals. Explore reviews, make bookings, and request quotes instantly.
            </p>
            <div className="flex space-x-6">
              {/* Social icons can go here */}
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                Explore Directory
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/search?category=restaurants" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="/search?category=hospitals" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Hospitals
                  </Link>
                </li>
                <li>
                  <Link href="/search?category=education" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="/search?category=contractors" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Plumbers & Electricians
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Join as Partner
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-teal-400 transition">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {currentYear} WeOnline Platform. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Designed for local commerce.
          </p>
        </div>
      </div>
    </footer>
  );
}
