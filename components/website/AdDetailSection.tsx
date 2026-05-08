"use client";

import {
  MapPin,
  Clock,
  Eye,
  Heart,
  Share2,
  Flag,
  Phone,
  MessageCircle,
  ChevronRight,
  Shield,
  Star,
  ArrowLeft,
  Check,
  Copy,
} from "lucide-react";
import { ads } from "../../data/ads";
import AdCard from "./AdCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

function createAdSlug(title: string): string {
  return title
     .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function formatPrice(price: number | null, label?: string): string {
  if (price === null) return "Negotiable";
  return `Rs. ${price.toLocaleString()}${label || ""}`;
}

export default function AdDetailSection() {
  const { id } = useParams();
  const adParam = Array.isArray(id) ? id[0] : id;
  const ad = ads.find(
    (a) => String(a.id) === adParam || createAdSlug(a.title) === adParam,
  );
  const related = ads
    .filter((a) => a.category === ad?.category && a.id !== ad?.id)
    .slice(0, 4);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ad not found</h2>
          <Link
            href="/"
            className="text-[#1a237e] font-semibold hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I'm interested in your ad: "${ad.title}"\nPrice: ${formatPrice(ad.price)}`,
    );
    window.open(
      `https://wa.me/${ad.contact?.replace(/\+/g, "")}?text=${msg}`,
      "_blank",
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#1a237e] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/category/${ad.category.toLowerCase()}`}
            className="hover:text-[#1a237e] transition-colors"
          >
            {ad.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium truncate max-w-xs">
            {ad.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Ad content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Back button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a237e] transition-colors mb-2"
            >
              <ArrowLeft size={16} /> Back to results
            </button>

            {/* Image */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {ad.isPremium && (
                <div className="bg-yellow-400 px-4 py-2 flex items-center gap-2">
                  <Star size={14} fill="#1a237e" className="text-[#1a237e]" />
                  <span className="text-[#1a237e] text-sm font-bold">
                    Premium Ad – Featured Listing
                  </span>
                </div>
              )}
              <div className="relative h-72 sm:h-96 bg-gray-100">
                {/* <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" /> */}
                <Image
                  src={ad.image}
                  alt={ad.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    <Link
                      href={`/category/${ad.category.toLowerCase()}`}
                      className="text-[#1a237e] font-medium hover:underline"
                    >
                      {ad.category}
                    </Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-gray-500">{ad.subcategory}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    {ad.title}
                  </h1>
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
                  <MapPin size={14} className="text-[#1a237e]" /> {ad.location},{" "}
                  {ad.district}
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
                <h3 className="font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {ad.description}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  This item is in excellent condition and available for
                  immediate pickup or delivery arrangement. Please contact the
                  seller for more details and to arrange viewing. Price is
                  slightly negotiable for serious buyers.
                </p>
              </div>

              {/* Safety tip */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                <Shield
                  size={20}
                  className="text-yellow-600 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">
                    Safety Tip
                  </p>
                  <p className="text-xs text-yellow-700 mt-0.5">
                    Meet in a safe public place and inspect items before paying.
                    Never send money in advance.
                  </p>
                </div>
              </div>

              <button className="mt-4 flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors">
                <Flag size={14} /> Report this ad
              </button>
            </div>
          </div>

          {/* Right: Contact + Actions */}
          <div className="space-y-4">
            {/* Seller Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-900 to-red-500 flex items-center justify-center text-white font-black text-lg">
                  {ad.seller?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{ad.seller}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Verified Seller
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Contact Number – Hidden until click */}
                {!contactRevealed ? (
                  <button
                    onClick={() => setContactRevealed(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#1a237e] to-[#1a237e] hover:from-[#1a237e] hover:to-[#1a237e] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] text-sm"
                  >
                    <Phone className="w-4 h-4" /> Show Contact Number
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between py-3 px-4 bg-green-50 border border-green-200 rounded-xl">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">
                        Phone Number
                      </div>
                      <div className="font-black text-gray-900 text-lg tracking-wide">
                        {ad.contact}
                      </div>
                    </div>
                    <a href={`tel:${ad.contact}`}>
                      <Phone className="w-5 h-5 text-green-600" />
                    </a>
                  </div>
                )}

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Usually responds within 1 hour</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                Quick Actions
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs font-medium ${
                    saved
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </button>

                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all text-xs font-medium"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Share"}
                </button>

                <button className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all text-xs font-medium">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
            </div>

            {/* Post your ad CTA */}
            <div className="bg-gradient-to-br from-red-400 to-red-900 rounded-2xl p-5 text-white text-center">
              <div className="text-3xl mb-2">📢</div>
              <h4 className="font-black text-lg mb-1">
                Have something to sell?
              </h4>
              <p className="text-white/80 text-xs mb-3">
                Post your ad and reach 120K+ buyers
              </p>
              <button className="w-full py-2.5 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all text-sm">
                <Link
                  href="/ad"
                  className="flex items-center justify-center gap-2"
                >
                  Post Your Ad →
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Related ads */}
        {related.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Similar Ads</h2>
              <Link
                href={`/category/${ad.category.toLowerCase()}`}
                className="text-sm text-[#1a237e] font-semibold hover:underline flex items-center gap-1"
              >
                View More <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((a) => (
                <AdCard key={a.id} ad={a} layout="grid" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
