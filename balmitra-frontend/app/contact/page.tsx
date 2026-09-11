import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-[60vh] bg-[#FAFAF8] px-6 py-20">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C67C2E]">
          Balmitra support
        </p>
        <h1 className="mt-4 text-4xl font-bold text-[#0B1220]">Contact us</h1>
        <p className="mt-4 text-gray-600">
          Need help with an order or product? Our team is here to help.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white hover:bg-[#A7641E]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
