import Link from "next/link";

const ageGroups = [
  { label: "0-6 Months", icon: "🍼" },
  { label: "6-12 Months", icon: "👶" },
  { label: "1-3 Years", icon: "🧸" },
  { label: "3-5 Years", icon: "🎨" },
  { label: "5-8 Years", icon: "🚀" },
  { label: "8-12 Years", icon: "🎒" },
];

export default function AgeGroupGrid() {
  return (
    <section className="py-10 bg-[#FAFAF8]">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop By Age
          </h2>
          <Link href="/products" className="text-pink-600 font-semibold text-sm hover:underline">
            All Ages →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {ageGroups.map((group) => (
            <Link
              key={group.label}
              href={`/products?ageGroup=${encodeURIComponent(group.label)}`}
              className="group rounded-3xl border border-pink-100 bg-gradient-to-b from-white to-pink-50/40 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition duration-300">
                {group.icon}
              </span>
              <p className="font-bold text-sm text-gray-800 group-hover:text-pink-600 transition">
                {group.label}
              </p>
              <span className="text-[11px] text-gray-400 mt-0.5">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}