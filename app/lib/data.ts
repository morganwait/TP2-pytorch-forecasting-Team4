// lib/data.ts
// All benchmark results from the TP2 forecasting study

export type Model = "Naive" | "ARIMA" | "RNN" | "LSTM" | "GRU" | "TFT";
export type Dataset = "Netflix" | "NVDA" | "PG" | "XOM" | "BTC-USD";
export type Horizon = "Short" | "Medium" | "Long";

export interface Result {
  dataset: Dataset;
  horizon: Horizon;
  model: Model;
  mae: number;
  rmse: number;
  mape: number;
}

export const MODELS: Model[] = ["Naive", "ARIMA", "RNN", "LSTM", "GRU", "TFT"];
export const DATASETS: Dataset[] = ["Netflix", "NVDA", "PG", "XOM", "BTC-USD"];
export const HORIZONS: Horizon[] = ["Short", "Medium", "Long"];

export const DATASET_LABELS: Record<Dataset, string> = {
  Netflix: "Netflix Subscribers",
  NVDA: "NVIDIA (NVDA)",
  PG: "Procter & Gamble (PG)",
  XOM: "Exxon (XOM)",
  "BTC-USD": "Bitcoin (BTC-USD)",
};

export const DATASET_DESCRIPTIONS: Record<Dataset, string> = {
  Netflix: "Quarterly global subscriber counts (millions), 2013–2024. Smooth, trend-dominant series.",
  NVDA: "Weekly closing price (USD), 2015–2025. High-growth tech equity with strong directional momentum.",
  PG: "Weekly closing price (USD), 2015–2025. Low-volatility consumer staples stock.",
  XOM: "Weekly closing price (USD), 2015–2025. Energy sector equity, macro-driven and cyclical.",
  "BTC-USD": "Weekly closing price (USD), 2015–2025. Extremely high volatility with boom-bust cycles.",
};

export const MODEL_COLORS: Record<Model, string> = {
  Naive: "#94a3b8",
  ARIMA: "#2563eb",
  RNN: "#f97316",
  LSTM: "#8b5cf6",
  GRU: "#10b981",
  TFT: "#ef4444",
};

export const HORIZON_STEPS: Record<Horizon, string> = {
  Short: "4 steps ahead",
  Medium: "8 steps ahead",
  Long: "12 steps ahead",
};

