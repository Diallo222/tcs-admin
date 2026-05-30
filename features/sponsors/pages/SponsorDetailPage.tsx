"use client";

import { EmptyState, PageHeader } from "@/shared/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { formatDate } from "@/shared/utils/formatters";
import { useRouter } from "next/navigation";
import { SponsorKPIRow } from "../components/SponsorKPIRow";
import { SponsorLeadsPanel } from "../components/SponsorLeadsPanel";
import { SponsorStatusBadge, SponsorTierBadge } from "../components/SponsorStatusBadge";
import { useSponsorsStore } from "../store/useSponsorsStore";

export default function SponsorDetailPage({ sponsorId }: { sponsorId: string }) {
  const router = useRouter();
  const sponsor = useSponsorsStore((s) => s.getSponsorById(sponsorId));

  if (!sponsor) {
    return (
      <>
        <PageHeader title="Sponsor Not Found" subtitle={`No sponsor with ID ${sponsorId}`} />
        <EmptyState
          title="Sponsor not found"
          description="This sponsor may have been removed or the link is incorrect."
          actionLabel="Back to Sponsors"
          onAction={() => router.push("/sponsors")}
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={sponsor.name}
        subtitle={`${sponsor.industry} · ${sponsor.contactEmail}`}
        action={
          <div className="flex items-center gap-2">
            <SponsorTierBadge tier={sponsor.tier} />
            <SponsorStatusBadge status={sponsor.status} />
          </div>
        }
      />

      <SponsorKPIRow sponsor={sponsor} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionLabel>Profile</SectionLabel>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted">{sponsor.description}</p>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Website</dt>
                <dd className="mt-1 text-blue1">{sponsor.website}</dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Phone</dt>
                <dd className="mt-1">{sponsor.contactPhone}</dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Since</dt>
                <dd className="mt-1">{formatDate(sponsor.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Portal users</dt>
                <dd className="mt-1">{sponsor.users.length}</dd>
              </div>
            </dl>
            {sponsor.eventsSponsored.length > 0 && (
              <div>
                <p className="text-hint text-xs uppercase tracking-wider mb-2">Assigned events</p>
                <div className="flex flex-wrap gap-2">
                  {sponsor.eventsSponsored.map((event) => (
                    <span
                      key={event}
                      className="text-xs bg-surf border border-border rounded-full px-3 py-1"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionLabel>Active offers</SectionLabel>
          </CardHeader>
          <CardContent>
            {sponsor.offers.length === 0 ? (
              <p className="text-sm text-muted">No active offers</p>
            ) : (
              <ul className="space-y-3">
                {sponsor.offers.map((offer) => (
                  <li key={offer.id} className="rounded-xl border border-border p-3">
                    <p className="font-medium text-sm">{offer.title}</p>
                    <p className="text-xs text-muted mt-1">{offer.description}</p>
                    <p className="text-xs text-gold mt-2">{offer.perk}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <SectionLabel>Portal users</SectionLabel>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {sponsor.users.map((user) => (
              <li key={user.id} className="flex justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted">{user.email}</p>
                </div>
                <span className="text-xs text-hint capitalize">{user.role}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <SectionLabel className="mb-3">Leads</SectionLabel>
      <SponsorLeadsPanel leads={sponsor.leads} />
    </>
  );
}
