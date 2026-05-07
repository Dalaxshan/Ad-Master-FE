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
  DollarSign,
} from "lucide-react";
import { categories, districts } from "../../data/categories";
import Link from "next/link";

const steps = ["Category", "Details", "Price & Location", "Photos", "Review"];

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

  const selectedCat = categories.find((c) => c.name === form.category);

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

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
      <div className="max-w-3xl mx-auto px-4">
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
                    <p className="text-xs text-gray-400">
                      {cat.count.toLocaleString()} ads
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
                        key={sub}
                        onClick={() => update("subcategory", sub)}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                          form.subcategory === sub
                            ? "border-[#1a237e] bg-[#1a237e] text-white"
                            : "border-gray-200 text-gray-600 hover:border-[#1a237e] hover:text-[#1a237e]"
                        }`}
                      >
                        {sub}
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
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Price & Location */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                <DollarSign size={20} className="text-[#1a237e]" /> Price &
                Location
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Set your price and location
              </p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (Rs.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                      placeholder="0"
                      disabled={form.negotiable}
                      className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e] disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </div>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.negotiable}
                      onChange={(e) => update("negotiable", e.target.checked)}
                      className="w-4 h-4 accent-[#1a237e]"
                    />
                    <span className="text-sm text-gray-700">
                      Price is negotiable / Contact for price
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={14} className="inline mr-1 text-[#1a237e]" />{" "}
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
          )}

          {/* Step 3: Photos */}
          {step === 3 && (
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
                      <img
                        src={img}
                        alt=""
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

          {/* Step 4: Review */}
          {step === 4 && (
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
                className="px-8 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors text-sm"
              >
                Post Ad Now 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
