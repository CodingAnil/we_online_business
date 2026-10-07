'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Menu, Shield, Bell } from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#090d16] text-gray-900 dark:text-gray-150 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar (Drawer overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-200">
          <div className="relative flex w-64 max-w-xs flex-col animate-slide-in">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] px-4 md:px-8 transition-colors duration-200 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500" />
              <span>Admin Console</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
              <Bell className="h-5 w-5" />
            </button>
            <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold text-sm">
                A
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold leading-none text-gray-900 dark:text-white">
                  {session?.user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] font-medium leading-none text-red-400 mt-1">
                  System Admin
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#090d16] p-4 md:p-8 transition-colors duration-200">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
