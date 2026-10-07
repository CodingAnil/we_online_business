'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryInput } from '@/lib/validators/enquiry.validator';
import api from '@/lib/api';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface SearchEnquiryWidgetProps {
  businessId?: string;
  categoryName?: string;
  cityName?: string;
}

export default function SearchEnquiryWidget({ businessId, categoryName = 'Services', cityName = 'your area' }: SearchEnquiryWidgetProps) {
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
    if (!businessId) {
      setError('Please select a business listing to send the enquiry.');
      return;
    }
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
      <div className="flex flex-col items-center justify-center text-center p-8 bg-teal-500/10 border border-teal-500/20 rounded-3xl text-teal-700 dark:text-teal-400">
        <CheckCircle2 className="h-12 w-12 text-teal-500 mb-3 animate-bounce" />
        <h3 className="font-extrabold text-lg">Enquiry Sent!</h3>
        <p className="text-xs mt-2 text-teal-650/80 dark:text-teal-450/80">
          Your request was sent to the provider. They will get back to you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-xs font-bold underline hover:text-teal-600 cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-650" />
      <div>
        <h3 className="font-bold text-gray-950 dark:text-white text-md">
          Quick Connect
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Send your details to connect with {categoryName} in {cityName}.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!businessId ? (
        <p className="text-xs text-amber-500 bg-amber-500/10 p-4 border border-amber-550/20 rounded-2xl">
          Select or view a business profile to connect directly.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Your Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. John Doe"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-xs text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="e.g. 9876543210"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-xs text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.phone && (
              <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. john@example.com"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-xs text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Describe Requirement
            </label>
            <textarea
              rows={3}
              {...register('message')}
              placeholder="What are you looking for?"
              className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-xs text-gray-950 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-650 px-4 py-3 text-xs font-bold text-white shadow hover:bg-indigo-650 focus:outline-none disabled:opacity-50 transition cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
