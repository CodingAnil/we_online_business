import { dbConnect } from '@/lib/mongodb';
import City from '@/models/City';
import Business from '@/models/Business';
import SearchCard from '@/components/search/SearchCard';
import SearchEnquiryWidget from '@/components/search/SearchEnquiryWidget';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    await dbConnect();
  } catch (error) {
    console.error('Failed to load city', error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-905">Listings are temporarily unavailable</h1>
        <Link href="/" className="mt-4 inline-block text-indigo-500 font-bold hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  // Find city first
  const cityDoc = await City.findOne({ slug });
  if (!cityDoc) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-905">City Not Found</h1>
        <Link href="/" className="mt-4 inline-block text-indigo-500 font-bold hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  // Fetch businesses in this city
  const rawBusinesses = await Business.find({ cityId: cityDoc._id, status: 'approved' })
    .populate('categoryId', 'name slug')
    .populate('cityId', 'name slug');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const businesses = rawBusinesses.map((biz: any) => ({
    id: biz._id.toString(),
    name: biz.name,
    slug: biz.slug,
    category: biz.categoryId?.name || 'General',
    city: cityDoc.name,
    address: biz.address,
    phone: biz.phone,
    website: biz.website || '',
    rating: biz.rating || 0,
    reviews: biz.totalReviews || 0,
    image: biz.logo || biz.coverImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header section */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Top Businesses in {cityDoc.name}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Find and review popular services and professionals operating in {cityDoc.name}.
        </p>
      </div>

      {/* Grid split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Listings cards */}
        <div className="md:col-span-2 space-y-6">
          {businesses.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl">
              <p className="text-sm font-bold text-gray-900 dark:text-white">No listings found in {cityDoc.name}</p>
              <p className="text-xs text-gray-405 mt-1">Be the first to list a business here!</p>
              <Link
                href="/register"
                className="mt-4 inline-flex px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition"
              >
                Register Business
              </Link>
            </div>
          ) : (
            businesses.map((business) => (
              <SearchCard key={business.id} business={business} />
            ))
          )}
        </div>

        {/* Right-hand quick connection */}
        <div className="sticky top-20">
          <SearchEnquiryWidget
            businessId={businesses[0]?.id}
            cityName={cityDoc.name}
          />
        </div>
      </div>
    </div>
  );
}
