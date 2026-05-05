import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check, MessageCircle } from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate: _onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Contact Us</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Have questions about posting your ad, or need help with our platform? We're here to help you 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              {
                icon: <MapPin className="w-5 h-5" />,
                color: "from-blue-500 to-blue-700",
                title: "Our Office",
                lines: ["42/3, Braybrooke Place", "Colombo 02, Sri Lanka"],
              },
              {
                icon: <Phone className="w-5 h-5" />,
                color: "from-green-500 to-green-700",
                title: "Phone",
                lines: ["+94 11 234 5678", "+94 77 123 4567"],
              },
              {
                icon: <Mail className="w-5 h-5" />,
                color: "from-orange-500 to-red-600",
                title: "Email",
                lines: ["support@webads.lk", "ads@webads.lk"],
              },
              {
                icon: <Clock className="w-5 h-5" />,
                color: "from-purple-500 to-purple-700",
                title: "Working Hours",
                lines: ["Mon – Fri: 8:00 AM – 8:00 PM", "Sat – Sun: 9:00 AM – 5:00 PM"],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shrink-0 shadow-md`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                  {item.lines.map((line) => (
                    <div key={line} className="text-gray-500 text-sm">{line}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="font-bold text-gray-900 text-sm mb-3">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", color: "bg-blue-600", emoji: "f" },
                  { label: "Instagram", color: "bg-gradient-to-br from-pink-500 to-orange-500", emoji: "📸" },
                  { label: "Twitter", color: "bg-sky-500", emoji: "𝕏" },
                  { label: "WhatsApp", color: "bg-green-500", emoji: "💬" },
                ].map((s) => (
                  <button
                    key={s.label}
                    title={s.label}
                    className={`w-9 h-9 ${s.color} text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow text-xs font-bold`}
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366] rounded-2xl p-5 text-white text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="font-black text-lg">Chat with Us</div>
              <p className="text-white/80 text-xs mb-3">Get instant support via WhatsApp</p>
              <a
                href="https://wa.me/94112345678"
                target="_blank"
                rel="noreferrer"
                className="block py-2 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors text-sm"
              >
                Open WhatsApp →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-black text-gray-900 mb-1">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-5">We'll get back to you within 24 hours</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Thank you, <strong>{formData.name}</strong>! We'll respond to{" "}
                    <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+94 77 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none bg-white"
                      >
                        <option value="">Select Subject</option>
                        <option>Ad Posting Help</option>
                        <option>Payment Issue</option>
                        <option>Account Problem</option>
                        <option>Report a Scam</option>
                        <option>General Inquiry</option>
                        <option>Partnership & Advertising</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all hover:shadow-lg disabled:opacity-70 text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map placeholder */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <div className="font-bold text-gray-700">WebAds Headquarters</div>
                  <div className="text-gray-500 text-sm">42/3, Braybrooke Place, Colombo 02</div>
                </div>
                {/* Decorative map-like grid */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute border-gray-400 border" style={{
                      left: `${i * 12.5}%`, top: 0, bottom: 0, width: "1px"
                    }} />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="absolute border-gray-400 border" style={{
                      top: `${i * 16.67}%`, left: 0, right: 0, height: "1px"
                    }} />
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-orange-600 font-semibold text-sm hover:underline"
                >
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
