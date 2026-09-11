"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  thumbnail: string;
  stock: number;
  product: any;
};

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("balmitra_cart") || "[]");
    setCart(savedCart);
    setMounted(true);

    const handleStorage = () => {
      setCart(JSON.parse(localStorage.getItem("balmitra_cart") || "[]"));
    };
    window.addEventListener("cartUpdated", handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("cartUpdated", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("balmitra_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (id: number) => {
    const newCart = cart.map(item => {
      if (item.productId === id && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    saveCart(newCart);
  };

  const decreaseQuantity = (id: number) => {
    const newCart = cart.map(item => {
      if (item.productId === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    saveCart(newCart);
  };

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.productId !== id);
    saveCart(newCart);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // Before shipping/discounts
  const isFreeShipping = total >= 499;
  const shipping = isFreeShipping ? 0 : 50;
  const grandTotal = total + shipping;
  const progressToFree = Math.min((total / 499) * 100, 100);

  function handleProceedToCheckout() {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      window.dispatchEvent(new CustomEvent("openCustomerAuthModal"));
    } else {
      router.push("/checkout");
    }
  }

  if (!mounted) return null;

  return (
    <main className="min-h-[80vh] bg-[#F7F8FA] px-4 py-10 font-sans">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">
          Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? "item" : "items"})
        </h1>

        {cart.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm border border-black/5">
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-pink-50">
              <ShoppingBag size={56} className="text-pink-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Your cart is empty!</h2>
            <p className="mt-3 max-w-sm text-gray-500">
              Looks like you haven't added anything to your cart yet. Let's fix that!
            </p>
            <Link
              href="/products"
              className="mt-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 px-10 py-4 font-bold text-white shadow-lg shadow-pink-500/25 transition hover:scale-105 active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* LEFT COLUMN: ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* FREE SHIPPING PROGRESS */}
              <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-bold text-gray-900">
                      {isFreeShipping ? (
                        <span className="flex items-center gap-2 text-green-700">
                          <CheckCircle2 size={20} /> You've unlocked FREE Shipping!
                        </span>
                      ) : (
                        <span>Add <span className="text-orange-600">₹{(499 - total).toFixed(2)}</span> more to unlock FREE Shipping</span>
                      )}
                    </p>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-orange-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500 ease-out"
                      style={{ width: `${progressToFree}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* CART ITEMS */}
              {cart.map((item) => {
                const itemPrice = item.price;
                const originalPrice = item.originalPrice || itemPrice;
                const imageUrl = item.thumbnail || "";

                return (
                  <div
                    key={item.productId}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    {/* THUMBNAIL */}
                    <Link
                      href={`/products/${item.productId}`}
                      className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden"
                    >
                      {imageUrl ? (
                          <Image src={imageUrl} alt={item.name} width={112} height={112} unoptimized className="h-full w-full object-contain p-1" />
                      ) : (
                          <ShoppingBag className="text-gray-300" size={32} />
                      )}
                    </Link>

                    {/* DETAILS */}
                    <div className="flex-1 min-w-0 w-full">
                      <Link
                        href={`/products/${item.productId}`}
                        className="font-bold text-gray-900 hover:text-orange-500 transition line-clamp-1 text-lg"
                      >
                        {item.name}
                      </Link>

                      {/* PRICE */}
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-xl font-black text-[#0B1220]">₹{itemPrice.toFixed(2)}</span>
                        {originalPrice > itemPrice && (
                          <span className="text-sm font-semibold text-gray-400 line-through">₹{originalPrice.toFixed(2)}</span>
                        )}
                        {item.stock <= 5 && item.stock > 0 && (
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                            Only {item.stock} left!
                          </span>
                        )}
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.productId)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-orange-600 transition shadow-sm bg-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-[40px] text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.productId)}
                            disabled={item.quantity >= item.stock}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-orange-600 transition shadow-sm bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-red-500 transition px-3 py-1.5 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 size={16} /> <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* TRUST STRIP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 border border-black/5 text-center shadow-sm">
                  <ShieldCheck size={28} className="text-green-500" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-gray-700">100% Genuine Brands</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 border border-black/5 text-center shadow-sm">
                  <Truck size={28} className="text-orange-500" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-gray-700">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 border border-black/5 text-center shadow-sm">
                  <RotateCcw size={28} className="text-blue-500" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-gray-700">7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="h-fit space-y-6">
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-6">
                  Price Details
                </h2>

                <div className="space-y-4 text-sm font-medium text-gray-600">
                  <div className="flex justify-between">
                    <span>Bag Total</span>
                    <span className="font-bold text-[#0B1220]">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Delivery Fee</span>
                    <span className={shipping === 0 ? "font-bold text-green-600" : "font-bold text-[#0B1220]"}>
                      {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-5 mt-2 flex justify-between items-center text-lg font-black text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-orange-500 text-2xl">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1220] py-4 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <p className="mt-4 text-center text-xs font-medium text-gray-400">
                  Safe and secure payments • Free returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
