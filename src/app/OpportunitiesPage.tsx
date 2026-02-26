import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export interface Brand {
  id: string;
  name: string;
  category: string;
  eligible: boolean;
  emoji?: string;
}

export const BRANDS: Brand[] = [
  { id: "glossier", name: "Glossier", category: "Beauty", eligible: true, emoji: "💄" },
  { id: "nike", name: "Nike", category: "Sportswear", eligible: true, emoji: "👟" },
  { id: "notion", name: "Notion", category: "Productivity", eligible: true, emoji: "📓" },
  { id: "spotify", name: "Spotify", category: "Music", eligible: true, emoji: "🎧" },
  { id: "airbnb", name: "Airbnb", category: "Travel", eligible: false, emoji: "🏡" },
  { id: "sephora", name: "Sephora", category: "Beauty", eligible: false, emoji: "🛍️" },
  { id: "adobe", name: "Adobe", category: "Creator Tools", eligible: true, emoji: "🎨" },
  { id: "uber", name: "Uber", category: "Mobility", eligible: false, emoji: "🚗" },
];

export default function OpportunitiesPage() {
  const params = new URLSearchParams(window.location.search);
  const selectedBrandId = params.get("brand");

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-64 pt-16">
        <div className="p-8 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Brand Opportunities</h1>
              <p className="text-sm text-gray-600">
                Explore brands you may be eligible to collaborate with based on your readiness.
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Category
              </label>
              <select className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm">
                <option>All categories</option>
                <option>Beauty</option>
                <option>Sportswear</option>
                <option>Productivity</option>
                <option>Music</option>
                <option>Travel</option>
                <option>Creator Tools</option>
                <option>Mobility</option>
              </select>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              Eligibility: Eligible only
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {BRANDS.map((brand) => {
              const isSelected = brand.id === selectedBrandId;
              const initials = brand.emoji || brand.name.slice(0, 2).toUpperCase();

              return (
                <div
                  key={brand.id}
                  className={`bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between ${
                    isSelected ? "ring-2 ring-blue-500 border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {brand.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {brand.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      {brand.eligible ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                          Not yet eligible
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      View details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

