"use client";

const items = [
  "🚚 Fast Delivery",
  "🔒 Secure Payments",
  "🔄 Easy Returns",
  "🏅 Genuine Products",
  "❤️ Trusted By Parents",
  "🛡️ Safe Checkout",
  "🌟 Top Kids Marketplace",
  "🎁 Daily Offers",
];

export default function TrustSection() {
  return (
    <section className="py-4 bg-gradient-to-r from-pink-50 to-blue-50 border-y overflow-hidden">

      <div className="relative">

        <div className="flex gap-4 animate-marquee whitespace-nowrap">

          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-sm"
            >
              {item}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}