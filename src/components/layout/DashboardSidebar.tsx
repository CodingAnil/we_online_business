'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Building,
  Mail,
  Star,
  Settings,
  LogOut,
  Globe,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Business', href: '/dashboard/business', icon: Building },
    { name: 'Enquiries', href: '/dashboard/enquiries', icon: Mail },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] px-4 py-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
            WeOnline
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            Partner
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/10'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Actions */}
      <div className="mt-auto space-y-1.5 pt-4 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-indigo-500 dark:hover:text-teal-400 transition"
        >
          <Globe className="h-5 w-5" />
          <span>View Public Site</span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
