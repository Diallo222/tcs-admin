import EventsPage from "@/features/events/pages/EventsPage";
import { PageSkeleton } from "@/shared/components/layout/PageSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EventsPage />
    </Suspense>
  );
}
