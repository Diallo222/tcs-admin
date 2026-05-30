"use client";

import { cn } from "@/shared/utils/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded border border-border bg-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue1/20",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-blue1 data-[state=checked]:bg-blue1 data-[state=checked]:text-white",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

interface LabeledCheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export function LabeledCheckbox({ label, className, id, ...props }: LabeledCheckboxProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Checkbox id={inputId} {...props} />
      {label && (
        <label htmlFor={inputId} className="text-sm text-ink2 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}
