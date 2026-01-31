import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  variant?: 'default' | 'success' | 'highlight';
}

export function StatCard({ title, value, subtitle, variant = 'default' }: StatCardProps) {
  return (
    <Card className="p-4">
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <p
        className={cn('text-2xl font-bold', {
          'text-white': variant === 'default',
          'text-emerald-400': variant === 'success',
          'text-purple-400': variant === 'highlight',
        })}
      >
        {value}
      </p>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </Card>
  );
}
