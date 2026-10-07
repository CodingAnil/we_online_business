'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Restaurants', slug: 'restaurants', icon: '🍽️', count: 154 },
    { id: '2', name: 'Hospitals', slug: 'hospitals', icon: '🏥', count: 82 },
    { id: '3', name: 'Education', slug: 'education', icon: '🎓', count: 120 },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('✨');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: String(categories.length + 1),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      icon: newCatIcon,
      count: 0,
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatIcon('✨');
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-905 dark:text-white">
            Categories Directory
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create, update, or remove business categorization labels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category List */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Icon</th>
                  <th className="pb-3">Category Name</th>
                  <th className="pb-3">Slug</th>
                  <th className="pb-3">Count</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850 text-sm">
                {categories.map((cat) => (
                  <tr key={cat.id} className="text-gray-650 dark:text-gray-350">
                    <td className="py-3.5 text-2xl">{cat.icon}</td>
                    <td className="py-3.5 font-bold text-gray-900 dark:text-white">{cat.name}</td>
                    <td className="py-3.5 font-mono text-xs">{cat.slug}</td>
                    <td className="py-3.5 text-xs font-semibold">{cat.count} listings</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(cat.id)}
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

        {/* Add Category Form */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm self-start">
          <h3 className="font-bold text-gray-950 dark:text-white text-md border-b border-gray-100 dark:border-gray-850 pb-4">
            Add New Category
          </h3>
          <form onSubmit={handleAddCategory} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Category Name
              </label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Dentists"
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Icon Emoji / Class
              </label>
              <input
                type="text"
                value={newCatIcon}
                onChange={(e) => setNewCatIcon(e.target.value)}
                placeholder="e.g. 🦷"
                className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-955 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-650 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 transition cursor-pointer"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Create Category</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
