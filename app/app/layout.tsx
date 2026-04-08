import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forecasting Benchmark | RNN vs LSTM vs GRU vs TFT",
  description:
    "An interactive research companion for a multi-domain comparison of classical and deep learning time series forecasting models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-[var(--border)] py-6 mt-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-sm text-[var(--muted)] font-jakarta">
              A Multi-Domain Forecasting Benchmark · Academic Research Project
            </p>
            <p className="text-sm text-[var(--muted)] font-jakarta">
              Data: Yahoo Finance · Netflix via jagelves.github.io
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
