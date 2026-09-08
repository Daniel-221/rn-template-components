import { useRef } from 'react';

export function useMemoizedFn<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const persist = useRef(((...args: Parameters<T>) =>
    fnRef.current(...args)) as T);
  return persist.current;
}
