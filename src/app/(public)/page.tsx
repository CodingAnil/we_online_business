import Link from 'next/link';
import { TrendingUp, Award, ThumbsUp, Building } from 'lucide-react';
import { dbConnect } from '@/lib/mongodb';
import Category from '@/models/Category';
import City from '@/models/City';
import Business from '@/models/Business';
import HomeSearchBox from '@/components/search/HomeSearchBox';

export const revalidate = 0; // Disable server caching to ensure it is always up to date

export default async function HomePage() {
  await dbConnect();

  // Fetch real categories, cities, and businesses from DB
  const categories = await Category.find({ status: 'active' }).limit(12);
  const cities = await City.find({ status: 'active' }).limit(8);
  const dbFeatured = await Business.find({ status: 'approved' })
    .populate('categoryId', 'name slug')
    .populate('cityId', 'name slug')
    .limit(6);

  // Map to UI friendly formats
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trendingCategories = categories.map((cat: any) => {
    const iconMap: Record<string, string> = {
      'dentists': '🦷',
      'web-developers': '💻',
      'restaurants': '🍽️',
      'hospitals': '🏥',
      'education': '🎓',
      'gyms': '💪',
      'hotels': '🏨',
    };
    return {
      name: cat.name,
      count: 'Verified listing',
      slug: cat.slug,
      icon: iconMap[cat.slug] || cat.icon || '💼',
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuredListings = dbFeatured.map((biz: any) => ({
    name: biz.name,
    slug: biz.slug,
    category: biz.categoryId?.name || 'General',
    categorySlug: biz.categoryId?.slug || '',
    city: biz.cityId?.name || 'Local',
    rating: biz.rating || 0,
    reviews: biz.totalReviews || 0,
    image: biz.coverImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  }));

  return (
    <div className="relative isolate overflow-hidden">
      {/* Floating Add Business Ribbon */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <Link
          href="/register"
          className="flex items-center gap-1.5 px-3.5 py-6 bg-indigo-650 hover:bg-indigo-500 text-white rounded-l-2xl shadow-2xl transition duration-200 border-l border-y border-indigo-400/20 [writing-mode:vertical-lr] font-extrabold text-xs tracking-widest uppercase hover:-translate-x-1"
        >
          + Add Your Business
        </Link>
      </div>

      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-[#1e1b4b]/80 via-[#090d16] to-[#090d16] py-20 text-white border-b border-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
            <TrendingUp className="h-3 w-3" />
            Discover & Connect Local
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-white via-slate-200 to-teal-400 bg-clip-text text-transparent">
            Search Businesses, Services & <br className="hidden sm:inline" />
            Professionals Near You
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-350">
            Find the best doctors, schools, restaurants, mechanics, and local professionals. Verified ratings and reviews from your neighborhood.
          </p>

          {/* Search box container */}
          <div className="mt-10 mx-auto max-w-4xl rounded-3xl bg-white/5 p-3 backdrop-blur-md border border-white/10 shadow-2xl">
            <HomeSearchBox />
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Popular Categories
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Popular services our users search for daily.
            </p>
          </div>
        </div>

        {trendingCategories.length === 0 ? (
          <div className="mt-8 text-center text-sm text-gray-500">
            No categories found in the database.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {trendingCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#111827] border border-gray-150 dark:border-gray-800 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition duration-300">
                  {category.icon}
                </span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-gray-450 dark:text-gray-500">
                  {category.count}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Businesses */}
      <section className="bg-slate-100/50 dark:bg-gray-950/20 py-16 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Featured Listings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Top rated local businesses you shouldn&apos;t miss.
              </p>
            </div>
            <Link
              href="/search"
              className="text-sm font-semibold text-indigo-600 dark:text-teal-400 hover:text-indigo-500"
            >
              View all
            </Link>
          </div>

          {featuredListings.length === 0 ? (
            <div className="mt-8 text-center text-sm text-gray-500">
              No featured listings found in the database.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((business, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-xl transition duration-300"
                >
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={business.image}
                      alt={business.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4 rounded-lg bg-white/95 dark:bg-gray-900/95 px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-teal-400 border border-transparent shadow">
                      {business.category}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      {business.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <span>{business.city}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-905 dark:text-white">
                          ★ {business.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({business.reviews} reviews)
                        </span>
                      </div>
                      <Link
                        href={`/business/${business.slug}`}
                        className="text-xs font-bold text-indigo-600 dark:text-teal-400 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cities Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Explore by Cities
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Browse verified listings in top Indian cities.
          </p>
        </div>

        {cities.length === 0 ? (
          <div className="mt-8 text-center text-sm text-gray-500">
            No cities found in the database.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {cities.map((city: any) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="flex items-center gap-3 p-4 bg-white dark:bg-[#111827] border border-gray-150 dark:border-gray-800 rounded-2xl hover:shadow-lg transition duration-200"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 text-lg">
                  📍
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{city.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{city.state}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Why Use WeOnline Directory?
          </h2>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
            We make it incredibly simple to find what you need in your locality.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-[#111827]/40 border border-gray-150/80 dark:border-gray-850">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Verified Listings</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Every business undergoes rigorous screening and verification processes before listing.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-[#111827]/40 border border-gray-150/80 dark:border-gray-850">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-550">
              <ThumbsUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Honest Reviews</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Read transparent feedback and comments from actual community customers.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-[#111827]/40 border border-gray-150/80 dark:border-gray-850">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Direct Enquiries</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Send questions or request quotes straight to owners with secure instant notifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
