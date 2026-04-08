import { BookOpen } from "lucide-react";

const models = [
  {
    name: "Naïve",
    year: "Baseline",
    color: "#94a3b8",
    summary: "The simplest possible forecasting strategy: predict every future value equals the last observed value.",
    howItWorks: "If the last data point is 100, the Naïve model predicts 100 for every future period. No learning, no parameters — it is used purely as a sanity check.",
    strengths: ["Zero training cost", "Surprisingly competitive on highly random series"],
    weaknesses: ["Cannot capture trends or patterns", "Degrades quickly on non-stationary data"],
  },
  {
    name: "ARIMA",
    year: "1970",
    color: "#2563eb",
    summary: "AutoRegressive Integrated Moving Average. The gold standard classical statistical model, interpretable and well-suited to trend-dominant data.",
    howItWorks: "ARIMA combines three components: AR (weighted sum of past values), I (differencing to make the series stationary), and MA (correction based on past forecast errors). The pmdarima library auto-selects the best parameters.",
    strengths: ["Highly interpretable — coefficients can be explained to regulators", "Best performer on smooth, trend-dominant series", "No GPU required"],
    weaknesses: ["Assumes linear relationships", "Struggles with high volatility and regime changes", "Requires stationarity"],
  },
  {
    name: "RNN",
    year: "1986",
    color: "#f97316",
    summary: "The original sequential neural network. Uses a hidden state loop to carry information across time steps.",
    howItWorks: "At each time step, the RNN combines the current input with its hidden state from the previous step. This creates a form of memory — but it's limited. Over long sequences, gradients vanish during training, causing the model to forget distant history.",
    strengths: ["Fast to train", "Simple architecture"],
    weaknesses: ["Vanishing gradient problem limits long-range memory", "Consistently worst at long horizons in this benchmark", "Dominated by LSTM and GRU in practice"],
  },
  {
    name: "LSTM",
    year: "1997",
    color: "#8b5cf6",
    summary: "Long Short-Term Memory. Solves the RNN's vanishing gradient problem by introducing a 'cell state' and three gating mechanisms.",
    howItWorks: "LSTM adds a cell state — a separate memory lane that runs through the whole sequence. Three gates control it: the forget gate erases irrelevant history, the input gate writes new information, and the output gate decides what to expose. This lets LSTM retain information across hundreds of time steps.",
    strengths: ["Strong at capturing long-range dependencies", "Best model for Netflix short-horizon (3.65% MAPE)", "Best for BTC short-horizon (3.67% MAPE)"],
    weaknesses: ["More parameters than GRU — slower to train", "Can overfit on short datasets", "Degraded sharply on Netflix at long horizons"],
  },
  {
    name: "GRU",
    year: "2014",
    color: "#10b981",
    summary: "Gated Recurrent Unit. A streamlined LSTM with fewer parameters but comparable performance.",
    howItWorks: "GRU simplifies LSTM's three gates into two: the update gate (replaces forget + input gates) and the reset gate. There is no separate cell state — the hidden state carries everything. This reduces parameter count and training time while preserving most of LSTM's memory capacity.",
    strengths: ["Faster training than LSTM", "Best for NVDA short-horizon (0.95% MAPE)", "Strong on short-horizon equity forecasting"],
    weaknesses: ["Still struggles at long horizons on smooth data", "Sensitive to training hyperparameters"],
  },
  {
    name: "TFT",
    year: "2021",
    color: "#ef4444",
    summary: "Temporal Fusion Transformer. Attention-based model designed for multi-horizon forecasting with interpretable outputs.",
    howItWorks: "Unlike sequential models, TFT processes the entire input sequence simultaneously using multi-head attention — it can look at any past time step's relationship to the prediction at once. It also includes variable selection networks, an LSTM encoder, and gated residual connections. It outputs not just a point estimate but a full distribution of 7 quantiles.",
    strengths: ["Best model on NVDA across all horizons", "Excellent on XOM short-horizon (2.51% MAPE)", "Designed to accept known future inputs (earnings dates, etc.)", "Produces prediction intervals for uncertainty quantification"],
    weaknesses: ["Worst model on Bitcoin — TFT long-horizon was 42.92% MAPE", "High complexity; requires more setup", "Underused in this study (no covariates provided)"],
  },
];

