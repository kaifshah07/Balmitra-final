"use client";

import { useEffect, useState } from "react";
import { API_URL, productImageUrl } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

type FlashProduct = {
  id: number;
  name: string;
  thumbnail?: string | null;
  price: number;
  discountPrice?: number | null;
  stock?: number;
};

export default function FlashSale() {
  const [products, setProducts] = useState<FlashProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlashSaleProducts() {
      try {
        const res = await fetch(`${API_URL}/homepage/products/flash-sale`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Failed to load flash sale products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFlashSaleProducts();
  }, []);

  function handleAddToCart(product: any, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const cart = JSON.parse(localStorage.getItem("balmitra_cart") || "[]");
      const existingIndex = cart.findIndex((item: any) => item.productId === product.id);

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          thumbnail: product.image,
          stock: 99,
        });
      }

      localStorage.setItem("balmitra_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success(`${product.name} added to cart! 🛒`);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <section className="py-10 bg-[#fff7f7]">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="h-8 w-48 bg-red-100 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm">
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

  if (products.length === 0) {
    return null;
  }

  const displayProducts = products.map((p) => {
    const sellingPrice = Number(p.discountPrice ?? p.price);
    const origPrice = Number(p.price);
    const discountPct =
      p.discountPrice && origPrice > 0
        ? Math.round(((origPrice - sellingPrice) / origPrice) * 100)
        : 0;
    return {
      id: p.id,
      name: p.name,
      image: productImageUrl(p.thumbnail),
      price: sellingPrice,
      originalPrice: origPrice,
      discount: discountPct,
    };
  });

  return (
    <section className="py-10 bg-[#fff7f7]">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-500">⚡ Flash Sale</h2>
            <p className="mt-1 text-sm text-gray-500">Limited Time Offers</p>
          </div>

          <Link href="/products?type=flash-sale">
            <button className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 transition shadow-sm">
              View All →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {displayProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col h-full">
                <div className="relative">
                  {product.discount > 0 && (
                    <div className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      {product.discount}% OFF
                    </div>
                  )}

                  <div className="overflow-hidden aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-bold text-red-500">
                        ₹{product.price}
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(product, e)}
                    className="mt-3 w-full rounded-xl bg-red-50 py-2 text-xs font-bold text-red-600 hover:bg-red-500 hover:text-white transition"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}