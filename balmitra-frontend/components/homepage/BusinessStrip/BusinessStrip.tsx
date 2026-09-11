import Link from "next/link";
import { ArrowRight, Store, Building2 } from "lucide-react";

export default function BusinessSection() {
  return (
    <section className="py-12 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vendor */}
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Store size={18} />
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  Sell On Balmitra
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-black">
                Become a Vendor
              </h3>

              <p className="mt-3 text-white/90 text-sm leading-relaxed max-w-md">
                Reach thousands of parents looking for trusted kids products and scale your brand nationwide.
              </p>

              <div className="mt-6 flex gap-6">
                <div>
                  <h4 className="text-2xl font-black">50,000+</h4>
                  <p className="text-xs text-white/80">Active Parents</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black">Fast</h4>
                  <p className="text-xs text-white/80">Onboarding</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black">0%</h4>
                  <p className="text-xs text-white/80">Setup Fee</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/become-a-vendor">
                <button className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 px-6 py-3 font-bold text-sm shadow hover:bg-gray-50 transition">
                  Become a Vendor
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* Franchise */}
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-pink-500 to-orange-400 p-8 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  Franchise Model
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-black">
                Open a Franchise
              </h3>

              <p className="mt-3 text-white/90 text-sm leading-relaxed max-w-md">
                Start your own Balmitra kids store in your city. Full inventory, tech and brand marketing support provided.
              </p>

              <div className="mt-6 flex gap-6">
                <div>
                  <h4 className="text-2xl font-black">PAN India</h4>
                  <p className="text-xs text-white/80">Opportunities</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black">100%</h4>
                  <p className="text-xs text-white/80">Operational Support</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black">High</h4>
                  <p className="text-xs text-white/80">ROI Potential</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/franchise">
                <button className="inline-flex items-center gap-2 rounded-xl bg-white text-pink-600 px-6 py-3 font-bold text-sm shadow hover:bg-gray-50 transition">
                  Apply for Franchise
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}