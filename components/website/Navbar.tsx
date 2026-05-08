"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Bell,
  Heart,
  Plus,
  User,
} from "lucide-react";
import { districts } from "../../data/categories";
import Image from "next/image";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Sri Lanka");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(searchQuery)}&district=${encodeURIComponent(selectedDistrict)}`,
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-[#1a237e] text-white w-full">
        <div className="w-full px-6 py-1.5 flex items-center justify-between text-xs">
          <span className="hidden sm:block">
            🇱🇰 Sri Lanka&apos;s #1 Online Marketplace
          </span>
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Link
              href="/login"
              className="hover:text-yellow-300 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="hover:text-yellow-300 transition-colors"
            >
              Register
            </Link>
            <Link
              href="/help"
              className="hover:text-yellow-300 transition-colors hidden sm:block"
            >
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="w-full px-6 py-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
          {/* Top row on mobile: Logo and action buttons */}
          <div className="flex items-center justify-between md:contents">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="AdMaster.lk"
                width={150}
                height={120}
                className="rounded-lg w-24 sm:w-28 md:w-36"
                style={{ height: "auto" }}
              />
            </Link>

            {/* Right actions - visible on mobile */}
            <div className="flex md:hidden items-center gap-1">
              <Link
                href="/ad"
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-[#1a237e] font-bold px-3 py-2 rounded-lg text-sm transition-colors shadow-sm"
              >
                <Plus size={16} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 flex items-center gap-0 w-full"
          >
            {/* District selector */}
            <div className="relative hidden md:block flex-shrink-0">
              <button
                type="button"
                onClick={() => setDistrictOpen(!districtOpen)}
                className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 border-r-0 rounded-l-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap"
                suppressHydrationWarning
              >
                <MapPin size={14} className="text-[#1a237e]" />
                <span className="max-w-[100px] truncate">
                  {selectedDistrict}
                </span>
                <ChevronDown size={14} />
              </button>
              {districtOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                  {districts.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setSelectedDistrict(d.name);
                        setDistrictOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1a237e] transition-colors"
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 min-w-0 border border-gray-200 md:rounded-none rounded-l-lg px-2 sm:px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="bg-[#1a237e] hover:bg-[#283593] text-white px-3 sm:px-5 py-2.5 rounded-r-lg transition-colors flex items-center gap-2 font-medium text-sm flex-shrink-0"
              suppressHydrationWarning
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Right actions - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative"
              suppressHydrationWarning
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              suppressHydrationWarning
            >
              <Heart size={20} />
            </button>
            <Link
              href="/profile"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <User size={20} />
            </Link>
            <Link
              href="/ad"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#1a237e] font-bold px-4 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span>Post Ad</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="border-t border-gray-100 bg-white w-full">
        <div className="w-full px-6">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {[
              { label: "Vehicles", href: "/category/vehicles" },
              { label: "Property", href: "/category/property" },
              { label: "Electronics", href: "/category/electronics" },
              { label: "Jobs", href: "/category/jobs" },
              { label: "Services", href: "/category/services" },
              { label: "Home & Garden", href: "/category/home-garden" },
              { label: "Animals & Pets", href: "/category/animals-pets" },
              { label: "Fashion", href: "/category/fashion" },
              { label: "Business", href: "/category/business" },
              { label: "Education", href: "/category/education" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1a237e] hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-2 text-sm text-gray-700 w-36"
              >
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </form>
            <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
              <Link
                href="/login"
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Register
              </Link>
              <Link
                href="/profile"
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                My Profile
              </Link>
              <Link
                href="/saved"
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Saved Ads
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
