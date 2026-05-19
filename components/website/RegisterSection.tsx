"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ChevronRight,
  CheckCircle,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/auth.api";
import { DISTRICT_OPTIONS } from "@/enums/districts";

export default function RegisterSection() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authApi.register(form);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created!
          </h2>
          <p className="text-gray-500 mb-6">
            Welcome to AdMaster! Your account is ready.
          </p>
          <Link
            href="/"
            className="bg-[#1a237e] hover:bg-[#283593] text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Start Browsing
          </Link>
        </div>
      </div>
    );
  }

  const passwordStrength =
    form.password.length === 0
      ? 0
      : form.password.length < 6
        ? 1
        : form.password.length < 10
          ? 2
          : 3;
  const strengthLabels = ["", "Weak", "Good", "Strong"];
  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-green-500"];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 justify-center">
          <Link href="/" className="hover:text-[#1a237e]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Register</span>
        </nav>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="AD Master Logo"
                width={180}
                height={12}
              />
            </Link>
            <h1 className="text-xl font-bold text-gray-900 mt-4">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Join 850,000+ Sri Lankans buying & selling
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="First Name"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Last Name"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Your address"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    value={form.district}
                    onChange={(e) => update("district", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e] appearance-none bg-white"
                  >
                    <option value="">Select District</option>
                    {DISTRICT_OPTIONS.map((district) => (
                      <option key={district.value} value={district.value}>
                        {district.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) => update("phoneNumber", e.target.value)}
                    placeholder="07X XXX XXXX"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-[#1a237e] focus:ring-1 focus:ring-[#1a237e]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColors[passwordStrength] : "bg-gray-100"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    placeholder="Repeat your password"
                    className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 ${
                      form.confirm && form.confirm !== form.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-300"
                        : "border-gray-200 focus:border-[#1a237e] focus:ring-[#1a237e]"
                    }`}
                  />
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-500">
              By registering, you agree to our{" "}
              <Link href="/terms" className="text-[#1a237e] hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#1a237e] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a237e] hover:bg-[#283593] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Free Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1a237e] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
