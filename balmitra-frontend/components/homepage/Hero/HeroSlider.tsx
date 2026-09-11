"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import Link from "next/link";

type Hero = {
  id: number;
  title: string;
  subtitle?: string | null;
  desktopImage: string;
  mobileImage?: string | null;
  buttonText?: string | null;
  buttonUrl?: string | null;
  isActive: boolean;
};

export default function HeroSlider() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroes() {
      try {
        const response = await fetch(`${API_URL}/homepage/heroes`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const activeHeroes = result.data.filter((h: Hero) => h.isActive !== false);
          setHeroes(activeHeroes);
        }
      } catch (error) {
        console.error("Failed to load hero slides:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHeroes();
  }, []);

  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [heroes.length]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="mx-auto max-w-[1600px] px-4 py-4">
          <div className="h-[340px] sm:h-[420px] md:h-[480px] w-full animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (heroes.length === 0) {
    return null;
  }

  const currentHero = heroes[current] || heroes[0];

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1600px] px-4 py-4">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-md">
          {currentHero.buttonUrl ? (
            <Link href={currentHero.buttonUrl}>
              <img
                src={currentHero.desktopImage}
                alt={currentHero.title || "Hero Banner"}
                className="w-full object-contain cursor-pointer max-h-[500px]"
              />
            </Link>
          ) : (
            <img
              src={currentHero.desktopImage}
              alt={currentHero.title || "Hero Banner"}
              className="w-full object-contain max-h-[500px]"
            />
          )}

          {currentHero.title && (
            <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md p-5 rounded-2xl text-white max-w-md hidden sm:block">
              <h2 className="text-2xl md:text-3xl font-bold">{currentHero.title}</h2>
              {currentHero.subtitle && <p className="text-sm opacity-90 mt-1">{currentHero.subtitle}</p>}
              {currentHero.buttonText && currentHero.buttonUrl && (
                <Link
                  href={currentHero.buttonUrl}
                  className="mt-3 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition"
                >
                  {currentHero.buttonText}
                </Link>
              )}
            </div>
          )}
        </div>

        {heroes.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {heroes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition-all ${
                  current === index ? "bg-pink-500 w-7" : "bg-gray-300 w-2.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}