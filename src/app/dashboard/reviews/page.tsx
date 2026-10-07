import { Star, ThumbsUp, ShieldAlert, Clock } from 'lucide-react';

export default function ReviewsDashboardPage() {
  const reviews = [
    {
      id: '1',
      customerName: 'Rahul Sharma',
      rating: 5,
      review: 'Excellent service! The doctors are very professional and patient. The clinic is extremely clean and matches all hygiene protocols.',
      date: 'June 15, 2026',
      status: 'approved',
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      rating: 4,
      review: 'Great facilities. Had to wait a bit despite having an appointment, but the consultation made up for it. Highly recommended.',
      date: 'May 28, 2026',
      status: 'approved',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-905 dark:text-white">
          Reviews & Ratings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Monitor your customer reviews. Approved reviews are displayed publicly on your business profile.
        </p>
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm text-center col-span-1">
          <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Average Rating</p>
          <p className="text-5xl font-extrabold text-gray-900 dark:text-white mt-2">4.8</p>
          <div className="flex justify-center text-amber-500 my-2 text-xl">
            ★★★★★
          </div>
          <p className="text-xs text-gray-450 mt-1">Based on 84 reviews</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm col-span-2 flex flex-col justify-center space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-10">5 Star</span>
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }} />
            </div>
            <span className="text-xs text-gray-400 w-10 text-right">80%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-10">4 Star</span>
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
            </div>
            <span className="text-xs text-gray-400 w-10 text-right">15%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-10">3 Star</span>
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '5%' }} />
            </div>
            <span className="text-xs text-gray-400 w-10 text-right">5%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-4 hover:border-gray-300 transition duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-905 dark:text-white text-base">{rev.customerName}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{rev.date}</span>
                  <span className="h-3 w-px bg-gray-200 dark:bg-gray-800" />
                  <span className="text-teal-500 flex items-center gap-0.5 font-semibold">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{rev.status}</span>
                  </span>
                </div>
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
    </div>
  );
}
