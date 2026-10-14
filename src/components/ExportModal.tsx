import React from 'react';
import {
  Milestone,
  Phase,
  ProjectIssue,
  StickyNote
} from '../types/journal';
import {
  X,
  Printer,
  FileSpreadsheet,
  Download,
  Building2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  exportMilestonesToCSV,
  exportIssuesToCSV,
  exportStickyNotesToCSV,
  triggerBrowserPrint,
  exportDossierHTML,
} from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  phases: Phase[];
  milestones: Milestone[];
  issues: ProjectIssue[];
  stickyNotes: StickyNote[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  phases,
  milestones,
  issues,
  stickyNotes,
}) => {
  if (!isOpen) return null;

  const completedMilestones = milestones.filter((m) => m.status === 'completed');
  const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0);
  const completedTasks = milestones.reduce((sum, m) => sum + m.tasks.filter((t) => t.completed).length, 0);
  const taskProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const criticalIssues = issues.filter((i) => i.severity === 'critical');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Top Actions Bar */}
        <div className="p-4 bg-slate-900 text-white shrink-0 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-500/20 text-blue-300">
              <Download className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm">Implementation Dossier & Export Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportMilestonesToCSV(milestones, phases)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Milestones CSV</span>
            </button>
            <button
              onClick={() => exportIssuesToCSV(issues)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-rose-400" />
              <span>Issues CSV</span>
            </button>
            <button
              onClick={() => exportStickyNotesToCSV(stickyNotes)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Notes CSV</span>
            </button>
            <button
              onClick={() => exportDossierHTML(phases, milestones, issues, stickyNotes)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
              title="Download standalone HTML dossier for offline documentation"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save HTML Dossier</span>
            </button>
            <button
              onClick={triggerBrowserPrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print to PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="print-dossier" className="p-8 sm:p-12 overflow-y-auto flex-1 space-y-8 text-slate-900 bg-white">
          
          {/* Executive Document Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300">
                  SAP SuccessFactors Compensation
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-600 font-semibold">
                  Official Configuration Sequence Journal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                OmniVerse Energy Ltd. Implementation Dossier
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Authored in alignment with Dr. Niladri Nayak's SAP Activate Compensation Methodology
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-900">Generated:</span> {new Date().toLocaleDateString()}</div>
              <div><span className="font-semibold text-slate-900">Lead Architect:</span> Dr. Niladri Nayak</div>
              <div><span className="font-semibold text-slate-900">Environment:</span> Production Tenant (OmniVerse)</div>
            </div>
          </div>

          {/* Project Metrics Summary Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Milestone Progress:</span>
              <div className="text-xl font-extrabold text-blue-600">
                {completedMilestones.length} / {milestones.length}
              </div>
              <span className="text-slate-400">
                ({Math.round((completedMilestones.length / milestones.length) * 100)}% Complete)
              </span>
            </div>

            <div>
              <span className="text-slate-500">Tasks Completed:</span>
              <div className="text-xl font-extrabold text-emerald-600">
                {completedTasks} / {totalTasks}
              </div>
              <span className="text-slate-400">({taskProgress}% Done)</span>
            </div>

            <div>
              <span className="text-slate-500">Active Issues:</span>
              <div className={`text-xl font-extrabold ${issues.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {issues.length} Logged
              </div>
              <span className="text-slate-400">({criticalIssues.length} Critical)</span>
            </div>

            <div>
              <span className="text-slate-500">Go-Live Readiness:</span>
              <div className="text-xl font-extrabold text-purple-600">
                {completedMilestones.length >= 2 ? 'Phase 2 Active' : 'Initial Phase'}
              </div>
              <span className="text-slate-400">Target Launch: Dec 2026</span>
            </div>
          </div>

          {/* Detailed Milestone Sequence Breakdown */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Sequential Milestone Status & Execution Audit</span>
            </h2>

            {phases.map((phase) => {
              const phaseMilestones = milestones.filter((m) => m.phaseId === phase.id);

              return (
                <div key={phase.id} className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-xl text-xs">
                    <span className="font-bold text-slate-800">
                      Phase {phase.number}: {phase.subtitle}
                    </span>
                    <span className="text-slate-500">{phaseMilestones.length} Steps</span>
                  </div>

                  <div className="space-y-2">
                    {phaseMilestones.map((m) => (
                      <div
                        key={m.id}
                        className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-700">Step {m.number}:</span>
                            <span className="font-bold text-slate-900">{m.title}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {m.status.replace('_', ' ')}
                          </span>
                        </div>

                        <p className="text-slate-600">{m.shortDesc}</p>
                        
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                          <span>Assignee: {m.assignee.name} ({m.assignee.role})</span>
                          <span>Due: {m.dueDate}</span>
                          {m.completedDate && (
                            <span className="text-emerald-700 font-semibold">
                              Signed Off: {m.completedDate}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Issue Log Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Defect & Issue Tracking Log</span>
            </h2>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-xs">
              {issues.map((iss) => (
                <div key={iss.id} className="p-3 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{iss.id}: {iss.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 uppercase">
                      {iss.severity} • {iss.status}
                    </span>
                  </div>
                  <p className="text-slate-600">{iss.description}</p>
                  {iss.resolutionNotes && (
                    <div className="text-emerald-700 font-medium">Remediation: {iss.resolutionNotes}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Formal Sign-Off Table */}
          <div className="space-y-4 pt-6 border-t-2 border-slate-900">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Executive Sign-Off & Approvals Certifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
              <div className="border border-slate-200 p-4 rounded-xl space-y-3">
                <div className="text-slate-500 font-medium">Lead Consultant</div>
                <div className="font-bold text-slate-900 text-sm">Dr. Niladri Nayak</div>
                <div className="h-12 border-b border-dashed border-slate-300"></div>
                <div className="text-slate-400 text-[10px]">Date & Signature</div>
              </div>

              <div className="border border-slate-200 p-4 rounded-xl space-y-3">
                <div className="text-slate-500 font-medium">OmniVerse Project Sponsor</div>
                <div className="font-bold text-slate-900 text-sm">VP Global Total Rewards</div>
                <div className="h-12 border-b border-dashed border-slate-300"></div>
                <div className="text-slate-400 text-[10px]">Date & Signature</div>
              </div>

              <div className="border border-slate-200 p-4 rounded-xl space-y-3">
                <div className="text-slate-500 font-medium">OmniVerse Finance / Payroll Lead</div>
                <div className="font-bold text-slate-900 text-sm">VP Financial Planning & Analysis</div>
                <div className="h-12 border-b border-dashed border-slate-300"></div>
                <div className="text-slate-400 text-[10px]">Date & Signature</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
