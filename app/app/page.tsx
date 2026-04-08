import Link from "next/link";
import { BarChart2, Cpu, MessageSquare, BookOpen, ArrowRight, TrendingUp } from "lucide-react";

const findings = [
  {
    number: "01",
    title: "No Single Model Dominates",
    body: "The best model varies by dataset and horizon. ARIMA wins on smooth data; deep learning wins on growth equities at short horizons.",
  },
  {
    number: "02",
    title: "ARIMA Beats Deep Learning on Bitcoin",
    body: "The most counterintuitive finding: ARIMA outperformed every neural network on BTC at medium and long horizons — by up to 17 percentage points.",
  },
  {
    number: "03",
    title: "Horizon Matters More Than Model Choice",
    body: "RNN, LSTM, and GRU error rates on Netflix surged from ~4% at short horizon to over 32% at long horizon. All models degrade; the rate of degradation differs.",
  },
];

const pages = [
  {
    href: "/results",
    icon: BarChart2,
    label: "Results Explorer",
    desc: "Filter by dataset, model, and horizon. See how all six models compare on any scenario.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    href: "/recommender",
    icon: Cpu,
    label: "Model Recommender",
    desc: "Describe your forecasting problem. Get an AI-powered model recommendation grounded in benchmark evidence.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/assistant",
    icon: MessageSquare,
    label: "AI Research Assistant",
    desc: "Ask anything about the research — from methodology to specific results — and get answers backed by the study.",
    color: "bg-violet-50 text-violet-700",
  },
  {
    href: "/methodology",
    icon: BookOpen,
    label: "Methodology",
    desc: "Plain-English explanations of each model, dataset, and metric used in the benchmark.",
    color: "bg-amber-50 text-amber-700",
  },
];

const timeline = [
  { year: "1970s", model: "ARIMA", color: "#2563eb" },
  { year: "1986", model: "RNN", color: "#f97316" },
  { year: "1997", model: "LSTM", color: "#8b5cf6" },
  { year: "2014", model: "GRU", color: "#10b981" },
  { year: "2021", model: "TFT", color: "#ef4444" },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Hero */}
      <section className="fade-up fade-up-1 mb-16">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-[var(--accent)]" />
          <span className="text-sm font-jakarta text-[var(--accent)] font-semibold uppercase tracking-wider">
            Academic Research Benchmark
          </span>
        </div>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[var(--navy)] leading-tight mb-6 max-w-3xl">
          Which Forecasting Model<br className="hidden sm:block" /> Actually Wins?
        </h1>
        <hr className="rule-navy w-16 mb-6" />
        <blockquote className="border-l-4 border-[var(--navy)] pl-5 max-w-3xl">
          <p className="font-jakarta text-base text-[var(--ink)] leading-relaxed italic">
            Across time-series with fundamentally different structures — a smooth
            subscription growth curve (Netflix) and a volatile cross-sectional stock
            portfolio (NVIDIA, P&amp;G, Exxon, Bitcoin) — how do deep learning sequence
            models compare to classical statistical baselines in multi-step forecasting
            accuracy?
          </p>
        </blockquote>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-full bg-[var(--navy)] text-white text-xs font-jakarta font-medium">
            6 Models
          </div>
          <div className="px-3 py-1.5 rounded-full bg-[var(--navy)] text-white text-xs font-jakarta font-medium">
            5 Datasets
          </div>
          <div className="px-3 py-1.5 rounded-full bg-[var(--navy)] text-white text-xs font-jakarta font-medium">
            3 Horizons
          </div>
          <div className="px-3 py-1.5 rounded-full bg-[var(--navy)] text-white text-xs font-jakarta font-medium">
            90 Benchmark Results
          </div>
        </div>
      </section>

      {/* Model Timeline */}
      <section className="fade-up fade-up-2 mb-16">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          50 Years of Forecasting
        </h2>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[var(--border)]" />
            <div className="flex justify-between relative">
              {timeline.map(({ year, model, color }) => (
                <div key={model} className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-jakarta shadow-md relative z-10"
                    style={{ backgroundColor: color }}
                  >
                    {model.slice(0, 2)}
                  </div>
                  <span className="font-playfair text-sm font-bold" style={{ color }}>
                    {model}
                  </span>
                  <span className="font-jakarta text-xs text-[var(--muted)]">{year}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs font-jakarta text-[var(--muted)]">
            <span>← Classical / Statistical</span>
            <span>Deep Learning →</span>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="fade-up fade-up-3 mb-16">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          Key Findings
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {findings.map((f) => (
            <div
              key={f.number}
              className="bg-white border border-[var(--border)] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <span className="font-playfair text-4xl font-bold text-[var(--border)]">
                {f.number}
              </span>
              <h3 className="font-playfair text-lg font-bold text-[var(--navy)] mt-2 mb-3">
                {f.title}
              </h3>
              <p className="font-jakarta text-sm text-[var(--muted)] leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation cards */}
      <section className="fade-up fade-up-4">
        <h2 className="font-playfair text-2xl font-bold text-[var(--navy)] mb-6">
          Explore the Research
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {pages.map(({ href, icon: Icon, label, desc, color }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-[var(--border)] rounded-xl p-6 hover:shadow-md hover:border-[var(--navy)] transition-all"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${color} mb-4`}>
                <Icon size={20} />
              </div>
              <h3 className="font-playfair text-lg font-bold text-[var(--navy)] mb-2 flex items-center gap-2">
                {label}
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </h3>
              <p className="font-jakarta text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
