"use client";

import Link from 'next/link';
import { ChevronRight, Grid2X2, List } from 'lucide-react';
import { useState } from 'react';
import { ads } from '../../data/ads';
import AdCard from './AdCard';

export default function CategorySection() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const categoryAds = ads;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#1a237e]">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">All Ads</span>
        </nav>

        {/* All Ads header */}
        <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] border rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">📢</span>
            <div>
              <h1 className="text-2xl font-bold text-white">All Ads</h1>
              <p className="text-sm text-gray-200 mt-1">{categoryAds.length.toLocaleString()} ads available</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 bg-white border border-gray-100 rounded-xl px-4 py-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{categoryAds.length}</span> ads
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

        {/* Ads grid */}
        {categoryAds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📭</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No ads found</h3>
            <p className="text-gray-500">There are currently no ads available.</p>
          </div>
        ) : layout === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoryAds.map(ad => <AdCard key={ad.id} ad={ad} layout="grid" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {categoryAds.map(ad => <AdCard key={ad.id} ad={ad} layout="list" />)}
          </div>
        )}
      </div>
    </div>
  );
}
