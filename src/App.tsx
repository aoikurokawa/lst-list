import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout/Layout";
import { StatsOverview } from "./components/stats/StatsOverview";
import { LSTGrid } from "./components/lst/LSTGrid";
import { LSTTable } from "./components/lst/LSTTable";
import { LSTGridSkeleton } from "./components/lst/LSTSkeleton";
import { Spinner } from "./components/ui/Spinner";
import { useLSTs, useLSTStats } from "./hooks/useLSTs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: true,
    },
  },
});

type ViewMode = "table" | "grid";

function Dashboard() {
  const { data: lsts, isLoading, isError, error, isFetching } = useLSTs();
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLSTs = useMemo(() => {
    if (!lsts) return [];
    if (!searchQuery.trim()) return lsts;

    const query = searchQuery.toLowerCase();
    return lsts.filter(
      (lst) =>
        lst.symbol.toLowerCase().includes(query) ||
        lst.name.toLowerCase().includes(query),
    );
  }, [lsts, searchQuery]);

  const stats = useLSTStats(filteredLSTs);

  return (
    <>
      {/* Stats Overview */}
      {stats && <StatsOverview stats={stats} />}

      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white">
            All LSTs {filteredLSTs.length > 0 && `(${filteredLSTs.length})`}
          </h2>
          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Spinner size="sm" />
              Updating...
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search LSTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <LSTGridSkeleton />}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-red-400 mb-2">Failed to load LST data</p>
          <p className="text-sm text-slate-500">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      )}

      {/* LST Display */}
      {filteredLSTs.length > 0 &&
        (viewMode === "table" ? (
          <LSTTable lsts={filteredLSTs} />
        ) : (
          <LSTGrid lsts={filteredLSTs} />
        ))}

      {/* Empty/No Results State */}
      {!isLoading && !isError && filteredLSTs.length === 0 && (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
          {searchQuery ? (
            <>
              <p className="text-slate-400 mb-2">
                No LSTs match "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Clear search
              </button>
            </>
          ) : (
            <p className="text-slate-400">No LSTs found</p>
          )}
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Dashboard />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
