"use client";

import { useQRStore } from "../store/useQRStore";
import { QRCodeDisplay } from "./QRCodeDisplay";

export function QRCodeDisplayPanel() {
  const code = useQRStore((s) => s.getSelectedCode());

  if (!code) {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
        Select a QR code to preview
      </div>
    );
  }

  return <QRCodeDisplay code={code} />;
}
