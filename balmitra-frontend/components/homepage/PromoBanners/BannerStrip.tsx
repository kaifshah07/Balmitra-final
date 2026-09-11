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

interface BannerStripProps {
  position?: string;
  title?: string;
}

export default function BannerStrip({
  position = "banner_strip_1",
  title = "Special Offers For You",
}: BannerStripProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBannerStripAds() {
      try {
        const res = await fetch(`${API_URL}/homepage/advertisements`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          // Filter ads by position
          let filtered = data.data.filter(
            (item: Ad) => item.position === position && item.isActive !== false
          );

          // If no ads for exact position, check for generic banner_strip or matching prefix
          if (filtered.length === 0) {
            filtered = data.data.filter(
              (item: Ad) =>
                item.isActive !== false &&
                (item.position === "banner_strip" || item.position.startsWith("banner_strip"))
            );
          }

          setAds(filtered);
        }
      } catch (err) {
        console.error("Failed to load banner strip ads:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBannerStripAds();
  }, [position]);

  if (loading) {
    return (
      <section className="py-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[280px] md:h-[340px] w-full animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </section>
    );
  }

  if (ads.length === 0) {
    return null;
  }

  const mainAd = ads[0];
  const secondaryAd1 = ads[1] || mainAd;
  const secondaryAd2 = ads[2] || secondaryAd1;

  return (
    <section className="py-8 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <Link href="/products" className="text-pink-600 font-semibold text-sm hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large Banner */}
          <Link href={mainAd.redirectUrl || "/products"} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl group cursor-pointer h-[320px] sm:h-[360px] shadow-sm hover:shadow-md transition">
              <img
                src={mainAd.desktopImage}
                alt={mainAd.title || "Special Offer"}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white max-w-md">
                <p className="uppercase tracking-widest text-xs font-bold text-pink-400">
                  Featured Deals
                </p>
                <h3 className="text-2xl sm:text-4xl font-black mt-2 leading-tight">
                  {mainAd.title || "Special Offers"}
                </h3>
                <span className="mt-5 inline-block bg-white text-black px-6 py-2.5 rounded-full text-xs font-extrabold hover:bg-pink-500 hover:text-white transition shadow">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>

          {/* Right Side Cards */}
          <div className="flex flex-col gap-5">
            <Link href={secondaryAd1.redirectUrl || "/products"}>
              <div className="relative overflow-hidden rounded-3xl group cursor-pointer h-[150px] sm:h-[167px] shadow-sm hover:shadow-md transition">
                <img
                  src={secondaryAd1.desktopImage}
                  alt={secondaryAd1.title || "Banner"}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-5 bottom-4 text-white">
                  <h4 className="text-xl font-bold leading-tight">{secondaryAd1.title || "New Arrivals"}</h4>
                  <p className="text-xs text-pink-300 font-medium mt-0.5">Explore Collection →</p>
                </div>
              </div>
            </Link>

            <Link href={secondaryAd2.redirectUrl || "/products"}>
              <div className="relative overflow-hidden rounded-3xl group cursor-pointer h-[150px] sm:h-[167px] shadow-sm hover:shadow-md transition">
                <img
                  src={secondaryAd2.desktopImage}
                  alt={secondaryAd2.title || "Banner"}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-5 bottom-4 text-white">
                  <h4 className="text-xl font-bold leading-tight">{secondaryAd2.title || "Kids Special"}</h4>
                  <p className="text-xs text-pink-300 font-medium mt-0.5">Discover More →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}