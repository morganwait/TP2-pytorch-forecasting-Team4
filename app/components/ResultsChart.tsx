"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";
import { Result, MODEL_COLORS, Model } from "@/lib/data";

interface Props {
  results: Result[];
  bestModel: Model;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val: number = payload[0].value;
    return (
      <div className="bg-white border border-[var(--border)] rounded-lg shadow-lg p-3">
        <p className="font-playfair font-bold text-[var(--navy)] text-sm">{label}</p>
        <p className="font-jakarta text-sm mt-1">
          MAPE: <span className="font-semibold">{val.toFixed(2)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ResultsChart({ results, bestModel }: Props) {
  const data = results.map((r) => ({
    model: r.model,
    mape: parseFloat(r.mape.toFixed(2)),
    isBest: r.model === bestModel,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
        <XAxis
          dataKey="model"
          tick={{ fontFamily: "var(--font-jakarta)", fontSize: 13, fill: "#292524" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontFamily: "var(--font-jakarta)", fontSize: 12, fill: "#78716c" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
        <Bar dataKey="mape" radius={[4, 4, 0, 0]} maxBarSize={56}>
          {data.map((entry) => (
            <Cell
              key={entry.model}
              fill={MODEL_COLORS[entry.model as Model]}
              opacity={entry.isBest ? 1 : 0.65}
              stroke={entry.isBest ? MODEL_COLORS[entry.model as Model] : "none"}
              strokeWidth={entry.isBest ? 2 : 0}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
