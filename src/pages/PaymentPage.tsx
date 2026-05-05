import { useState } from "react";
import {
  CreditCard, Zap, Check, ArrowRight,
  Shield, Clock, Users, ChevronDown, ChevronUp, ArrowLeft, Megaphone
} from "lucide-react";

interface PaymentPageProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    icon: "📢",
    price: 0,
    period: "7 days",
    color: "from-gray-500 to-gray-600",
    border: "border-gray-200",
    badge: null,
    features: [
      "1 Ad listing",
      "3 images",
      "Standard visibility",
      "Basic category listing",
      "Email support",
    ],
    disabled: ["Featured badge", "Top placement", "Analytics"],
  },
  {
    id: "standard",
    name: "Standard",
    icon: "⭐",
    price: 990,
    period: "30 days",
    color: "from-blue-500 to-blue-700",
    border: "border-blue-200",
    badge: "Popular",
    features: [
      "1 Ad listing",
      "8 images",
      "Enhanced visibility",
      "Featured badge",
      "Priority in search",
      "WhatsApp button",
      "Chat support",
    ],
    disabled: ["Top of category", "Analytics dashboard"],
  },
  {
    id: "premium",
    name: "Premium",
    icon: "👑",
    price: 2490,
    period: "60 days",
    color: "from-orange-500 to-red-600",
    border: "border-orange-300",
    badge: "Best Value",
    features: [
      "3 Ad listings",
      "20 images per ad",
      "Maximum visibility",
      "Featured + Top badge",
      "Top of category placement",
      "Analytics dashboard",
      "Priority support 24/7",
      "Social media boost",
      "Homepage slider slot",
    ],
    disabled: [],
  },
];

const addOns = [
  { id: "bump", name: "Ad Bump", desc: "Push your ad to the top every 3 days", price: 299, icon: "🚀" },
  { id: "highlight", name: "Highlight", desc: "Gold highlighted border on your ad", price: 199, icon: "✨" },
  { id: "urgent", name: "Urgent Tag", desc: "Mark your ad as urgent for more attention", price: 149, icon: "🔴" },
  { id: "social", name: "Social Boost", desc: "Share on our Facebook & Instagram pages", price: 499, icon: "📱" },
];

