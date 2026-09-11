"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Truck, RotateCcw, Award, Lock, Sparkles, HeartHandshake } from "lucide-react";
import Container from "@/components/ui/container";
import { API_URL } from "@/lib/api";

const iconMap: Record<string, any> = {
  Truck,
  Lock,
  RotateCcw,
  Award,
  HeartHandshake,
  ShieldCheck,
  Sparkles
};

export default function TrustSection() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch(`${API_URL}/homepage/trust-features/public`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setItems(data.data);
        }
      } catch (err) {
        console.error("Failed to load trust features:", err);
      }
    }
    loadItems();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-white py-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div key={item.id || idx} className="flex flex-col items-center text-center group">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md">
                  <Icon size={28} />
                </div>
                <h4 className="font-bold text-gray-900 text-[13px] leading-tight">
                  {item.title}
                </h4>
                <p className="mt-1 text-[11px] text-gray-500 max-w-[120px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}