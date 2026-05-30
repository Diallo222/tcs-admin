import { navItems } from "@/core/constants/nav";
import type { LucideIcon } from "lucide-react";

export interface CommandItem {
  label: string;
  href: string;
  icon: LucideIcon;
  group: string;
  keywords?: string;
}

export const commandItems: CommandItem[] = navItems.flatMap((item) => {
  const entries: CommandItem[] = [
    {
      label: item.label,
      href: item.href,
      icon: item.icon,
      group: "Navigation",
      keywords: item.label.toLowerCase(),
    },
  ];

  if (item.children) {
    for (const child of item.children) {
      entries.push({
        label: child.label,
        href: child.href,
        icon: item.icon,
        group: item.label,
        keywords: `${item.label} ${child.label}`.toLowerCase(),
      });
    }
  }

  return entries;
});

export const quickActionItems: CommandItem[] = [
  {
    label: "Create Event",
    href: "/events/new",
    icon: navItems.find((n) => n.href === "/events")!.icon,
    group: "Quick Actions",
    keywords: "new event create",
  },
  {
    label: "Review Approvals",
    href: "/members/approvals",
    icon: navItems.find((n) => n.href === "/members")!.icon,
    group: "Quick Actions",
    keywords: "approve members pending",
  },
  {
    label: "Add Lead",
    href: "/outreach/leads",
    icon: navItems.find((n) => n.href === "/outreach")!.icon,
    group: "Quick Actions",
    keywords: "crm lead contact",
  },
  {
    label: "Generate QR Code",
    href: "/qr-codes",
    icon: navItems.find((n) => n.href === "/qr-codes")!.icon,
    group: "Quick Actions",
    keywords: "qr scan code",
  },
];

export const allCommandItems = [...quickActionItems, ...commandItems];
