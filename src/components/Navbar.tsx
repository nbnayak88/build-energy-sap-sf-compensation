import React from 'react';
import {
  Layers,
  StickyNote as StickyIcon,
  Users,
  AlertCircle,
  Wrench,
  FileDown,
  CheckCircle2,
  Lock,
  Unlock,
  Building2,
  HelpCircle,
  KeyRound,
  Shield,
  FileSpreadsheet
} from 'lucide-react';
import { Milestone, ProjectIssue } from '../types/journal';

export type ActiveTab = 'milestones' | 'stickies' | 'rooms' | 'issues' | 'simulators' | 'export';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  milestones: Milestone[];
  issues: ProjectIssue[];
  strictSequential: boolean;
  setStrictSequential: (strict: boolean) => void;
  onQuickExportCSV: () => void;
  onOpenExportModal: () => void;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  milestones,
  issues,
  strictSequential,
  setStrictSequential,
  onQuickExportCSV,
  onOpenExportModal,
  isAdmin,
  onOpenAdminLogin,
  onAdminLogout,
}) => {
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;
  const milestoneProgress = Math.round((completedMilestones / totalMilestones) * 100);

  const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0);
  const completedTasks = milestones.reduce((sum, m) => sum + m.tasks.filter(t => t.completed).length, 0);
  const taskProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const openIssuesCount = issues.filter(i => i.status !== 'resolved' && i.status !== 'verified').length;
  const criticalIssuesCount = issues.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Bar with Enterprise Context & Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 border border-blue-400/30">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  SAP SuccessFactors Compensation
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                <span className="text-xs text-amber-300 font-medium hidden sm:inline">
                  Client: OmniVerse Energy Ltd.
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Compensation Configuration Sequence Journal
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Gating Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
            {/* Sequential Gating Toggle */}
            <button
              onClick={() => setStrictSequential(!strictSequential)}
              title={strictSequential ? 'Strict Sequential: Milestones must be completed in order' : 'Flexible Mode: Free milestone progression'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                strictSequential
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/80'
              }`}
            >
              {strictSequential ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
              <span>{strictSequential ? 'Strict Sequence: ON' : 'Sequence Gating: OFF'}</span>
            </button>

            {/* Milestones Progress Gauge */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400">Milestones:</span>{' '}
                <span className="font-semibold text-white">{completedMilestones}/{totalMilestones}</span>
                <span className="text-emerald-400 font-semibold ml-1">({milestoneProgress}%)</span>
              </div>
              <div className="w-16 bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>
            </div>

            {/* Tasks Progress Gauge */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/80">
              <span className="text-slate-400">Tasks:</span>
              <span className="font-semibold text-white">{completedTasks}/{totalTasks}</span>
              <span className="text-indigo-400 font-semibold ml-0.5">({taskProgress}%)</span>
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onQuickExportCSV}
                title="Quick Export Milestones CSV"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">CSV</span>
              </button>
              <button
                onClick={onOpenExportModal}
                title="Full PDF & Documentation Export"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm transition-colors border border-indigo-500"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export Dossier</span>
              </button>

              {/* Admin Access Portal Button */}
              {isAdmin ? (
                <button
                  onClick={onAdminLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime-500/20 hover:bg-lime-500/30 text-lime-300 border border-lime-500/40 font-bold transition-all"
                  title="Admin Mode Active - Click to Logout"
                >
                  <Shield className="w-3.5 h-3.5 text-lime-400" />
                  <span>Admin: Active</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAdminLogin}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-medium transition-colors"
                  title="Restricted Administrative Console"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'milestones'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sequential Milestones</span>
            <span className="ml-1 px-1.5 py-0.2 text-xs rounded-full bg-blue-500/30 text-blue-100">
              5 Phases
            </span>
          </button>

          <button
            onClick={() => setActiveTab('stickies')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'stickies'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <StickyIcon className="w-4 h-4 text-amber-300" />
            <span>Sticky Notes Wall</span>
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap relative ${
              activeTab === 'rooms'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-300" />
            <span>Collaboration Rooms</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('issues')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'issues'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <AlertCircle className={`w-4 h-4 ${criticalIssuesCount > 0 ? 'text-rose-400' : 'text-amber-300'}`} />
            <span>Issue Log</span>
            {openIssuesCount > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                criticalIssuesCount > 0 ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500/30 text-amber-200'
              }`}>
                {openIssuesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('simulators')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'simulators'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4 text-sky-300" />
            <span>Interactive Tools & Simulators</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'export'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileDown className="w-4 h-4 text-emerald-300" />
            <span>Dossier & Sign-Off</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
