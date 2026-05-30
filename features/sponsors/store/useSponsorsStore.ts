"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockSponsors } from "../data/mockSponsors";
import type { Sponsor, SponsorFilters, SponsorStatus } from "../types";

interface SponsorsState {
  sponsors: Sponsor[];
  filters: SponsorFilters;
  setFilter: (key: keyof SponsorFilters, value: string) => void;
  clearFilters: () => void;
  getFilteredSponsors: () => Sponsor[];
  getSponsorById: (id: string) => Sponsor | undefined;
  updateSponsorStatus: (id: string, status: SponsorStatus) => void;
}

const defaultFilters: SponsorFilters = { tier: "", status: "", search: "" };

export const useSponsorsStore = create<SponsorsState>()(
  immer((set, get) => ({
    sponsors: mockSponsors,
    filters: defaultFilters,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    getFilteredSponsors: () => {
      const { sponsors, filters } = get();
      return sponsors.filter((s) => {
        if (filters.tier && s.tier !== filters.tier) return false;
        if (filters.status && s.status !== filters.status) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            s.name.toLowerCase().includes(q) ||
            s.industry.toLowerCase().includes(q) ||
            s.contactEmail.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
    getSponsorById: (id) => get().sponsors.find((s) => s.id === id),
    updateSponsorStatus: (id, status) =>
      set((state) => {
        const sponsor = state.sponsors.find((s) => s.id === id);
        if (sponsor) sponsor.status = status;
      }),
  })),
);
