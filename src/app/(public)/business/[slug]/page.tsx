import { MapPin, Phone, Mail, Globe, Star } from 'lucide-react';
import EnquiryForm from '@/components/enquiry/EnquiryForm';
import { dbConnect } from '@/lib/mongodb';
import Business from '@/models/Business';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function BusinessDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    await dbConnect();
  } catch (error) {
    console.error('Failed to load business', error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-905 dark:text-white">Listings are temporarily unavailable</h1>
        <Link href="/" className="mt-6 inline-block text-indigo-500 font-bold hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  // Fetch business from DB
  const businessDoc = await Business.findOne({ slug })
    .populate('categoryId', 'name slug')
    .populate('cityId', 'name slug');

  if (!businessDoc) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-905 dark:text-white">Business Listing Not Found</h1>
        <p className="text-sm text-gray-400 mt-1">The business you are looking for may have been removed or is pending approval.</p>
        <Link href="/" className="mt-6 inline-block text-indigo-500 font-bold hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  // Populate UI business fields
  const business = {
    id: businessDoc._id.toString(),
    name: businessDoc.name,
    description: businessDoc.description,
    address: businessDoc.address,
    phone: businessDoc.phone,
    email: businessDoc.email,
    website: businessDoc.website || '',
    whatsapp: businessDoc.whatsapp || '',
    rating: businessDoc.rating || 0,
    totalReviews: businessDoc.totalReviews || 0,
    logo: businessDoc.logo || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop&q=80',
    coverImage: businessDoc.coverImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop&q=80',
    gallery: businessDoc.gallery && businessDoc.gallery.length > 0
      ? businessDoc.gallery
      : [
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=300&h=200&fit=crop&q=80',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&h=200&fit=crop&q=80',
          'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=300&h=200&fit=crop&q=80',
        ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category: (businessDoc.categoryId as any)?.name || 'Services',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    city: (businessDoc.cityId as any)?.name || 'Local',
  };

  // Mock reviews matching the rating
  const reviews = [
    {
      customerName: 'Rahul Sharma',
      rating: 5,
      review: 'Excellent service! Extremely professional and patient. The premises match all hygiene protocols.',
      date: 'June 15, 2026',
    },
    {
      customerName: 'Priya Patel',
      rating: 4,
      review: 'Great facilities. Clean environment and friendly staff. Highly recommended.',
      date: 'May 28, 2026',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] transition-colors duration-200">
      {/* Cover Image */}
      <div className="relative h-64 w-full md:h-80 bg-gray-200 dark:bg-gray-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={business.coverImage}
          alt={business.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>

      {/* Profile Header Wrapper */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            {/* Logo */}
            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 overflow-hidden shadow shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={business.logo}
                alt={`${business.name} Logo`}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Info */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase bg-indigo-500/10 text-indigo-550 dark:text-indigo-400 px-2.5 py-1 rounded-md border border-indigo-500/10">
                {business.category}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl leading-tight pt-1">
                {business.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="h-4 w-4 fill-amber-550 text-amber-500 shrink-0" />
                  <span>{business.rating}</span>
                  <span className="text-xs text-gray-400 font-normal">
                    ({business.totalReviews} reviews)
                  </span>
                </span>
                <span className="h-4 w-px bg-gray-200 dark:bg-gray-800" />
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-450" />
                  <span>{business.city}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick contact buttons */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <a
              href={`tel:${business.phone}`}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow shadow-indigo-600/10 transition"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            {business.whatsapp && (
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow shadow-emerald-600/10 transition"
              >
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow">
            <h2 className="text-lg font-bold text-gray-950 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-gray-850 pb-2">
              About Business
            </h2>
            <p className="text-gray-650 dark:text-gray-350 text-sm leading-relaxed whitespace-pre-line">
              {business.description}
            </p>
          </section>

          {/* Image Gallery */}
          <section className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow">
            <h2 className="text-lg font-bold text-gray-950 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-gray-850 pb-2">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {business.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-28 sm:h-36 w-full rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden hover:shadow-lg hover:scale-102 transition duration-200 cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${business.name} Gallery ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow">
            <h2 className="text-lg font-bold text-gray-950 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-gray-850 pb-2">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {reviews.map((rev, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-gray-950 dark:text-white">
                        {rev.customerName}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{rev.date}</p>
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-amber-500 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/10">
                      ★ {rev.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 bg-slate-50 dark:bg-[#090d16] p-4 rounded-2xl border border-gray-150 dark:border-gray-850 leading-relaxed italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow">
            <h3 className="text-md font-bold text-gray-950 dark:text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3.5 text-sm">
                <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-gray-650 dark:text-gray-350">{business.address}</span>
              </div>
              <div className="flex items-center gap-3.5 text-sm">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
                <a href={`tel:${business.phone}`} className="text-gray-650 dark:text-gray-350 hover:underline">
                  {business.phone}
                </a>
              </div>
              <div className="flex items-center gap-3.5 text-sm">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <a href={`mailto:${business.email}`} className="text-gray-650 dark:text-gray-350 hover:underline">
                  {business.email}
                </a>
              </div>
              {business.website && (
                <div className="flex items-center gap-3.5 text-sm">
                  <Globe className="h-5 w-5 text-indigo-500 shrink-0" />
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-650 dark:text-teal-400 hover:underline font-semibold"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="sticky top-20">
            <EnquiryForm businessId={business.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
