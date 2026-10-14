import React, { useState, useEffect } from 'react';
import { Sparkles, Quote, ChevronRight, ChevronLeft } from 'lucide-react';

const COMPENSATION_QUOTES = [
  {
    quote: "A well-architected compensation strategy doesn't just reward performance; it defines company culture, protects equity, and guides talent to the peak.",
    author: "Dr. Niladri Nayak",
    role: "Lead Enterprise Architect"
  },
  {
    quote: "Compensation is a continuous stream of trust: accurate data flowing from Employee Central ensures every contributor receives their earned reward without friction.",
    author: "OmniVerse Total Rewards Principle",
    role: "Global Governance"
  },
  {
    quote: "Like a river carving its path through mountains, structured guidelines channel merit pools where they yield the greatest organizational impact.",
    author: "SAP SuccessFactors Compensation Doctrine",
    role: "Best Practice Guidelines"
  },
  {
    quote: "Pay transparency and methodical configuration turn compensation from an administrative exercise into an engine of high retention and organizational peak performance.",
    author: "WorldatWork Total Rewards Association",
    role: "Executive Framework"
  },
  {
    quote: "When guidelines, budgets, and executive reviews move in unison, pay equity ceases to be an aspiration and becomes a mathematical reality.",
    author: "OmniVerse Compensation Committee",
    role: "Steering Charter"
  }
];

export const CompensationQuotesTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPENSATION_QUOTES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = COMPENSATION_QUOTES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg border border-lime-300/40 bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-600 text-slate-950 transition-all"
    >
      {/* Decorative River / Wave SVG Background Accent */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-950/15 backdrop-blur-sm border border-slate-950/10 shrink-0 text-slate-950 shadow-inner">
            <Quote className="w-5 h-5 fill-current" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-950 text-lime-300 shadow-sm">
                Compensation Philosophy & Wisdom
              </span>
              <span className="text-xs font-semibold text-slate-900/80 hidden sm:inline">
                Quote {currentIndex + 1} of {COMPENSATION_QUOTES.length}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-950 leading-relaxed italic drop-shadow-xs">
              "{current.quote}"
            </p>

            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-950/90">
              <span>— {current.author}</span>
              <span className="opacity-60">•</span>
              <span className="font-medium opacity-80">{current.role}</span>
            </div>
          </div>
        </div>

        {/* Navigation arrows & ticker dots */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + COMPENSATION_QUOTES.length) % COMPENSATION_QUOTES.length)}
            className="p-1.5 rounded-lg bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 transition-colors"
            title="Previous Quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            {COMPENSATION_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-5 bg-slate-950' : 'w-1.5 bg-slate-950/30'
                }`}
                title={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % COMPENSATION_QUOTES.length)}
            className="p-1.5 rounded-lg bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 transition-colors"
            title="Next Quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
