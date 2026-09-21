"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function PortfolioChart({
  data,
}: {
  data: { date: string; value: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value)
          }
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#c9a227"
          strokeWidth={2}
          dot={{ fill: "#0a1a2f" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}