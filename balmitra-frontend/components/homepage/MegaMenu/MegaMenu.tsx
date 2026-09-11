"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { Sparkles } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function MegaMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
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
        console.error("Failed to load categories in MegaMenu:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (loading || categories.length === 0) {
    return (
      <div className="border-b bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-3 flex gap-6 text-sm text-gray-400">
          <Link href="/products" className="font-semibold text-pink-600 hover:underline flex items-center gap-1.5">
            <Sparkles size={14} />
            All Products
          </Link>
          <Link href="/products?type=flash-sale" className="hover:text-red-500">⚡ Flash Sale</Link>
          <Link href="/products?type=trending" className="hover:text-pink-600">🔥 Trending</Link>
          <Link href="/products?type=featured" className="hover:text-pink-600">✨ Featured</Link>
          <Link href="/products?type=new-arrivals" className="hover:text-pink-600">🆕 New Arrivals</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-white shadow-xs">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex gap-7 overflow-x-auto px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap scrollbar-none items-center">
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-pink-600 hover:text-pink-700 transition"
          >
            <Sparkles size={14} />
            All Products
          </Link>

          <span className="text-gray-300">|</span>

          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${item.slug}`}
              className="text-gray-700 transition hover:text-pink-600"
            >
              {item.name}
            </Link>
          ))}

          <span className="text-gray-300">|</span>

          <Link href="/products?type=flash-sale" className="text-red-500 font-bold hover:text-red-600 transition">
            ⚡ Flash Sale
          </Link>

          <Link href="/become-a-vendor" className="text-blue-600 font-medium hover:underline text-xs">
            Sell with Us
          </Link>

          <Link href="/franchise" className="text-purple-600 font-medium hover:underline text-xs">
            Open Franchise
          </Link>
        </div>
      </div>
    </div>
  );
}