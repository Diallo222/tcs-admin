"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { Input } from "@/shared/components/ui/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useTableFilters } from "@/shared/hooks/useTableFilters";
import { useEffect, useMemo, useState } from "react";
import { useIntrosStore } from "../store/useIntrosStore";

const statuses = ["", "pending", "approved", "declined", "completed", "follow_up"];
const defaultFilters = { status: "", dateFrom: "", dateTo: "", search: "" };

export function IntroFilters() {
  const filters = useIntrosStore((s) => s.filters);
  const setFilter = useIntrosStore((s) => s.setFilter);
  const clearFilters = useIntrosStore((s) => s.clearFilters);
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
          placeholder="Search members, companies, reason..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => setFilter("status", e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        <option value="">All Statuses</option>
        {statuses.filter(Boolean).map((s) => (
          <option key={s} value={s}>
            {s === "follow_up" ? "Follow-up" : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
      <Input
        type="date"
        label="From"
        value={filters.dateFrom}
        onChange={(e) => setFilter("dateFrom", e.target.value)}
        className="w-auto min-w-[140px]"
      />
      <Input
        type="date"
        label="To"
        value={filters.dateTo}
        onChange={(e) => setFilter("dateTo", e.target.value)}
        className="w-auto min-w-[140px]"
      />
    </FilterBar>
  );
}
