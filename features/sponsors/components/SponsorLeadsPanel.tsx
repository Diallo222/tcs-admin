"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Badge } from "@/shared/components/ui/Badge";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { SponsorLead } from "../types";

const leadStatusStyles: Record<SponsorLead["status"], string> = {
  new: "bg-blue-l text-blue1 border-blue1/20",
  contacted: "bg-orange-l text-orange border-orange/20",
  qualified: "bg-purple-l text-purple border-purple/20",
  converted: "bg-green-l text-green border-green/20",
};

export function SponsorLeadsPanel({ leads }: { leads: SponsorLead[] }) {
  const columns = useMemo<ColumnDef<SponsorLead>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted">{row.original.email}</p>
          </div>
        ),
      },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "title", header: "Title" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="default" className={leadStatusStyles[row.original.status]}>
            {row.original.status}
          </Badge>
        ),
      },
      { accessorKey: "source", header: "Source" },
      {
        accessorKey: "capturedAt",
        header: "Captured",
        cell: ({ row }) => formatDate(row.original.capturedAt),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={leads} pageSize={10} />;
}
