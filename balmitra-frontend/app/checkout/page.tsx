"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Ticket,
  CreditCard,
  Banknote,
  CheckCircle2,
  X,
} from "lucide-react";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import { openCustomerAuthModal } from "@/lib/authModal";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  stock?: number;
  product?: any;
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Coupon states
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    // 1. Load cart first
    const storedCart = localStorage.getItem("balmitra_cart");
    if (!storedCart) {
      router.push("/cart");
      return;
    }

    try {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      if (!parsedCart.length) {
        router.push("/cart");
        return;
      }
      setCart(parsedCart);
    } catch {
      router.push("/cart");
      return;
    }

    // 2. Check Auth
    checkAuthAndLoad();

    window.addEventListener("userLoggedIn", checkAuthAndLoad);
    return () => window.removeEventListener("userLoggedIn", checkAuthAndLoad);
  }, [router]);

  function checkAuthAndLoad() {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      setIsAuthenticated(false);
      openCustomerAuthModal({
        defaultTab: "login",
        message: "Sign in or create an account to place your order.",
        onSuccess: () => {
          checkAuthAndLoad();
        },
      });
      return;
    }
    setIsAuthenticated(true);
    loadCustomer(token);
  }

  async function loadCustomer(token: string) {
    try {
      const response = await fetch(`${API_URL}/auth/customer/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      const customer = result.data?.customer || result.data;

      if (customer) {
        setForm((prev) => ({
          ...prev,
          name: customer.name || prev.name,
          email: customer.email || prev.email,
          phone: customer.phone || prev.phone,
        }));
      }
    } catch (error) {
      console.error("Failed to load customer profile:", error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Calculate subtotals cleanly
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = Number(item.price || item.product?.discountPrice || item.product?.price || 0);
    return total + itemPrice * item.quantity;
  }, 0);

  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping = discountedSubtotal >= 999 || discountedSubtotal === 0 ? 0 : 50;
  const total = discountedSubtotal + shipping;

  async function handleApplyCoupon() {
    if (!couponInput.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      const res = await fetch(`${API_URL}/coupons/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: couponInput.trim(),
          orderAmount: subtotal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid coupon code");
      }

      setAppliedCoupon({
        code: data.data.code,
        discount: data.data.discount,
      });
      toast.success(`Coupon "${data.data.code}" applied! Saved ₹${data.data.discount}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to apply coupon");
    } finally {
      setCouponLoading(false);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    toast("Coupon removed");
  }

  async function placeOrder() {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in your contact details");
      return;
    }

    if (
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {
      toast.error("Please complete your delivery address");
      return;
    }

    const token = localStorage.getItem("customer_token");
    if (!token) {
      openCustomerAuthModal({
        defaultTab: "login",
        message: "Please sign in or register to place your order.",
        onSuccess: () => {
          checkAuthAndLoad();
        },
      });
      return;
    }

    try {
      setLoading(true);

      const itemsPayload = cart.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      }));

      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;

      // 1. Create the order
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: itemsPayload,
          address: fullAddress,
          paymentMethod,
          couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to place order");
      }

      const orderData = result.data?.order || result.data;
      const orderId = orderData.id;

      // Handle CASH ON DELIVERY
      if (paymentMethod === "COD") {
        localStorage.removeItem("balmitra_cart");
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Order placed successfully! 🎉");
        router.push(`/order-success?orderId=${orderId}`);
        return;
      }

      // Handle ONLINE PAYMENT (RAZORPAY)
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      const paymentRes = await fetch(`${API_URL}/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId }),
      });

      const paymentJson = await paymentRes.json();
      if (!paymentRes.ok || !paymentJson.success) {
        throw new Error(paymentJson.message || "Failed to initialize online payment");
      }

      const { paymentId, razorpayOrderId, amount, currency, key } = paymentJson.data;

      const options = {
        key,
        amount,
        currency: currency || "INR",
        name: "Balmitra Kids",
        description: `Order #${orderData.orderNumber || orderId}`,
        order_id: razorpayOrderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#ec4899",
        },
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "verify-toast" });

            const verifyRes = await fetch(`${API_URL}/payments/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                paymentId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyJson = await verifyRes.json();
            toast.dismiss("verify-toast");

            if (verifyJson.success) {
              localStorage.removeItem("balmitra_cart");
              window.dispatchEvent(new Event("cartUpdated"));
              toast.success("Payment verified! Order confirmed! 🎉");
              router.push(`/order-success?orderId=${orderId}`);
            } else {
              toast.error(verifyJson.message || "Payment verification failed");
              router.push(`/orders/${orderId}`);
            }
          } catch (verifyErr: any) {
            toast.dismiss("verify-toast");
            toast.error(verifyErr.message || "Verification error");
          }
        },
        modal: {
          ondismiss: function () {
            toast("Payment cancelled. You can complete payment later from your orders.", {
              icon: "ℹ️",
            });
            router.push(`/orders/${orderId}`);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error: any) {
      console.error(error);
      if (error.message && error.message.includes("not found")) { toast.error("A product in your cart is no longer available. Please clear your cart and add items again.", { duration: 5000 }); } else { toast.error(error.message || "Order placement failed"); }
    } finally {
      setLoading(false);
    }
  }

  if (!cart.length) {
    return (
      <div className="min-h-screen py-24 text-center">
        <h1 className="text-3xl font-bold">Your Cart Is Empty</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F7] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900">Checkout</h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete your delivery and payment details to place your order.
        </p>

        {/* TRUST BAR */}
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-pink-50 p-4 border border-pink-100">
            <ShieldCheck className="text-pink-500" />
            <div>
              <span className="font-bold text-gray-800 text-sm block">100% Secure</span>
              <span className="text-xs text-gray-500">Safe payments & encryption</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-4 border border-orange-100">
            <Truck className="text-orange-500" />
            <div>
              <span className="font-bold text-gray-800 text-sm block">Express Delivery</span>
              <span className="text-xs text-gray-500">Delivered within 3-5 days</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 border border-green-100">
            <RotateCcw className="text-green-500" />
            <div>
              <span className="font-bold text-gray-800 text-sm block">Easy Returns</span>
              <span className="text-xs text-gray-500">7-day hassle-free policy</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* LEFT: DELIVERY & PAYMENT FORM */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                1. Delivery Contact Details
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Recipient's Name"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Phone Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Pincode *</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 400001"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold text-gray-600 block mb-1">Street Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="House/Flat No., Apartment, Street, Landmark"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">City *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">State *</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                2. Select Payment Method
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`cursor-pointer rounded-2xl border-2 p-5 transition flex flex-col justify-between ${
                    paymentMethod === "COD"
                      ? "border-pink-500 bg-pink-50/60 shadow-sm"
                      : "border-gray-200 bg-white hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                        <Banknote size={22} />
                      </div>
                      <span className="font-bold text-gray-900">Cash On Delivery</span>
                    </div>
                    {paymentMethod === "COD" && (
                      <CheckCircle2 size={20} className="text-pink-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Pay with cash when your parcel is delivered at your door.
                  </p>
                </div>

                {/* Online Payment (Razorpay) */}
                <div
                  onClick={() => setPaymentMethod("ONLINE")}
                  className={`cursor-pointer rounded-2xl border-2 p-5 transition flex flex-col justify-between ${
                    paymentMethod === "ONLINE"
                      ? "border-pink-500 bg-pink-50/60 shadow-sm"
                      : "border-gray-200 bg-white hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <CreditCard size={22} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">Online Payment</span>
                        <span className="text-[10px] uppercase tracking-wide font-extrabold text-pink-600">Razorpay</span>
                      </div>
                    </div>
                    {paymentMethod === "ONLINE" && (
                      <CheckCircle2 size={20} className="text-pink-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    UPI (GPay/PhonePe), Credit/Debit Cards, NetBanking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-pink-100">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              {/* Items List */}
              <div className="mt-4 max-h-56 overflow-y-auto space-y-3 pr-1 border-b pb-4">
                {cart.map((item) => {
                  const itemPrice = Number(item.price || item.product?.discountPrice || item.product?.price || 0);
                  return (
                    <div key={item.productId} className="flex justify-between items-center text-sm">
                      <div className="flex-1 pr-3">
                        <p className="font-semibold text-gray-800 line-clamp-1">
                          {item.name || item.product?.name || "Product"}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">
                        ₹{(itemPrice * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Section */}
              <div className="py-4 border-b">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-green-50 px-3.5 py-2.5 border border-green-200">
                    <div className="flex items-center gap-2">
                      <Ticket size={16} className="text-green-600" />
                      <span className="text-xs font-bold text-green-700">
                        {appliedCoupon.code} (-₹{appliedCoupon.discount})
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      placeholder="Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs uppercase outline-none focus:border-pink-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="rounded-xl bg-pink-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-pink-600 disabled:opacity-50"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-black text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-pink-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              {isAuthenticated ? (
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 py-4 font-bold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Processing Order..." : `Place Order (${paymentMethod})`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openCustomerAuthModal({
                      defaultTab: "login",
                      message: "Please sign in or register to complete your order.",
                      onSuccess: () => checkAuthAndLoad(),
                    })
                  }
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 py-4 font-bold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.01] active:scale-95"
                >
                  Sign In / Register to Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
