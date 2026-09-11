export default function CategoryBanner() {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-white">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-wider">
            Special Offer
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Flat 50% OFF
          </h2>

          <p className="mt-2">
            On selected kids fashion products
          </p>

        </div>

        <div className="hidden md:block text-7xl">
          🎁
        </div>

      </div>

    </div>
  );
}