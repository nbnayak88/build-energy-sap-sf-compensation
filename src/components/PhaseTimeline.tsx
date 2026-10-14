import React, { useState } from 'react';
import {
  Phase,
  Milestone,
  MilestoneStatus,
  ProjectIssue,
  StickyNote
} from '../types/journal';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  ArrowRight,
  User,
  Search,
  Filter,
  Code2,
  CheckSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  StickyNote as StickyIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhaseTimelineProps {
  phases: Phase[];
  milestones: Milestone[];
  issues: ProjectIssue[];
  stickyNotes: StickyNote[];
  strictSequential: boolean;
  onSelectMilestone: (milestone: Milestone) => void;
  onUpdateMilestoneStatus: (milestoneId: string, status: MilestoneStatus) => void;
  onOpenNewStickyForMilestone: (milestoneId: string) => void;
  onOpenIssueModalForMilestone: (milestoneId: string) => void;
}

export const PhaseTimeline: React.FC<PhaseTimelineProps> = ({
  phases,
  milestones,
  issues,
  stickyNotes,
  strictSequential,
  onSelectMilestone,
  onUpdateMilestoneStatus,
  onOpenNewStickyForMilestone,
  onOpenIssueModalForMilestone,
}) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isMilestoneLocked = (milestone: Milestone): boolean => {
    if (!strictSequential) return false;
    if (milestone.dependencies.length === 0) return false;

    // Check if all dependencies are completed
    return milestone.dependencies.some(depId => {
      const depMilestone = milestones.find(m => m.id === depId);
      return !depMilestone || depMilestone.status !== 'completed';
    });
  };

  const filteredMilestones = milestones.filter(m => {
    if (selectedPhaseId !== 'all' && m.phaseId !== selectedPhaseId) return false;
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDesc = m.shortDesc.toLowerCase().includes(q);
      const matchNumber = m.number.toLowerCase().includes(q);
      const matchAssignee = m.assignee.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchNumber && !matchAssignee) return false;
    }
    return true;
  });

  const handleStatusChange = (e: React.MouseEvent, m: Milestone, newStatus: MilestoneStatus) => {
    e.stopPropagation();
    if (newStatus === 'completed' && m.status !== 'completed') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onUpdateMilestoneStatus(m.id, newStatus);
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Signed Off
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            In Progress
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            Ready for Review
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Blocked
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Phase Stepper Navigation */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              OmniVerse Implementation Sequence Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              5 Sequential Execution Phases structured according to SAP SuccessFactors Compensation Implementation Guidelines
            </p>
          </div>
          <button
            onClick={() => setSelectedPhaseId('all')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPhaseId === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Show All Phases ({milestones.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {phases.map((phase) => {
            const phaseMilestones = milestones.filter(m => m.phaseId === phase.id);
            const completedCount = phaseMilestones.filter(m => m.status === 'completed').length;
            const isPhaseActive = selectedPhaseId === phase.id;
            const progress = phaseMilestones.length ? Math.round((completedCount / phaseMilestones.length) * 100) : 0;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id === selectedPhaseId ? 'all' : phase.id)}
                className={`relative text-left p-3.5 rounded-xl border transition-all text-xs ${
                  isPhaseActive
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Phase {phase.number}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-medium text-[10px] ${
                    progress === 100
                      ? 'bg-emerald-100 text-emerald-800'
                      : progress > 0
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {completedCount}/{phaseMilestones.length} Done
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-1 mb-1">
                  {phase.subtitle}
                </h3>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search milestones, XML tags, OmniVerse requirements, assignees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          {(['all', 'not_started', 'in_progress', 'in_review', 'completed', 'blocked'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'all' ? 'All Statuses' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Sequential Milestone Cards Stream */}
      <div className="space-y-4">
        {filteredMilestones.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-sm text-slate-500">No milestones match your current filters.</p>
            <button
              onClick={() => {
                setSelectedPhaseId('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredMilestones.map((milestone, idx) => {
            const locked = isMilestoneLocked(milestone);
            const parentPhase = phases.find(p => p.id === milestone.phaseId);
            const completedTasks = milestone.tasks.filter(t => t.completed).length;
            const taskPct = milestone.tasks.length ? Math.round((completedTasks / milestone.tasks.length) * 100) : 0;
            const milestoneIssues = issues.filter(i => i.milestoneId === milestone.id);
            const milestoneNotes = stickyNotes.filter(n => n.milestoneId === milestone.id);

            return (
              <div
                key={milestone.id}
                onClick={() => onSelectMilestone(milestone)}
                className={`group relative bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                  locked
                    ? 'border-slate-200 bg-slate-50/70 opacity-85 hover:border-slate-300'
                    : milestone.status === 'completed'
                    ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                    : 'border-slate-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {/* Milestone Card Header */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      {/* Milestone Number Badge */}
                      <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl font-bold shrink-0 shadow-sm border ${
                        milestone.status === 'completed'
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : locked
                          ? 'bg-slate-200 text-slate-500 border-slate-300'
                          : 'bg-blue-600 text-white border-blue-500'
                      }`}>
                        <span className="text-xs uppercase font-medium tracking-tighter opacity-80">STEP</span>
                        <span className="text-sm">{milestone.number}</span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {parentPhase?.subtitle}
                          </span>
                          {locked && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                              <Lock className="w-3 h-3" />
                              Gated: Requires {milestone.dependencies.join(', ')}
                            </span>
                          )}
                          {getStatusBadge(milestone.status)}
                          {milestoneIssues.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                              <AlertTriangle className="w-3 h-3" />
                              {milestoneIssues.length} {milestoneIssues.length === 1 ? 'Issue' : 'Issues'}
                            </span>
                          )}
                          {milestoneNotes.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                              <StickyIcon className="w-3 h-3 text-amber-600" />
                              {milestoneNotes.length} Notes
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                          {milestone.title}
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                          {milestone.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Quick Status Control Dropdown */}
                    <div className="flex items-center gap-2 self-start shrink-0">
                      <select
                        value={milestone.status}
                        onChange={(e) => handleStatusChange(e as any, milestone, e.target.value as MilestoneStatus)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="in_review">Ready for Review</option>
                        <option value="completed">Signed Off (Complete)</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </div>
                  </div>

                  {/* OmniVerse Specific Architecture Context Box */}
                  <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-950">OmniVerse Energy Specification: </span>
                      <span>{milestone.omniVerseContext}</span>
                    </div>
                  </div>

                  {/* Checklist & Progress Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                        <span>Tasks: {completedTasks} of {milestone.tasks.length} Completed</span>
                        <span className="text-blue-600 font-bold ml-0.5">({taskPct}%)</span>
                      </div>
                      <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${taskPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{milestone.assignee.name}</span>
                        <span className="text-[11px] text-slate-400">({milestone.assignee.role})</span>
                      </div>

                      <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Due: {milestone.dueDate}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenNewStickyForMilestone(milestone.id);
                        }}
                        className="p-1 hover:bg-slate-100 rounded text-amber-600 hover:text-amber-700"
                        title="Add Sticky Note to this Milestone"
                      >
                        <StickyIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
