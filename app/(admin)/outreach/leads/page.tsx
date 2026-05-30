import LeadsPage from "@/features/outreach/pages/LeadsPage";
import { PageSkeleton } from "@/shared/components/layout/PageSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LeadsPage />
    </Suspense>
  );
}
