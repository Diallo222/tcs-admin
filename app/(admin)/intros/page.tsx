import IntrosPage from "@/features/intros/pages/IntrosPage";
import { PageSkeleton } from "@/shared/components/layout/PageSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <IntrosPage />
    </Suspense>
  );
}
