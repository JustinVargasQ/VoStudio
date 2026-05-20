import { cn } from '../../lib/utils';

export function Button({ className, variant = 'default', size = 'default', onClick, children, ...props }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors cursor-pointer',
        variant === 'outline' && 'border border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white',
        variant === 'default' && 'bg-white text-black hover:bg-white/90',
        size === 'sm' && 'h-6 px-2 py-0 text-xs rounded-none',
        size === 'default' && 'h-10 px-4 py-2 rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
