"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { Input } from "@/shared/components/ui/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useTableFilters } from "@/shared/hooks/useTableFilters";
import { useEffect, useMemo, useState } from "react";
import { useSponsorsStore } from "../store/useSponsorsStore";

const defaultFilters = { tier: "", status: "", search: "" };

export function SponsorFilters() {
  const filters = useSponsorsStore((s) => s.filters);
  const setFilter = useSponsorsStore((s) => s.setFilter);
  const clearFilters = useSponsorsStore((s) => s.clearFilters);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useTableFilters(filters, setFilter, defaultFilters);

  useEffect(() => {
    setFilter("search", debouncedSearch);
  }, [debouncedSearch, setFilter]);

  const activeCount = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters],
  );

  return (
    <FilterBar
      activeCount={activeCount}
      onClear={() => {
        clearFilters();
        setSearchInput("");
      }}
    >
      <div className="flex-1 min-w-[200px]">
        <Input
          label="Search"
          placeholder="Company, industry, email…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
    </FilterBar>
  );
}
