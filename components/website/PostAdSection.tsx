"use client";

import { useState } from "react";
import {
  ChevronRight,
  Upload,
  X,
  CheckCircle,
  Camera,
  MapPin,
  Tag,
  FileText,
  Check,
  Shield,
  CreditCard,
} from "lucide-react";
import { categories, districts } from "../../data/categories";
import Link from "next/link";
import Image from "next/image";

const steps = ["Category", "Details", "Photos", "Review", "Price", "Payment"];

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
    color: "from-red-500 to-red-600",
    border: "border-red-300",
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
  {
    id: "bump",
    name: "Ad Bump",
    desc: "Push your ad to the top every 3 days",
    price: 299,
    icon: "🚀",
  },
  {
    id: "highlight",
    name: "Highlight",
    desc: "Gold highlighted border on your ad",
    price: 199,
    icon: "✨",
  },
  {
    id: "urgent",
    name: "Urgent Tag",
    desc: "Mark your ad as urgent for more attention",
    price: 149,
    icon: "🔴",
  },
  {
    id: "social",
    name: "Social Boost",
    desc: "Share on our Facebook & Instagram pages",
    price: 499,
    icon: "📱",
  },
];

const paymentMethods = [
  {
    id: "card",
    name: "Credit / Debit Card",
    icon: "💳",
    desc: "Visa, Mastercard, Amex",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: "🏦",
    desc: "Online banking transfer",
  },
  { id: "dialog", name: "Dialog Genie", icon: "📱", desc: "Mobile payment" },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: "💵",
    desc: "Pay at our office",
  },
];

