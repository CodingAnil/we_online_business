'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Mail,
  Phone, 
  Clock, 
  MessageSquare, 
  Search, 
  Trash2, 
  Check, 
  ExternalLink, 
  Send, 
  X, 
  Loader2, 
  AlertCircle,
  Building,
  CheckCircle2,
  Inbox
} from 'lucide-react';
import api from '@/lib/api';
import { IEnquiry, EnquiryStatus } from '@/types/enquiry.types';

// Let's define the local populated type since IEnquiry is imported
interface PopulatedBusiness {
  _id: string;
  name: string;
  slug: string;
}

interface LocalPopulatedEnquiry extends Omit<IEnquiry, 'businessId' | 'createdAt' | 'updatedAt'> {
  _id: string;
  businessId: PopulatedBusiness;
  createdAt: string;
  updatedAt: string;
}

export default function EnquiriesDashboardPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<LocalPopulatedEnquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch enquiries
  const { data: enquiriesData, isLoading, isError, error } = useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const response = await api.get('/api/enquiries');
      return response.data.data as LocalPopulatedEnquiry[];
    },
  });

  // Update enquiry mutation (e.g. status)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EnquiryStatus }) => {
      const response = await api.patch(`/api/enquiries/${id}`, { status });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });

  // Delete enquiry mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/enquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      setDeletingId(null);
    },
  });

  // Filtered enquiries
  const filteredEnquiries = useMemo(() => {
    if (!enquiriesData) return [];
    
    return enquiriesData.filter((enq) => {
      const matchesSearch = 
        enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.phone.includes(searchTerm) ||
        enq.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (enq.businessId?.name && enq.businessId.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiriesData, searchTerm, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    if (!enquiriesData) return { total: 0, pending: 0, read: 0, replied: 0 };
    return {
      total: enquiriesData.length,
      pending: enquiriesData.filter(e => e.status === 'pending').length,
      read: enquiriesData.filter(e => e.status === 'read').length,
      replied: enquiriesData.filter(e => e.status === 'replied').length,
    };
  }, [enquiriesData]);

  // Handle Mark as Read
  const handleMarkAsRead = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'read' });
  };

  // Handle Send Reply Simulation
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !replyText.trim()) return;

    try {
      // Simulate reply email sending
      updateStatusMutation.mutate({ id: selectedEnquiry._id, status: 'replied' });
      setReplySuccess(true);
      setTimeout(() => {
        setReplySuccess(false);
        setSelectedEnquiry(null);
        setReplyText('');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Format Date Helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <Inbox className="h-6 w-6 text-indigo-500" />
            Enquiries
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review and respond to messages submitted by users through your public business profiles.
          </p>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Total Received</p>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{stats.total}</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Pending Review</p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/20 p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">Marked as Read</p>
          <p className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">{stats.read}</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Replied To</p>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{stats.replied}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, business..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-slate-50 dark:bg-[#090d16] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {(['all', 'pending', 'read', 'replied'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors duration-150 cursor-pointer ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-[#090d16]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-1/4" />
              <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 text-sm">
          <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
          <h3 className="font-bold">Error loading enquiries</h3>
          <p className="text-xs text-red-400 mt-1">{(error as Error)?.message || 'Something went wrong. Please check your database connection.'}</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl text-center">
          <Inbox className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No enquiries found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
            {searchTerm || statusFilter !== 'all'
              ? 'Try modifying your search query or filters to find what you are looking for.'
              : 'Enquiries submitted by customers on your business page will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6 hover:border-gray-300 dark:hover:border-gray-750 transition duration-200 relative overflow-hidden"
            >
              {/* Badge/Visual indicator on left */}
              <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                enq.status === 'pending'
                  ? 'bg-amber-500'
                  : enq.status === 'read'
                  ? 'bg-teal-500'
                  : 'bg-indigo-500'
              }`} />

              <div className="space-y-3 flex-1 pl-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-bold text-gray-905 dark:text-white">{enq.name}</h3>
                  <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                    enq.status === 'pending'
                      ? 'bg-amber-400/10 text-amber-500 ring-amber-400/20'
                      : enq.status === 'read'
                      ? 'bg-teal-400/10 text-teal-500 ring-teal-400/20'
                      : 'bg-indigo-400/10 text-indigo-500 ring-indigo-400/20'
                  }`}>
                    {enq.status}
                  </span>

                  {/* Business target */}
                  {enq.businessId && (
                    <span className="flex items-center gap-1 text-xs text-gray-400 bg-slate-50 dark:bg-[#090d16] px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-800">
                      <Building className="h-3.5 w-3.5 text-gray-400" />
                      <span>{enq.businessId.name}</span>
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="bg-slate-50 dark:bg-[#090d16] p-4 rounded-2xl border border-gray-150 dark:border-gray-850 flex gap-2">
                  <MessageSquare className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-650 dark:text-gray-350 leading-relaxed italic whitespace-pre-line">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>

                {/* Contact rows */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${enq.email}`} className="hover:underline">{enq.email}</a>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(enq.createdAt)}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0 self-start md:self-center">
                <button
                  onClick={() => setSelectedEnquiry(enq)}
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  Reply
                </button>

                {enq.status === 'pending' && (
                  <button
                    onClick={() => handleMarkAsRead(enq._id)}
                    disabled={updateStatusMutation.isPending}
                    className="px-4 py-2 border border-gray-250 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark Read
                  </button>
                )}

                {deletingId === enq._id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteMutation.mutate(enq._id)}
                      className="px-2 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-500 transition cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="px-2 py-2 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingId(enq._id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition cursor-pointer self-center"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-150 dark:border-gray-850">
              <h3 className="font-bold text-gray-950 dark:text-white text-lg">Reply to {selectedEnquiry.name}</h3>
              <button
                onClick={() => {
                  setSelectedEnquiry(null);
                  setReplyText('');
                }}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Original Message Summary */}
              <div className="bg-slate-50 dark:bg-[#090d16] p-4 rounded-2xl border border-gray-150 dark:border-gray-850 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Original Inquiry Message:</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic whitespace-pre-line">
                  &ldquo;{selectedEnquiry.message}&rdquo;
                </p>
              </div>

              {replySuccess ? (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-700 dark:text-teal-400">
                  <CheckCircle2 className="h-12 w-12 text-teal-500 mb-3 animate-bounce" />
                  <h3 className="font-bold text-base">Reply Sent Successfully!</h3>
                  <p className="text-xs mt-1 text-teal-650/80 dark:text-teal-400/80">
                    Your response has been registered and enquiry status updated.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      Your Email Reply
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write your response to ${selectedEnquiry.name}...`}
                      className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] p-4 text-sm text-gray-950 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={updateStatusMutation.isPending}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-650 hover:bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow transition cursor-pointer disabled:opacity-50"
                    >
                      {updateStatusMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Email Reply</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${selectedEnquiry.email}?subject=Reply to your enquiry at WeOnline&body=Hi ${selectedEnquiry.name},%0D%0A%0D%0A${encodeURIComponent(replyText)}`}
                      onClick={() => {
                        // Mark as replied when user launches local client
                        updateStatusMutation.mutate({ id: selectedEnquiry._id, status: 'replied' });
                        setTimeout(() => setSelectedEnquiry(null), 500);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-850 transition cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open Mail Client</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
