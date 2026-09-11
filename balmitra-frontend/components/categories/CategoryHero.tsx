"use client";

import Link from "next/link";

interface CategoryHeroProps {
  title?: string;
  description?: string | null;
  productCount?: number;
}

export default function CategoryHero({
  title = "Kids Collection",
  description = "Explore premium products designed specially for your little ones.",
  productCount = 0,
}: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-20 top-10 h-32 w-32 rounded-full bg-white" />
        <div className="absolute right-20 bottom-10 h-40 w-40 rounded-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 relative z-10">
        <div className="flex items-center gap-2 text-xs text-white/80 mb-3">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-white">Categories</Link>
          <span>/</span>
          <span className="text-white font-semibold">{title}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-base md:text-lg text-white/95 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-6 flex gap-3 flex-wrap text-sm">
          <div className="rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 font-medium text-white shadow-sm">
            {productCount} Products Available
          </div>

          <div className="rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 font-medium text-white shadow-sm">
            100% Genuine
          </div>

          <div className="rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 font-medium text-white shadow-sm">
            Fast Delivery
          </div>
        </div>
      </div>
    </section>
  );
}