export default function PostAdSection() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    price: "",
    negotiable: false,
    district: "",
    location: "",
    name: "",
    phone: "",
    images: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adTitle: "",
    category: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const a = addOns.find((x) => x.id === id);
    return sum + (a?.price || 0);
  }, 0);
  const total = plan.price + addOnTotal;

  const selectedCat = categories.find((c) => c.name === form.category);

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-10 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ad Posted Successfully!
          </h2>
          <p className="text-gray-500 mb-2">
            Your ad is now live and visible to buyers across Sri Lanka.
          </p>
          {/* <p className="text-sm text-gray-400 mb-8">Ad reference: #WA{Math.floor(Math.random() * 90000) + 10000}</p> */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="bg-[#1a237e] hover:bg-[#283593] text-white font-bold py-3 rounded-xl transition-colors"
            >
              View My Ad
            </Link>
            <Link
              href="/"
              className="bg-[#1a237e] hover:bg-[#283593] text-white font-bold py-3 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm({
                  category: "",
                  subcategory: "",
                  title: "",
                  description: "",
                  price: "",
                  negotiable: false,
                  district: "",
                  location: "",
                  name: "",
                  phone: "",
                  images: [],
                });
              }}
              className="border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Post Another Ad
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#1a237e]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Post an Ad</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Post Your Free Ad
        </h1>

        {/* Step indicator */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      i < step
                        ? "bg-green-500 text-white"
                        : i === step
                          ? "bg-[#1a237e] text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${i === step ? "text-[#1a237e]" : i < step ? "text-green-600" : "text-gray-400"}`}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-green-400" : "bg-gray-100"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          {/* Step 0: Category */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Tag size={20} className="text-[#1a237e]" /> Select a Category
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Choose the best category for your ad
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      update("category", cat.name);
                      update("subcategory", "");
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      form.category === cat.name
                        ? "border-[#1a237e] bg-blue-50"
                        : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      {cat.name}
                    </p>
                  </button>
                ))}
              </div>

              {form.category && selectedCat && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Select Subcategory
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCat.subcategories.map((sub) => (
                      <button
                        key={sub.subSlug}
                        onClick={() => update("subcategory", sub.subSlug)}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                          form.subcategory === sub.subSlug
                            ? "border-[#1a237e] bg-[#1a237e] text-white"
                            : "border-gray-200 text-gray-600 hover:border-[#1a237e] hover:text-[#1a237e]"
                        }`}
                      >
                        {sub.subName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                <FileText size={20} className="text-[#1a237e]" /> Ad Details
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Provide accurate details to attract buyers
              </p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. Toyota Aqua 2019, Brand new iPhone 15..."
                    maxLength={70}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {form.title.length}/70
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={5}
                    placeholder="Describe your item in detail – condition, features, reason for selling..."
                    maxLength={2000}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e] resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {form.description.length}/2000
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="07X XXX XXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin
                        size={14}
                        className="inline mr-1 text-[#1a237e]"
                      />{" "}
                      District <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.district}
                      onChange={(e) => update("district", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e] appearance-none cursor-pointer"
                    >
                      <option value="">Select district...</option>
                      {districts
                        .filter((d) => d.id !== "all")
                        .map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City / Town <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="e.g. Colombo 03, Kandy City..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Camera size={20} className="text-[#1a237e]" /> Add Photos
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Ads with photos get 10x more views. Add up to 10 images.
              </p>

              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#1a237e] transition-colors cursor-pointer">
                <Upload size={32} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-gray-700">
                  Click to upload photos
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG up to 10MB each
                </p>
                <button className="mt-4 bg-[#1a237e] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#283593] transition-colors">
                  Browse Photos
                </button>
              </div>

              {form.images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {form.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={img}
                        alt=""
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            images: f.images.filter((_, j) => j !== i),
                          }))
                        }
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a237e] mb-2">
                  📸 Photo Tips
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Use clear, well-lit photos</li>
                  <li>• Show the item from multiple angles</li>
                  <li>• First photo will be the main display image</li>
                  <li>• Avoid adding text overlays to photos</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Review Your Ad
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Please confirm the details before posting
              </p>

              <div className="space-y-4">
                {[
                  {
                    label: "Category",
                    value: form.category
                      ? `${form.category}${form.subcategory ? " › " + form.subcategory : ""}`
                      : "Not selected",
                  },
                  { label: "Title", value: form.title || "Not provided" },
                  {
                    label: "Description",
                    value: form.description
                      ? form.description.substring(0, 100) +
                        (form.description.length > 100 ? "..." : "")
                      : "Not provided",
                  },
                  {
                    label: "Price",
                    value: form.negotiable
                      ? "Negotiable"
                      : form.price
                        ? `Rs. ${Number(form.price).toLocaleString()}`
                        : "Not set",
                  },
                  {
                    label: "Location",
                    value:
                      form.location && form.district
                        ? `${form.location}, ${form.district}`
                        : "Not provided",
                  },
                  {
                    label: "Contact",
                    value:
                      form.name && form.phone
                        ? `${form.name} – ${form.phone}`
                        : "Not provided",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 py-3 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-gray-900 flex-1">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800">
                  By posting this ad, you agree to our{" "}
                  <Link href="/terms" className="underline">
                    Terms of Use
                  </Link>{" "}
                  and confirm that your listing complies with our guidelines.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Price*/}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-gray-900 text-center mb-6">
                Select Your Plan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={`relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${
                      selectedPlan === p.id
                        ? `${p.border} shadow-xl`
                        : "border-gray-200 shadow-sm"
                    }`}
                  >
                    {p.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span
                          className={`px-3 py-1 bg-gradient-to-r ${p.color} text-white text-xs font-bold rounded-full shadow`}
                        >
                          {p.badge}
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{p.icon}</div>
                      <h3 className="font-black text-lg text-gray-900">
                        {p.name}
                      </h3>
                      <div className="mt-2">
                        {p.price === 0 ? (
                          <span className="text-32xl font-black text-gray-900">
                            Free
                          </span>
                        ) : (
                          <>
                            <span className="text-2xl font-black text-gray-900">
                              Rs. {p.price.toLocaleString()}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {" "}
                              / {p.period}
                            </span>
                          </>
                        )}
                      </div>
                      {p.price > 0 && (
                        <div className="text-xs text-gray-400 mt-0.5">
                          for {p.period}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {p.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-green-600" />
                          </div>
                          {f}
                        </div>
                      ))}
                      {p.disabled.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2 text-sm text-gray-400 line-through"
                        >
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
                <h3 className="text-lg font-black text-gray-900 mb-3">
                  🚀 Boost Your Ad (Optional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => toggleAddOn(a.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddOns.includes(a.id)
                          ? "text-[#1a237e] text-[#1a237e]"
                          : "border-gray-200 bg-white hover:border-[#1a237e] hover:bg-[#1a237e]/10"
                      }`}
                    >
                      <div className="text-2xl">{a.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-gray-900">
                          {a.name}
                        </div>
                        <div className="text-xs text-gray-500">{a.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-[#1a237e] text-sm">
                          Rs. {a.price}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ml-auto ${
                            selectedAddOns.includes(a.id)
                              ? "bg-[#1a237e] border-[#1a237e]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAddOns.includes(a.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
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
                    <div className="text-xs text-gray-400">
                      Plan + {selectedAddOns.length} add-on(s)
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-black text-gray-900 mb-6">
                Complete Payment
              </h2>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">
                  Select Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? "border-[#1a237e] bg-[#1a237e]/10"
                          : "border-gray-200 hover:border-[#1a237e]/50"
                      }`}
                    >
                      <span className="text-xl">{m.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-gray-800">
                          {m.name}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {m.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 space-y-4">
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#1a237e]" /> Card
                    Details
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(.{4})/g, "$1 ")
                          .trim();
                        setFormData((p) => ({ ...p, cardNumber: val }));
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/100 outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, expiry: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, cvv: e.target.value }))
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/100 outline-none"
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
                  <h3 className="font-bold text-gray-900 text-sm mb-3">
                    Bank Transfer Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      ["Bank", "Commercial Bank of Ceylon"],
                      ["Account Name", "WebAds (Pvt) Ltd"],
                      ["Account Number", "1234567890"],
                      ["Branch", "Colombo 03"],
                      ["Reference", "WADS-2025-001"],
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        className="flex justify-between py-1 border-b border-gray-100"
                      >
                        <span className="text-gray-500">{label}</span>
                        <span className="font-bold text-gray-900">{val}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#1a237e] mt-3 bg-[#1a237e]/10] p-2 rounded-lg">
                    After transfer, upload your receipt and we&apos;ll activate
                    your ad within 2 hours.
                  </p>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {plan.name} Plan ({plan.period})
                    </span>
                    <span>
                      {plan.price === 0
                        ? "Free"
                        : `Rs. ${plan.price.toLocaleString()}`}
                    </span>
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
                    <span className="text-[#1a237e]">
                      {total === 0 ? "Free" : `Rs. ${total.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 0 && !form.category}
                className="px-8 py-2.5 rounded-xl bg-[#1a237e] hover:bg-[#283593] text-white font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                  {total === 0
                    ? "Publish Free Ad"
                    : `Pay Rs. ${total.toLocaleString()} & Publish`}

              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
