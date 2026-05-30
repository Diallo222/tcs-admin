"use client";

import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Copy, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function EventQRPlaceholder({ seed }: { seed: string }) {
  const size = 10;
  const cells = Array.from({ length: size * size }, (_, i) => {
    const row = Math.floor(i / size);
    const col = i % size;
    const isCorner =
      (row < 2 && col < 2) ||
      (row < 2 && col >= size - 2) ||
      (row >= size - 2 && col < 2);
    const hash = (row * 7 + col * 13 + seed.length) % 3;
    return isCorner || hash !== 0;
  });

  return (
    <div
      className="grid gap-0.5 p-3 bg-white border border-border rounded-xl mx-auto w-fit"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {cells.map((filled, i) => (
        <div
          key={i}
          className={filled ? "bg-ink rounded-sm aspect-square w-3 h-3" : "aspect-square w-3 h-3"}
        />
      ))}
    </div>
  );
}

export function EventQRCard({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const checkInUrl = `https://tcs.link/checkin/${eventId}`;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(checkInUrl);
    setCopied(true);
    toast.success("Check-in link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Event Check-in QR</SectionLabel>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <EventQRPlaceholder seed={eventId} />
        <div>
          <p className="text-sm font-medium text-ink">{eventTitle}</p>
          <p className="text-xs text-hint mt-1 break-all">{checkInUrl}</p>
        </div>
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" onClick={copyLink}>
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.info("PNG download available in Phase 2")}>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
