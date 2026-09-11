"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  ShoppingBag,
  Package,
  Gift,
  Truck,
  Sparkles,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-orange-50 py-12">

      <div className="mx-auto max-w-5xl px-4">

        {/* Success Card */}

        <div className="overflow-hidden rounded-[40px] bg-white shadow-xl">

          {/* Top Banner */}

          <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-8 py-12 text-center text-white">

            <div className="absolute left-10 top-8 animate-bounce">
              <Gift size={40} />
            </div>

            <div className="absolute right-10 top-8 animate-pulse">
              <Sparkles size={40} />
            </div>

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">

              <CheckCircle
                size={70}
                className="text-green-500"
              />

            </div>

            <h1 className="mt-6 text-4xl font-extrabold">
              Order Placed Successfully 🎉
            </h1>

            <p className="mt-3 text-lg text-pink-100">
              Thank you for shopping with Balmitra
            </p>

          </div>

          {/* Content */}

          <div className="p-8">

            {orderId && (
              <div className="mb-8 rounded-3xl border border-pink-100 bg-pink-50 p-6 text-center">

                <p className="text-sm text-gray-500">
                  Your Order ID
                </p>

                <h2 className="mt-2 text-3xl font-bold text-pink-600">
                  #{orderId}
                </h2>

              </div>
            )}

            {/* Status Steps */}

            <div className="grid gap-6 md:grid-cols-3">

              <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

                <Package
                  size={40}
                  className="mx-auto text-pink-500"
                />

                <h3 className="mt-4 font-bold">
                  Order Confirmed
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Your order has been successfully created.
                </p>

              </div>

              <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

                <Truck
                  size={40}
                  className="mx-auto text-orange-500"
                />

                <h3 className="mt-4 font-bold">
                  Ready To Ship
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Our team will pack your items shortly.
                </p>

              </div>

              <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

                <Gift
                  size={40}
                  className="mx-auto text-green-500"
                />

                <h3 className="mt-4 font-bold">
                  Delivered To You
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Sit back and enjoy your Balmitra goodies.
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

              <Link
                href="/products"
                className="flex items-center justify-center gap-2 rounded-2xl bg-pink-500 px-8 py-4 font-bold text-white transition hover:bg-pink-600"
              >
                <ShoppingBag size={20} />
                Continue Shopping
              </Link>

              {orderId && (
                <Link
                  href={`/orders/${orderId}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-pink-500 px-8 py-4 font-bold text-pink-600 transition hover:bg-pink-50"
                >
                  <Package size={20} />
                  Track Order
                </Link>
              )}

            </div>

          </div>

        </div>

        {/* Promo Banner */}

        <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-400 to-pink-500 p-8 text-center text-white shadow-lg">

          <h2 className="text-3xl font-bold">
            🎁 Special Gift Waiting For You
          </h2>

          <p className="mt-3 text-lg">
            Use code <span className="font-bold">THANKYOU10</span>
            {" "}on your next purchase and get 10% OFF.
          </p>

        </div>

      </div>

    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}