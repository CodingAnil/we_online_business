export default function AdminBusinessesPage() {
  const businesses = [
    {
      id: '1',
      name: 'Elite Gym & CrossFit',
      ownerName: 'Vikram Singh',
      category: 'Gyms',
      city: 'Delhi',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Apex Health Clinic',
      ownerName: 'Dr. Amit Patel',
      category: 'Hospitals',
      city: 'Mumbai',
      status: 'approved',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-905 dark:text-white">
          Manage Businesses
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review, approve, reject, or delete business profiles listed on the platform.
        </p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-slate-50 dark:bg-[#1f2937]/30">
              <tr className="text-left text-xs font-bold text-gray-450 uppercase tracking-wider">
                <th className="px-6 py-4">Business & Category</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-850 text-sm">
              {businesses.map((biz) => (
                <tr key={biz.id} className="text-gray-650 dark:text-gray-350 hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-950 dark:text-white">{biz.name}</p>
                    <p className="text-xs text-indigo-500 font-semibold">{biz.category}</p>
                  </td>
                  <td className="px-6 py-4">{biz.ownerName}</td>
                  <td className="px-6 py-4">{biz.city}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                      biz.status === 'pending'
                        ? 'bg-amber-400/10 text-amber-500 ring-amber-400/20'
                        : 'bg-teal-400/10 text-teal-500 ring-teal-400/20'
                    }`}>
                      {biz.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {biz.status === 'pending' && (
                      <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow transition cursor-pointer">
                        Approve
                      </button>
                    )}
                    <button className="px-3 py-1.5 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-lg text-xs font-semibold transition cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
