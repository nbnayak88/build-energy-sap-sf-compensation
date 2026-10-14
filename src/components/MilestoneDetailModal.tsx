import React, { useState } from 'react';
import {
  Milestone,
  MilestoneStatus,
  Phase,
  ProjectIssue,
  StickyNote,
  TaskItem
} from '../types/journal';
import {
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Code2,
  CheckSquare,
  Sparkles,
  FileText,
  User,
  Plus,
  StickyNote as StickyIcon,
  ShieldCheck,
  Send,
  Calendar,
  Lock,
  ChevronRight,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MilestoneDetailModalProps {
  milestone: Milestone | null;
  phase: Phase | undefined;
  onClose: () => void;
  onUpdateMilestone: (updated: Milestone) => void;
  stickyNotes: StickyNote[];
  issues: ProjectIssue[];
  onAddStickyForMilestone: (milestoneId: string) => void;
  onAddIssueForMilestone: (milestoneId: string) => void;
}

export const MilestoneDetailModal: React.FC<MilestoneDetailModalProps> = ({
  milestone,
  phase,
  onClose,
  onUpdateMilestone,
  stickyNotes,
  issues,
  onAddStickyForMilestone,
  onAddIssueForMilestone,
}) => {
  if (!milestone) return null;

  const [activeTab, setActiveTab] = useState<'guide' | 'checklist' | 'xml' | 'notes_issues' | 'signoff'>('guide');
  const [copiedXML, setCopiedXML] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [signoffNotes, setSignoffNotes] = useState('');

  const milestoneNotes = stickyNotes.filter(n => n.milestoneId === milestone.id);
  const milestoneIssues = issues.filter(i => i.milestoneId === milestone.id);

  const toggleTask = (taskId: string) => {
    const updatedTasks = milestone.tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const allCompleted = updatedTasks.every(t => t.completed);
    
    const updatedMilestone: Milestone = {
      ...milestone,
      tasks: updatedTasks,
      status: allCompleted ? 'completed' : milestone.status === 'not_started' ? 'in_progress' : milestone.status,
      completedDate: allCompleted ? new Date().toISOString().slice(0, 10) : milestone.completedDate
    };

    if (allCompleted && milestone.status !== 'completed') {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }

    onUpdateMilestone(updatedMilestone);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-custom-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
      isCritical: false
    };

    onUpdateMilestone({
      ...milestone,
      tasks: [...milestone.tasks, newTask]
    });
    setNewTaskTitle('');
  };

  const handleStatusChange = (newStatus: MilestoneStatus) => {
    if (newStatus === 'completed' && milestone.status !== 'completed') {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
    onUpdateMilestone({
      ...milestone,
      status: newStatus,
      completedDate: newStatus === 'completed' ? new Date().toISOString().slice(0, 10) : undefined
    });
  };

  const copyXMLSnippet = () => {
    if (!milestone.xmlSnippet) return;
    navigator.clipboard.writeText(milestone.xmlSnippet);
    setCopiedXML(true);
    setTimeout(() => setCopiedXML(false), 2000);
  };

  const completedTasksCount = milestone.tasks.filter(t => t.completed).length;
  const progressPct = milestone.tasks.length ? Math.round((completedTasksCount / milestone.tasks.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/30">
                  {phase?.title || 'Implementation Phase'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Step {milestone.number}
                </span>
                {milestone.status === 'completed' && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Signed Off
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {milestone.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {milestone.shortDesc}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Header Ribbon with Assignee and Status */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={milestone.assignee.avatar}
                  alt={milestone.assignee.name}
                  className="w-6 h-6 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <span className="text-slate-400">Lead Assignee:</span>{' '}
                  <span className="font-semibold text-white">{milestone.assignee.name}</span>
                  <span className="text-slate-400 ml-1">({milestone.assignee.role})</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-slate-400 border-l border-slate-800 pl-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Target Due Date: {milestone.dueDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={milestone.status}
                onChange={(e) => handleStatusChange(e.target.value as MilestoneStatus)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">Ready for Review</option>
                <option value="completed">Signed Off (Completed)</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 shrink-0 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Implementation Guide & Notion Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Execution Tasks ({completedTasksCount}/{milestone.tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('xml')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'xml'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>XML Schema & sf-form.dtd</span>
          </button>

          <button
            onClick={() => setActiveTab('notes_issues')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'notes_issues'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <StickyIcon className="w-4 h-4" />
            <span>Notes & Issues ({milestoneNotes.length + milestoneIssues.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('signoff')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'signoff'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Formal Sign-Off</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          
          {/* TAB 1: GUIDE & NOTION SPECS */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* OmniVerse Specific Context Box */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>OmniVerse Energy Ltd. Architectural Blueprint</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  {milestone.omniVerseContext}
                </p>
              </div>

              {/* Step-by-Step Implementation Instructions */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Step-by-Step Procedure (SAP Compensation Best Practice)
                </h3>
                <div className="space-y-2.5">
                  {milestone.detailedGuide.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-700"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Architecture Decisions & Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50/60 border border-indigo-200/80 rounded-xl">
                  <h4 className="font-bold text-indigo-950 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Key Architectural Decisions
                  </h4>
                  <ul className="space-y-1.5 text-xs text-indigo-900">
                    {milestone.keyDecisions.map((dec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{dec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
                  <h4 className="font-bold text-emerald-950 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Expected Deliverables & Artifacts
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-900">
                    {milestone.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Check Tool Diagnostics Advice */}
              {milestone.checkToolTips && milestone.checkToolTips.length > 0 && (
                <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    Pre-Flight Check Tool & Validation Insights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {milestone.checkToolTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXECUTION TASKS CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div>
                  <h4 className="font-bold text-blue-950 text-sm">
                    Task Completion Progress: {completedTasksCount} of {milestone.tasks.length} Completed
                  </h4>
                  <p className="text-xs text-blue-700">
                    Complete all critical tasks to unlock formal milestone sign-off.
                  </p>
                </div>
                <div className="text-xl font-bold text-blue-600">{progressPct}%</div>
              </div>

              <div className="space-y-2.5">
                {milestone.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}} // Handled by div onClick
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-500' : ''}`}>
                          {task.title}
                        </span>
                        {task.isCritical && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                            Critical Gate
                          </span>
                        )}
                      </div>
                      {task.notes && (
                        <p className="text-xs text-slate-500 mt-1 italic">{task.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Task Form */}
              <form onSubmit={handleAddTask} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add custom implementation checklist task..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: XML & TECHNICAL SCHEMA */}
          {activeTab === 'xml' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Configuration XML Snippet & sf-form.dtd Tag Reference
                  </h4>
                  <p className="text-xs text-slate-500">
                    Validated against SAP SuccessFactors sf-form.dtd syntax standards.
                  </p>
                </div>
                {milestone.xmlSnippet && (
                  <button
                    onClick={copyXMLSnippet}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    {copiedXML ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedXML ? 'Copied XML!' : 'Copy Snippet'}</span>
                  </button>
                )}
              </div>

              {milestone.xmlSnippet ? (
                <div className="relative rounded-xl overflow-hidden bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-400">
                  <pre className="overflow-x-auto whitespace-pre-wrap">{milestone.xmlSnippet}</pre>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  No direct XML modification required for this step. Configured via Admin Center UI.
                </div>
              )}

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-800">XML Editing Best Practices from Notion Journal:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Never upload an XML plan directly to production without testing validation locally against sf-form.dtd.</li>
                  <li>Ensure all reloadable custom fields have <code className="text-rose-600 bg-rose-50 px-1 py-0.5 rounded">reloadable="true"</code> to support mid-cycle transfers.</li>
                  <li>Map corporate data model primary associations before configuring salary pay matrix ranges.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: NOTES & ISSUES */}
          {activeTab === 'notes_issues' && (
            <div className="space-y-6">
              {/* Sticky Notes Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <StickyIcon className="w-4 h-4 text-amber-500" />
                    Sticky Notes on this Milestone ({milestoneNotes.length})
                  </h4>
                  <button
                    onClick={() => onAddStickyForMilestone(milestone.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add Sticky Note
                  </button>
                </div>

                {milestoneNotes.length === 0 ? (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
                    No sticky notes attached to this milestone yet. Click "Add Sticky Note" to record insights or blockers.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {milestoneNotes.map((note) => (
                      <div
                        key={note.id}
                        className={`p-3.5 rounded-xl border text-xs shadow-sm ${
                          note.color === 'yellow' ? 'bg-amber-50 border-amber-200 text-amber-950' :
                          note.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-950' :
                          note.color === 'green' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
                          note.color === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-950' :
                          'bg-rose-50 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span>{note.title}</span>
                          <span className="text-[10px] opacity-70">{note.author}</span>
                        </div>
                        <p className="leading-relaxed">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Milestone Issues Section */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    Associated Defects & Issues ({milestoneIssues.length})
                  </h4>
                  <button
                    onClick={() => onAddIssueForMilestone(milestone.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Log Issue
                  </button>
                </div>

                {milestoneIssues.length === 0 ? (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
                    No open issues or defects logged for this milestone.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {milestoneIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex items-start justify-between gap-3 shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900">{issue.id}: {issue.title}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              issue.severity === 'critical' ? 'bg-rose-100 text-rose-700' :
                              issue.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {issue.severity}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                              {issue.status}
                            </span>
                          </div>
                          <p className="text-slate-600">{issue.description}</p>
                          {issue.resolutionNotes && (
                            <p className="text-emerald-700 font-medium mt-1">Resolution: {issue.resolutionNotes}</p>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{issue.reportedDate}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: FORMAL SIGN-OFF */}
          {activeTab === 'signoff' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Milestone Sign-Off Protocol for OmniVerse Energy Ltd.
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Signing off this milestone certifies that all configuration work, test cases, and customer approvals have been completed in accordance with the OmniVerse Compensation Configuration Sequence Journal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-2">
                  <span className="text-slate-500 font-medium">Lead Consultant:</span>
                  <div className="font-bold text-slate-900 text-sm">Dr. Niladri Nayak</div>
                  <div className="text-slate-500">Enterprise Architect & SuccessFactors Principal</div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-2">
                  <span className="text-slate-500 font-medium">OmniVerse Project Sponsor:</span>
                  <div className="font-bold text-slate-900 text-sm">VP of Global Total Rewards</div>
                  <div className="text-slate-500">OmniVerse Energy Ltd. Corporate Steering</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Sign-Off Notes & Approvals Log:
                </label>
                <textarea
                  rows={3}
                  placeholder="Document sign-off rationale, customer review meeting date, or verification references..."
                  value={signoffNotes}
                  onChange={(e) => setSignoffNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {milestone.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Signed Off on {milestone.completedDate || '2026-10-14'}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Formally Sign Off Milestone</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Dependencies:</span>
            {milestone.dependencies.length > 0 ? (
              <span className="font-semibold text-slate-700">{milestone.dependencies.join(', ')}</span>
            ) : (
              <span className="text-slate-400">None (Root Step)</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
