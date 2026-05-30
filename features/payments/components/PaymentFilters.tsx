"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { Input } from "@/shared/components/ui/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useTableFilters } from "@/shared/hooks/useTableFilters";
import { useEffect, useMemo, useState } from "react";
import { usePaymentsStore } from "../store/usePaymentsStore";

const defaultFilters = {
  status: "",
  tier: "",
  search: "",
  dateFrom: "",
  dateTo: "",
};

export function PaymentFilters() {
  const filters = usePaymentsStore((s) => s.filters);
  const setFilter = usePaymentsStore((s) => s.setFilter);
  const clearFilters = usePaymentsStore((s) => s.clearFilters);
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
          placeholder="Member name, email, payment ID…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="w-36">
        <label className="text-xs font-medium text-ink2 block mb-1.5">Status</label>
        <select
          className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
        >
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="w-36">
        <label className="text-xs font-medium text-ink2 block mb-1.5">Tier</label>
        <select
          className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
          value={filters.tier}
          onChange={(e) => setFilter("tier", e.target.value)}
        >
          <option value="">All</option>
          <option value="community">Community</option>
          <option value="builder">Builder</option>
          <option value="executive">Executive</option>
          <option value="partner">Partner</option>
          <option value="legacy">Legacy</option>
        </select>
      </div>
      <div className="w-36">
        <Input
          label="From"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter("dateFrom", e.target.value)}
        />
      </div>
      <div className="w-36">
        <Input
          label="To"
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter("dateTo", e.target.value)}
        />
      </div>
    </FilterBar>
  );
}
