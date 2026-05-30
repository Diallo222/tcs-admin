import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import type { SponsorStatus, SponsorTier } from "../types";

const tierConfig: Record<SponsorTier, { label: string; className: string }> = {
  platinum: { label: "Platinum", className: "bg-dark1 text-white border-dark1" },
  gold: { label: "Gold", className: "bg-gold-l text-gold border-gold/20" },
  silver: { label: "Silver", className: "bg-surf text-muted border-border" },
  bronze: { label: "Bronze", className: "bg-orange-l text-orange border-orange/20" },
  partner: { label: "Partner", className: "bg-blue-l text-blue1 border-blue1/20" },
};

const statusConfig: Record<SponsorStatus, { label: string; variant: "status" | "stage" | "default"; className?: string }> = {
  active: { label: "Active", variant: "status" },
  inactive: { label: "Inactive", variant: "default", className: "bg-surf text-muted" },
  pending: { label: "Pending", variant: "stage" },
};

export function SponsorTierBadge({ tier }: { tier: SponsorTier }) {
  const config = tierConfig[tier];
  return (
    <Badge variant="default" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}

export function SponsorStatusBadge({ status }: { status: SponsorStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
