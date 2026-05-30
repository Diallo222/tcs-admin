"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { formatDate, formatPercent } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useQRStore } from "../store/useQRStore";
import type { QRCode } from "../types";
import { QR_TYPE_LABELS } from "../types";

export function QRCodesTable() {
  const codes = useQRStore((s) => s.codes);
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const selectCode = useQRStore((s) => s.selectCode);

  const columns = useMemo<ColumnDef<QRCode>[]>(
    () => [
      { accessorKey: "name", header: "Code Name" },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="gradient">{QR_TYPE_LABELS[row.original.type]}</Badge>
        ),
      },
      { accessorKey: "source", header: "Source" },
      { accessorKey: "campaign", header: "Campaign" },
      { accessorKey: "scans", header: "Scans" },
      {
        id: "convRate",
        header: "Conv. Rate",
        cell: ({ row }) => {
          const rate = row.original.scans > 0
            ? row.original.conversions / row.original.scans
            : 0;
          return formatPercent(rate);
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button
            variant={selectedCodeId === row.original.id ? "primary" : "ghost"}
            size="sm"
            onClick={() => selectCode(row.original.id)}
          >
            {selectedCodeId === row.original.id ? "Selected" : "View"}
          </Button>
        ),
        enableSorting: false,
      },
    ],
    [selectedCodeId, selectCode],
  );

  return <DataTable columns={columns} data={codes} />;
}
