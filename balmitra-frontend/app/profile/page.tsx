"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, ArrowLeft, Package, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Customer = {
  id?: number;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  address?: string;
};

export default function CustomerProfilePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");

    if (!token) {
      router.replace("/");
      return;
    }

    const storedCustomer = localStorage.getItem("customer");

    if (storedCustomer) {
      try {
        setCustomer(JSON.parse(storedCustomer));
      } catch (error) {
        console.error("Failed to parse customer:", error);
      }
    }
    setLoading(false);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    window.dispatchEvent(new Event("userLoggedIn"));
    router.push("/");
  }

  if (loading) return null;

  return (
    <div className="min-h-[80vh] bg-[#F7F8FA] px-4 py-10">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[250px_1fr] gap-8">
        
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 h-fit hidden md:block">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-lg font-bold text-white shadow-sm">
              {customer?.name ? customer.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hello,</p>
              <h3 className="font-bold text-[#0B1220] truncate w-[130px]">{customer?.name || "Customer"}</h3>
            </div>
          </div>

          <nav className="space-y-2">
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-semibold transition">
              <User size={18} />
              My Profile
            </Link>
            <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-[#0B1220] font-medium transition">
              <Package size={18} />
              My Orders
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-[#0B1220] font-medium transition">
              <Heart size={18} />
              Wishlist
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition">
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div>
          <div className="mb-6 md:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500 transition"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Personal Information
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              Manage your personal details and contact information.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="p-6 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#0B1220]">Profile Details</h2>
                <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition">
                  Edit Profile
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <ProfileItem
                  icon={<User size={18} />}
                  label="Full Name"
                  value={customer?.name || "Not available"}
                />

                <ProfileItem
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={customer?.email || "Not available"}
                />

                <ProfileItem
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  value={customer?.mobile || customer?.phone || "Not available"}
                />

                <ProfileItem
                  icon={<MapPin size={18} />}
                  label="Delivery Address"
                  value={customer?.address || "Not available"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5 transition hover:border-orange-200">
      <div className="flex items-center gap-2 text-orange-500 mb-3">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>
      <p className="font-semibold text-[#0B1220] break-words">
        {value}
      </p>
    </div>
  );
}