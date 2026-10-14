import React from 'react';
import {
  ShieldAlert,
  CheckCheck,
  RotateCcw,
  LogOut,
  Unlock,
  Wrench,
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminControlsBarProps {
  isAdmin: boolean;
  onLogout: () => void;
  onBatchCompleteAll: () => void;
  onResetAllMilestones: () => void;
  strictSequential: boolean;
  onToggleStrictSequential: () => void;
  onResolveAllIssues: () => void;
}

export const AdminControlsBar: React.FC<AdminControlsBarProps> = ({
  isAdmin,
  onLogout,
  onBatchCompleteAll,
  onResetAllMilestones,
  strictSequential,
  onToggleStrictSequential,
  onResolveAllIssues,
}) => {
  if (!isAdmin) return null;

  const handleCompleteAll = () => {
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    onBatchCompleteAll();
  };

  return (
    <div className="bg-slate-950 text-white border-y border-lime-500/30 p-3 sm:px-6 shadow-xl animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Admin Clearance Badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500"></span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lime-400 uppercase tracking-wider bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/30">
              Admin Clearance: Active
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Master control session unlocked for OmniVerse system engineering.
            </span>
          </div>
        </div>

        {/* Powerful Admin Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCompleteAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm shadow-emerald-500/20"
            title="Mark all 16 compensation milestones and tasks as completed"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Batch Complete All</span>
          </button>

          <button
            onClick={onResolveAllIssues}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
            title="Mark all logged configuration issues as verified / resolved"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-Resolve Issues</span>
          </button>

          <button
            onClick={onToggleStrictSequential}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold border transition-all ${
              strictSequential
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Toggle sequential milestone gating"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Gating: {strictSequential ? 'Strict' : 'Bypassed'}</span>
          </button>

          <button
            onClick={onResetAllMilestones}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 font-semibold transition-colors"
            title="Reset milestones and tasks back to initial staging baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors ml-1"
            title="Lock administrative console"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </button>
        </div>

      </div>
    </div>
  );
};
