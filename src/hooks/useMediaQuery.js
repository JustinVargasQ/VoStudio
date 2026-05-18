import { useSyncExternalStore } from 'react';

const noop = () => () => {};
const noopServer = () => false;

/**
 * Returns true when the given media query matches.
 * Uses useSyncExternalStore for SSR-safety and no cascading renders.
 */
export function useMediaQuery(query) {
  const subscribe = typeof window === 'undefined'
    ? noop
    : (cb) => {
        const mq = window.matchMedia(query);
        mq.addEventListener('change', cb);
        return () => mq.removeEventListener('change', cb);
      };

  const getSnapshot = typeof window === 'undefined'
    ? noopServer
    : () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, noopServer);
}

export const useIsTouch = () => useMediaQuery('(hover: none), (pointer: coarse)');
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
