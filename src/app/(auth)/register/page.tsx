'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/lib/validators/auth.validator';
import api from '@/lib/api';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'business',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post('/api/auth/register', data);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError((err as Error).message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial from-[#1e1b4b]/60 via-[#090d16] to-[#090d16] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500" />

        <div className="text-center">
          <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
            WeOnline
          </Link>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Or{' '}
            <Link
              href="/login"
              className="font-semibold text-indigo-650 dark:text-teal-400 hover:underline"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {success ? (
          <div className="mt-6 flex flex-col items-center justify-center text-center p-6 bg-teal-550/10 border border-teal-500/20 rounded-2xl text-teal-700 dark:text-teal-450 animate-fade-in">
            <CheckCircle2 className="h-10 w-10 text-teal-500 mb-3" />
            <h3 className="font-bold text-lg">Registration Successful!</h3>
            <p className="text-sm mt-1">
              Your account has been created. Redirecting to sign in page...
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mt-6 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="name@example.com"
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-905 dark:text-white">Business</span>
                      <span className="text-[10px] text-gray-400">Manage listings</span>
                    </div>
                    <input
                      type="radio"
                      value="business"
                      {...register('role')}
                      className="h-4 w-4 border-gray-300 text-indigo-650 focus:ring-indigo-500"
                    />
                  </label>
                  <label className="relative flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-905 dark:text-white">Admin</span>
                      <span className="text-[10px] text-gray-400">Manage platform</span>
                    </div>
                    <input
                      type="radio"
                      value="admin"
                      {...register('role')}
                      className="h-4 w-4 border-gray-300 text-indigo-650 focus:ring-indigo-500"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none disabled:opacity-50 transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
