'use client';
 
import { useState } from 'react';

import { ChevronRight, TrendingUp, Shield, Zap, Users, Star, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { ads, featuredAds } from '@/data/ads';
import AdCard from './AdCard';
import { categories } from '@/data/categories';

const heroStats = [
  { label: 'Active Ads', value: '120,000+' },
  { label: 'Registered Users', value: '850,000+' },
  { label: 'Categories', value: '50+' },
  { label: 'Daily Visitors', value: '45,000+' },
];

export const Home=()=> {
  const [activeTab, setActiveTab] = useState<'featured' | 'recent'>('featured');

  const displayedAds = activeTab === 'featured' ? featuredAds : ads;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative bg-[#1a237e] overflow-hidden"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/37051984/pexels-photo-37051984.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#1a237e]/85" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-4 py-1.5 text-yellow-300 text-sm font-medium mb-6">
            <Star size={14} fill="currentColor" /> Sri Lanka&apos;s #1 Online Marketplace
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 max-w-3xl mx-auto">
            Buy & Sell Anything<br />
            <span className="text-yellow-400">Across Sri Lanka</span>
          </h1>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            Post ads for free and connect with thousands of buyers and sellers island-wide.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {heroStats.map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-yellow-300 font-bold text-xl">{s.value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/post-ad"
              className="bg-yellow-400 hover:bg-yellow-500 text-[#1a237e] font-bold px-8 py-3.5 rounded-xl transition-colors shadow-xl text-base"
            >
              Post Free Ad
            </Link>
            <Link
              href="/search"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Browse All Ads
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-600">
            {[
              { icon: <Shield size={16} className="text-green-500" />, text: 'Verified Sellers' },
              { icon: <Zap size={16} className="text-yellow-500" />, text: 'Instant Listings' },
              { icon: <Users size={16} className="text-blue-500" />, text: '850K+ Members' },
              { icon: <TrendingUp size={16} className="text-purple-500" />, text: '120K+ Active Ads' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 font-medium">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-gray-500 text-sm mt-1">Find exactly what you&apos;re looking for</p>
            </div>
            <Link href="/categories" className="flex items-center gap-1 text-sm text-[#1a237e] font-semibold hover:underline">
              All Categories <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="group bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.count.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 bg-gradient-to-r from-[#1a237e] to-[#3949ab] rounded-2xl p-6 text-white flex items-center justify-between overflow-hidden relative">
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -right-2 bottom-0 w-24 h-24 bg-yellow-400/10 rounded-full" />
              <div className="relative">
                <span className="bg-yellow-400 text-[#1a237e] text-xs font-bold px-2 py-1 rounded-md mb-3 inline-block">LIMITED OFFER</span>
                <h3 className="text-2xl font-bold mb-1">Boost Your Ads</h3>
                <p className="text-blue-200 text-sm mb-4">Get 3x more visibility with our Premium listings</p>
                <Link href="/pricing" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a237e] font-bold px-5 py-2 rounded-lg text-sm transition-colors inline-flex items-center gap-1">
                  View Plans <ArrowRight size={14} />
                </Link>
              </div>
              <div className="text-7xl opacity-20 hidden sm:block">⚡</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
              <Tag size={28} className="mb-3 opacity-80" />
              <h3 className="text-xl font-bold mb-1">Post for Free</h3>
              <p className="text-green-100 text-sm mb-4">List your items in under 2 minutes</p>
              <Link href="/post-ad" className="bg-white/20 hover:bg-white/30 font-semibold px-4 py-2 rounded-lg text-sm transition-colors inline-flex items-center gap-1">
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Ads Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Latest Listings</h2>
              <p className="text-gray-500 text-sm mt-1">Fresh ads posted every minute</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'featured' ? 'bg-white text-[#1a237e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setActiveTab('recent')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'recent' ? 'bg-white text-[#1a237e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Recent
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedAds.map(ad => (
              <AdCard key={ad.id} ad={ad} layout="grid" />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-[#1a237e] hover:bg-[#283593] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              View All Ads <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Top Districts */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse by District</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Colombo', count: '45,210', emoji: '🏙️' },
              { name: 'Gampaha', count: '18,430', emoji: '🌳' },
              { name: 'Kandy', count: '12,880', emoji: '🏔️' },
              { name: 'Galle', count: '9,540', emoji: '🌊' },
              { name: 'Matara', count: '6,320', emoji: '🌴' },
              { name: 'Kurunegala', count: '7,890', emoji: '🌾' },
              { name: 'Jaffna', count: '5,120', emoji: '🎭' },
              { name: 'Ratnapura', count: '4,670', emoji: '💎' },
              { name: 'Anuradhapura', count: '5,830', emoji: '🏛️' },
              { name: 'Badulla', count: '3,940', emoji: '☕' },
              { name: 'Trincomalee', count: '3,210', emoji: '⚓' },
              { name: 'Batticaloa', count: '2,880', emoji: '🌅' },
            ].map(d => (
              <Link
                key={d.name}
                href={`/search?district=${d.name}`}
                className="bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md rounded-xl p-4 text-center transition-all group"
              >
                <span className="text-2xl">{d.emoji}</span>
                <p className="text-sm font-semibold text-gray-800 mt-1 group-hover:text-[#1a237e] transition-colors">{d.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{d.count} ads</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Why Choose WebAds.lk?</h2>
          <p className="text-gray-500 text-center text-sm mb-8">The trusted platform for Sri Lankan buyers and sellers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🆓',
                title: 'Post Ads for Free',
                desc: 'List your items completely free of charge. No hidden fees, no subscription required.',
              },
              {
                icon: '🔒',
                title: 'Safe & Secure',
                desc: 'Our moderation team reviews every ad. Follow our safety tips for worry-free transactions.',
              },
              {
                icon: '📍',
                title: 'Island-wide Reach',
                desc: 'Connect with buyers and sellers from all 25 districts across Sri Lanka.',
              },
              {
                icon: '⚡',
                title: 'Instant Publishing',
                desc: 'Your ad goes live in minutes. Start getting inquiries right away.',
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                desc: 'Use WebAds.lk on any device. Download our app for the best experience.',
              },
              {
                icon: '🤝',
                title: '850K+ Community',
                desc: 'Join a growing community of trusted buyers and sellers across the island.',
              },
            ].map(f => (
              <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* App Download */}
        <section>
          <div className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] rounded-2xl p-8 text-white text-center overflow-hidden relative">
            <div className="absolute left-0 top-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 -translate-y-12" />
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-yellow-400/10 rounded-full translate-x-16 translate-y-16" />
            <div className="relative">
              <p className="text-yellow-400 font-semibold text-sm mb-2">📱 Now Available</p>
              <h2 className="text-3xl font-extrabold mb-2">Get the WebAds.lk App</h2>
              <p className="text-blue-200 text-base mb-6 max-w-md mx-auto">
                Buy and sell on the go. Get instant notifications for new ads and messages.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="font-bold text-sm">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <span className="text-2xl">▶</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="font-bold text-sm">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
