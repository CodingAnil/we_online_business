import { Mail, Star, Eye, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import Business, { IBusinessDocument } from '@/models/Business';
import Enquiry from '@/models/Enquiry';
import { Types } from 'mongoose';

interface PopulatedBusiness {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
}

interface PopulatedEnquiry {
  _id: string | Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: Date;
  businessId: PopulatedBusiness;
}

export default async function DashboardIndexPage() {
  await dbConnect();
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const { id: userId, role } = session.user;

  let businessIds: (string | Types.ObjectId)[] = [];
  let userBusinesses: IBusinessDocument[] = [];

  if (role === 'admin') {
    // Admin sees everything
    userBusinesses = await Business.find();
    businessIds = userBusinesses.map((b) => b._id as string | Types.ObjectId);
  } else {
    // Business owner sees their own
    userBusinesses = await Business.find({ userId });
    businessIds = userBusinesses.map((b) => b._id as string | Types.ObjectId);
  }

  // Fetch counts
  const totalEnquiries = await Enquiry.countDocuments({ businessId: { $in: businessIds } });

  // Fetch recent enquiries
  const recentEnquiriesDoc = await Enquiry.find({ businessId: { $in: businessIds } })
    .populate('businessId', 'name slug')
    .sort({ createdAt: -1 })
    .limit(5);

  const recentEnquiries = (recentEnquiriesDoc as unknown as PopulatedEnquiry[]).map((enq) => {
    const timeDiff = Date.now() - new Date(enq.createdAt).getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(hoursDiff / 24);
    
    let dateStr = '';
    if (hoursDiff < 1) {
      dateStr = 'Just now';
    } else if (hoursDiff < 24) {
      dateStr = `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
    } else {
      dateStr = `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
    }

    return {
      id: enq._id.toString(),
      name: enq.name,
      phone: enq.phone,
      email: enq.email,
      date: dateStr,
      status: enq.status,
    };
  });

  // Calculate rating stats
  let totalReviews = 0;
  let ratingSum = 0;
  let activeBusinessesCount = 0;

  userBusinesses.forEach((b) => {
    totalReviews += b.totalReviews || 0;
    if (b.rating) {
      ratingSum += b.rating;
      activeBusinessesCount++;
    }
  });

  const averageRating = activeBusinessesCount > 0 ? (ratingSum / activeBusinessesCount).toFixed(1) : '0.0';

  const stats = [
    { name: 'Total Enquiries', value: totalEnquiries.toString(), icon: Mail, color: 'text-indigo-500 bg-indigo-500/10' },
    { name: 'Average Rating', value: averageRating, icon: Star, color: 'text-amber-500 bg-amber-500/10' },
    { name: 'Total Reviews', value: totalReviews.toString(), icon: ThumbsUp, color: 'text-teal-500 bg-teal-500/10' },
    { name: 'Profile Views', value: '1,240', icon: Eye, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {session.user.name || 'Partner'}!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here is what is happening with your business profile today.
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

      {/* Tables grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enquiries Column */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-4">
            <h3 className="font-bold text-gray-950 dark:text-white text-md">Recent Enquiries</h3>
            <Link href="/dashboard/enquiries" className="text-xs text-indigo-500 font-bold hover:underline">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            {recentEnquiries.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No recent enquiries found.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Received</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850 text-sm">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="text-gray-650 dark:text-gray-350">
                      <td className="py-3.5 font-semibold text-gray-900 dark:text-white">{enq.name}</td>
                      <td className="py-3.5">
                        <p>{enq.phone}</p>
                        <p className="text-xs text-gray-400">{enq.email}</p>
                      </td>
                      <td className="py-3.5 text-xs">{enq.date}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          enq.status === 'pending'
                            ? 'bg-amber-400/10 text-amber-500 ring-amber-400/20'
                            : enq.status === 'read'
                            ? 'bg-teal-400/10 text-teal-500 ring-teal-400/20'
                            : 'bg-indigo-400/10 text-indigo-500 ring-indigo-400/20'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Business Status */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-955 dark:text-white text-md border-b border-gray-100 dark:border-gray-850 pb-4">
              Profile Strength
            </h3>
            {userBusinesses.length === 0 ? (
              <div>
                <p className="text-sm font-bold text-gray-950 dark:text-white">No Business Profile</p>
                <p className="text-xs text-gray-400 mt-1">Please register your business to start receiving enquiries.</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex items-center justify-center rounded-full border-4 border-indigo-500 font-bold text-indigo-500">
                  85%
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-950 dark:text-white">Almost Complete!</p>
                  <p className="text-xs text-gray-400 mt-1">Add cover images and operating hours to boost engagement.</p>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/dashboard/business"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 py-2.5 text-sm font-semibold hover:bg-indigo-500 hover:text-white transition duration-200"
          >
            {userBusinesses.length === 0 ? 'Register Business' : 'Edit Profile'}
          </Link>
        </div>
      </div>
    </div>
  );
}
