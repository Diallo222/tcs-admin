"use client";

import { TooltipProvider } from "@/shared/components/ui/Tooltip";
import { type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <TooltipProvider delayDuration={300}>{children}</TooltipProvider>;
}
