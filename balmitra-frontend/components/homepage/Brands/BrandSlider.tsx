"use client";

import Link from "next/link";

const popularBrands = [
  {
    name: "Johnson's",
    offer: "Up to 30% Off",
    image: "https://images.unsplash.com/photo-1555820598-c6a6f6911c81?auto=format&fit=crop&q=80&w=300",
    slug: "/products?brand=Johnsons",
  },
  {
    name: "Pampers",
    offer: "Best Sellers",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=300",
    slug: "/products?brand=Pampers",
  },
  {
    name: "Himalaya",
    offer: "Organic Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300",
    slug: "/products?brand=Himalaya",
  },
  {
    name: "Chicco",
    offer: "Premium Baby",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=300",
    slug: "/products?brand=Chicco",
  },
  {
    name: "Mee Mee",
    offer: "New Arrivals",
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=300",
    slug: "/products?brand=MeeMee",
  },
  {
    name: "Mamaearth",
    offer: "Toxin Free",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=300",
    slug: "/products?brand=Mamaearth",
  },
];

export default function BrandSlider() {
  return (
    <section className="py-12 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Brands</h2>
          <Link href="/brands" className="font-semibold text-sm text-pink-600 hover:underline">
            View All Brands +'
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {popularBrands.map((brand) => (
            <Link key={brand.name} href={brand.slug}>
              <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white hover:shadow-xl transition duration-300 cursor-pointer h-full flex flex-col items-center p-4">
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-gray-50 p-2 mb-3">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-full w-full object-cover rounded-full group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="text-center mt-auto">
                  <h3 className="font-bold text-sm text-gray-800">{brand.name}</h3>
                  <p className="mt-1 text-[11px] font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full inline-block">
                    {brand.offer}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}