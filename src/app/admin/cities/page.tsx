'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminCitiesPage() {
  const [cities, setCities] = useState([
    { id: '1', name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', count: 420 },
    { id: '2', name: 'Delhi', slug: 'delhi', state: 'Delhi', count: 310 },
    { id: '3', name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', count: 280 },
  ]);

  const [newCityName, setNewCityName] = useState('');
  const [newCityState, setNewCityState] = useState('');

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName || !newCityState) return;
    const newCity = {
      id: String(cities.length + 1),
      name: newCityName,
      slug: newCityName.toLowerCase().replace(/\s+/g, '-'),
      state: newCityState,
      count: 0,
    };
    setCities([...cities, newCity]);
    setNewCityName('');
    setNewCityState('');
  };

  const handleDelete = (id: string) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-905 dark:text-white">
          Cities Directory
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review or configure target cities and regions supported by the search engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* City List */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">City Name</th>
                  <th className="pb-3">Slug</th>
                  <th className="pb-3">State</th>
                  <th className="pb-3">Count</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850 text-sm">
                {cities.map((city) => (
                  <tr key={city.id} className="text-gray-650 dark:text-gray-350">
                    <td className="py-3.5 font-bold text-gray-900 dark:text-white">{city.name}</td>
                    <td className="py-3.5 font-mono text-xs">{city.slug}</td>
                    <td className="py-3.5 font-semibold text-xs">{city.state}</td>
                    <td className="py-3.5 text-xs font-semibold">{city.count} listings</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(city.id)}
                        className="p-1.5 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add City Form */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm self-start">
          <h3 className="font-bold text-gray-950 dark:text-white text-md border-b border-gray-100 dark:border-gray-850 pb-4">
            Add New City
          </h3>
          <form onSubmit={handleAddCity} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                City Name
              </label>
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="e.g. Pune"
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-955 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                State Name
              </label>
              <input
                type="text"
                value={newCityState}
                onChange={(e) => setNewCityState(e.target.value)}
                placeholder="e.g. Maharashtra"
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-955 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-650 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 transition cursor-pointer"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Create City</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
