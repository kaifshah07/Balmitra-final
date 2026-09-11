"use client";

import { ShieldCheck, Truck, RotateCcw, Award, Lock, Sparkles, HeartHandshake } from "lucide-react";

const trustItems = [
  { icon: Truck, title: "Fast Delivery", subtitle: "Dispatched within 24-48 hours" },
  { icon: Lock, title: "Secure Payments", subtitle: "256-bit encrypted transactions" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "7-day doorstep replacement policy" },
  { icon: Award, title: "100% Genuine Products", subtitle: "Direct from verified suppliers" },
  { icon: HeartHandshake, title: "50,000+ Happy Parents", subtitle: "Rated 4.8/5 on trusted review channels" },
  { icon: ShieldCheck, title: "Safe Materials for Kids", subtitle: "BPA-free, non-toxic standards" },
];

export default function TrustSectionAdmin() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Trust & Credibility Section
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Parent reassurance badges displayed across the homepage and product pages to drive buyer confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                <Icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                <span className="mt-3 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                  Displayed
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}