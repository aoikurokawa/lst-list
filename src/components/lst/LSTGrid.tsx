import { LSTCard } from './LSTCard';
import type { LST } from '../../types';

interface LSTGridProps {
  lsts: LST[];
}

export function LSTGrid({ lsts }: LSTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {lsts.map((lst) => (
        <LSTCard key={lst.mint} lst={lst} />
      ))}
    </div>
  );
}
