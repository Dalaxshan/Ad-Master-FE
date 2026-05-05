import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Menu, X, Megaphone, Bell, LogIn, UserPlus } from "lucide-react";
import { categories } from "../data/dummyData";

interface HeaderProps {
  onNavigate: (page: string, categoryId?: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchCategory) {
      onNavigate("category", searchCategory);
    }
  };

  const selectedCat = categories.find((c) => c.id === searchCategory);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md shadow-sm"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="animate-pulse">🔥</span> Publish your ad today and reach thousands of buyers!
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <span>📞 +94 11 234 5678</span>
            <span>✉️ support@webads.lk</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-200">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tight">
                <span className="text-orange-500">WEB</span>
                <span className="text-gray-800">Ads</span>
              </span>
              <div className="text-[10px] text-gray-400 -mt-1 tracking-widest uppercase">Sri Lanka's Marketplace</div>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-orange-400 transition-all hover:border-gray-300">
            {/* Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 border-r border-gray-200 bg-white hover:bg-orange-50 transition-colors whitespace-nowrap"
              >
                <span>{selectedCat ? selectedCat.icon : "📂"}</span>
                <span className="hidden sm:block max-w-[120px] truncate">
                  {selectedCat ? selectedCat.name : "All Categories"}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <button
                      onClick={() => { setSearchCategory(""); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-orange-50 text-gray-700 font-medium"
                    >
                      📂 All Categories
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setSearchCategory(cat.id); setDropdownOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-orange-50 transition-colors ${
                          searchCategory === cat.id ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-2.5 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 font-medium text-sm"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:block">Search</span>
            </button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button className="relative p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button
              onClick={() => onNavigate("login")}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-gray-200"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>

            <button
              onClick={() => onNavigate("register")}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </button>

            <button
              onClick={() => onNavigate("payment")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg transition-all shadow-md shadow-orange-200 hover:shadow-orange-300 hover:scale-105"
            >
              <Megaphone className="w-4 h-4" />
              Web Ads
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Category Nav Bar */}
        <div className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
          {categories.slice(0, 10).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate("category", cat.id)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all hover:bg-orange-100 hover:text-orange-600 ${
                currentPage === "category" ? "text-gray-600" : "text-gray-600"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
          <button
            onClick={() => onNavigate("home")}
            className="px-3 py-1.5 text-xs font-medium text-orange-600 rounded-full whitespace-nowrap hover:bg-orange-50"
          >
            More →
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="p-4 space-y-2">
            <button
              onClick={() => { onNavigate("payment"); setMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"
            >
              <Megaphone className="w-4 h-4" />
              Post Your Ad (Web Ads)
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => { onNavigate("login"); setMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
              <button
                onClick={() => { onNavigate("register"); setMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-xl"
              >
                <UserPlus className="w-4 h-4" /> Register
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { onNavigate("category", cat.id); setMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-left"
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