const metrics = [
  {
    name: "MAE",
    full: "Mean Absolute Error",
    formula: "Average of |actual − predicted|",
    plain: "On average, how far off is the prediction in original units? Easy to interpret but doesn't penalize large errors.",
  },
  {
    name: "RMSE",
    full: "Root Mean Squared Error",
    formula: "√(Average of (actual − predicted)²)",
    plain: "Like MAE, but large errors are penalized more because they are squared first. More sensitive to outliers.",
  },
  {
    name: "MAPE",
    full: "Mean Absolute Percentage Error",
    formula: "Average of |actual − predicted| / actual × 100%",
    plain: "Error as a percentage of the actual value. The primary metric in this study because it allows direct comparison across datasets with different scales (subscribers vs. dollars vs. Bitcoin).",
  },
];

export default function MethodologyPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="fade-up fade-up-1 mb-12">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={20} className="text-amber-600" />
          <span className="font-jakarta text-sm text-amber-700 font-semibold uppercase tracking-wider">
            Plain-English Guide
          </span>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-[var(--navy)] mb-3">
          Methodology
        </h1>
        <hr className="rule-navy w-16 mb-4" />
        <p className="font-jakarta text-[var(--muted)] max-w-2xl">
          Everything you need to understand how this benchmark was designed — models,
          datasets, metrics, and key design decisions — explained without jargon.
        </p>
      </div>

      {/* Models */}
      <section className="fade-up fade-up-2 mb-14">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          The Six Models
        </h2>
        <div className="space-y-5">
          {models.map((m) => (
            <div
              key={m.name}
              className="bg-white border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <div
                className="px-6 py-4 flex items-center gap-4"
                style={{ borderLeft: `4px solid ${m.color}` }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3
                      className="font-playfair text-xl font-bold"
                      style={{ color: m.color }}
                    >
                      {m.name}
                    </h3>
                    <span className="font-jakarta text-xs text-[var(--muted)] bg-[var(--bg)] px-2 py-0.5 rounded-full">
                      Introduced {m.year}
                    </span>
                  </div>
                  <p className="font-jakarta text-sm text-[var(--ink)] mt-1">
                    {m.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-3 grid sm:grid-cols-3 gap-5">
                <div>
                  <p className="font-jakarta text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                    How it works
                  </p>
                  <p className="font-jakarta text-sm text-[var(--ink)] leading-relaxed">
                    {m.howItWorks}
                  </p>
                </div>
                <div>
                  <p className="font-jakarta text-xs font-semibold text-[var(--success)] uppercase tracking-wide mb-2">
                    Strengths
                  </p>
                  <ul className="space-y-1">
                    {m.strengths.map((s) => (
                      <li key={s} className="font-jakarta text-sm text-[var(--ink)] flex gap-2">
                        <span className="text-[var(--success)] shrink-0">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-jakarta text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
                    Limitations
                  </p>
                  <ul className="space-y-1">
                    {m.weaknesses.map((w) => (
                      <li key={w} className="font-jakarta text-sm text-[var(--ink)] flex gap-2">
                        <span className="text-red-400 shrink-0">✗</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Datasets */}
      <section className="fade-up fade-up-3 mb-14">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          The Datasets
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              name: "Netflix Subscribers",
              ticker: "—",
              range: "Q1 2013 – Q1 2024",
              freq: "Quarterly",
              obs: "46 observations",
              regime: "Smooth & trend-dominant",
              color: "#E50914",
              desc: "Global subscriber counts in millions. Steady growth driven by global expansion. The COVID era (2020) created a short-lived subscriber spike followed by a correction.",
              source: "jagelves.github.io",
            },
            {
              name: "NVIDIA",
              ticker: "NVDA",
              range: "2015 – 2025",
              freq: "Weekly",
              obs: "~521 observations",
              regime: "High-growth equity",
              color: "#76B900",
              desc: "From under $10 to over $100 (adjusted). Driven by AI/GPU demand. Strong directional momentum but high intra-year volatility.",
              source: "Yahoo Finance",
            },
            {
              name: "Procter & Gamble",
              ticker: "PG",
              range: "2015 – 2025",
              freq: "Weekly",
              obs: "~521 observations",
              regime: "Low volatility",
              color: "#004B8D",
              desc: "Consumer staples defensive stock. Slow, steady upward trend with modest drawdowns. The most predictable asset in the portfolio.",
              source: "Yahoo Finance",
            },
            {
              name: "Exxon",
              ticker: "XOM",
              range: "2015 – 2025",
              freq: "Weekly",
              obs: "~521 observations",
              regime: "Macro-driven, cyclical",
              color: "#CC0000",
              desc: "Energy sector equity. Tracks oil prices and geopolitical events. Sharp drop in 2020 (COVID demand collapse), strong recovery 2022–2023.",
              source: "Yahoo Finance",
            },
            {
              name: "Bitcoin",
              ticker: "BTC-USD",
              range: "2015 – 2025",
              freq: "Weekly",
              obs: "~521 observations",
              regime: "Extreme volatility",
              color: "#F7931A",
              desc: "Boom-bust cycles from near-zero to $65K+ and back. By far the most volatile and unpredictable asset. The hardest forecasting challenge in the study.",
              source: "Yahoo Finance",
            },
          ].map((d) => (
            <div
              key={d.name}
              className="bg-white border border-[var(--border)] rounded-xl p-5"
              style={{ borderTop: `3px solid ${d.color}` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-playfair text-lg font-bold text-[var(--navy)]">
                  {d.name}
                </h3>
                {d.ticker !== "—" && (
                  <span
                    className="font-jakarta text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: d.color + "20", color: d.color }}
                  >
                    {d.ticker}
                  </span>
                )}
              </div>
              <p className="font-jakarta text-xs text-[var(--muted)] mb-3">
                {d.regime} · {d.freq} · {d.obs}
              </p>
              <p className="font-jakarta text-sm text-[var(--ink)] leading-relaxed mb-3">
                {d.desc}
              </p>
              <p className="font-jakarta text-xs text-[var(--muted)]">
                Source: {d.source} · {d.range}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="fade-up fade-up-4 mb-14">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          Evaluation Metrics
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {metrics.map((m) => (
            <div
              key={m.name}
              className="bg-white border border-[var(--border)] rounded-xl p-5"
            >
              <h3 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-1">
                {m.name}
              </h3>
              <p className="font-jakarta text-sm font-semibold text-[var(--muted)] mb-3">
                {m.full}
              </p>
              <code className="block font-mono text-xs bg-[var(--bg)] px-3 py-2 rounded mb-3 text-[var(--navy)]">
                {m.formula}
              </code>
              <p className="font-jakarta text-sm text-[var(--ink)] leading-relaxed">
                {m.plain}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[var(--accent-light)] border border-blue-200 rounded-xl p-4">
          <p className="font-jakarta text-sm text-[var(--accent)]">
            <strong>Why MAPE is the primary comparison metric:</strong> Because the
            datasets have very different scales (millions of subscribers vs. thousands of
            dollars for Bitcoin), MAE and RMSE cannot be compared directly across
            datasets. MAPE expresses error as a percentage, making cross-dataset
            comparison meaningful.
          </p>
        </div>
      </section>

      {/* Design */}
      <section className="fade-up fade-up-5">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          Study Design
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              title: "Train/Test Split",
              body: "All models use a strictly chronological split. The last N observations (4, 8, or 12) are held out as the test set. The model never sees these during training. Random splitting is invalid for time series — it would allow models to 'see the future.'",
            },
            {
              title: "Why These Two Dataset Types?",
              body: "The pairing of Netflix (smooth trend) and the stock portfolio (volatile, non-stationary) is the methodological core. Testing on only one type would produce findings limited to that type. By testing all models across both types, conclusions are robust across different data structures.",
            },
            {
              title: "Data Scaling",
              body: "Deep learning models require normalized inputs. RNN, LSTM, and GRU use MinMaxScaler (scaling to [0,1]) per series. TFT uses StandardScaler (zero mean, unit variance) because MinMaxScaler caused a double-scaling conflict with TFT's internal GroupNormalizer.",
            },
            {
              title: "Reproducibility",
              body: "All models use a fixed random seed (42). Results may vary slightly between hardware configurations due to floating-point non-determinism on GPU. The full results table produced by the benchmark is embedded in this application.",
            },
          ].map((d) => (
            <div
              key={d.title}
              className="bg-white border border-[var(--border)] rounded-xl p-5"
            >
              <h3 className="font-playfair text-lg font-bold text-[var(--navy)] mb-2">
                {d.title}
              </h3>
              <p className="font-jakarta text-sm text-[var(--ink)] leading-relaxed">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
