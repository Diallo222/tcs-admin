"use client";

"use client";

import { Input } from "@/shared/components/ui/Input";
import { useSponsorsStore } from "../store/useSponsorsStore";

export function SponsorFilters() {
  const filters = useSponsorsStore((s) => s.filters);
  const setFilter = useSponsorsStore((s) => s.setFilter);
  const clearFilters = useSponsorsStore((s) => s.clearFilters);

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          label="Search"
          placeholder="Company, industry, email…"
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
        />
      </div>
      <div className="w-40">
        <label className="text-xs font-medium text-ink2 block mb-1.5">Tier</label>
        <select
          className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
          value={filters.tier}
          onChange={(e) => setFilter("tier", e.target.value)}
        >
          <option value="">All tiers</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
          <option value="partner">Partner</option>
        </select>
      </div>
      <div className="w-40">
        <label className="text-xs font-medium text-ink2 block mb-1.5">Status</label>
        <select
          className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <button
        type="button"
        onClick={clearFilters}
        className="h-11 px-4 text-sm text-muted hover:text-ink transition-colors"
      >
        Clear
      </button>
    </div>
  );
}
