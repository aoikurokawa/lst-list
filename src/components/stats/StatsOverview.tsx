import { StatCard } from "./StatCard";
import { formatPercent, formatCurrency } from "../../utils/format";
import type { LSTStats } from "../../types";

interface StatsOverviewProps {
  stats: LSTStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total TVL"
        value={formatCurrency(stats.totalTvlUsd)}
        subtitle={`${(stats.totalTvlSol / 1_000_000).toFixed(2)}M SOL`}
      />
      <StatCard title="LSTs Tracked" value={stats.totalLSTs.toString()} />
      <StatCard
        title="Average APY"
        value={formatPercent(stats.averageApy)}
        variant="success"
      />
      <StatCard
        title="Highest APY"
        value={stats.highestApy.symbol}
        subtitle={formatPercent(stats.highestApy.apy)}
        variant="highlight"
      />
    </div>
  );
}
