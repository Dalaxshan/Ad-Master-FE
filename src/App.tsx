import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SingleAdPage from "./pages/SingleAdPage";
import PaymentPage from "./pages/PaymentPage";
import ContactPage from "./pages/ContactPage";

type Page = "home" | "category" | "single" | "payment" | "contact" | "login" | "register";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("vehicles");
  const [currentAdId, setCurrentAdId] = useState<string>("1");

  const navigate = (page: string, categoryId?: string, adId?: string) => {
    setCurrentPage(page as Page);
    if (categoryId) setCurrentCategoryId(categoryId);
    if (adId) setCurrentAdId(adId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "category":
        return <CategoryPage categoryId={currentCategoryId} onNavigate={navigate} />;
      case "single":
        return <SingleAdPage adId={currentAdId} onNavigate={navigate} />;
      case "payment":
        return <PaymentPage onNavigate={navigate} />;
      case "contact":
        return <ContactPage onNavigate={navigate} />;
      case "login":
        return <AuthModal type="login" onNavigate={navigate} />;
      case "register":
        return <AuthModal type="register" onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={navigate} currentPage={currentPage} />
      <main className="flex-1 pt-[120px] md:pt-[108px]">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

// Auth Modal (inline for brevity)
function AuthModal({ type, onNavigate }: { type: "login" | "register"; onNavigate: (page: string) => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-200">
            <span className="text-2xl">📢</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">
            {type === "login" ? "Welcome Back!" : "Join WebAds"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {type === "login"
              ? "Sign in to manage your ads and reach buyers"
              : "Create an account and start selling today"}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {type === "login" ? "Logged In!" : "Account Created!"}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {type === "login"
                ? "Welcome back! You're now signed in."
                : "Your account is ready. Start exploring!"}
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              {type === "register" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              {type === "register" && (
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
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              {type === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-orange-600 hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all hover:shadow-lg mt-2"
              >
                {type === "login" ? "Sign In" : "Create Account"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  🇬 Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  📘 Facebook
                </button>
              </div>
            </form>

            <div className="text-center mt-5 pt-5 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {type === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => onNavigate(type === "login" ? "register" : "login")}
                  className="text-orange-600 font-bold hover:underline"
                >
                  {type === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
