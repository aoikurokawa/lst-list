import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
