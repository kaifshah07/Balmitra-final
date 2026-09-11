"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, productImageUrl } from "@/lib/api";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  _count?: {
    products?: number;
    subcategories?: number;
  };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold text-pink-600 mb-4">
            <Layers size={14} />
            Explore Department
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Browse All Categories
          </h1>
          <p className="mt-3 text-base text-gray-600">
            From adorable baby fashion to educational toys and daily essentials, discover everything curated for kids.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800">No categories found</h3>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-bold text-white"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 mb-4">
                  <img
                    src={productImageUrl(cat.image)}
                    alt={cat.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {cat.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold text-pink-600">
                    <span>Explore Products</span>
                    <ArrowRight size={14} className="transition transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}