"use client";

import { GradientButton } from "@/shared/components/ui/GradientButton";
import { useQRStore } from "../store/useQRStore";

export function OpenGenerateButton() {
  const openGenerate = useQRStore((s) => s.openGenerate);
  return <GradientButton onClick={openGenerate}>Generate QR</GradientButton>;
}
