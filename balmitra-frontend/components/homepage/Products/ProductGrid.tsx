"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { API_URL, productImageUrl } from "@/lib/api";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  thumbnail?: string | null;
  price: number;
  discountPrice?: number | null;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
};

type ProductGridProps = {
  title?: string;
  type?: "featured" | "trending" | "new-arrivals" | "best-sellers" | "all";
};

export default function ProductGrid({
  title = "🔥 Trending Products",
  type = "trending",
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [type]);

  async function loadProducts() {
    try {
      setLoading(true);
      let endpoint = `${API_URL}/products`;

      if (type && type !== "all") {
        endpoint = `${API_URL}/homepage/products/${type}`;
      }

      const response = await fetch(endpoint);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(`Failed to load ${type} products:`, error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If section has no assigned products, hide it cleanly (strict mutual exclusivity)
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>

          <Link href={`/products?type=${type}`}>
            <span className="text-pink-600 font-semibold text-sm hover:underline cursor-pointer">
              View All →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => {
            const price = Number(product.discountPrice ?? product.price);
            const origPrice = Number(product.price);
            const discountPct =
              product.discountPrice && origPrice > 0
                ? Math.round(((origPrice - price) / origPrice) * 100)
                : 0;

            return (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  image: productImageUrl(product.thumbnail),
                  price,
                  originalPrice: origPrice,
                  discount: discountPct,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}