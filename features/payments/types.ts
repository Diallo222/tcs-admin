import type { TierId } from "@/core/constants/tiers";

export type PaymentStatus = "paid" | "failed" | "refunded" | "pending";
export type PaymentMethod = "card" | "ach" | "invoice" | "wire";

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  amount: number;
  tier: TierId;
  status: PaymentStatus;
  method: PaymentMethod;
  paidAt: string;
  receiptUrl?: string;
  invoiceId?: string;
}

export interface PaymentFilters {
  status: string;
  tier: string;
  search: string;
  dateFrom: string;
  dateTo: string;
}

export interface RefundRequest {
  paymentId: string;
  amount: number;
  reason: string;
}
