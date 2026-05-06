import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1547] text-gray-300 mt-16">
      {/* Top CTA */}
      <div className="bg-[#1a237e] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl">Ready to sell something?</h3>
            <p className="text-blue-200 text-sm mt-1">Post your ad for free and reach thousands of buyers across Sri Lanka.</p>
          </div>
          <Link
            href="/post-ad"
            className="bg-yellow-400 hover:bg-yellow-500 text-[#1a237e] font-bold px-8 py-3 rounded-xl transition-colors shadow-lg whitespace-nowrap"
          >
            Post Free Ad
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-400 rounded-lg p-2">
                <span className="text-[#1a237e] font-extrabold text-lg leading-none">W</span>
              </div>
              <div>
                <span className="text-white font-extrabold text-xl">WebAds</span>
                <span className="text-yellow-400 font-extrabold text-xl">.lk</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
             Sri Lanka&apos;s #1 online classifieds marketplace. Buy, sell, and discover deals across the island.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'f', title: 'Facebook', hover: 'hover:bg-blue-600' },
                { label: 't', title: 'Twitter / X', hover: 'hover:bg-sky-500' },
                { label: 'in', title: 'Instagram', hover: 'hover:bg-pink-600' },
                { label: '▶', title: 'YouTube', hover: 'hover:bg-red-600' },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  title={s.title}
                  className={`w-8 h-8 bg-white/10 ${s.hover} rounded-lg flex items-center justify-center transition-colors text-xs font-bold text-white`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Vehicles', href: '/category/vehicles' },
                { label: 'Property', href: '/category/property' },
                { label: 'Electronics', href: '/category/electronics' },
                { label: 'Jobs', href: '/category/jobs' },
                { label: 'Services', href: '/category/services' },
                { label: 'Home & Garden', href: '/category/home-garden' },
                { label: 'Animals & Pets', href: '/category/animals-pets' },
                { label: 'Fashion & Beauty', href: '/category/fashion' },
              ].map(cat => (
                <li key={cat.href}>
                  <Link href={cat.href} className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Post a Free Ad', href: '/post-ad' },
                { label: 'Sign In', href: '/login' },
                { label: 'Register', href: '/register' },
                { label: 'My Account', href: '/profile' },
                { label: 'Saved Ads', href: '/saved' },
                { label: 'Safety Tips', href: '/safety' },
                { label: 'Advertise with Us', href: '/advertise' },
                { label: 'Sitemap', href: '/sitemap' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>No. 12, Duplication Road,<br />Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-yellow-400 flex-shrink-0" />
                <a href="tel:+94112345678" className="hover:text-white transition-colors">+94 11 234 5678</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-yellow-400 flex-shrink-0" />
                <a href="mailto:info@webads.lk" className="hover:text-white transition-colors">info@webads.lk</a>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 font-medium mb-1">Business Hours</p>
              <p className="text-sm">Mon – Sat: 9:00 AM – 6:00 PM</p>
              <p className="text-sm">Sun: 10:00 AM – 2:00 PM</p>
            </div>

            <div className="mt-4 flex gap-2">
              <a href="#" className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2">
                <ExternalLink size={12} /> App Store
              </a>
              <a href="#" className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2">
                <ExternalLink size={12} /> Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} WebAds.lk. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
