"use client";

import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useQRStore } from "../store/useQRStore";
import { ScanLogTable } from "./ScanLogTable";

export function ScanLogPanel() {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const getScansForCode = useQRStore((s) => s.getScansForCode);
  const codes = useQRStore((s) => s.codes);
  const selected = codes.find((c) => c.id === selectedCodeId);
  const scans = selectedCodeId ? getScansForCode(selectedCodeId) : [];

  return (
    <section className="space-y-4">
      <SectionLabel>
        Scan log{selected ? ` — ${selected.name}` : ""}
      </SectionLabel>
      <ScanLogTable scans={scans} />
    </section>
  );
}
