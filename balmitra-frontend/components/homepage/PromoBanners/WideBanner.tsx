"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import Link from "next/link";

type Ad = {
  id: number;
  title?: string | null;
  desktopImage: string;
  mobileImage?: string | null;
  redirectUrl?: string | null;
  position: string;
  isActive: boolean;
};

export default function WideBanner() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWideBanner() {
      try {
        const res = await fetch(`${API_URL}/homepage/advertisements`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const wideAds = data.data.filter(
            (item: Ad) => item.position === "wide_banner" && item.isActive !== false
          );
          if (wideAds.length > 0) {
            setAd(wideAds[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load wide banner:", err);
      } finally {
        setLoading(false);
      }
    }
    loadWideBanner();
  }, []);

  if (loading) {
    return (
      <section className="py-6 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[200px] md:h-[240px] w-full animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </section>
    );
  }

  if (!ad) return null;

  return (
    <section className="py-8 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        {ad.redirectUrl ? (
          <Link href={ad.redirectUrl}>
            <div className="relative overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition">
              <img
                src={ad.desktopImage}
                alt={ad.title || "Special Promo Banner"}
                className="rounded-3xl h-[220px] md:h-[260px] w-full object-cover cursor-pointer hover:opacity-95 transition"
              />
              {ad.title && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent flex items-center p-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white max-w-md">
                    {ad.title}
                  </h3>
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="relative overflow-hidden rounded-3xl shadow-sm">
            <img
              src={ad.desktopImage}
              alt={ad.title || "Special Promo Banner"}
              className="rounded-3xl h-[220px] md:h-[260px] w-full object-cover"
            />
            {ad.title && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent flex items-center p-8">
                <h3 className="text-2xl md:text-3xl font-black text-white max-w-md">
                  {ad.title}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}