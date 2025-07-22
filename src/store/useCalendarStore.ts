// store/useCalendarStore.ts
import { create } from 'zustand';

type ViewMode = 'daily' | 'weekly' | 'monthly';

interface CalendarState {
  viewMode: ViewMode;
  selectedDate: Date | null;
  setViewMode: (mode: ViewMode) => void;
  setSelectedDate: (date: Date | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  viewMode: 'monthly',
  selectedDate: null,
  setViewMode: (viewMode) => set({ viewMode }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
}));
