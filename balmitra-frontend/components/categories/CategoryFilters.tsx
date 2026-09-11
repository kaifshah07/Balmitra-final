"use client";

const AGE_GROUPS = [
  "0-6 Months",
  "6-12 Months",
  "1-3 Years",
  "3-5 Years",
  "5-8 Years",
  "8-12 Years",
];

interface CategoryFiltersProps {
  subcategories?: { id: number; name: string }[];
  selectedSubcategory?: string;
  onSelectSubcategory?: (id: string) => void;
  selectedAge?: string;
  onSelectAge?: (age: string) => void;
  onClear?: () => void;
}

export default function CategoryFilters({
  subcategories = [],
  selectedSubcategory = "",
  onSelectSubcategory,
  selectedAge = "",
  onSelectAge,
  onClear,
}: CategoryFiltersProps) {
  return (
    <div className="sticky top-24 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        {(selectedSubcategory || selectedAge) && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-pink-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {subcategories.length > 0 && (
        <div className="pb-4 border-b border-gray-100">
          <h4 className="font-semibold text-sm text-gray-800 mb-3">Subcategories</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            <button
              onClick={() => onSelectSubcategory && onSelectSubcategory("")}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                selectedSubcategory === ""
                  ? "bg-pink-50 text-pink-600 font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              All Subcategories
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelectSubcategory && onSelectSubcategory(String(sub.id))}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                  selectedSubcategory === String(sub.id)
                    ? "bg-pink-50 text-pink-600 font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-semibold text-sm text-gray-800 mb-3">Age Group</h4>
        <div className="flex flex-wrap gap-1.5">
          {AGE_GROUPS.map((age) => (
            <button
              key={age}
              onClick={() => onSelectAge && onSelectAge(selectedAge === age ? "" : age)}
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
  );
}