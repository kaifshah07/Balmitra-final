"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubscribed(true);
    toast.success("Thank you for subscribing to Balmitra Club! 🎁");
    setEmail("");
  }

  return (
    <section className="py-12 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-4 shadow">
          <Mail size={26} />
        </div>

        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Join The Balmitra Parents Club
        </h2>
        <p className="mt-2 text-sm md:text-base text-pink-100 max-w-lg mx-auto">
          Get weekly curated parenting tips, exclusive new arrivals, and special discount codes right in your inbox.
        </p>

        {subscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md px-6 py-3 font-semibold text-sm">
            <CheckCircle2 size={18} className="text-green-300" />
            You're all set! Check your email for special welcome offers.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-pink-100 outline-none backdrop-blur-md focus:bg-white focus:text-gray-900 focus:placeholder-gray-400"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-pink-600 px-6 py-3 text-sm font-bold shadow hover:bg-gray-50 transition"
            >
              <span>Join</span>
              <Send size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
