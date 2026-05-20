import { cn } from '../../lib/utils';

export function Card({ className, ...props }) {
  return <div className={cn('rounded-lg border border-white/20 bg-black/90 text-white', className)} {...props} />;
}
export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 p-4', className)} {...props} />;
}
export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-sm font-semibold leading-none text-white', className)} {...props} />;
}
export function CardContent({ className, ...props }) {
  return <div className={cn('p-4 pt-0', className)} {...props} />;
}
