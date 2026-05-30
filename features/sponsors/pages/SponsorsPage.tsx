import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { SponsorFilters } from "../components/SponsorFilters";
import { SponsorsTable } from "../components/SponsorsTable";

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        title="Sponsors"
        subtitle="Sponsor companies and portal access"
        action={<GradientButton>Add Sponsor</GradientButton>}
      />
      <SponsorFilters />
      <SponsorsTable />
    </>
  );
}
