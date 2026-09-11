"use client";

import Link from "next/link";
import Container from "@/components/ui/container";

const collections = [
  {
    title: "Back To School",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
    slug: "/products?collection=school",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Winter Wear",
    image: "https://images.unsplash.com/photo-1519278409-1f56fdba3fce?auto=format&fit=crop&q=80&w=400",
    slug: "/products?collection=winter",
    color: "from-indigo-500 to-purple-400"
  },
  {
    title: "Newborn Essentials",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400",
    slug: "/products?collection=newborn",
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Play Time Toys",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=400",
    slug: "/products?collection=toys",
    color: "from-orange-500 to-amber-400"
  }
];

export default function CollectionStrip() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop By Collection
          </h2>
          <Link href="/collections" className="text-sm font-semibold text-pink-600 hover:underline">
            View All Collections +'
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.slug}
              className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/5] block"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-70`} />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">
                  {item.title}
                </h3>
                <span className="inline-block bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full w-max opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}