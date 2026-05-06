import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Eye, Heart, Share2, Flag, Phone, MessageCircle, ChevronRight, Shield, Star, ArrowLeft } from 'lucide-react';
import { ads } from '../data/ads';
import AdCard from '../components/AdCard';

function formatPrice(price: number | null, label?: string): string {
  if (price === null) return 'Negotiable';
  return `Rs. ${price.toLocaleString()}${label || ''}`;
}

export default function AdDetailPage() {
  const { id } = useParams();
  const ad = ads.find(a => a.id === Number(id));
  const related = ads.filter(a => a.category === ad?.category && a.id !== ad?.id).slice(0, 4);

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ad not found</h2>
          <Link to="/" className="text-[#1a237e] font-semibold hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#1a237e] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${ad.category.toLowerCase()}`} className="hover:text-[#1a237e] transition-colors">{ad.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium truncate max-w-xs">{ad.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Ad content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Back button */}
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a237e] transition-colors mb-2">
              <ArrowLeft size={16} /> Back to results
            </button>

            {/* Image */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {ad.isPremium && (
                <div className="bg-yellow-400 px-4 py-2 flex items-center gap-2">
                  <Star size={14} fill="#1a237e" className="text-[#1a237e]" />
                  <span className="text-[#1a237e] text-sm font-bold">Premium Ad – Featured Listing</span>
                </div>
              )}
              <div className="relative h-72 sm:h-96 bg-gray-100">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    <Link to={`/category/${ad.category.toLowerCase()}`} className="text-[#1a237e] font-medium hover:underline">{ad.category}</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-gray-500">{ad.subcategory}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{ad.title}</h1>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-[#1a237e] hover:border-blue-200 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="text-3xl font-extrabold text-[#1a237e] mb-4">
                {formatPrice(ad.price, ad.priceLabel)}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#1a237e]" /> {ad.location}, {ad.district}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> Posted {ad.postedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={14} /> {ad.views} views
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  Ad ID: #{ad.id}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{ad.description}</p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  This item is in excellent condition and available for immediate pickup or delivery arrangement. 
                  Please contact the seller for more details and to arrange viewing. Price is slightly negotiable 
                  for serious buyers.
                </p>
              </div>

              {/* Safety tip */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                <Shield size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Safety Tip</p>
                  <p className="text-xs text-yellow-700 mt-0.5">
                    Meet in a safe public place and inspect items before paying. Never send money in advance.
                  </p>
                </div>
              </div>

              <button className="mt-4 flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors">
                <Flag size={14} /> Report this ad
              </button>
            </div>
          </div>

          {/* Right: Seller card + Contact */}
          <div className="space-y-4">
            {/* Contact card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-4">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#1a237e] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {ad.seller.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{ad.seller}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={12} fill={i <= 4 ? '#f59e0b' : 'none'} className={i <= 4 ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(23 reviews)</span>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Member since 2021
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-[#1a237e] hover:bg-[#283593] text-white font-bold py-3 rounded-xl transition-colors">
                  <Phone size={18} /> Show Phone Number
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors">
                  <MessageCircle size={18} /> WhatsApp Seller
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                  <MessageCircle size={18} /> Send Message
                </button>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <Link to={`/search?seller=${ad.seller}`} className="text-sm text-[#1a237e] font-semibold hover:underline flex items-center gap-1 justify-center">
                  View all ads by this seller <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Ad info summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Ad Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Category', value: ad.category },
                  { label: 'Subcategory', value: ad.subcategory },
                  { label: 'Location', value: `${ad.location}, ${ad.district}` },
                  { label: 'Posted', value: ad.postedAt },
                  { label: 'Ad ID', value: `#${ad.id}` },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related ads */}
        {related.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Similar Ads</h2>
              <Link to={`/category/${ad.category.toLowerCase()}`} className="text-sm text-[#1a237e] font-semibold hover:underline flex items-center gap-1">
                View More <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(a => <AdCard key={a.id} ad={a} layout="grid" />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
