"use client";

import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Copy, Download } from "lucide-react";
import { useState } from "react";
import type { QRCode } from "../types";
import { QR_TYPE_LABELS } from "../types";

function QRPlaceholder({ label }: { label: string }) {
  const size = 12;
  const cells = Array.from({ length: size * size }, (_, i) => {
    const row = Math.floor(i / size);
    const col = i % size;
    const isCorner =
      (row < 3 && col < 3) ||
      (row < 3 && col >= size - 3) ||
      (row >= size - 3 && col < 3);
    const hash = (row * 7 + col * 13 + label.length) % 3;
    return isCorner || hash !== 0;
  });

  return (
    <div
      className="grid gap-0.5 p-4 bg-white border border-border rounded-xl"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {cells.map((filled, i) => (
        <div
          key={i}
          className={filled ? "bg-ink rounded-sm aspect-square" : "bg-transparent aspect-square"}
        />
      ))}
    </div>
  );
}

export function QRCodeDisplay({ code }: { code: QRCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <QRPlaceholder label={code.shortUrl} />
          <div className="text-center">
            <p className="font-semibold text-ink">{code.name}</p>
            <p className="text-xs text-muted mt-1">{QR_TYPE_LABELS[code.type]}</p>
            <p className="text-sm text-blue1 mt-2 break-all">{code.shortUrl}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              {copied ? "Copied!" : "Copy link"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PNG
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              SVG
            </Button>
          </div>
          <dl className="grid grid-cols-2 gap-4 w-full text-sm mt-2">
            <div className="text-center">
              <dt className="text-hint text-xs">Scans</dt>
              <dd className="font-bold text-lg">{code.scans}</dd>
            </div>
            <div className="text-center">
              <dt className="text-hint text-xs">Conversions</dt>
              <dd className="font-bold text-lg">{code.conversions}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
