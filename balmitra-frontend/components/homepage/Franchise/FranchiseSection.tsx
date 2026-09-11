export default function FranchiseSection() {
  return (
    <section className="pb-20">

      <div className="max-w-7xl mx-auto px-4">

        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300">

          <div className="grid lg:grid-cols-2 gap-10 items-center p-8 md:p-14">

            <div className="text-white">

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                FRANCHISE OPPORTUNITY
              </span>

              <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
                Open Your Own Balmitra Store
              </h2>

              <p className="mt-5 text-white/90 text-lg">
                Join the growing Balmitra network
                and build a profitable kids retail
                business in your city.
              </p>

              <button className="mt-8 bg-white text-pink-600 font-bold px-8 py-4 rounded-2xl hover:scale-105 transition">
                Apply Now →
              </button>

            </div>

            <div className="grid grid-cols-3 gap-4">

              <div className="bg-white rounded-3xl p-6 text-center">
                <h3 className="text-3xl font-black">
                  ₹5L+
                </h3>
                <p className="text-sm text-gray-500">
                  Investment
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center">
                <h3 className="text-3xl font-black">
                  100%
                </h3>
                <p className="text-sm text-gray-500">
                  Support
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 text-center">
                <h3 className="text-3xl font-black">
                  PAN India
                </h3>
                <p className="text-sm text-gray-500">
                  Expansion
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}