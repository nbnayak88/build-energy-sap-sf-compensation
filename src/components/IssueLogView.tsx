import React, { useState } from 'react';
import {
  ProjectIssue,
  IssueSeverity,
  IssueStatus,
  Milestone,
  Phase
} from '../types/journal';
import {
  AlertCircle,
  AlertTriangle,
  Plus,
  FileSpreadsheet,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldAlert,
  User,
  ChevronDown
} from 'lucide-react';
import { exportIssuesToCSV } from '../utils/exportUtils';

interface IssueLogViewProps {
  issues: ProjectIssue[];
  milestones: Milestone[];
  phases: Phase[];
  onAddIssue: (issue: Omit<ProjectIssue, 'id' | 'reportedDate'>) => void;
  onUpdateIssue: (issue: ProjectIssue) => void;
}

export const IssueLogView: React.FC<IssueLogViewProps> = ({
  issues,
  milestones,
  phases,
  onAddIssue,
  onUpdateIssue,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<ProjectIssue | null>(null);

  // Filters
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSeverity, setNewSeverity] = useState<IssueSeverity>('high');
  const [newMilestoneId, setNewMilestoneId] = useState(milestones[0]?.id || '');
  const [newAssignee, setNewAssignee] = useState('Sarah Chen');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const linkedMilestone = milestones.find((m) => m.id === newMilestoneId);

    onAddIssue({
      title: newTitle.trim(),
      description: newDesc.trim(),
      severity: newSeverity,
      status: 'open',
      milestoneId: newMilestoneId,
      phaseId: linkedMilestone?.phaseId || 'phase-1',
      assignee: newAssignee,
      reporter: 'Dr. Niladri Nayak',
    });

    setNewTitle('');
    setNewDesc('');
    setIsCreating(false);
  };

  const filteredIssues = issues.filter((iss) => {
    if (severityFilter !== 'all' && iss.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && iss.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = iss.id.toLowerCase().includes(q);
      const matchTitle = iss.title.toLowerCase().includes(q);
      const matchDesc = iss.description.toLowerCase().includes(q);
      const matchAssignee = iss.assignee.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchDesc && !matchAssignee) return false;
    }
    return true;
  });

  const getSeverityBadge = (sev: IssueSeverity) => {
    switch (sev) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-800 border border-orange-300">
            <AlertTriangle className="w-3 h-3 text-orange-600" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-300">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (st: IssueStatus) => {
    switch (st) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-300">
            Resolved
          </span>
        );
      case 'in_fix':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
            In Fix
          </span>
        );
      case 'investigating':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
            Investigating
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Open
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
              <AlertCircle className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              OmniVerse Configuration Defect & Issue Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Audit log of Check Tool failures, schema anomalies, hierarchy loops, and UDF data integration bugs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportIssuesToCSV(issues)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Issues CSV</span>
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Log Defect / Issue</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search issues by ID, title, assignee, or symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Filter className="w-3 h-3" />
            <span>Severity:</span>
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="flex items-center gap-1 text-xs text-slate-500 pl-2 border-l border-slate-200">
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="in_fix">In Fix</option>
            <option value="resolved">Resolved</option>
            <option value="verified">Verified</option>
          </select>
        </div>
      </div>

      {/* New Issue Modal Form */}
      {isCreating && (
        <div className="p-5 bg-white rounded-2xl border-2 border-rose-400 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Log New Configuration Defect
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g. Cyclic reporting loop in APAC hierarchy"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Associated Milestone</label>
                <select
                  value={newMilestoneId}
                  onChange={(e) => setNewMilestoneId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      Step {m.number}: {m.title.slice(0, 45)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Technical Description</label>
              <textarea
                rows={3}
                placeholder="Detail error logs, Check Tool findings, affected user IDs, or reproduction steps..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Severity Level</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as IssueSeverity)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="critical">Critical (Blocks Go-Live or Launch)</option>
                  <option value="high">High (Major Calculation or Mapping Discrepancy)</option>
                  <option value="medium">Medium (Validation Warning or Display Glitch)</option>
                  <option value="low">Low (Cosmetic or Documentation Tweak)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assignee</label>
                <input
                  type="text"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-500"
              >
                Log Defect
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Issues Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Milestone</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4">Reported</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.map((iss) => {
                const linkedMilestone = milestones.find((m) => m.id === iss.milestoneId);

                return (
                  <tr
                    key={iss.id}
                    onClick={() => setSelectedIssue(iss)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {iss.id}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getSeverityBadge(iss.severity)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(iss.status)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{iss.title}</div>
                      <p className="text-slate-500 line-clamp-1 mt-0.5">{iss.description}</p>
                      {iss.resolutionNotes && (
                        <div className="text-[11px] text-emerald-700 font-medium mt-1">
                          Fix: {iss.resolutionNotes}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {linkedMilestone ? `Step ${linkedMilestone.number}` : iss.milestoneId}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 whitespace-nowrap">
                      {iss.assignee}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {iss.reportedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={iss.status}
                        onChange={(e) => onUpdateIssue({ ...iss, status: e.target.value as IssueStatus })}
                        className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none"
                      >
                        <option value="open">Open</option>
                        <option value="investigating">Investigating</option>
                        <option value="in_fix">In Fix</option>
                        <option value="resolved">Resolved</option>
                        <option value="verified">Verified</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Detail & Resolution Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900">{selectedIssue.id}</span>
                {getSeverityBadge(selectedIssue.severity)}
                {getStatusBadge(selectedIssue.status)}
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900">{selectedIssue.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {selectedIssue.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Reporter:</span>{' '}
                <span className="font-semibold text-slate-800">{selectedIssue.reporter}</span>
              </div>
              <div>
                <span className="text-slate-400">Assignee:</span>{' '}
                <span className="font-semibold text-slate-800">{selectedIssue.assignee}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Resolution & Remediation Notes:
              </label>
              <textarea
                rows={3}
                value={selectedIssue.resolutionNotes || ''}
                onChange={(e) => setSelectedIssue({ ...selectedIssue, resolutionNotes: e.target.value })}
                placeholder="Document configuration fix, XML patch, or UDF data correction..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Update Status:</span>
                <select
                  value={selectedIssue.status}
                  onChange={(e) => setSelectedIssue({ ...selectedIssue, status: e.target.value as IssueStatus })}
                  className="bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800"
                >
                  <option value="open">Open</option>
                  <option value="investigating">Investigating</option>
                  <option value="in_fix">In Fix</option>
                  <option value="resolved">Resolved</option>
                  <option value="verified">Verified</option>
                </select>
              </div>

              <button
                onClick={() => {
                  onUpdateIssue(selectedIssue);
                  setSelectedIssue(null);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
