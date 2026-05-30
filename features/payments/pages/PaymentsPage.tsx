import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { PaymentFilters } from "../components/PaymentFilters";
import { PaymentsTable } from "../components/PaymentsTable";
import { RefundModal } from "../components/RefundModal";
import { TierPricingTable } from "../components/TierPricingTable";

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Membership billing and subscription management"
      />

      <section className="mb-10 space-y-4">
        <SectionLabel>Payment history</SectionLabel>
        <PaymentFilters />
        <PaymentsTable />
      </section>

      <section className="space-y-4">
        <SectionLabel>Tier pricing</SectionLabel>
        <TierPricingTable />
      </section>

      <RefundModal />
    </>
  );
}
