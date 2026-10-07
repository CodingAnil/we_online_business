'use client';

import { useState } from 'react';
import { MapPin, Phone, Globe, Star, Check } from 'lucide-react';
import Link from 'next/link';

interface SearchCardProps {
  business: {
    id: string;
    name: string;
    slug: string;
    category: string;
    address: string;
    phone: string;
    website: string;
    rating: number;
    reviews: number;
    image: string;
  };
}

export default function SearchCard({ business }: SearchCardProps) {
  const [showNumber, setShowNumber] = useState(false);

  // Generate functional tags based on category
  const getTags = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('dentist')) {
      return ['Laser Dentists', 'Dental Cleanings', 'Teeth Whitening', 'Tooth Extractions'];
    }
    if (cat.includes('dev') || cat.includes('software') || cat.includes('web')) {
      return ['Web Development', 'Mobile Apps', 'React / Next.js', 'SEO Optimization'];
    }
    if (cat.includes('restaurant') || cat.includes('food')) {
      return ['Dine-in', 'Home Delivery', 'Multi-cuisine', 'Vegetarian Options'];
    }
    if (cat.includes('hospital') || cat.includes('health') || cat.includes('clinic')) {
      return ['Emergency Care', 'Pharmacy', 'Specialist Doctors', 'Modern Diagnostics'];
    }
    return ['Verified Service', 'Top Rated', 'Customer Support', 'Quick Service'];
  };

  const tags = getTags(business.category);

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-xl transition duration-300">
      {/* Left side Image slider/preview */}
      <div className="relative w-full md:w-64 h-48 md:h-auto bg-gray-100 dark:bg-gray-850 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 left-4 rounded-lg bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
          {business.category}
        </div>
      </div>

      {/* Details section */}
      <div className="flex flex-col flex-1 p-6 justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/business/${business.slug}`}>
              <h3 className="text-xl font-bold text-gray-950 dark:text-white hover:text-indigo-500 transition leading-snug">
                {business.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 shrink-0 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-500/10">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>{business.rating}</span>
              <span className="text-[10px] text-gray-400 font-normal">
                ({business.reviews})
              </span>
            </div>
          </div>

          <p className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 shrink-0 text-gray-450 mt-0.5" />
            <span>{business.address}</span>
          </p>

          {/* Timing details */}
          <p className="text-[11px] text-gray-400 font-medium">
            Open: 9:00 AM - 9:00 PM <span className="text-slate-500">•</span> Mon to Sat
          </p>

          {/* Checklist tags */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
            {tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-450">
                <Check className="h-3.5 w-3.5 shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-850">
          <button
            onClick={() => setShowNumber(!showNumber)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-100 transition duration-200 cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{showNumber ? business.phone : 'Show Number'}</span>
          </button>

          <Link
            href={`/business/${business.slug}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow shadow-indigo-600/10 transition duration-200"
          >
            <span>Book Now / Enquire</span>
          </Link>

          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-indigo-500 dark:hover:text-teal-400 transition"
              title="Visit Website"
            >
              <Globe className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
