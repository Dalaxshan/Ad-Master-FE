'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SlidersHorizontal, Grid2X2, List, X, ChevronDown } from 'lucide-react';
import { ads } from '@/data/ads';
import { categories, districts } from '@/data/categories';
import AdCard from '@/components/website/AdCard';

export default function SearchSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const districtParam = searchParams.get('district') || '';
  const categoryParam = searchParams.get('category') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedDistrict, setSelectedDistrict] = useState(districtParam);
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...ads];
    if (query) result = result.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.description.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory) result = result.filter(a => a.category === selectedCategory || a.category?.toLowerCase() === selectedCategory.toLowerCase());
    if (subcategoryParam) result = result.filter(a => a.subcategory?.toLowerCase() === subcategoryParam.toLowerCase());
    if (selectedDistrict && selectedDistrict !== 'All Sri Lanka') result = result.filter(a => a.district === selectedDistrict);
    if (minPrice) result = result.filter(a => a.price !== null && a.price >= Number(minPrice));
    if (maxPrice) result = result.filter(a => a.price !== null && a.price <= Number(maxPrice));
    if (sortBy === 'price-asc') result.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === 'price-desc') result.sort((a, b) => (b.price || 0) - (a.price || 0));
    return result;
  }, [query, selectedCategory, selectedDistrict, sortBy, minPrice, maxPrice, subcategoryParam]);

  const activeFilters = [
    selectedCategory && { label: selectedCategory, clear: () => setSelectedCategory('') },
    selectedDistrict && selectedDistrict !== 'All Sri Lanka' && { label: selectedDistrict, clear: () => setSelectedDistrict('') },
    minPrice && { label: `Min Rs.${Number(minPrice).toLocaleString()}`, clear: () => setMinPrice('') },
    maxPrice && { label: `Max Rs.${Number(maxPrice).toLocaleString()}`, clear: () => setMaxPrice('') },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Results for "${query}"` : subcategoryParam || selectedCategory || categoryParam || 'All Ads'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} ads found{selectedDistrict && selectedDistrict !== 'All Sri Lanka' ? ` in ${selectedDistrict}` : ' in Sri Lanka'}</p>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map(f => (
              <span key={f.label} className="flex items-center gap-1.5 bg-blue-50 text-[#1a237e] border border-blue-200 text-sm px-3 py-1 rounded-full font-medium">
                {f.label}
                <button onClick={f.clear} className="hover:text-red-500 transition-colors"><X size={14} /></button>
              </span>
            ))}
            <button
              onClick={() => { setSelectedCategory(''); setSelectedDistrict(''); setMinPrice(''); setMaxPrice(''); }}
              className="text-sm text-red-500 hover:underline px-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden sticky top-4">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {activeFilters.length > 0 && (
                  <button onClick={() => { setSelectedCategory(''); setSelectedDistrict(''); setMinPrice(''); setMaxPrice(''); }} className="text-xs text-red-500 hover:underline">
                    Clear All
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="p-4 border-b border-gray-50">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${!selectedCategory ? 'bg-blue-50 text-[#1a237e] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${selectedCategory === cat.name ? 'bg-blue-50 text-[#1a237e] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span className="flex items-center gap-2">{cat.icon} {cat.name}</span>
                      <span className="text-xs text-gray-400">{cat.count.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* District */}
              <div className="p-4 border-b border-gray-50">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">District</h4>
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#1a237e]"
                >
                  {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>

              {/* Price */}
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range (Rs.)</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1a237e]"
                  />
                  <span className="text-gray-400 text-sm">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1a237e]"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 bg-white border border-gray-100 rounded-xl px-4 py-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1a237e] transition-colors"
              >
                <SlidersHorizontal size={16} /> Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span className="hidden sm:block">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a237e] appearance-none cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </div>
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
            </div>

            {/* Ads */}
            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No ads found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
                <Link href="/" className="bg-[#1a237e] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#283593] transition-colors text-sm">
                  Back to Home
                </Link>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map(ad => <AdCard key={ad.id} ad={ad} layout="grid" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(ad => <AdCard key={ad.id} ad={ad} layout="list" />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
