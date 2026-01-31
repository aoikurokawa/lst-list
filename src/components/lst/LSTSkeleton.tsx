import { Card } from '../ui/Card';

export function LSTSkeleton() {
  return (
    <Card className="p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-slate-700" />
        <div className="flex-1">
          <div className="h-5 w-16 bg-slate-700 rounded mb-2" />
          <div className="h-4 w-24 bg-slate-700 rounded" />
        </div>
      </div>
      <div className="mb-4 pb-4 border-b border-slate-700/50">
        <div className="h-3 w-12 bg-slate-700 rounded mb-2" />
        <div className="h-7 w-28 bg-slate-700 rounded mb-1" />
        <div className="h-4 w-20 bg-slate-700 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 w-8 bg-slate-700 rounded mb-2" />
          <div className="h-6 w-16 bg-slate-700 rounded" />
        </div>
        <div className="text-right">
          <div className="h-3 w-10 bg-slate-700 rounded mb-2" />
          <div className="h-6 w-12 bg-slate-700 rounded" />
        </div>
      </div>
    </Card>
  );
}

export function LSTGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <LSTSkeleton key={i} />
      ))}
    </div>
  );
}
