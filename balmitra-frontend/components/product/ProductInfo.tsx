"use client";

import { Heart, Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type ProductInfoProps = {
  product: any;
};

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const price = Number(product.discountPrice || product.price);

  const originalPrice = Number(product.price);

  const discount =
    product.discountPrice
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  function addToCart() {
    const cart = JSON.parse(
      localStorage.getItem("balmitra_cart") ||
        "[]"
    );

    const existingIndex = cart.findIndex(
      (item: any) =>
        item.productId === product.id
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price,
        originalPrice,
        quantity,
        thumbnail: product.thumbnail || product.images?.[0]?.url,
        stock: product.stock || 10,
        product,
      });
    }

    localStorage.setItem(
      "balmitra_cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    toast.success("Added to cart");
  }

  function addToWishlist() {
    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") ||
        "[]"
    );

    const exists = wishlist.some(
      (item: any) => item.id === product.id
    );

    if (exists) {
      toast("Already in wishlist");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    toast.success("Added to wishlist ❤️");
  }

  return (
    <div>
      <p className="text-sm font-semibold text-pink-500">
        {product.brand || "Balmitra Kids"}
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-2">
        <Star
          size={18}
          className="fill-yellow-400 text-yellow-400"
        />

        <span>4.8</span>

        <span className="text-gray-400">
          (0 Reviews)
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-4xl font-bold">
          ₹{price}
        </span>

        {product.discountPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">
              ₹{originalPrice}
            </span>

            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-500">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      <div className="mt-6">
        <p
          className={`font-medium ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `✔ In Stock (${product.stock})`
            : "Out Of Stock"}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg">
          Product Description
        </h3>

        <p className="mt-2 text-gray-600 leading-relaxed">
          {product.description ||
            "No description available"}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">
          Quantity
        </h3>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setQuantity(
                Math.max(1, quantity - 1)
              )
            }
            className="h-10 w-10 rounded-xl border"
          >
            -
          </button>

          <span className="font-semibold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
            className="h-10 w-10 rounded-xl border"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={addToCart}
          className="flex-1 rounded-2xl bg-pink-500 py-4 font-semibold text-white"
        >
          Add To Cart
        </button>

        <button
          onClick={addToWishlist}
          className="rounded-2xl border p-4"
        >
          <Heart />
        </button>
      </div>

      <button
        onClick={addToCart}
        className="mt-4 w-full rounded-2xl bg-black py-4 font-semibold text-white"
      >
        Buy Now
      </button>
    </div>
  );
}