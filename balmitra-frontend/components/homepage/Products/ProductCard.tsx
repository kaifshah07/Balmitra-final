"use client";
import { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
  };
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const savings = product.originalPrice - product.price;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setLiked(
        wishlist.some(
          (item: any) => item.id === product.id
        )
      );
    } catch {
      setLiked(false);
    }
  }, [product.id]);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const cart = JSON.parse(
        localStorage.getItem("balmitra_cart") || "[]"
      );

      const existingIndex = cart.findIndex(
        (item: any) => item.productId === product.id
      );

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
      toast.error("Could not add to cart");
    }
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const exists = wishlist.some(
        (item: any) => item.id === product.id
      );

      let updated;
      if (exists) {
        updated = wishlist.filter(
          (item: any) => item.id !== product.id
        );
        setLiked(false);
        toast("Removed from Wishlist");
      } else {
        updated = [...wishlist, product];
        setLiked(true);
        toast.success("Added to Wishlist ❤️");
      }

      localStorage.setItem("wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <Heart
          size={18}
          className={`transition-all duration-300 ${
            liked
              ? "fill-red-500 text-red-500 scale-125"
              : "text-gray-500 hover:text-pink-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-[#fafafa]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-2 p-3.5">
        {/* Brand */}
        <p className="text-xs font-bold uppercase tracking-wide text-pink-600">
          Balmitra Kids
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium text-gray-800 hover:text-pink-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="text-xs font-medium">4.6</span>
          <span className="text-xs text-gray-400">(128)</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Savings */}
        {savings > 0 && (
          <p className="text-xs font-medium text-green-600">
            Save ₹{savings}
          </p>
        )}

        {/* Button */}
        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-pink-500 py-2.5 text-xs font-bold text-white shadow transition hover:bg-pink-600 active:scale-95"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}