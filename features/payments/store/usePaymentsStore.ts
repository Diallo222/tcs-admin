"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockPayments } from "../data/mockPayments";
import type { Payment, PaymentFilters, RefundRequest } from "../types";

interface PaymentsState {
  payments: Payment[];
  filters: PaymentFilters;
  refundPaymentId: string | null;
  refundOpen: boolean;
  setFilter: (key: keyof PaymentFilters, value: string) => void;
  clearFilters: () => void;
  getFilteredPayments: () => Payment[];
  openRefund: (paymentId: string) => void;
  closeRefund: () => void;
  processRefund: (request: RefundRequest) => void;
}

const defaultFilters: PaymentFilters = {
  status: "",
  tier: "",
  search: "",
  dateFrom: "",
  dateTo: "",
};

export const usePaymentsStore = create<PaymentsState>()(
  immer((set, get) => ({
    payments: mockPayments,
    filters: defaultFilters,
    refundPaymentId: null,
    refundOpen: false,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    getFilteredPayments: () => {
      const { payments, filters } = get();
      return payments.filter((p) => {
        if (filters.status && p.status !== filters.status) return false;
        if (filters.tier && p.tier !== filters.tier) return false;
        if (filters.dateFrom && p.paidAt < filters.dateFrom) return false;
        if (filters.dateTo && p.paidAt > filters.dateTo) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            p.memberName.toLowerCase().includes(q) ||
            p.memberEmail.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
    openRefund: (paymentId) =>
      set((state) => {
        state.refundPaymentId = paymentId;
        state.refundOpen = true;
      }),
    closeRefund: () =>
      set((state) => {
        state.refundOpen = false;
        state.refundPaymentId = null;
      }),
    processRefund: (request) =>
      set((state) => {
        const payment = state.payments.find((p) => p.id === request.paymentId);
        if (payment && payment.status === "paid") {
          payment.status = "refunded";
        }
        state.refundOpen = false;
        state.refundPaymentId = null;
      }),
  })),
);
