import { Ad } from "@/type";
import { MapPin, Clock, Eye, Heart, Star} from "lucide-react";
import Link from "next/link";


interface AdCardProps {
  ad: Ad;
  layout?: "grid" | "list";
}

function formatPrice(price: number | null, label?: string): string {
  if (price === null) return "Negotiable";
  return `Rs. ${price.toLocaleString()}${label || ""}`;
}

export default function AdCard({ ad, layout = "grid" }: AdCardProps) {
  if (layout === "list") {
    return (
      <Link href={`/ad/${ad.id}`} className="group block">
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-100 transition-all duration-200 flex gap-4 p-3">
          <div className="relative flex-shrink-0 w-36 h-28 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {ad.isPremium && (
              <span className="absolute top-2 left-2 bg-yellow-400 text-[#1a237e] text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                <Star size={10} fill="currentColor" /> TOP
              </span>
            )}
            {ad.isFeatured && !ad.isPremium && (
              <span className="absolute top-2 left-2 bg-[#1a237e] text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                FEATURED
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[#1a237e] font-medium mb-0.5">
                  {ad.category} · {ad.subcategory}
                </p>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#1a237e] transition-colors text-sm line-clamp-2 leading-snug">
                  {ad.title}
                </h3>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Heart size={16} />
              </button>
            </div>
            <p className="text-[#1a237e] font-bold text-lg mt-2">
              {formatPrice(ad.price, ad.priceLabel)}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {ad.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {ad.postedAt}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} /> {ad.views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/ad/${ad.id}`} className="group block">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-200 h-full flex flex-col">
        <div className="relative overflow-hidden bg-gray-100 h-44">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {ad.isPremium && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-[#1a237e] text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Star size={11} fill="currentColor" /> TOP AD
            </span>
          )}
          {ad.isFeatured && !ad.isPremium && (
            <span className="absolute top-2 left-2 bg-[#1a237e] text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              FEATURED
            </span>
          )}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
          >
            <Heart size={15} />
          </button>
        </div>
        <div className="p-3 flex flex-col flex-1">
          <p className="text-xs text-[#1a237e] font-medium mb-1 truncate">
            {ad.subcategory}
          </p>
          <h3 className="font-semibold text-gray-900 group-hover:text-[#1a237e] transition-colors text-sm line-clamp-2 leading-snug flex-1">
            {ad.title}
          </h3>
          <p className="text-[#1a237e] font-bold text-base mt-2">
            {formatPrice(ad.price, ad.priceLabel)}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
            <span className="flex items-center gap-1 text-xs text-gray-500 truncate">
              <MapPin size={11} className="flex-shrink-0" /> {ad.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
              <Clock size={11} /> {ad.postedAt}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
