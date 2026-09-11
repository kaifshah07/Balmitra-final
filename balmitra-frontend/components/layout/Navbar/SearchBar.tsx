"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/products");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative hidden lg:block w-full max-w-md">
      <button
        type="submit"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition"
      >
        <Search size={18} />
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for toys, clothes, baby care..."
        className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-5 text-sm outline-none transition duration-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
      />
    </form>
  );
}