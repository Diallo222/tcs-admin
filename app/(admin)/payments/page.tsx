import PaymentsPage from "@/features/payments/pages/PaymentsPage";
import { PageSkeleton } from "@/shared/components/layout/PageSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PaymentsPage />
    </Suspense>
  );
}
