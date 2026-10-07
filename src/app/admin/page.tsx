import { Building2, Tags, MapPin, Users, Mail, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardIndexPage() {
  const stats = [
    { name: 'Total Users', value: '342', icon: Users, color: 'text-indigo-500 bg-indigo-500/10' },
    { name: 'Total Businesses', value: '184', icon: Building2, color: 'text-purple-500 bg-purple-500/10' },
    { name: 'Categories', value: '24', icon: Tags, color: 'text-teal-500 bg-teal-500/10' },
    { name: 'Pending Reviews', value: '15', icon: CheckSquare, color: 'text-amber-500 bg-amber-500/10' },
  ];

  const recentListings = [
    { id: '1', name: 'Elite Gym & CrossFit', owner: 'Vikram Singh', category: 'Gyms', date: '3 hours ago', status: 'pending' },
    { id: '2', name: 'Apex Health Clinic', owner: 'Dr. Amit Patel', category: 'Hospitals', date: '5 hours ago', status: 'approved' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Admin Dashboard
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review metrics, approve business requests, and manage content across the platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.name}</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main section grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listings column */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-4">
            <h3 className="font-bold text-gray-950 dark:text-white text-md">Recent Business Signups</h3>
            <Link href="/admin/businesses" className="text-xs text-indigo-500 font-bold hover:underline">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Business</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850 text-sm">
                {recentListings.map((list) => (
                  <tr key={list.id} className="text-gray-650 dark:text-gray-350">
                    <td className="py-3.5 font-semibold text-gray-900 dark:text-white">{list.name}</td>
                    <td className="py-3.5">{list.owner}</td>
                    <td className="py-3.5 text-xs font-medium">{list.category}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        list.status === 'pending'
                          ? 'bg-amber-400/10 text-amber-500 ring-amber-400/20'
                          : 'bg-teal-400/10 text-teal-500 ring-teal-400/20'
                      }`}>
                        {list.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shortcuts / Actions */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-950 dark:text-white text-md border-b border-gray-100 dark:border-gray-850 pb-4">
            Quick Tasks
          </h3>
          <div className="space-y-2">
            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-gray-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-semibold text-gray-700 dark:text-gray-300 transition duration-150"
            >
              <span>Manage Categories</span>
              <Tags className="h-4 w-4 text-gray-400" />
            </Link>
            <Link
              href="/admin/cities"
              className="flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-gray-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-semibold text-gray-700 dark:text-gray-300 transition duration-150"
            >
              <span>Manage Cities</span>
              <MapPin className="h-4 w-4 text-gray-400" />
            </Link>
            <Link
              href="/admin/cms"
              className="flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-gray-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-semibold text-gray-700 dark:text-gray-300 transition duration-150"
            >
              <span>Edit CMS Pages</span>
              <Building2 className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
