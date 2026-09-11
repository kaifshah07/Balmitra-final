"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  const token =
    localStorage.getItem("customer_token");

  if (!token) {
    alert(
      "Please login to access your wishlist"
    );

    router.push("/login");
    return;
  }

  const stored = JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  );

  setProducts(stored);
}, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-2">
  My Wishlist ❤️
</h1>

<p className="text-gray-500 mb-8">
  {products.length} item(s) saved
</p>

      {products.length === 0 ? (
  <div className="text-center py-20 w-full col-span-full">

    <h2 className="text-3xl font-bold">
      Your Wishlist is Empty
    </h2>

    <p className="mt-3 text-gray-500">
      Save products you love ❤️
    </p>

  </div>
) : (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {products.map((product) => (
    <div
      key={product.id}
      className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="line-clamp-2 font-medium">
          {product.name}
        </h3>

        <p className="mt-2 font-bold">
          ₹{product.price}
        </p>

        <button
          onClick={() => {
            const updated =
              products.filter(
                (item) =>
                  item.id !== product.id
              );

            setProducts(updated);

            localStorage.setItem(
              "wishlist",
              JSON.stringify(updated)
            );

            window.dispatchEvent(
              new Event("wishlistUpdated")
            );
          }}
          className="mt-3 w-full rounded-xl bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  ))}
</div>
)}
    </div>
  );
}