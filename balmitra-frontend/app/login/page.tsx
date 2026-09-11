"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { loginCustomer } from "../admin/services/api/customerAuth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await loginCustomer(form);

      if (!result.success || !result.data?.token) {
        throw new Error(result.message || "Login failed");
      }

      const token = result.data.token;
      localStorage.setItem("customer_token", token);

      const customer = result.data.customer;
      if (customer) {
        localStorage.setItem("customer", JSON.stringify(customer));
      }

      window.dispatchEvent(new Event("userLoggedIn"));
      window.dispatchEvent(new Event("storage"));
      toast.success(`Welcome back, ${customer?.name || "Friend"}! 🎉`);

      // Check if cart has items to redirect to checkout, else go to home
      const cart = JSON.parse(localStorage.getItem("balmitra_cart") || "[]");
      if (cart.length > 0) {
        router.push("/cart");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* BRAND BADGE */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-3xl bg-pink-100 text-pink-600 mb-3 shadow-inner">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome Back!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to access your bag, saved wishlist, and kids club perks.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl shadow-pink-500/5">
          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="parent@example.com"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-10 py-3 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 py-4 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.01] active:scale-95 disabled:opacity-60"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  <span>Sign In & Continue</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* PERKS STRIP */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-pink-50/50 p-2 text-[11px] font-bold text-pink-700">
                <ShoppingBag size={14} className="mx-auto mb-1 text-pink-500" />
                Free Shipping
              </div>
              <div className="rounded-xl bg-amber-50/50 p-2 text-[11px] font-bold text-amber-700">
                <ShieldCheck size={14} className="mx-auto mb-1 text-amber-500" />
                Safe & Secure
              </div>
              <div className="rounded-xl bg-purple-50/50 p-2 text-[11px] font-bold text-purple-700">
                <Heart size={14} className="mx-auto mb-1 text-purple-500" />
                Kids Rewards
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-medium text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-pink-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
