export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">

      {/* Top Area */}
      <div className="max-w-7xl mx-auto px-4 py-14">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black text-pink-400">
              BALMITRA
            </h2>

            <p className="mt-4 text-sm text-gray-300">
              India's growing marketplace for kids,
              babies, parents, vendors and franchise
              partners.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4">
              Shop
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>Baby Care</li>
              <li>Toys</li>
              <li>School Essentials</li>
              <li>Books</li>
              <li>Clothing</li>
              <li>Footwear</li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="font-bold mb-4">
              Customer
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>My Account</li>
              <li>Orders</li>
              <li>Wishlist</li>
              <li>Track Order</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="font-bold mb-4">
              Business
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>Become Vendor</li>
              <li>Open Franchise</li>
              <li>Advertise With Us</li>
              <li>Partnerships</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">
              Connect
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>YouTube</li>
              <li>WhatsApp</li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">
                Download App
              </h4>

              <div className="flex gap-2">
                <div className="rounded-xl bg-white text-black px-3 py-2 text-xs font-semibold">
                  Play Store
                </div>

                <div className="rounded-xl bg-white text-black px-3 py-2 text-xs font-semibold">
                  App Store
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Trust Bar */}
      <div className="border-y border-white/10">

        <div className="max-w-7xl mx-auto px-4 py-5">

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">

            <span>🚚 Fast Delivery</span>

            <span>🔒 Secure Payments</span>

            <span>🔄 Easy Returns</span>

            <span>🧸 Genuine Products</span>

            <span>⭐ Trusted Marketplace</span>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          <p>
            © 2026 Balmitra. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <span>Privacy Policy</span>

            <span>Terms & Conditions</span>

            <span>Refund Policy</span>

          </div>

        </div>

      </div>

    </footer>
  );
}