const paymentMethods = [
  { id: "card", name: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Amex" },
  { id: "bank", name: "Bank Transfer", icon: "🏦", desc: "Online banking transfer" },
  { id: "dialog", name: "Dialog Genie", icon: "📱", desc: "Mobile payment" },
  { id: "cod", name: "Cash on Delivery", icon: "💵", desc: "Pay at our office" },
];

export default function PaymentPage({ onNavigate }: PaymentPageProps) {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", adTitle: "", category: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const a = addOns.find((x) => x.id === id);
    return sum + (a?.price || 0);
  }, 0);
  const total = plan.price + addOnTotal;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const faqs = [
    { q: "How long does it take for my ad to go live?", a: "Your ad will be reviewed and published within 2-4 hours of payment confirmation." },
    { q: "Can I edit my ad after publishing?", a: "Yes, you can edit your ad details at any time from your dashboard during the active period." },
    { q: "What payment methods are accepted?", a: "We accept credit/debit cards, bank transfers, Dialog Genie mobile payments, and cash at our office." },
    { q: "Is my payment secure?", a: "All payments are secured with 256-bit SSL encryption. We never store your card details." },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Payment Successful! 🎉</h2>
          <p className="text-gray-500 text-sm mb-2">
            Your <strong>{plan.name} Plan</strong> ad has been submitted for review.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            You'll receive a confirmation at <strong>{formData.email || "your email"}</strong> within minutes.
          </p>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
            <div className="text-sm font-bold text-orange-800 mb-2">What happens next?</div>
            <div className="space-y-2 text-xs text-orange-700 text-left">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Payment confirmed & receipt sent</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Ad reviewed within 2–4 hours</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Your ad goes live on WebAds.lk</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Megaphone className="w-8 h-8" />
            <h1 className="text-3xl font-black">Publish Your Ad</h1>
          </div>
          <p className="text-white/80 text-sm">Choose a plan and reach thousands of buyers across Sri Lanka</p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" /> Secure Payment
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Users className="w-3.5 h-3.5" /> 120K+ Active Users
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" /> Live in 2–4 Hours
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5" /> 50,000+ Ads Published
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Choose Plan", "Ad Details", "Payment"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${step === i + 1 ? "opacity-100" : "opacity-60"}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > i + 1 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{s}</span>
              </div>
              {i < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        {/* Step 1: Plans */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 text-center mb-6">Select Your Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${
                    selectedPlan === p.id ? `${p.border} shadow-xl` : "border-gray-200 shadow-sm"
                  }`}
                >
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className={`px-3 py-1 bg-gradient-to-r ${p.color} text-white text-xs font-bold rounded-full shadow`}>
                        {p.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{p.icon}</div>
                    <h3 className="font-black text-lg text-gray-900">{p.name}</h3>
                    <div className="mt-2">
                      {p.price === 0 ? (
                        <span className="text-3xl font-black text-gray-900">Free</span>
                      ) : (
                        <>
                          <span className="text-3xl font-black text-gray-900">Rs. {p.price.toLocaleString()}</span>
                          <span className="text-gray-400 text-sm"> / {p.period}</span>
                        </>
                      )}
                    </div>
                    {p.price > 0 && <div className="text-xs text-gray-400 mt-0.5">for {p.period}</div>}
                  </div>

                  <div className="space-y-2 mb-4">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-green-600" />
                        </div>
                        {f}
                      </div>
                    ))}
                    {p.disabled.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                        <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-0.5 bg-gray-400 rounded" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div
                    className={`w-full py-2.5 rounded-xl text-sm font-bold text-center transition-all ${
                      selectedPlan === p.id
                        ? `bg-gradient-to-r ${p.color} text-white shadow-md`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedPlan === p.id ? "✓ Selected" : "Select Plan"}
                  </div>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-3">🚀 Boost Your Ad (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOns.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => toggleAddOn(a.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddOns.includes(a.id)
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <div className="text-2xl">{a.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-gray-900">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-orange-600 text-sm">Rs. {a.price}</div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ml-auto ${
                        selectedAddOns.includes(a.id) ? "bg-orange-500 border-orange-500" : "border-gray-300"
                      }`}>
                        {selectedAddOns.includes(a.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary + Next */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-3xl font-black text-gray-900">
                  {total === 0 ? "Free" : `Rs. ${total.toLocaleString()}`}
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="text-xs text-gray-400">Plan + {selectedAddOns.length} add-on(s)</div>
                )}
              </div>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Ad Details */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-black text-gray-900 mb-6">Your Ad Details</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none bg-white"
                  >
                    <option value="">Select Category</option>
                    {["Vehicles", "Properties & Land", "Home & Annex", "Electronics", "Hotel & Tourism",
                      "Jobs & Vacancy", "Spare Parts", "Gym & Fitness", "Grocery", "Education",
                      "Agriculture", "Health & Beauty", "Pets", "Wedding Services", "Foods & Beverages", "Home Decor"
                    ].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ad Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Toyota Corolla 2019 - Excellent Condition"
                  value={formData.adTitle}
                  onChange={(e) => setFormData((p) => ({ ...p, adTitle: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              {/* Plan Summary */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="font-bold text-orange-800 text-sm mb-2">Selected Plan: {plan.name}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{plan.name} Plan ({plan.period})</span>
                  <span className="font-bold">{plan.price === 0 ? "Free" : `Rs. ${plan.price.toLocaleString()}`}</span>
                </div>
                {selectedAddOns.map((id) => {
                  const a = addOns.find((x) => x.id === id)!;
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{a.name}</span>
                      <span className="font-bold">Rs. {a.price}</span>
                    </div>
                  );
                })}
                <div className="border-t border-orange-200 mt-2 pt-2 flex justify-between font-black text-orange-800">
                  <span>Total</span>
                  <span>{total === 0 ? "Free" : `Rs. ${total.toLocaleString()}`}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all hover:shadow-lg"
              >
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-black text-gray-900 mb-6">Complete Payment</h2>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === m.id ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"
                    }`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">{m.name}</div>
                      <div className="text-[10px] text-gray-400">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === "card" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 space-y-4">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-orange-500" /> Card Details
                </h3>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                      setFormData((p) => ({ ...p, cardNumber: val }));
                    }}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={formData.expiry}
                      onChange={(e) => setFormData((p) => ({ ...p, expiry: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => setFormData((p) => ({ ...p, cvv: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  Your card details are encrypted and secure
                </div>
              </div>
            )}

            {/* Bank transfer info */}
            {paymentMethod === "bank" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Bank Transfer Details</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Bank", "Commercial Bank of Ceylon"],
                    ["Account Name", "WebAds (Pvt) Ltd"],
                    ["Account Number", "1234567890"],
                    ["Branch", "Colombo 03"],
                    ["Reference", "WADS-2025-001"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-bold text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-orange-600 mt-3 bg-orange-50 p-2 rounded-lg">
                  After transfer, upload your receipt and we'll activate your ad within 2 hours.
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-4">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{plan.name} Plan ({plan.period})</span>
                  <span>{plan.price === 0 ? "Free" : `Rs. ${plan.price.toLocaleString()}`}</span>
                </div>
                {selectedAddOns.map((id) => {
                  const a = addOns.find((x) => x.id === id)!;
                  return (
                    <div key={id} className="flex justify-between">
                      <span className="text-gray-600">{a.name}</span>
                      <span>Rs. {a.price}</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-300 pt-2 flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span className="text-orange-600">{total === 0 ? "Free" : `Rs. ${total.toLocaleString()}`}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all hover:shadow-lg text-sm"
              >
                <Shield className="w-4 h-4" />
                {total === 0 ? "Publish Free Ad" : `Pay Rs. ${total.toLocaleString()} & Publish`}
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-lg font-black text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  {faqOpen === i ? (
                    <ChevronUp className="w-4 h-4 text-orange-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {faqOpen === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
