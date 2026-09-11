"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL, productImageUrl } from "@/lib/api";
import {
  Filter,
  Search,
  SlidersHorizontal,
  X,
  Heart,
  Star,
  ShoppingBag,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import toast from "react-hot-toast";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: number;
  name: string;
  thumbnail?: string | null;
  price: number | string;
  discountPrice?: number | string | null;
  stock: number;
  brand?: string | null;
  ageGroup?: string | null;
  categoryId?: number | null;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
};

const AGE_GROUPS = [
  "0-6 Months",
  "6-12 Months",
  "1-3 Years",
  "3-5 Years",
  "5-8 Years",
  "8-12 Years",
];

const SECTIONS = [
  { key: "all", label: "All Items" },
  { key: "trending", label: "🔥 Trending" },
  { key: "featured", label: "✨ Featured" },
  { key: "new-arrivals", label: "🆕 New Arrivals" },
  { key: "best-sellers", label: "🏆 Best Sellers" },
  { key: "flash-sale", label: "⚡ Flash Sale" },
];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("categoryId") || "";
  const initialAge = searchParams.get("ageGroup") || "";
  const initialType = searchParams.get("type") || (searchParams.get("flashSale") === "true" ? "flash-sale" : "all");
  const initialSort = searchParams.get("sort") || "newest";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedSort, setSelectedSort] = useState(initialSort);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  // Sync wishlist from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistIds(stored.map((item: any) => item.id));
    } catch {
      setWishlistIds([]);
    }
  }, []);

  // Load categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch products based on filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = "";

      if (selectedType && selectedType !== "all") {
        url = `${API_URL}/homepage/products/${selectedType}`;
      } else {
        const params = new URLSearchParams();
        if (search.trim()) params.append("search", search.trim());
        if (selectedCategory) params.append("categoryId", selectedCategory);
        if (selectedAge) params.append("ageGroup", selectedAge);
        if (selectedSort) params.append("sort", selectedSort);
        url = `${API_URL}/products?${params.toString()}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        let list: Product[] = json.data;

        // In-memory client filters if we used a section endpoint
        if (selectedType && selectedType !== "all") {
          if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(q));
          }
          if (selectedCategory) {
            list = list.filter((p) => String(p.categoryId) === String(selectedCategory));
          }
          if (selectedAge) {
            list = list.filter((p) => p.ageGroup === selectedAge);
          }
          if (selectedSort === "price_asc") {
            list.sort((a, b) => Number(a.discountPrice || a.price) - Number(b.discountPrice || b.price));
          } else if (selectedSort === "price_desc") {
            list.sort((a, b) => Number(b.discountPrice || b.price) - Number(a.discountPrice || a.price));
          }
        }

        setProducts(list);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, selectedAge, selectedType, selectedSort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function handleAddToCart(product: Product, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const price = Number(product.discountPrice || product.price);
    const origPrice = Number(product.price);

    const cart = JSON.parse(localStorage.getItem("balmitra_cart") || "[]");
    const existingIndex = cart.findIndex((item: any) => item.productId === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: price,
        originalPrice: origPrice,
        quantity: 1,
        thumbnail: product.thumbnail,
        stock: product.stock || 10,
      });
    }

    localStorage.setItem("balmitra_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`${product.name} added to cart! 🛒`);
  }

  function handleToggleWishlist(product: Product, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some((item: any) => item.id === product.id);

    let updated;
    if (exists) {
      updated = wishlist.filter((item: any) => item.id !== product.id);
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      toast("Removed from wishlist");
    } else {
      updated = [
        ...wishlist,
        {
          id: product.id,
          name: product.name,
          price: Number(product.discountPrice || product.price),
          originalPrice: Number(product.price),
          image: productImageUrl(product.thumbnail),
          discount: product.discountPrice
            ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
            : 0,
        },
      ];
      setWishlistIds((prev) => [...prev, product.id]);
      toast.success("Added to wishlist ❤️");
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  }

  function clearAllFilters() {
    setSearch("");
    setSelectedCategory("");
    setSelectedAge("");
    setSelectedType("all");
    setSelectedSort("newest");
    router.push("/products");
  }

  const activeFiltersCount =
    (search ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedAge ? 1 : 0) +
    (selectedType !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Products Catalog</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {selectedType && selectedType !== "all"
                  ? SECTIONS.find((s) => s.key === selectedType)?.label
                  : search
                  ? `Search: "${search}"`
                  : "All Kids Products"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {loading ? "Searching products..." : `Showing ${products.length} curated products`}
              </p>
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex lg:hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[11px] font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="relative flex items-center">
                <ArrowUpDown size={15} className="absolute left-3.5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block space-y-6">
            <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter size={18} className="text-pink-600" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-pink-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search Inside Catalog */}
              <div className="py-4 border-b border-gray-100">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                  Search
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search titles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-pink-500 focus:bg-white"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Collections / Sections */}
              <div className="py-4 border-b border-gray-100">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                  Featured Section
                </label>
                <div className="space-y-1">
                  {SECTIONS.map((sec) => (
                    <button
                      key={sec.key}
                      onClick={() => setSelectedType(sec.key)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                        selectedType === sec.key
                          ? "bg-pink-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="py-4 border-b border-gray-100">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                  Categories
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                      selectedCategory === ""
                        ? "font-bold text-pink-600 bg-pink-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(String(cat.id))}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                        selectedCategory === String(cat.id)
                          ? "font-bold text-pink-600 bg-pink-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div className="pt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                  Age Group
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AGE_GROUPS.map((age) => (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(selectedAge === age ? "" : age)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        selectedAge === age
                          ? "border-pink-500 bg-pink-500 text-white shadow-sm"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-pink-200"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MOBILE FILTERS MODAL */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 flex bg-black/50 lg:hidden">
              <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="py-4 space-y-6 flex-1">
                  {/* Search */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border p-2 text-sm"
                    />
                  </div>

                  {/* Section */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Sections</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SECTIONS.map((sec) => (
                        <button
                          key={sec.key}
                          onClick={() => setSelectedType(sec.key)}
                          className={`rounded-lg py-2 text-xs font-medium border ${
                            selectedType === sec.key ? "bg-pink-500 text-white border-pink-500" : "bg-gray-50"
                          }`}
                        >
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Category</label>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      <button
                        onClick={() => setSelectedCategory("")}
                        className={`w-full text-left p-2 text-sm rounded ${selectedCategory === "" ? "font-bold text-pink-600 bg-pink-50" : ""}`}
                      >
                        All Categories
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(String(c.id))}
                          className={`w-full text-left p-2 text-sm rounded ${selectedCategory === String(c.id) ? "font-bold text-pink-600 bg-pink-50" : ""}`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age Group */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Age Group</label>
                    <div className="flex flex-wrap gap-2">
                      {AGE_GROUPS.map((age) => (
                        <button
                          key={age}
                          onClick={() => setSelectedAge(selectedAge === age ? "" : age)}
                          className={`rounded-lg px-2.5 py-1 text-xs border ${
                            selectedAge === age ? "bg-pink-500 text-white border-pink-500" : "bg-gray-50"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t flex gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 rounded-xl bg-pink-500 py-2.5 text-sm font-semibold text-white"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT LIST CONTENT */}
          <main>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="aspect-square w-full rounded-2xl bg-gray-200 mb-4" />
                    <div className="h-4 w-3/4 rounded bg-gray-200 mb-2" />
                    <div className="h-4 w-1/2 rounded bg-gray-200 mb-4" />
                    <div className="h-8 w-full rounded-xl bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-pink-500 mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">No Products Found</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  We could not find any products matching your selected filters. Try broadening your criteria or reset all filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-pink-600"
                >
                  <Sparkles size={16} />
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product) => {
                  const price = Number(product.discountPrice || product.price);
                  const origPrice = Number(product.price);
                  const discountPct =
                    product.discountPrice && origPrice > 0
                      ? Math.round(((origPrice - price) / origPrice) * 100)
                      : 0;
                  const isWishlisted = wishlistIds.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Badge */}
                      {discountPct > 0 && (
                        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-extrabold text-white shadow-sm">
                          {discountPct}% OFF
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleToggleWishlist(product, e)}
                        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur-sm transition hover:scale-110"
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart
                          size={18}
                          className={`transition ${
                            isWishlisted
                              ? "fill-red-500 text-red-500 scale-110"
                              : "text-gray-400 hover:text-pink-500"
                          }`}
                        />
                      </button>

                      {/* Product Image */}
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="aspect-square overflow-hidden bg-gray-50">
                          <img
                            src={productImageUrl(product.thumbnail)}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      </Link>

                      {/* Info & Buy */}
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-pink-600">
                          {product.brand || "Balmitra Kids"}
                        </p>

                        <Link href={`/products/${product.id}`} className="mt-1">
                          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-pink-600 transition min-h-[40px]">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Ratings */}
                        <div className="mt-1.5 flex items-center gap-1">
                          <Star size={13} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-gray-700">4.7</span>
                          <span className="text-[11px] text-gray-400">(42)</span>
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-gray-900">
                            ₹{price}
                          </span>
                          {origPrice > price && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{origPrice}
                            </span>
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto pt-3">
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className="w-full rounded-xl bg-pink-500 py-2.5 text-xs font-bold text-white shadow transition hover:bg-pink-600 active:scale-95"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center py-20 text-gray-500 font-medium">
          Loading catalog...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
