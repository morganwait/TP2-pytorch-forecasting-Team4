"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Loader2, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Why did ARIMA outperform deep learning on Bitcoin?",
  "What is the vanishing gradient problem?",
  "Which model should I use for stock price forecasting?",
  "Explain what MAPE means in plain English",
  "What is the difference between LSTM and GRU?",
  "What does TFT stand for and how does it work?",
];

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-[var(--navy)]" : "bg-white border border-[var(--border)]"
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-[var(--accent)]" />
        )}
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 text-sm font-jakarta leading-relaxed whitespace-pre-wrap ${
          isUser ? "chat-user" : "chat-ai"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm an AI research assistant trained on this forecasting benchmark study. I can explain any concept, discuss model performance, or help you interpret the results. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("Something went wrong. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="fade-up fade-up-1 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={20} className="text-violet-600" />
          <span className="font-jakarta text-sm text-violet-700 font-semibold uppercase tracking-wider">
            Powered by Gemini AI
          </span>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-[var(--navy)] mb-3">
          AI Research Assistant
        </h1>
        <hr className="rule-navy w-16 mb-4" />
        <p className="font-jakarta text-[var(--muted)] max-w-xl">
          Ask anything about the benchmark — model explanations, result interpretation,
          methodology, or how findings apply to real-world scenarios.
        </p>
      </div>

      {/* Suggested questions */}
      <div className="fade-up fade-up-2 mb-6">
        <p className="font-jakarta text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
          Suggested questions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              className="text-xs font-jakarta px-3 py-1.5 rounded-full bg-white border border-[var(--border)] text-[var(--ink)] hover:border-[var(--navy)] hover:text-[var(--navy)] transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="fade-up fade-up-3 bg-white border border-[var(--border)] rounded-xl flex flex-col" style={{ height: "520px" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[var(--border)] flex items-center justify-center">
                <Bot size={14} className="text-[var(--accent)]" />
              </div>
              <div className="chat-ai px-4 py-3 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-[var(--muted)]" />
                <span className="text-sm font-jakarta text-[var(--muted)]">Thinking…</span>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center py-2">
              <p className="font-jakarta text-xs text-red-500">{error}</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[var(--border)] p-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the research… (Enter to send, Shift+Enter for new line)"
              rows={2}
              disabled={loading}
              className="flex-1 resize-none font-jakarta text-sm text-[var(--ink)] placeholder:text-[var(--muted)] bg-[var(--bg)] rounded-lg px-4 py-2.5 border border-[var(--border)] focus:outline-none focus:border-[var(--navy)] focus:ring-1 focus:ring-[var(--navy)] disabled:opacity-60"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="shrink-0 w-10 h-10 rounded-lg bg-[var(--navy)] text-white flex items-center justify-center hover:bg-[var(--navy-light)] disabled:opacity-40 transition-colors"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="font-jakarta text-xs text-[var(--muted)] mt-1.5">
            AI responses are grounded in benchmark results from this study.
          </p>
        </div>
      </div>
    </div>
  );
}
