# Forecasting Benchmark Web App

An interactive research companion for **A Multi-Domain Comparison: RNN, LSTM, GRU & TFT** — a financial time series forecasting benchmark study.

## Pages

| Page | Description |
|------|-------------|
| **Home** | Project overview, model timeline, key findings |
| **Results Explorer** | Interactive charts — filter by dataset, model, horizon |
| **Model Recommender** | AI-powered model recommendation based on your scenario |
| **AI Assistant** | Chat with an AI trained on the benchmark research |
| **Methodology** | Plain-English explanations of every model, dataset, and metric |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **AI:** Google Gemini 1.5 Flash via `@google/generative-ai`
- **Hosting:** Vercel

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Set up your environment variables
```bash
cp .env.local.example .env.local
```
Open `.env.local` and replace `your_gemini_api_key_here` with your actual Gemini API key.

Get a free key at: https://aistudio.google.com/app/apikey

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment to Vercel

See the full step-by-step instructions in `DEPLOYMENT.md`.

---

## Data Sources

- Netflix subscriber data: [jagelves.github.io](https://jagelves.github.io/Data/Netflix.csv)
- Stock/crypto data: Yahoo Finance via `yfinance`
- All benchmark results are pre-computed and embedded in `lib/data.ts`

## Disclaimer

This application is for academic purposes only. Nothing on this site constitutes financial advice.