export const RESULTS: Result[] = [
  // Netflix
  { dataset: "Netflix", horizon: "Short",  model: "Naive", mae: 25.28,   rmse: 27.71,  mape: 9.4178  },
  { dataset: "Netflix", horizon: "Short",  model: "ARIMA", mae: 11.94,   rmse: 13.30,  mape: 4.4393  },
  { dataset: "Netflix", horizon: "Short",  model: "RNN",   mae: 16.68,   rmse: 18.14,  mape: 6.2235  },
  { dataset: "Netflix", horizon: "Short",  model: "LSTM",  mae: 9.67,    rmse: 10.07,  mape: 3.6474  },
  { dataset: "Netflix", horizon: "Short",  model: "GRU",   mae: 11.64,   rmse: 13.03,  mape: 4.3321  },
  { dataset: "Netflix", horizon: "Short",  model: "TFT",   mae: 28.77,   rmse: 31.11,  mape: 10.7368 },
  { dataset: "Netflix", horizon: "Medium", model: "Naive", mae: 26.76,   rmse: 32.54,  mape: 10.3223 },
  { dataset: "Netflix", horizon: "Medium", model: "ARIMA", mae: 6.68,    rmse: 9.52,   mape: 2.5235  },
  { dataset: "Netflix", horizon: "Medium", model: "RNN",   mae: 12.56,   rmse: 15.42,  mape: 5.1273  },
  { dataset: "Netflix", horizon: "Medium", model: "LSTM",  mae: 42.56,   rmse: 42.87,  mape: 17.2984 },
  { dataset: "Netflix", horizon: "Medium", model: "GRU",   mae: 29.84,   rmse: 30.77,  mape: 12.2197 },
  { dataset: "Netflix", horizon: "Medium", model: "TFT",   mae: 32.03,   rmse: 33.79,  mape: 12.7051 },
  { dataset: "Netflix", horizon: "Long",   model: "Naive", mae: 28.91,   rmse: 35.25,  mape: 11.5433 },
  { dataset: "Netflix", horizon: "Long",   model: "ARIMA", mae: 18.90,   rmse: 24.27,  mape: 7.4842  },
  { dataset: "Netflix", horizon: "Long",   model: "RNN",   mae: 80.71,   rmse: 81.48,  mape: 34.3533 },
  { dataset: "Netflix", horizon: "Long",   model: "LSTM",  mae: 76.59,   rmse: 77.37,  mape: 32.6297 },
  { dataset: "Netflix", horizon: "Long",   model: "GRU",   mae: 74.94,   rmse: 75.77,  mape: 31.9429 },
  { dataset: "Netflix", horizon: "Long",   model: "TFT",   mae: 37.67,   rmse: 42.70,  mape: 15.2488 },
  // NVDA
  { dataset: "NVDA", horizon: "Short",  model: "Naive", mae: 7.38,   rmse: 7.46,   mape: 5.4697  },
  { dataset: "NVDA", horizon: "Short",  model: "ARIMA", mae: 8.02,   rmse: 8.18,   mape: 5.9432  },
  { dataset: "NVDA", horizon: "Short",  model: "RNN",   mae: 3.42,   rmse: 3.60,   mape: 2.5342  },
  { dataset: "NVDA", horizon: "Short",  model: "LSTM",  mae: 2.43,   rmse: 2.77,   mape: 1.7945  },
  { dataset: "NVDA", horizon: "Short",  model: "GRU",   mae: 1.28,   rmse: 1.56,   mape: 0.9470  },
  { dataset: "NVDA", horizon: "Short",  model: "TFT",   mae: 1.08,   rmse: 1.17,   mape: 0.7972  },
  { dataset: "NVDA", horizon: "Medium", model: "Naive", mae: 9.51,   rmse: 10.09,  mape: 6.9528  },
  { dataset: "NVDA", horizon: "Medium", model: "ARIMA", mae: 15.43,  rmse: 16.77,  mape: 11.2866 },
  { dataset: "NVDA", horizon: "Medium", model: "RNN",   mae: 14.22,  rmse: 14.97,  mape: 10.2383 },
  { dataset: "NVDA", horizon: "Medium", model: "LSTM",  mae: 11.11,  rmse: 12.44,  mape: 7.9600  },
  { dataset: "NVDA", horizon: "Medium", model: "GRU",   mae: 14.54,  rmse: 16.13,  mape: 10.4247 },
  { dataset: "NVDA", horizon: "Medium", model: "TFT",   mae: 11.03,  rmse: 12.21,  mape: 7.9073  },
  { dataset: "NVDA", horizon: "Long",   model: "Naive", mae: 4.34,   rmse: 5.77,   mape: 3.0531  },
  { dataset: "NVDA", horizon: "Long",   model: "ARIMA", mae: 6.70,   rmse: 8.46,   mape: 4.8850  },
  { dataset: "NVDA", horizon: "Long",   model: "RNN",   mae: 22.01,  rmse: 23.42,  mape: 15.7314 },
  { dataset: "NVDA", horizon: "Long",   model: "LSTM",  mae: 23.18,  rmse: 23.35,  mape: 16.6643 },
  { dataset: "NVDA", horizon: "Long",   model: "GRU",   mae: 18.49,  rmse: 19.09,  mape: 13.2302 },
  { dataset: "NVDA", horizon: "Long",   model: "TFT",   mae: 17.80,  rmse: 18.27,  mape: 12.7381 },
  // PG
  { dataset: "PG", horizon: "Short",  model: "Naive", mae: 4.59,  rmse: 4.77,  mape: 2.8129 },
  { dataset: "PG", horizon: "Short",  model: "ARIMA", mae: 6.70,  rmse: 6.90,  mape: 4.1063 },
  { dataset: "PG", horizon: "Short",  model: "RNN",   mae: 9.67,  rmse: 9.81,  mape: 5.9205 },
  { dataset: "PG", horizon: "Short",  model: "LSTM",  mae: 1.89,  rmse: 2.16,  mape: 1.1603 },
  { dataset: "PG", horizon: "Short",  model: "GRU",   mae: 5.13,  rmse: 5.22,  mape: 3.1403 },
  { dataset: "PG", horizon: "Short",  model: "TFT",   mae: 2.69,  rmse: 3.00,  mape: 1.6508 },
  { dataset: "PG", horizon: "Medium", model: "Naive", mae: 4.07,  rmse: 5.54,  mape: 2.3969 },
  { dataset: "PG", horizon: "Medium", model: "ARIMA", mae: 3.88,  rmse: 5.26,  mape: 2.2851 },
  { dataset: "PG", horizon: "Medium", model: "RNN",   mae: 2.93,  rmse: 4.25,  mape: 1.7253 },
  { dataset: "PG", horizon: "Medium", model: "LSTM",  mae: 3.21,  rmse: 4.49,  mape: 1.8895 },
  { dataset: "PG", horizon: "Medium", model: "GRU",   mae: 6.21,  rmse: 7.42,  mape: 3.6799 },
  { dataset: "PG", horizon: "Medium", model: "TFT",   mae: 3.50,  rmse: 4.90,  mape: 2.0617 },
  { dataset: "PG", horizon: "Long",   model: "Naive", mae: 2.91,  rmse: 3.78,  mape: 1.7422 },
  { dataset: "PG", horizon: "Long",   model: "ARIMA", mae: 3.35,  rmse: 3.92,  mape: 2.0202 },
  { dataset: "PG", horizon: "Long",   model: "RNN",   mae: 3.63,  rmse: 4.39,  mape: 2.1933 },
  { dataset: "PG", horizon: "Long",   model: "LSTM",  mae: 8.90,  rmse: 9.91,  mape: 5.4518 },
  { dataset: "PG", horizon: "Long",   model: "GRU",   mae: 4.43,  rmse: 5.92,  mape: 2.6365 },
  { dataset: "PG", horizon: "Long",   model: "TFT",   mae: 2.87,  rmse: 3.85,  mape: 1.7142 },
  // XOM
  { dataset: "XOM", horizon: "Short",  model: "Naive", mae: 5.63,  rmse: 5.93,  mape: 5.4931 },
  { dataset: "XOM", horizon: "Short",  model: "ARIMA", mae: 5.70,  rmse: 5.99,  mape: 5.5555 },
  { dataset: "XOM", horizon: "Short",  model: "RNN",   mae: 8.98,  rmse: 9.16,  mape: 8.7325 },
  { dataset: "XOM", horizon: "Short",  model: "LSTM",  mae: 4.62,  rmse: 4.95,  mape: 4.5113 },
  { dataset: "XOM", horizon: "Short",  model: "GRU",   mae: 7.16,  rmse: 7.38,  mape: 6.9714 },
  { dataset: "XOM", horizon: "Short",  model: "TFT",   mae: 2.56,  rmse: 3.03,  mape: 2.5093 },
  { dataset: "XOM", horizon: "Medium", model: "Naive", mae: 7.30,  rmse: 8.86,  mape: 6.9967 },
  { dataset: "XOM", horizon: "Medium", model: "ARIMA", mae: 7.20,  rmse: 8.78,  mape: 6.9075 },
  { dataset: "XOM", horizon: "Medium", model: "RNN",   mae: 3.84,  rmse: 4.87,  mape: 3.6455 },
  { dataset: "XOM", horizon: "Medium", model: "LSTM",  mae: 5.18,  rmse: 5.71,  mape: 4.8050 },
  { dataset: "XOM", horizon: "Medium", model: "GRU",   mae: 4.99,  rmse: 5.59,  mape: 4.6029 },
  { dataset: "XOM", horizon: "Medium", model: "TFT",   mae: 5.06,  rmse: 5.76,  mape: 4.6196 },
  { dataset: "XOM", horizon: "Long",   model: "Naive", mae: 7.68,  rmse: 9.29,  mape: 7.2412 },
  { dataset: "XOM", horizon: "Long",   model: "ARIMA", mae: 7.68,  rmse: 9.29,  mape: 7.2412 },
  { dataset: "XOM", horizon: "Long",   model: "RNN",   mae: 4.06,  rmse: 4.72,  mape: 3.7189 },
  { dataset: "XOM", horizon: "Long",   model: "LSTM",  mae: 4.52,  rmse: 5.25,  mape: 4.0633 },
  { dataset: "XOM", horizon: "Long",   model: "GRU",   mae: 6.90,  rmse: 8.20,  mape: 6.1267 },
  { dataset: "XOM", horizon: "Long",   model: "TFT",   mae: 4.79,  rmse: 5.34,  mape: 4.3235 },
  // BTC-USD
  { dataset: "BTC-USD", horizon: "Short",  model: "Naive", mae: 6176.59, rmse: 6467.14, mape: 6.4944  },
  { dataset: "BTC-USD", horizon: "Short",  model: "ARIMA", mae: 9607.52, rmse: 11111.04,mape: 10.2229 },
  { dataset: "BTC-USD", horizon: "Short",  model: "RNN",   mae: 5181.58, rmse: 5257.29, mape: 5.4032  },
  { dataset: "BTC-USD", horizon: "Short",  model: "LSTM",  mae: 3744.50, rmse: 6032.40, mape: 3.6702  },
  { dataset: "BTC-USD", horizon: "Short",  model: "GRU",   mae: 3999.53, rmse: 4190.51, mape: 4.0992  },
  { dataset: "BTC-USD", horizon: "Short",  model: "TFT",   mae: 16926.15,rmse: 17427.66,mape: 17.3697 },
  { dataset: "BTC-USD", horizon: "Medium", model: "Naive", mae: 16118.13,rmse: 16691.72,mape: 16.5202 },
  { dataset: "BTC-USD", horizon: "Medium", model: "ARIMA", mae: 13223.81,rmse: 14005.36,mape: 13.5117 },
  { dataset: "BTC-USD", horizon: "Medium", model: "RNN",   mae: 27626.64,rmse: 27960.77,mape: 28.4609 },
  { dataset: "BTC-USD", horizon: "Medium", model: "LSTM",  mae: 27508.02,rmse: 27873.16,mape: 28.3337 },
  { dataset: "BTC-USD", horizon: "Medium", model: "GRU",   mae: 24583.43,rmse: 24971.74,mape: 25.3115 },
  { dataset: "BTC-USD", horizon: "Medium", model: "TFT",   mae: 29578.81,rmse: 29884.53,mape: 30.4873 },
  { dataset: "BTC-USD", horizon: "Long",   model: "Naive", mae: 25389.03,rmse: 28382.84,mape: 27.1054 },
  { dataset: "BTC-USD", horizon: "Long",   model: "ARIMA", mae: 24949.69,rmse: 28007.88,mape: 26.5884 },
  { dataset: "BTC-USD", horizon: "Long",   model: "RNN",   mae: 29579.89,rmse: 33172.37,mape: 31.5414 },
  { dataset: "BTC-USD", horizon: "Long",   model: "LSTM",  mae: 28022.22,rmse: 31524.76,mape: 29.8412 },
  { dataset: "BTC-USD", horizon: "Long",   model: "GRU",   mae: 31271.59,rmse: 34551.22,mape: 33.5734 },
  { dataset: "BTC-USD", horizon: "Long",   model: "TFT",   mae: 39396.85,rmse: 42203.25,mape: 42.9167 },
];

