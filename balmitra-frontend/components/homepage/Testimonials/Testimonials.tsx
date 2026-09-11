"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Pooja Sharma",
    city: "Mumbai",
    text: "Balmitra has made shopping for my toddler effortless! The clothes are extremely soft, and delivery was completed in just 2 days.",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    city: "Bangalore",
    text: "Ordered a wooden educational set for my 4-year old. Premium quality, non-toxic wood, and well-packaged. Highly recommended marketplace!",
    rating: 5,
  },
  {
    name: "Ananya Deshmukh",
    city: "Pune",
    text: "Customer service is top notch. I requested an exchange for size and it was done smoothly without any hassle. Proud parent customer.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3.5 py-1 rounded-full">
            Customer Love
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-3">
            What Parents Say About Us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-100 bg-[#FAFAF8] p-6 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-pink-200 mb-3" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60">
                <p className="font-bold text-sm text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.city}, India</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
