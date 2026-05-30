"use client";

import { cn } from "@/shared/utils/cn";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            "z-50 rounded-lg bg-dark1 px-3 py-1.5 text-xs text-white shadow-md",
            className,
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-dark1" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
