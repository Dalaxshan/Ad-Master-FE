import { Heart, Eye, MapPin, Calendar, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Ad {
  id: string;
  title: string;
  price: number;
  location: string;
  date: string;
  type: string;
  image: string;
  categoryId: string;
  subCategory: string;
  district: string;
  featured?: boolean;
  views?: number;
}

interface AdCardProps {
  ad: Ad;
  onView: (id: string) => void;
  variant?: "default" | "compact" | "featured";
}

export default function AdCard({ ad, onView, variant = "default" }: AdCardProps) {
  const [saved, setSaved] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `Rs. ${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `Rs. ${(price / 1000).toFixed(0)}K`;
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-LK", { day: "numeric", month: "short", year: "numeric" });
  };

  if (variant === "featured") {
    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
        {ad.featured && (
          <div className="absolute top-3 left-3 z-10 flex gap-1.5">
            <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
              Featured
            </span>
          </div>
        )}
        <button
          onClick={() => setSaved(!saved)}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            saved ? "bg-red-500 text-white" : "bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500"
          } shadow-sm`}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>

        <div className="relative h-48 overflow-hidden">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-white/95 text-gray-800 text-sm font-black rounded-lg shadow">
              {formatPrice(ad.price)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
              {ad.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Tag className="w-3 h-3" /> {ad.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" /> {ad.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" /> {formatDate(ad.date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(ad.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs font-bold rounded-lg transition-all hover:shadow-md"
            >
              <Eye className="w-3.5 h-3.5" /> View Ad
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                saved
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 border border-gray-100 flex hover:-translate-y-0.5">
      <div className="relative w-36 sm:w-44 shrink-0 overflow-hidden">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {ad.featured && (
          <div className="absolute top-2 left-2">
            <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {ad.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Tag className="w-3 h-3" /> {ad.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" /> {ad.district}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" /> {formatDate(ad.date)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-black text-orange-600">{formatPrice(ad.price)}</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-1.5 rounded-lg border transition-all ${
                saved
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-gray-50 border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => onView(ad.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
            >
              <ArrowRight className="w-3 h-3" /> View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
