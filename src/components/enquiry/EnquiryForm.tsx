'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryInput } from '@/lib/validators/enquiry.validator';
import api from '@/lib/api';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface EnquiryFormProps {
  businessId: string;
}

export default function EnquiryForm({ businessId }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post('/api/enquiries', {
        ...data,
        businessId,
      });
      setSuccess(true);
      reset();
    } catch (err) {
      setError((err as Error).message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-700 dark:text-teal-400">
        <CheckCircle2 className="h-10 w-10 text-teal-500 mb-3 animate-bounce" />
        <h3 className="font-bold text-lg">Enquiry Sent!</h3>
        <p className="text-sm mt-1 text-teal-650/80 dark:text-teal-400/80">
          Your message has been sent successfully. The business owner will get in touch with you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs font-bold underline hover:text-teal-600 cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-teal-500" />
      <h3 className="text-lg font-bold text-gray-950 dark:text-white">Send Enquiry</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Request quotes, schedules, or queries directly from this business.
      </p>

      {error && (
        <div className="mt-4 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
            Phone Number
          </label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="9876543210"
            className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Message
          </label>
          <textarea
            rows={4}
            {...register('message')}
            placeholder="Write your query here..."
            className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none disabled:opacity-50 transition cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Enquiry</span>
          )}
        </button>
      </form>
    </div>
  );
}
