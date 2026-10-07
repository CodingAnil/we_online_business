'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SettingsDashboardPage() {
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (_data: unknown) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-905 dark:text-white">
          Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences, password settings, and notifications.
        </p>
      </div>

      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 max-w-md">
            <h3 className="text-base font-bold text-gray-950 dark:text-white border-b border-gray-100 dark:border-gray-850 pb-2">
              Change Password
            </h3>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Current Password
              </label>
              <input
                type="password"
                {...register('currentPassword')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                New Password
              </label>
              <input
                type="password"
                {...register('newPassword')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-955 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
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
                  <span>Saving settings...</span>
                </>
              ) : (
                <span>Change Password</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
