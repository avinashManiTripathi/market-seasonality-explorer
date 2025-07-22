import { atom } from 'recoil';

export type ViewMode = 'daily' | 'weekly' | 'monthly';

export const viewModeAtom = atom<ViewMode>({
  key: 'viewMode',
  default: 'monthly',
});

export const selectedDateAtom = atom<Date | null>({
  key: 'selectedDate',
  default: null,
});

export const volatilityDataAtom = atom<Record<string, number>>({
  key: 'volatilityData',
  default: {}, // e.g., { "2025-07-22": 0.73 }
});
