import { useState, useEffect, useRef } from "react";
import HeroSlider from "../components/HeroSlider";
import AdCard from "../components/AdCard";
import { ads, categories } from "../data/dummyData";
import { TrendingUp, Star, Zap, ArrowRight, ChevronRight } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string, categoryId?: string, adId?: string) => void;
}

function CategoryCard({ cat, onClick }: { cat: typeof categories[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 border-2 cursor-pointer ${
        hovered
          ? "border-orange-300 shadow-xl -translate-y-2 bg-white"
          : "border-gray-100 shadow-md bg-white hover:border-orange-200"
      }`}
    >
      {/* Background decoration */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Animated icon container */}
      <div
        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg transition-all duration-300 ${
          hovered ? "scale-110 shadow-xl rotate-3" : ""
        }`}
      >
        <span className="text-3xl leading-none">{cat.icon}</span>
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} blur-lg opacity-0 transition-opacity duration-300 -z-10 ${
            hovered ? "opacity-40" : ""
          }`}
        />
      </div>

      {/* Category name */}
      <div className="text-center">
        <p
          className={`text-xs font-bold transition-colors duration-300 leading-tight ${
            hovered ? "text-orange-600" : "text-gray-700"
          }`}
        >
          {cat.name}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{cat.subCategories.length} types</p>
      </div>

      {/* Arrow indicator */}
      <div
        className={`absolute bottom-2 right-2 transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </div>
    </button>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featuredAds = ads.filter((a) => a.featured).slice(0, 3);
  const popularAds = ads.slice(0, 2);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <HeroSlider onNavigate={onNavigate} />
      </section>

      {/* Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-center shadow-xl shadow-orange-200">
          {[
            { icon: "📢", value: "50,000+", label: "Active Ads" },
            { icon: "👥", value: "120,000+", label: "Monthly Users" },
            { icon: "📍", value: "25", label: "Districts" },
            { icon: "🏷️", value: "16", label: "Categories" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-xl font-black">{stat.value}</div>
              <div className="text-white/80 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ads – 3 Cards */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
              <h2 className="text-xl font-black text-gray-900">🔥 Popular Ads</h2>
            </div>
            <p className="text-gray-500 text-sm ml-3">Handpicked top listings just for you</p>
          </div>
          <button
            onClick={() => onNavigate("category", "vehicles")}
            className="flex items-center gap-1 text-orange-600 text-sm font-semibold hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredAds.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              onView={(id) => onNavigate("single", ad.categoryId, id)}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section ref={sectionRef} className="max-w-7xl mx-auto px-4 mt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-3">
            <Zap className="w-4 h-4" /> Browse by Category
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            What are you looking for?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Explore thousands of ads across all categories — buy, sell, or rent anything in Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className={`transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <CategoryCard cat={cat} onClick={() => onNavigate("category", cat.id)} />
            </div>
          ))}
        </div>
      </section>

      {/* 2 Popular Ads */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
              <h2 className="text-xl font-black text-gray-900">⭐ Top Picks</h2>
            </div>
            <p className="text-gray-500 text-sm ml-3">Most viewed this week</p>
          </div>
          <button
            onClick={() => onNavigate("category", "properties")}
            className="flex items-center gap-1 text-orange-600 text-sm font-semibold hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {popularAds.map((ad) => (
            <div
              key={ad.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              {ad.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        {ad.subCategory}
                      </span>
                      <span className="text-xs text-gray-400">{ad.district}</span>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                      {ad.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                      {ad.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black text-orange-600">
                        Rs. {ad.price.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>{ad.views} views</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate("single", ad.categoryId, ad.id)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg"
                    >
                      View <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-12 mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 text-center">
          {/* Decorative orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Ready to Sell Something?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Post your ad in minutes and reach thousands of buyers across Sri Lanka. Easy, fast, and affordable.
            </p>
            <button
              onClick={() => onNavigate("payment")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black text-lg rounded-2xl transition-all hover:scale-105 shadow-xl shadow-orange-900/30"
            >
              Post Your Ad Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
