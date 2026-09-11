"use client";

import Link from "next/link";
import {
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  LogOut,
  Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import { openCustomerAuthModal } from "@/lib/authModal";

type CartItem = {
  productId: number;
  quantity: number;
};

type Customer = {
  name?: string;
  email?: string;
};

export default function UserActions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function loadWishlistCount() {
      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setWishlistCount(wishlist.length);
    }

    function loadCartCount() {
      const cart: CartItem[] = JSON.parse(
        localStorage.getItem("balmitra_cart") || "[]"
      );
      const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(count);
    }

    function loadCustomer() {
      const token = localStorage.getItem("customer_token");
      if (!token) {
        setCustomer(null);
        setIsLoggedIn(false);
        return;
      }

      try {
        const storedCustomer = localStorage.getItem("customer");
        if (storedCustomer) {
          setCustomer(JSON.parse(storedCustomer));
        }
        setIsLoggedIn(true);
      } catch {
        setCustomer(null);
        setIsLoggedIn(false);
      }
    }

    loadCartCount();
    loadWishlistCount();
    loadCustomer();

    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("wishlistUpdated", loadWishlistCount);
    window.addEventListener("userLoggedIn", loadCustomer);
    window.addEventListener("storage", loadCartCount);
    window.addEventListener("storage", loadWishlistCount);
    window.addEventListener("storage", loadCustomer);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("wishlistUpdated", loadWishlistCount);
      window.removeEventListener("userLoggedIn", loadCustomer);
      window.removeEventListener("storage", loadCartCount);
      window.removeEventListener("storage", loadWishlistCount);
      window.removeEventListener("storage", loadCustomer);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("customer");
    localStorage.removeItem("customer_token");
    setCustomer(null);
    setIsLoggedIn(false);
    setMenuOpen(false);
    window.location.href = "/";
  }

  return (
    <div className="flex items-center gap-5">

      {/* WISHLIST */}

      <Link
        href="/wishlist"
        className="relative flex items-center justify-center"
      >
        <Heart
          size={22}
          className="transition hover:text-pink-500"
        />

        {wishlistCount > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-semibold text-white">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* CART */}

      <Link
        href="/cart"
        className="relative flex items-center justify-center"
      >
        <ShoppingCart
          size={22}
          className="transition hover:text-[#C67C2E]"
        />

        {cartCount > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C67C2E] px-1 text-xs font-semibold text-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      {/* LOGGED IN USER */}
      {customer ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-3.5 py-1.5 text-xs font-bold text-gray-800 transition hover:bg-orange-100/70"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-[10px] font-black text-white">
              {(customer.name || "U")[0].toUpperCase()}
            </div>
            <span className="hidden sm:inline-block max-w-[100px] truncate">
              {customer.name?.split(" ")[0]}
            </span>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {customer.name}
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  {customer.email}
                </p>
              </div>

              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                <Package size={15} />
                My Orders
              </Link>

              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                <User size={15} />
                My Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition mt-1 border-t border-gray-100"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => openCustomerAuthModal({ defaultTab: "login" })}
          className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50/70 px-3.5 py-1.5 text-xs font-bold text-pink-600 transition hover:bg-pink-100 hover:border-pink-300"
        >
          <User size={15} />
          <span className="hidden sm:inline"> Sign.In</span>
        </button>
      )}
    </div>
  );
}