"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockQRAnalytics, mockQRCodes, mockQRScans } from "../data/mockQRCodes";
import type { GenerateQRInput, QRAnalyticsDay, QRCode, QRScan } from "../types";

interface QRState {
  codes: QRCode[];
  scans: QRScan[];
  analytics: QRAnalyticsDay[];
  selectedCodeId: string | null;
  generateOpen: boolean;
  openGenerate: () => void;
  closeGenerate: () => void;
  selectCode: (id: string | null) => void;
  getSelectedCode: () => QRCode | undefined;
  getScansForCode: (codeId: string) => QRScan[];
  generateCode: (input: GenerateQRInput) => void;
}

export const useQRStore = create<QRState>()(
  immer((set, get) => ({
    codes: mockQRCodes,
    scans: mockQRScans,
    analytics: mockQRAnalytics,
    selectedCodeId: mockQRCodes[0]?.id ?? null,
    generateOpen: false,
    openGenerate: () => set((state) => { state.generateOpen = true; }),
    closeGenerate: () => set((state) => { state.generateOpen = false; }),
    selectCode: (id) => set((state) => { state.selectedCodeId = id; }),
    getSelectedCode: () => {
      const { codes, selectedCodeId } = get();
      return codes.find((c) => c.id === selectedCodeId);
    },
    getScansForCode: (codeId) => get().scans.filter((s) => s.qrCodeId === codeId),
    generateCode: (input) =>
      set((state) => {
        const id = `qr_${String(state.codes.length + 1).padStart(3, "0")}`;
        const slug = input.campaign.toLowerCase().replace(/\s+/g, "-");
        state.codes.unshift({
          id,
          name: input.name,
          type: input.type,
          source: input.source,
          campaign: input.campaign,
          shortUrl: `https://tcs.link/${slug}`,
          scans: 0,
          conversions: 0,
          createdAt: new Date().toISOString().slice(0, 10),
          eventName: input.eventName,
        });
        state.selectedCodeId = id;
        state.generateOpen = false;
      }),
  })),
);