export function getResults(dataset: Dataset, horizon: Horizon): Result[] {
  return RESULTS.filter(r => r.dataset === dataset && r.horizon === horizon);
}

export function getBestModel(dataset: Dataset, horizon: Horizon): Model {
  const results = getResults(dataset, horizon);
  return results.reduce((best, r) => r.mape < best.mape ? r : best).model;
}

// ── System prompts for Gemini ─────────────────────────────────────────────────

const BENCHMARK_CONTEXT = `
RESEARCH STUDY: "A Multi-Domain Comparison: RNN, LSTM, GRU & TFT"

RESEARCH QUESTION: Across time-series with fundamentally different structures — a smooth subscription growth curve (Netflix) and a volatile cross-sectional stock portfolio (NVIDIA, P&G, Exxon, Bitcoin) — how do deep learning sequence models (RNN, LSTM, GRU) and attention-based models (TFT) compare to classical statistical baselines (ARIMA, Naïve) in multi-step forecasting accuracy?

MODELS EVALUATED:
- Naïve: Predicts every future value = last observed value. Simplest possible baseline.
- ARIMA: Classical statistical model (AutoRegressive Integrated Moving Average). Interpretable, linear, best for stationary/trend data.
- RNN: Recurrent Neural Network. Sequential model that suffers from vanishing gradients over long sequences.
- LSTM: Long Short-Term Memory. Solves vanishing gradient via cell state and 3 gating mechanisms (input, forget, output).
- GRU: Gated Recurrent Unit. Simplified LSTM with 2 gates. Fewer parameters, comparable performance.
- TFT: Temporal Fusion Transformer. Attention-based model for multi-horizon forecasting. Handles covariates and produces quantile predictions.

DATASETS:
- Netflix: Quarterly subscribers (millions), 2013–2024. Smooth, trend-dominant series. 46 observations.
- NVDA (NVIDIA): Weekly stock price (USD), 2015–2025. High-growth tech equity, strong momentum.
- PG (Procter & Gamble): Weekly stock price (USD), 2015–2025. Low volatility, stable consumer staples.
- XOM (Exxon): Weekly stock price (USD), 2015–2025. Energy sector, macro-driven and cyclical.
- BTC-USD (Bitcoin): Weekly price (USD), 2015–2025. Extreme volatility, boom-bust cycles.

HORIZONS: Short (4 steps), Medium (8 steps), Long (12 steps)
METRICS: MAE (Mean Absolute Error), RMSE (Root Mean Squared Error), MAPE (Mean Absolute Percentage Error — lower is better, expressed as %)

FULL BENCHMARK RESULTS (MAPE %):
Netflix Short:  Naive=9.42, ARIMA=4.44, RNN=6.22, LSTM=3.65, GRU=4.33, TFT=10.74  → WINNER: LSTM
Netflix Medium: Naive=10.32, ARIMA=2.52, RNN=5.13, LSTM=17.30, GRU=12.22, TFT=12.71 → WINNER: ARIMA
Netflix Long:   Naive=11.54, ARIMA=7.48, RNN=34.35, LSTM=32.63, GRU=31.94, TFT=15.25 → WINNER: ARIMA

NVDA Short:  Naive=5.47, ARIMA=5.94, RNN=2.53, LSTM=1.79, GRU=0.95, TFT=0.80  → WINNER: TFT
NVDA Medium: Naive=6.95, ARIMA=11.29, RNN=10.24, LSTM=7.96, GRU=10.42, TFT=7.91 → WINNER: TFT
NVDA Long:   Naive=3.05, ARIMA=4.89, RNN=15.73, LSTM=16.66, GRU=13.23, TFT=12.74 → WINNER: TFT

PG Short:  Naive=2.81, ARIMA=4.11, RNN=5.92, LSTM=1.16, GRU=3.14, TFT=1.65 → WINNER: LSTM
PG Medium: Naive=2.40, ARIMA=2.29, RNN=1.73, LSTM=1.89, GRU=3.68, TFT=2.06 → WINNER: RNN
PG Long:   Naive=1.74, ARIMA=2.02, RNN=2.19, LSTM=5.45, GRU=2.64, TFT=1.71 → WINNER: TFT

XOM Short:  Naive=5.49, ARIMA=5.56, RNN=8.73, LSTM=4.51, GRU=6.97, TFT=2.51 → WINNER: TFT
XOM Medium: Naive=7.00, ARIMA=6.91, RNN=3.65, LSTM=4.81, GRU=4.60, TFT=4.62 → WINNER: RNN
XOM Long:   Naive=7.24, ARIMA=7.24, RNN=3.72, LSTM=4.06, GRU=6.13, TFT=4.32 → WINNER: RNN

BTC Short:  Naive=6.49, ARIMA=10.22, RNN=5.40, LSTM=3.67, GRU=4.10, TFT=17.37 → WINNER: LSTM
BTC Medium: Naive=16.52, ARIMA=13.51, RNN=28.46, LSTM=28.33, GRU=25.31, TFT=30.49 → WINNER: ARIMA
BTC Long:   Naive=27.11, ARIMA=26.59, RNN=31.54, LSTM=29.84, GRU=33.57, TFT=42.92 → WINNER: ARIMA

KEY FINDINGS:
1. No single model dominates universally — the best model depends on data structure.
2. ARIMA is best for smooth, trend-dominant data (Netflix medium: 2.52% MAPE, best result in the study).
3. TFT excels on stable and growth equities (NVDA all horizons, XOM short, PG long).
4. ARIMA surprisingly outperforms ALL deep learning models on Bitcoin at medium and long horizons.
5. RNN consistently underperforms at long horizons — vanishing gradient confirmed empirically.
6. Data structure (volatility + horizon) is the primary model selection criterion.

BUSINESS IMPLICATIONS:
- Subscription/SaaS growth → ARIMA
- High-volatility assets short-term → LSTM or GRU
- High-volatility assets medium/long-term → ARIMA
- Low-volatility equities → TFT or LSTM
- Need interpretability → ARIMA
`;

