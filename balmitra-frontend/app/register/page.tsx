"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { registerCustomer } from "../admin/services/api/customerAuth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (form.phone.replace(/\D/g, "").length !== 10) {
        setError("Phone number must be exactly 10 digits");
        setLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const result = await registerCustomer({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });

      if (!result.success) {
        throw new Error(result.message || "Registration failed");
      }

      if (result.data?.requiresVerification) {
        toast.success("Verification OTP sent to your email!");
        router.push(
          `/verify-otp?customerId=${result.data.customerId}&email=${encodeURIComponent(
            result.data.email
          )}`
        );
        return;
      }

      if (result.data?.token) {
        localStorage.setItem("customer_token", result.data.token);
        if (result.data.customer) {
          localStorage.setItem(
            "customer",
            JSON.stringify(result.data.customer)
          );
        }
        window.dispatchEvent(new Event("userLoggedIn"));
        window.dispatchEvent(new Event("storage"));
        toast.success("Account created successfully! 🎉");
        router.push("/");
        return;
      }

      throw new Error("Unexpected registration response");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed. Please check your details."
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
            Join Balmitra Kids!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create an account to enjoy fast checkout & exclusive offers.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl shadow-pink-500/5">
          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-400"
                />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Kaif Shah"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
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
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mobile Number (10 digits)
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-400"
                />
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  placeholder="9876543210"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password (min 6 characters)
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
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-10 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
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

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-3.5 text-gray-400"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 py-4 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.01] active:scale-95 disabled:opacity-60"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <span>Create Account & Verify</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-semibold text-gray-400">
            <ShieldCheck size={14} className="text-green-500" />
            <span>100% Privacy Protected • No Spam</span>
          </div>

          <p className="mt-6 text-center text-xs font-medium text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-pink-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
