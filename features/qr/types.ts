export type QRType =
  | "event_check_in"
  | "event_registration"
  | "sponsor_lead"
  | "member_profile"
  | "intro_request"
  | "dinner_request"
  | "payment_link"
  | "app_download"
  | "custom";

export type QRConversionStatus = "none" | "signup" | "rsvp" | "lead" | "payment";

export interface QRScan {
  id: string;
  qrCodeId: string;
  timestamp: string;
  userName?: string;
  userEmail?: string;
  conversionStatus: QRConversionStatus;
}

export interface QRCode {
  id: string;
  name: string;
  type: QRType;
  source: string;
  campaign: string;
  shortUrl: string;
  scans: number;
  conversions: number;
  createdAt: string;
  eventName?: string;
  sponsorName?: string;
}

export interface QRAnalyticsDay {
  day: string;
  scans: number;
}

export interface GenerateQRInput {
  name: string;
  type: QRType;
  source: string;
  campaign: string;
  eventName?: string;
}

export const QR_TYPE_LABELS: Record<QRType, string> = {
  event_check_in: "Event Check-in",
  event_registration: "Event Registration",
  sponsor_lead: "Sponsor Lead",
  member_profile: "Member Profile",
  intro_request: "Intro Request",
  dinner_request: "Dinner Request",
  payment_link: "Payment Link",
  app_download: "App Download",
  custom: "Custom",
};
