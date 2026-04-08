"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  DATASETS, HORIZONS, MODELS, MODEL_COLORS,
  DATASET_LABELS, DATASET_DESCRIPTIONS, HORIZON_STEPS,
  getResults, getBestModel,
  type Dataset, type Horizon, type Model,
} from "@/lib/data";
import { Trophy } from "lucide-react";

const ResultsChart = dynamic(() => import("@/components/ResultsChart"), { ssr: false });

const WINNER_NOTES: Record<string, string> = {
  "Netflix-Medium-ARIMA":  "ARIMA's best result in the entire study — 2.52% MAPE on a smooth, trend-dominant series.",
  "BTC-USD-Medium-ARIMA":  "Counterintuitive: ARIMA outperformed every deep learning model on Bitcoin at medium horizon.",
  "BTC-USD-Long-ARIMA":    "ARIMA beats all DL models on BTC long-horizon. TFT was worst at 42.92% MAPE.",
  "Netflix-Long-RNN":      "RNN's worst result: 34.35% — the vanishing gradient problem in action.",
};

export default function ResultsPage() {
  const [dataset, setDataset] = useState<Dataset>("Netflix");
  const [horizon, setHorizon] = useState<Horizon>("Medium");

  const results = getResults(dataset, horizon);
  const best = getBestModel(dataset, horizon);
  const noteKey = `${dataset}-${horizon}-${best}`;
  const note = WINNER_NOTES[noteKey];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="fade-up fade-up-1 mb-10">
        <h1 className="font-playfair text-4xl font-bold text-[var(--navy)] mb-3">
          Results Explorer
        </h1>
        <hr className="rule-navy w-16 mb-4" />
        <p className="font-jakarta text-[var(--muted)] max-w-xl">
          Select a dataset and forecast horizon to compare all six models by MAPE (Mean
          Absolute Percentage Error). Lower is better.
        </p>
      </div>

      {/* Dataset selector */}
      <div className="fade-up fade-up-2 mb-6">
        <p className="font-jakarta text-sm font-semibold text-[var(--ink)] mb-3 uppercase tracking-wide">
          Dataset
        </p>
        <div className="flex flex-wrap gap-2">
          {DATASETS.map((d) => (
            <button
              key={d}
              onClick={() => setDataset(d)}
              className={`px-4 py-2 rounded-lg text-sm font-jakarta font-medium transition-all border ${
                dataset === d
                  ? "bg-[var(--navy)] text-white border-[var(--navy)] shadow"
                  : "bg-white text-[var(--ink)] border-[var(--border)] hover:border-[var(--navy)] hover:text-[var(--navy)]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <p className="font-jakarta text-xs text-[var(--muted)] mt-2">
          {DATASET_DESCRIPTIONS[dataset]}
        </p>
      </div>

      {/* Horizon selector */}
      <div className="fade-up fade-up-2 mb-8">
        <p className="font-jakarta text-sm font-semibold text-[var(--ink)] mb-3 uppercase tracking-wide">
          Forecast Horizon
        </p>
        <div className="flex gap-2">
          {HORIZONS.map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-4 py-2 rounded-lg text-sm font-jakarta font-medium transition-all border ${
                horizon === h
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow"
                  : "bg-white text-[var(--ink)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {h} <span className="opacity-60 text-xs">({HORIZON_STEPS[h]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart + winner */}
      <div className="fade-up fade-up-3 grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-playfair text-xl font-bold text-[var(--navy)] mb-1">
            {DATASET_LABELS[dataset]} — {horizon} Horizon
          </h2>
          <p className="font-jakarta text-xs text-[var(--muted)] mb-5">
            MAPE (%) · {HORIZON_STEPS[horizon]} · Lower is better
          </p>
          <ResultsChart results={results} bestModel={best} />

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[var(--border)]">
            {MODELS.map((m) => (
              <div key={m} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: MODEL_COLORS[m] }}
                />
                <span className="font-jakarta text-xs text-[var(--muted)]">{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Winner card */}
          <div className="bg-[var(--navy)] text-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={16} className="text-yellow-300" />
              <span className="font-jakarta text-xs font-semibold uppercase tracking-wider text-blue-200">
                Best Model
              </span>
            </div>
            <p
              className="font-playfair text-4xl font-bold mb-1"
              style={{ color: MODEL_COLORS[best] }}
            >
              {best}
            </p>
            <p className="font-jakarta text-sm text-blue-200">
              {dataset} · {horizon} Horizon
            </p>
            {note && (
              <p className="font-jakarta text-xs text-blue-100 mt-4 pt-4 border-t border-white/20 leading-relaxed">
                {note}
              </p>
            )}
          </div>

          {/* MAPE values */}
          <div className="bg-white border border-[var(--border)] rounded-xl p-5 flex-1">
            <p className="font-jakarta text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
              MAPE Ranking
            </p>
            <div className="space-y-2">
              {[...results]
                .sort((a, b) => a.mape - b.mape)
                .map((r, i) => (
                  <div key={r.model} className="flex items-center gap-2">
                    <span className="font-jakarta text-xs text-[var(--muted)] w-4">
                      {i + 1}.
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: MODEL_COLORS[r.model as Model] }}
                    />
                    <span className="font-jakarta text-sm text-[var(--ink)] flex-1">
                      {r.model}
                    </span>
                    <span
                      className={`font-jakarta text-sm font-semibold ${
                        r.model === best ? "text-[var(--success)]" : "text-[var(--ink)]"
                      }`}
                    >
                      {r.mape.toFixed(2)}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full results table */}
      <div className="fade-up fade-up-4">
        <h2 className="font-playfair text-xl font-bold text-[var(--navy)] mb-4">
          All Results — {dataset}
        </h2>
        <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
          <table className="w-full text-sm font-jakarta">
            <thead>
              <tr className="bg-[var(--navy)] text-white">
                <th className="text-left px-4 py-3 font-semibold">Horizon</th>
                {MODELS.map((m) => (
                  <th key={m} className="text-right px-3 py-3 font-semibold">
                    <span style={{ color: MODEL_COLORS[m] }}>{m}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HORIZONS.map((h, hi) => {
                const rowResults = getResults(dataset, h);
                const rowBest = getBestModel(dataset, h);
                return (
                  <tr
                    key={h}
                    className={`border-t border-[var(--border)] ${
                      hi % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-[var(--navy)]">
                      {h}
                      <span className="text-xs text-[var(--muted)] font-normal ml-1">
                        ({HORIZON_STEPS[h]})
                      </span>
                    </td>
                    {MODELS.map((m) => {
                      const r = rowResults.find((x) => x.model === m);
                      const isWinner = m === rowBest;
                      return (
                        <td
                          key={m}
                          className={`text-right px-3 py-3 ${
                            isWinner
                              ? "font-bold text-[var(--success)]"
                              : "text-[var(--ink)]"
                          }`}
                        >
                          {r ? r.mape.toFixed(2) + "%" : "—"}
                          {isWinner && (
                            <span className="ml-1 text-yellow-500 text-xs">★</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="font-jakarta text-xs text-[var(--muted)] mt-2">
          ★ = best performer for that horizon. All values are MAPE (%).
        </p>
      </div>
    </div>
  );
}
