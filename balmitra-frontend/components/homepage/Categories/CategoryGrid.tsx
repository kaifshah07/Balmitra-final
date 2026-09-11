"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, productImageUrl } from "@/lib/api";

type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-8 w-48 bg-gray-100 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col items-center">
                <div className="aspect-square w-full rounded-full bg-gray-200 mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop By Category</h2>
          <Link href="/categories" className="text-pink-600 font-semibold text-sm hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group text-center flex flex-col items-center"
            >
              <div className="aspect-square w-full overflow-hidden rounded-full border-4 border-pink-100 shadow-sm transition group-hover:scale-105 group-hover:border-pink-300">
                <img
                  src={productImageUrl(cat.image)}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mt-2.5 text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}