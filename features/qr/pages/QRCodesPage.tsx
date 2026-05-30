import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { GenerateQRModal } from "../components/GenerateQRModal";
import { QRAnalyticsChart } from "../components/QRAnalyticsChart";
import { QRCodeDisplayPanel } from "../components/QRCodeDisplayPanel";
import { QRCodesTable } from "../components/QRCodesTable";
import { ScanLogPanel } from "../components/ScanLogPanel";
import { OpenGenerateButton } from "../components/OpenGenerateButton";

export default function QRCodesPage() {
  return (
    <>
      <PageHeader
        title="QR Codes"
        subtitle="Generate and track QR codes across events and campaigns"
        action={<OpenGenerateButton />}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <QRAnalyticsChart />
        </div>
        <QRCodeDisplayPanel />
      </div>

      <SectionLabel className="mb-3">All QR codes</SectionLabel>
      <QRCodesTable />

      <div className="mt-10">
        <ScanLogPanel />
      </div>

      <GenerateQRModal />
    </>
  );
}
