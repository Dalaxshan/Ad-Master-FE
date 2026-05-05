import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { heroSlides } from "../data/dummyData";

interface HeroSliderProps {
  onNavigate: (page: string, categoryId?: string) => void;
}

export default function HeroSlider({ onNavigate }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] overflow-hidden rounded-2xl shadow-2xl">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-8 sm:px-16 max-w-2xl">
          <div className={`transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30 mb-4">
              <Tag className="w-3.5 h-3.5" />
              {slide.badge}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-white/90 text-base sm:text-lg mb-6 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("category", slide.categoryId)}
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-orange-50 transition-all hover:scale-105 shadow-lg text-sm"
              >
                {slide.cta} →
              </button>
              <button
                onClick={() => onNavigate("payment")}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg text-sm"
              >
                Post Your Ad
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Badge */}
      <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hidden sm:block">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-white">50K+</div>
            <div className="text-white/70 text-xs">Active Ads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">16</div>
            <div className="text-white/70 text-xs">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">25</div>
            <div className="text-white/70 text-xs">Districts</div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 transition-all hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 transition-all hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all rounded-full ${
              i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
