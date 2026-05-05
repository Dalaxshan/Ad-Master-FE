import { useState, useMemo } from "react";
import { ads, categories, districts } from "../data/dummyData";
import AdCard from "../components/AdCard";
import {
  SlidersHorizontal, ChevronDown, ChevronUp, Grid2X2, List,
  X, MapPin, Tag, DollarSign, Search, ArrowLeft
} from "lucide-react";

interface CategoryPageProps {
  categoryId: string;
  onNavigate: (page: string, categoryId?: string, adId?: string) => void;
}

export default function CategoryPage({ categoryId, onNavigate }: CategoryPageProps) {
  const category = categories.find((c) => c.id === categoryId) || categories[0];
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    Price: true,
    Type: true,
    District: true,
  });

  const categoryAds = useMemo(() => {
    let result = ads.filter((ad) => ad.categoryId === categoryId);

    if (filters.district) result = result.filter((a) => a.district === filters.district);
    if (filters.type) result = result.filter((a) => a.subCategory === filters.type);
    if (filters.minPrice) result = result.filter((a) => a.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((a) => a.price <= Number(filters.maxPrice));

    if (sortBy === "newest") result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [categoryId, filters, sortBy]);

  const allCategoryAds = ads.filter((a) => a.categoryId === categoryId);

  const toggleFilter = (key: string) =>
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const setFilter = (key: string, val: string) =>
    setFilters((prev) => ({ ...prev, [key]: prev[key] === val ? "" : val }));

  const clearFilters = () => setFilters({});
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const priceRanges = [
    { label: "Under Rs. 10K", min: 0, max: 10000 },
    { label: "Rs. 10K – 50K", min: 10000, max: 50000 },
    { label: "Rs. 50K – 500K", min: 50000, max: 500000 },
    { label: "Rs. 500K – 5M", min: 500000, max: 5000000 },
    { label: "Above Rs. 5M", min: 5000000, max: 999999999 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${category.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black">{category.name}</h1>
              <p className="text-white/80 text-sm mt-0.5">
                {allCategoryAds.length} ads found • Updated daily
              </p>
            </div>
          </div>
          {/* Sub categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter("type", "")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !filters.type ? "bg-white text-gray-900" : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              All
            </button>
            {category.subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setFilter("type", sub)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filters.type === sub ? "bg-white text-gray-900" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-gray-900 text-sm">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                <div className="divide-y divide-gray-100">
                  {/* District Filter */}
                  <div className="p-4">
                    <button
                      onClick={() => toggleFilter("District")}
                      className="w-full flex items-center justify-between text-sm font-bold text-gray-800 mb-3"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" /> District
                      </span>
                      {expandedFilters["District"] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedFilters["District"] && (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {districts.slice(0, 10).map((d) => (
                          <label key={d} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="district"
                              checked={filters.district === d}
                              onChange={() => setFilter("district", d)}
                              className="accent-orange-500"
                            />
                            <span className="text-xs text-gray-600 group-hover:text-orange-600">{d}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Filter */}
                  <div className="p-4">
                    <button
                      onClick={() => toggleFilter("Price")}
                      className="w-full flex items-center justify-between text-sm font-bold text-gray-800 mb-3"
                    >
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-orange-500" /> Price Range
                      </span>
                      {expandedFilters["Price"] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedFilters["Price"] && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice || ""}
                            onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))}
                            className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:border-orange-400 outline-none"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice || ""}
                            onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))}
                            className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:border-orange-400 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          {priceRanges.map((r) => (
                            <button
                              key={r.label}
                              onClick={() => setFilters((p) => ({ ...p, minPrice: String(r.min), maxPrice: String(r.max) }))}
                              className="w-full text-left text-xs px-2 py-1.5 rounded-lg hover:bg-orange-50 hover:text-orange-600 text-gray-600 transition-colors"
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Type Filter */}
                  <div className="p-4">
                    <button
                      onClick={() => toggleFilter("Type")}
                      className="w-full flex items-center justify-between text-sm font-bold text-gray-800 mb-3"
                    >
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-500" /> Type
                      </span>
                      {expandedFilters["Type"] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedFilters["Type"] && (
                      <div className="space-y-1.5">
                        {category.subCategories.map((sub) => (
                          <label key={sub} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="type"
                              checked={filters.type === sub}
                              onChange={() => setFilter("type", sub)}
                              className="accent-orange-500"
                            />
                            <span className="text-xs text-gray-600 group-hover:text-orange-600">{sub}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="p-4 border-t border-gray-100">
                  <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all">
                    Apply Filters
                  </button>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {sidebarOpen ? "Hide" : "Show"} Filters
                </button>
                <span className="text-sm text-gray-500">
                  <strong className="text-gray-900">{categoryAds.length}</strong> ads found
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-orange-400 outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>

                {/* View mode */}
                <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.district && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200">
                    <MapPin className="w-3 h-3" /> {filters.district}
                    <button onClick={() => setFilter("district", filters.district)}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {filters.type && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200">
                    <Tag className="w-3 h-3" /> {filters.type}
                    <button onClick={() => setFilter("type", filters.type)}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200">
                    <DollarSign className="w-3 h-3" /> Rs. {filters.minPrice || "0"} – {filters.maxPrice || "∞"}
                    <button onClick={() => setFilters((p) => ({ ...p, minPrice: "", maxPrice: "" }))}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Ads Grid/List */}
            {categoryAds.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No ads found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {categoryAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onView={(id) => onNavigate("single", categoryId, id)}
                    variant="featured"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {categoryAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onView={(id) => onNavigate("single", categoryId, id)}
                    variant="default"
                  />
                ))}
              </div>
            )}

            {/* Pagination placeholder */}
            {categoryAds.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {[1, 2, 3, "...", 8].map((page, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                      page === 1
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
