import { Dimensions } from 'react-native';
import { create } from 'zustand';

type States = {
  layout: { width: number; height: number };
};

type Actions = {
  setLayout: (layout: { width: number; height: number }) => void;
};

const initialWindow = Dimensions.get('window');

export const useDimensionStore = create<States & Actions>(set => ({
  layout: {
    width: initialWindow.width,
    height: initialWindow.height,
  },
  setLayout: (layout: { width: number; height: number }) => {
    set({ layout });
  },
}));

Dimensions.addEventListener('change', ({ window }) => {
  useDimensionStore
    .getState()
    .setLayout({ width: window.width, height: window.height });
});
