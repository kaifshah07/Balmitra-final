"use client";

import ProductCard from "@/components/homepage/Products/ProductCard";
import CategoryBanner from "./CategoryBanner";
import { productImageUrl } from "@/lib/api";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface CategoryProductsProps {
  products: any[];
  loading?: boolean;
  totalCount?: number;
  sort?: string;
  onSortChange?: (newSort: string) => void;
}

export default function CategoryProducts({
  products = [],
  loading = false,
  totalCount,
  sort = "newest",
  onSortChange,
}: CategoryProductsProps) {
  const count = totalCount !== undefined ? totalCount : products.length;

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading ? "Loading Products..." : `${count} Products Found`}
        </h2>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-500">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm outline-none focus:border-pink-500"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
            <option value="popular">Popularity</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <CategoryBanner />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-8 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-800">No products found in this category</p>
          <p className="text-sm text-gray-500 mt-1">Check back soon for new arrivals or explore other collections!</p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-pink-600"
          >
            <Sparkles size={16} />
            Explore All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const price = Number(product.discountPrice || product.price);
            const originalPrice = Number(product.price);
            const discount =
              product.discountPrice && originalPrice > 0
                ? Math.round(((originalPrice - price) / originalPrice) * 100)
                : 0;

            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  image: productImageUrl(product.thumbnail),
                  price,
                  originalPrice,
                  discount,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}