export const CHAT_SYSTEM_PROMPT = `You are an AI research assistant for a published financial forecasting benchmark study. You have deep expertise in the following research and should answer questions based on it.

${BENCHMARK_CONTEXT}

INSTRUCTIONS:
- Answer questions about the research clearly and accurately, always grounding your answers in the actual benchmark results.
- Explain technical concepts (MAPE, LSTM, vanishing gradient, etc.) in plain English when asked.
- Be concise but complete. Use specific MAPE numbers when they are relevant.
- If asked something outside the scope of this research, politely note that and offer to answer what you can.
- Do not make up results — only cite numbers from the benchmark above.
- Respond in a helpful, academic but accessible tone.`;

export const RECOMMENDER_SYSTEM_PROMPT = `You are an expert in time series forecasting model selection. Your job is to recommend the best model based on a user's scenario, using evidence from a published benchmark study.

${BENCHMARK_CONTEXT}

INSTRUCTIONS:
- Give a clear, direct recommendation with a primary model and optionally a secondary one.
- Ground every recommendation in specific MAPE results from the benchmark.
- Format your response with these sections:
  **Recommended Model:** [Model Name]
  **Why:** [2-3 sentences citing benchmark evidence]
  **Alternative:** [Model Name, if applicable] — [1 sentence]
  **Caution:** [1 sentence about what to watch out for]
- Be concise and practical. Keep the total response under 200 words.`;
