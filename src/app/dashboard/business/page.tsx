'use client';

import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function MyBusinessProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: 'Apex Health Clinic',
      email: 'info@apexhealth.example.com',
      phone: '+91 22 9876 5432',
      whatsapp: '+919876543210',
      website: 'https://apexhealth.example.com',
      address: '45, Link Road, Andheri West, Mumbai, Maharashtra 400053',
      description: 'Apex Health Clinic is a state-of-the-art facility providing high-quality, comprehensive health services...',
    },
  });

  const onSubmit = (_data: unknown) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-905 dark:text-white">
          My Business Profile
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your business information and listings visible to users on the platform.
        </p>
      </div>

      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Business Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                WhatsApp Number
              </label>
              <input
                type="tel"
                {...register('whatsapp')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Website URL
              </label>
              <input
                type="url"
                {...register('website')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Physical Address
              </label>
              <input
                type="text"
                {...register('address')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Business Description
              </label>
              <textarea
                rows={5}
                {...register('description')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-955 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-150 dark:border-gray-850">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-650 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 disabled:opacity-50 transition cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Saving changes...</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
