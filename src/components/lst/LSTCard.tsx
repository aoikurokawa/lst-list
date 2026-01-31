import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatPercent, formatCurrency } from "../../utils/format";
import type { LST } from "../../types";

interface LSTCardProps {
  lst: LST;
}

export function LSTCard({ lst }: LSTCardProps) {
  return (
    <Card className="p-5 hover:border-slate-600 transition-colors">
      {/* Header: Name */}
      <div className="mb-4">
        <h3 className="font-semibold text-white truncate">{lst.symbol}</h3>
        <p className="text-sm text-slate-400 truncate">{lst.name}</p>
      </div>

      {/* Price vs SOL */}
      <div className="mb-4 pb-4 border-b border-slate-700/50">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
          Price
        </p>
        <p className="text-xl font-bold text-white">
          {lst.priceInSol.toFixed(4)}{" "}
          <span className="text-slate-400 text-sm">SOL</span>
        </p>
        <p className="text-sm text-slate-400">
          ${lst.priceInUsd.toFixed(2)} USD
        </p>
      </div>

      {/* APY + TVL */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            APY
          </p>
          {lst.apy > 0 ? (
            <Badge variant="success" className="text-sm">
              {formatPercent(lst.apy)}
            </Badge>
          ) : (
            <Badge variant="default" className="text-sm">
              N/A
            </Badge>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            TVL
          </p>
          <p className="text-sm font-medium text-white">
            {formatCurrency(lst.tvlUsd)}
          </p>
        </div>
      </div>
    </Card>
  );
}
