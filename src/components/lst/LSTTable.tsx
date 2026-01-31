import { useState } from "react";
import { formatPercent, formatCurrency } from "../../utils/format";
import type { LST } from "../../types";

type SortKey = "symbol" | "priceInSol" | "priceInUsd" | "apy" | "tvlUsd";
type SortDirection = "asc" | "desc";

interface LSTTableProps {
  lsts: LST[];
}

export function LSTTable({ lsts }: LSTTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("tvlUsd");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedLSTs = [...lsts].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const SortHeader = ({
    label,
    sortKeyName,
  }: {
    label: string;
    sortKeyName: SortKey;
  }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
      onClick={() => handleSort(sortKeyName)}
    >
      <div className="flex items-center gap-1">
        {label}
        <span className="text-slate-600">
          {sortKey === sortKeyName
            ? sortDirection === "asc"
              ? "↑"
              : "↓"
            : "↕"}
        </span>
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/30">
      <table className="min-w-full divide-y divide-slate-700/50">
        <thead className="bg-slate-800/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              #
            </th>
            <SortHeader label="Token" sortKeyName="symbol" />
            <SortHeader label="Price (SOL)" sortKeyName="priceInSol" />
            <SortHeader label="Price (USD)" sortKeyName="priceInUsd" />
            <SortHeader label="APY" sortKeyName="apy" />
            <SortHeader label="TVL" sortKeyName="tvlUsd" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/30">
          {sortedLSTs.map((lst, index) => (
            <tr
              key={lst.mint}
              className="hover:bg-slate-700/30 transition-colors"
            >
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                {index + 1}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-white">{lst.symbol}</div>
                  <div className="text-xs text-slate-400 max-w-[200px] truncate">
                    {lst.name}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                {lst.priceInSol.toFixed(4)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                ${lst.priceInUsd.toFixed(2)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {lst.apy > 0 ? (
                  <span className="text-emerald-400 font-medium">
                    {formatPercent(lst.apy)}
                  </span>
                ) : (
                  <span className="text-slate-500">N/A</span>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                {formatCurrency(lst.tvlUsd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
