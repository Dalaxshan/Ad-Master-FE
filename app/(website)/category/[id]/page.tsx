'use client';

import { useState } from 'react';
import { ChevronRight, Grid2X2, List } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categories } from '../../../../data/categories';
import { ads } from '../../../../data/ads';
import AdCard from '../../../../components/website/AdCard';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const category = categories.find(c => c.id === id);
  const categoryAds = ads.filter(a => a.category.toLowerCase() === category?.name.toLowerCase());

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Category not found</h2>
          <Link href="/" className="text-[#1a237e] font-semibold hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#1a237e]">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        <div className={`${category.color} border rounded-2xl p-6 mb-8`}>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{category.count.toLocaleString()} ads available</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            {category.subcategories.map(sub => (
              <Link
                key={sub}
                href={`/search?category=${category.name}&subcategory=${sub}`}
                className="bg-white/70 hover:bg-white border border-white/50 text-gray-700 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                {sub}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-5 bg-white border border-gray-100 rounded-xl px-4 py-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{categoryAds.length || ads.length}</span> ads
          </p>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 transition-colors ${layout === 'grid' ? 'bg-[#1a237e] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 transition-colors ${layout === 'list' ? 'bg-[#1a237e] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {layout === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(categoryAds.length ? categoryAds : ads).map(ad => <AdCard key={ad.id} ad={ad} layout="grid" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {(categoryAds.length ? categoryAds : ads).map(ad => <AdCard key={ad.id} ad={ad} layout="list" />)}
          </div>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Other Categories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.filter(c => c.id !== id).map(cat => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="group bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:border-blue-200 transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="text-xs font-semibold text-gray-800 mt-2 group-hover:text-[#1a237e] transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
