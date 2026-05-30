"use client";

import { Input } from "@/shared/components/ui/Input";
import { usePaymentsStore } from "../store/usePaymentsStore";

export function PaymentFilters() {
  const filters = usePaymentsStore((s) => s.filters);
  const setFilter = usePaymentsStore((s) => s.setFilter);
  const clearFilters = usePaymentsStore((s) => s.clearFilters);

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          label="Search"
          placeholder="Member name, email, payment ID…"
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
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
