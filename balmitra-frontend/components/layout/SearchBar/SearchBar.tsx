import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-300 py-2.5 pl-11 pr-4 outline-none transition focus:border-blue-600"
      />

      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}