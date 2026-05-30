"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQRStore } from "../store/useQRStore";

export function QRAnalyticsChart() {
  const data = useQRStore((s) => s.analytics);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>7-Day Scan Trend</SectionLabel>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barSize={16}>
            <defs>
              <linearGradient id="qrBrandGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A73E8" />
                <stop offset="100%" stopColor="#0DCAF0" />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#BBBBC5" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E8EB", fontSize: 12 }} />
            <Bar dataKey="scans" fill="url(#qrBrandGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
