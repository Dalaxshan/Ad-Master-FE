import { useState } from "react";
import { ads, categories } from "../data/dummyData";
import {
  MapPin, Calendar, Tag, Eye, Heart, ChevronLeft,
  ChevronRight, Phone, MessageCircle, Shield, Clock,
  Star, ArrowLeft, Flag, Copy, Check, Zap
} from "lucide-react";

interface SingleAdPageProps {
  adId: string;
  onNavigate: (page: string, categoryId?: string, adId?: string) => void;
}

export default function SingleAdPage({ adId, onNavigate }: SingleAdPageProps) {
  const ad = ads.find((a) => a.id === adId) || ads[0];
  const category = categories.find((c) => c.id === ad.categoryId);
  const [currentImg, setCurrentImg] = useState(0);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const relatedAds = ads.filter((a) => a.categoryId === ad.categoryId && a.id !== ad.id).slice(0, 3);

  const formatPrice = (p: number) => `Rs. ${p.toLocaleString()}`;
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-LK", { day: "numeric", month: "long", year: "numeric" });

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I'm interested in your ad: "${ad.title}"\nPrice: ${formatPrice(ad.price)}`);
    window.open(`https://wa.me/${ad.sellerWhatsapp?.replace(/\+/g, "")}?text=${msg}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const images = ad.images && ad.images.length > 0 ? ad.images : [ad.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => onNavigate("home")} className="hover:text-orange-600 transition-colors">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate("category", ad.categoryId)}
            className="hover:text-orange-600 transition-colors"
          >
            {category?.name}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{ad.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => onNavigate("category", ad.categoryId)}
          className="flex items-center gap-1.5 text-gray-600 hover:text-orange-600 text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {category?.name}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Image + Details */}
          <div className="lg:col-span-2 space-y-4">

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
              {/* Main Image */}
              <div className="relative h-72 sm:h-96 bg-gray-100 group">
                <img
                  src={images[currentImg]}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                {ad.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImg((p) => (p - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setCurrentImg((p) => (p + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                  {currentImg + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 border-t border-gray-100 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === currentImg ? "border-orange-500 shadow-md" : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ad Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">
                      {category?.icon} {category?.name}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{ad.subCategory}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">{ad.title}</h1>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-orange-600">{formatPrice(ad.price)}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Negotiable</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-orange-500" /> {ad.location}, {ad.district}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" /> {formatDate(ad.date)}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Eye className="w-4 h-4 text-orange-500" /> {ad.views || 0} views
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-orange-500" /> {ad.type}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{ad.description}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" /> Ad Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Category", value: category?.name || "" },
                  { label: "Type", value: ad.subCategory },
                  { label: "Location", value: ad.location },
                  { label: "District", value: ad.district },
                  { label: "Posted", value: formatDate(ad.date) },
                  ...(ad.brand ? [{ label: "Brand", value: ad.brand }] : []),
                  ...(ad.year ? [{ label: "Year", value: String(ad.year) }] : []),
                  ...(ad.fuelType ? [{ label: "Fuel Type", value: ad.fuelType }] : []),
                  ...(ad.condition ? [{ label: "Condition", value: ad.condition }] : []),
                  ...(ad.bedrooms ? [{ label: "Bedrooms", value: String(ad.bedrooms) }] : []),
                  ...(ad.landSize ? [{ label: "Land Size", value: ad.landSize }] : []),
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</div>
                    <div className="text-sm font-bold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
              <h4 className="flex items-center gap-2 font-bold text-blue-800 mb-2 text-sm">
                <Shield className="w-4 h-4" /> Safety Tips
              </h4>
              <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                <li>Meet seller in a safe, public location</li>
                <li>Check the item thoroughly before purchasing</li>
                <li>Never send money in advance</li>
                <li>Beware of unusually low prices – it may be a scam</li>
              </ul>
            </div>
          </div>

          {/* Right: Contact + Actions */}
          <div className="space-y-4">
            {/* Seller Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black text-lg">
                  {ad.sellerName?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{ad.sellerName}</div>
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
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] text-sm"
                  >
                    <Phone className="w-4 h-4" /> Show Contact Number
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between py-3 px-4 bg-green-50 border border-green-200 rounded-xl">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Phone Number</div>
                      <div className="font-black text-gray-900 text-lg tracking-wide">{ad.sellerPhone}</div>
                    </div>
                    <a href={`tel:${ad.sellerPhone}`}>
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
              <h4 className="text-sm font-bold text-gray-800 mb-3">Quick Actions</h4>
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
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Share"}
                </button>

                <button className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all text-xs font-medium">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
            </div>

            {/* Post your ad CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-5 text-white text-center">
              <div className="text-3xl mb-2">📢</div>
              <h4 className="font-black text-lg mb-1">Have something to sell?</h4>
              <p className="text-white/80 text-xs mb-3">Post your ad and reach 120K+ buyers</p>
              <button
                onClick={() => onNavigate("payment")}
                className="w-full py-2.5 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all text-sm"
              >
                Post Your Ad →
              </button>
            </div>
          </div>
        </div>

        {/* Related Ads */}
        {relatedAds.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Similar Ads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedAds.map((a) => (
                <div
                  key={a.id}
                  onClick={() => onNavigate("single", a.categoryId, a.id)}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl border border-gray-100 cursor-pointer group transition-all hover:-translate-y-1"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {a.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-orange-600 font-black text-sm">
                        Rs. {a.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">{a.district}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
