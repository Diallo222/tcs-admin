import { TIERS } from "@/core/constants/tiers";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { formatCurrency } from "@/shared/utils/formatters";

export function TierPricingTable() {
  return (
    <Card>
      <CardHeader>
        <SectionLabel>Membership tiers & pricing</SectionLabel>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                  Tier
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                  Monthly
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                  Annual
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                  Key features
                </th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((tier) => (
                <tr key={tier.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{tier.label}</td>
                  <td className="px-4 py-3">
                    {tier.price === 0 ? "Free" : formatCurrency(tier.price)}
                  </td>
                  <td className="px-4 py-3">
                    {tier.annualPrice === 0 ? "—" : formatCurrency(tier.annualPrice)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {tier.features.join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
