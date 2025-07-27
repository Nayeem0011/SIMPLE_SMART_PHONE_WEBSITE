import { create } from 'zustand';

type SearchState = {
  search: string;
  setSearch: (value: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
}));
