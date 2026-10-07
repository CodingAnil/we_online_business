import { dbConnect } from '@/lib/mongodb';
import Business from '@/models/Business';
import Category from '@/models/Category';
import City from '@/models/City';
import SearchCard from '@/components/search/SearchCard';
import SearchEnquiryWidget from '@/components/search/SearchEnquiryWidget';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    category?: string;
  }>;
}

export const revalidate = 0; // Disable server-side caching to support search querying

export default async function SearchPage({ searchParams }: PageProps) {
  await dbConnect();
  const { q = '', location = '', category = '' } = await searchParams;

  // 1. Build Query Object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryObj: any = { status: 'approved' };
  
  if (q) {
    queryObj.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let selectedCategory: any = null;
  if (category) {
    selectedCategory = await Category.findOne({ slug: category });
    if (selectedCategory) {
      queryObj.categoryId = selectedCategory._id;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let selectedCity: any = null;
  if (location) {
    selectedCity = await City.findOne({ name: { $regex: location, $options: 'i' } });
    if (selectedCity) {
      queryObj.cityId = selectedCity._id;
    } else {
      // Fallback: search address for locality
      queryObj.address = { $regex: location, $options: 'i' };
    }
  }

  // 2. Fetch Businesses
  const rawBusinesses = await Business.find(queryObj)
    .populate('categoryId', 'name slug')
    .populate('cityId', 'name slug')
    .exec();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const businesses = rawBusinesses.map((biz: any) => ({
    id: biz._id.toString(),
    name: biz.name,
    slug: biz.slug,
    category: biz.categoryId?.name || 'General',
    city: biz.cityId?.name || 'Local',
    address: biz.address,
    phone: biz.phone,
    website: biz.website || '',
    rating: biz.rating || 0,
    reviews: biz.totalReviews || 0,
    image: biz.logo || biz.coverImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  }));

  // 3. Fetch categories and cities for Sidebar Filters
  const allCategories = await Category.find({ status: 'active' }).limit(10);
  const allCities = await City.find({ status: 'active' }).limit(10);

  // 4. Generate local locality/area chips based on selected city (simulate neighborhood zones)
  const areas = selectedCity
    ? [`Sector 15, ${selectedCity.name}`, `Sector 21, ${selectedCity.name}`, `Phase 1, ${selectedCity.name}`, `Central Market, ${selectedCity.name}`]
    : ['All Localities', 'Manimajra', 'Sector 27', 'Sector 24', 'Mohali', 'Zirakpur'];

  const categoryHeadline = selectedCategory?.name || q || 'Businesses';
  const locationHeadline = selectedCity?.name || location || 'India';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Search Header Info */}
      <div className="border-b border-gray-250 dark:border-gray-800 pb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Best {categoryHeadline} in {locationHeadline}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {businesses.length} matching {businesses.length === 1 ? 'business' : 'businesses'} based on your filters.
        </p>
      </div>

      {/* Top Location Selection chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-100 dark:border-gray-900">
        <span className="text-xs font-bold text-gray-400 shrink-0 uppercase tracking-wider mr-2">Locality:</span>
        <button className="px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-500 text-white shrink-0">
          Auto Detect My Location
        </button>
        {areas.map((area, idx) => (
          <button
            key={idx}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 dark:bg-[#111827] dark:hover:bg-slate-800 text-gray-650 dark:text-gray-300 border border-gray-200 dark:border-gray-800 shrink-0 transition"
          >
            {area}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters - Sidebar */}
        <div className="hidden lg:block space-y-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl h-fit">
          <div>
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              Category
            </h3>
            <div className="mt-3 space-y-2.5">
              {allCategories.map((cat) => {
                const params = new URLSearchParams();
                if (q) params.set('q', q);
                if (location) params.set('location', location);
                params.set('category', cat.slug);
                const active = category === cat.slug;
                
                return (
                  <Link
                    key={cat.slug}
                    href={`/search?${params.toString()}`}
                    className={`block text-xs font-bold transition ${
                      active ? 'text-indigo-550' : 'text-gray-650 dark:text-gray-400 hover:text-indigo-500'
                    }`}
                  >
                    {active ? '● ' : ''}{cat.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-850" />

          <div>
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              City / Location
            </h3>
            <div className="mt-3 space-y-2.5">
              {allCities.map((city) => {
                const params = new URLSearchParams();
                if (q) params.set('q', q);
                if (category) params.set('category', category);
                params.set('location', city.name);
                const active = location.toLowerCase() === city.name.toLowerCase();

                return (
                  <Link
                    key={city.slug}
                    href={`/search?${params.toString()}`}
                    className={`block text-xs font-bold transition ${
                      active ? 'text-indigo-550' : 'text-gray-650 dark:text-gray-400 hover:text-indigo-500'
                    }`}
                  >
                    {active ? '📍 ' : ''}{city.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-850" />

          {/* Reset Filters */}
          <Link
            href="/search"
            className="block text-center text-xs font-bold text-red-500 hover:underline pt-2"
          >
            Clear All Filters
          </Link>
        </div>

        {/* Results grid (3 cols in desktop) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Listings column (2 cols wide) */}
          <div className="md:col-span-2 space-y-6">
            {businesses.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl">
                <p className="text-sm font-bold text-gray-900 dark:text-white">No listings match your search criteria</p>
                <p className="text-xs text-gray-400 mt-1">Try expanding your search query or removing filters.</p>
                <Link
                  href="/search"
                  className="mt-4 inline-flex px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition"
                >
                  View All Listings
                </Link>
              </div>
            ) : (
              businesses.map((business) => (
                <SearchCard key={business.id} business={business} />
              ))
            )}
          </div>

          {/* Enquiry Widget column (1 col wide, sticky) */}
          <div className="sticky top-20">
            <SearchEnquiryWidget
              businessId={businesses[0]?.id}
              categoryName={selectedCategory?.name}
              cityName={selectedCity?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
