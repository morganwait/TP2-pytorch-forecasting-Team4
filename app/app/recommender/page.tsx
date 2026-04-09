"use client";
import { useState } from "react";
import { Cpu, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { MODEL_COLORS, type Model } from "@/lib/data";

const DATA_TYPES = [
  { value: "smooth", label: "Smooth & Trend-Dominant", desc: "e.g. subscriptions, steady revenue, slow-moving equities" },
  { value: "moderate", label: "Moderate Volatility", desc: "e.g. stable stocks, macro-driven commodities" },
  { value: "high", label: "High Volatility", desc: "e.g. crypto, high-growth tech, speculative assets" },
];

const HORIZONS = [
  { value: "short", label: "Short (1–4 steps)" },
  { value: "medium", label: "Medium (5–8 steps)" },
  { value: "long", label: "Long (9–12+ steps)" },
];

const INTERPRETABILITY = [
  { value: "yes", label: "Yes — I need to explain predictions to stakeholders or regulators" },
  { value: "no", label: "No — accuracy is the primary goal" },
];

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-7">
      <p className="font-jakarta text-sm font-semibold text-[var(--ink)] mb-3 uppercase tracking-wide">
        {label}
      </p>
      <div className="space-y-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              value === o.value
                ? "border-[var(--navy)] bg-[var(--accent-light)]"
                : "border-[var(--border)] bg-white hover:border-[var(--navy)]"
            }`}
          >
            <input
              type="radio"
              name={label}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-0.5 accent-[var(--navy)]"
            />
            <div>
              <span className="font-jakarta text-sm font-medium text-[var(--ink)]">
                {o.label}
              </span>
              {o.desc && (
                <p className="font-jakarta text-xs text-[var(--muted)] mt-0.5">{o.desc}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// Parse the AI response to highlight model names.
// Handles all common Gemini output patterns:
//   **Header:** content       (colon inside bold)
//   **Header**: content       (colon outside bold)
//   **Header** content        (no colon at all)
//   ## Header                 (markdown heading)
//   * item or - item          (bullet lists)
function formatResponse(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();

    // Empty line → spacer
    if (!trimmed) return <div key={i} className="mb-2" />;

    // Markdown heading: ## Header or ### Header
    if (/^#{1,3}\s+/.test(trimmed)) {
      const heading = trimmed.replace(/^#{1,3}\s+/, "");
      return (
        <div key={i} className="mb-3 mt-4">
          <span className="font-playfair font-bold text-[var(--navy)] text-base">
            {heading}
          </span>
        </div>
      );
    }

    // Bold header line with optional colon in any position:
    // matches **Anything** or **Anything:** or **Anything**:
    const headerMatch = trimmed.match(/^\*\*([^*]+?)\*\*:?\s*:?\s*(.*)/);
    if (headerMatch) {
      const header = headerMatch[1].replace(/:$/, "").trim();
      const content = headerMatch[2].trim();
      return (
        <div key={i} className="mb-3">
          <span className="font-playfair font-bold text-[var(--navy)]">
            {header}:
          </span>
          {content && (
            <span className="font-jakarta text-[var(--ink)]"> {content}</span>
          )}
        </div>
      );
    }

    // Bullet point: * item or - item
    if (/^[*-]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[*-]\s+/, "");
      return (
        <div key={i} className="flex gap-2 mb-1 ml-2">
          <span className="text-[var(--navy)] font-bold mt-0.5">·</span>
          <p className="font-jakarta text-[var(--ink)] leading-relaxed">{content}</p>
        </div>
      );
    }

    // Plain text paragraph
    return (
      <p key={i} className="font-jakarta text-[var(--ink)] leading-relaxed mb-1">
        {trimmed}
      </p>
    );
  });
}

export default function RecommenderPage() {
  const [dataType, setDataType] = useState("smooth");
  const [horizon, setHorizon] = useState("medium");
  const [interpretability, setInterpretability] = useState("no");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataType, horizon, interpretability, description }),
      });
      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      setResult(data.recommendation);
    } catch {
      setError("Something went wrong. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="fade-up fade-up-1 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Cpu size={20} className="text-emerald-600" />
          <span className="font-jakarta text-sm text-emerald-700 font-semibold uppercase tracking-wider">
            AI-Powered
          </span>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-[var(--navy)] mb-3">
          Model Recommender
        </h1>
        <hr className="rule-navy w-16 mb-4" />
        <p className="font-jakarta text-[var(--muted)] max-w-xl">
          Describe your forecasting scenario and our AI will recommend the best model,
          grounded in the actual benchmark results from this study.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="fade-up fade-up-2">
          <form onSubmit={handleSubmit}>
            <RadioGroup
              label="1. What is your data like?"
              options={DATA_TYPES}
              value={dataType}
              onChange={setDataType}
            />
            <RadioGroup
              label="2. How far ahead do you need to forecast?"
              options={HORIZONS}
              value={horizon}
              onChange={setHorizon}
            />
            <RadioGroup
              label="3. Do you need to explain the model to others?"
              options={INTERPRETABILITY}
              value={interpretability}
              onChange={setInterpretability}
            />

            <div className="mb-7">
              <p className="font-jakarta text-sm font-semibold text-[var(--ink)] mb-3 uppercase tracking-wide">
                4. Describe your use case (optional)
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. I want to forecast monthly sales for a retail chain 6 months ahead..."
                rows={3}
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 font-jakarta text-sm text-[var(--ink)] bg-white resize-none focus:outline-none focus:border-[var(--navy)] focus:ring-1 focus:ring-[var(--navy)] placeholder:text-[var(--muted)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[var(--navy)] text-white py-3 rounded-lg font-jakarta font-semibold text-sm hover:bg-[var(--navy-light)] disabled:opacity-60 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating recommendation…
                </>
              ) : (
                <>
                  <Cpu size={16} />
                  Get My Recommendation
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="fade-up fade-up-3">
          {!result && !error && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-8 bg-white border border-dashed border-[var(--border)] rounded-xl">
              <Cpu size={40} className="text-[var(--border)] mb-4" />
              <p className="font-playfair text-lg font-bold text-[var(--muted)] mb-2">
                Your recommendation will appear here
              </p>
              <p className="font-jakarta text-sm text-[var(--muted)]">
                Fill in the form and click the button to get an AI-powered model
                recommendation grounded in the benchmark results.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-8 bg-white border border-[var(--border)] rounded-xl">
              <Loader2 size={40} className="text-[var(--accent)] animate-spin mb-4" />
              <p className="font-playfair text-lg font-bold text-[var(--navy)]">
                Analyzing your scenario…
              </p>
              <p className="font-jakarta text-sm text-[var(--muted)] mt-2">
                Comparing against 90 benchmark results
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex gap-3">
              <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <p className="font-jakarta text-sm text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="bg-emerald-600 px-6 py-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span className="font-jakarta text-sm font-semibold text-white">
                  AI Recommendation
                </span>
              </div>
              <div className="p-6">{formatResponse(result)}</div>
              <div className="px-6 pb-5 pt-2 border-t border-[var(--border)]">
                <p className="font-jakarta text-xs text-[var(--muted)]">
                  Based on benchmark results from this study. Not financial advice.
                </p>
              </div>
            </div>
          )}

          {/* Model color legend */}
          {!loading && (
            <div className="mt-4 bg-white border border-[var(--border)] rounded-xl p-4">
              <p className="font-jakarta text-xs text-[var(--muted)] uppercase tracking-wide mb-3 font-semibold">
                Models in this study
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["Naive", "ARIMA", "RNN", "LSTM", "GRU", "TFT"] as Model[]).map((m) => (
                  <div key={m} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: MODEL_COLORS[m] }}
                    />
                    <span className="font-jakarta text-xs text-[var(--ink)]">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
