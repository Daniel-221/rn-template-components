import { useSyncExternalStore } from 'react';

type Listener = () => void;
type PartialState<T> = Partial<T> | ((state: T) => Partial<T>);

type StoreHook<T> = {
  (): T;
  <S>(selector: (state: T) => S): S;
  getState: () => T;
};

export function createStore<T extends object>(
  init: (set: (partial: PartialState<T>) => void) => T,
): StoreHook<T> {
  let state: T;
  const listeners = new Set<Listener>();

  const set = (partial: PartialState<T>) => {
    const next = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...next };
    listeners.forEach(listener => listener());
  };

  state = init(set);

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getSnapshot = () => state;

  function useStore(): T;
  function useStore<S>(selector: (state: T) => S): S;
  function useStore<S>(selector?: (state: T) => S) {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    return selector ? selector(snapshot) : snapshot;
  }

  useStore.getState = () => state;
  return useStore;
}
