import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import type { PaymentStatus } from "../types";

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  paid: { label: "Paid", className: "bg-green-l text-green border-green/20" },
  failed: { label: "Failed", className: "bg-red-l text-red border-red/20" },
  refunded: { label: "Refunded", className: "bg-purple-l text-purple border-purple/20" },
  pending: { label: "Pending", className: "bg-orange-l text-orange border-orange/20" },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant="default" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
