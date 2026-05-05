import { Megaphone, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { categories } from "../data/dummyData";

interface FooterProps {
  onNavigate: (page: string, categoryId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-lg">📧 Get the Latest Deals</h3>
            <p className="text-white/80 text-sm">Subscribe to receive top ads and exclusive offers</p>
          </div>
          <div className="flex w-full sm:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-2.5 rounded-l-xl text-gray-900 text-sm outline-none"
            />
            <button className="px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white rounded-r-xl font-bold text-sm flex items-center gap-1 transition-colors">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black">
                  <span className="text-orange-400">WEB</span>Ads
                </span>
                <div className="text-[10px] text-gray-500 -mt-1 tracking-widest uppercase">Sri Lanka's Marketplace</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Sri Lanka's fastest growing online classified marketplace. Buy, sell, and rent anything with ease.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                42/3 Braybrooke Place, Colombo 02
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                +94 11 234 5678
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                support@webads.lk
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white mb-4">Top Categories</h4>
            <div className="space-y-2">
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate("category", cat.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm transition-colors w-full text-left"
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* More Categories */}
          <div>
            <h4 className="font-bold text-white mb-4">More Categories</h4>
            <div className="space-y-2">
              {categories.slice(8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate("category", cat.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm transition-colors w-full text-left"
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", page: "home" },
                { label: "Contact Us", page: "contact" },
                { label: "Post Your Ad", page: "payment" },
                { label: "Login", page: "login" },
                { label: "Register", page: "register" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page)}
                  className="block text-gray-400 hover:text-orange-400 text-sm transition-colors text-left"
                >
                  → {link.label}
                </button>
              ))}
              <div className="pt-2">
                <div className="text-xs text-gray-500 mb-2">LEGAL</div>
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <div key={item} className="text-gray-400 text-sm hover:text-orange-400 cursor-pointer transition-colors mb-1">
                    → {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Badges */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} WebAds.lk — All Rights Reserved | Made with ❤️ in Sri Lanka
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300 border border-gray-700">
              🍎 App Store
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300 border border-gray-700">
              🤖 Google Play
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
