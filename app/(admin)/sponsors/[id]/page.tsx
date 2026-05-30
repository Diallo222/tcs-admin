import SponsorDetailPage from "@/features/sponsors/pages/SponsorDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SponsorDetailPage sponsorId={id} />;
}
