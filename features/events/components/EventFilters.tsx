"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { Input } from "@/shared/components/ui/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useTableFilters } from "@/shared/hooks/useTableFilters";
import { useEffect, useMemo, useState } from "react";
import { EVENT_STATUSES, EVENT_TYPES } from "../data/mockEvents";
import { useEventsStore } from "../store/useEventsStore";

const defaultFilters = {
  status: "",
  type: "",
  dateFrom: "",
  dateTo: "",
  search: "",
};

export function EventFilters() {
  const filters = useEventsStore((s) => s.filters);
  const setFilter = useEventsStore((s) => s.setFilter);
  const clearFilters = useEventsStore((s) => s.clearFilters);
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
          placeholder="Search title, location, venue..."
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
        {EVENT_STATUSES.map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      <select
        value={filters.type}
        onChange={(e) => setFilter("type", e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        <option value="">All Types</option>
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
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
