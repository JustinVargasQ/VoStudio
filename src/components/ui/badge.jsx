import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variant === 'default' && 'border-transparent bg-black text-white',
        variant === 'outline' && 'border-white/30 text-white',
        className
      )}
      {...props}
    />
  );
}
