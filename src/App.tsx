/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phase,
  Milestone,
  MilestoneStatus,
  StickyNote,
  CollaborationRoom,
  ProjectIssue,
  RoomMessage
} from './types/journal';
import {
  INITIAL_PHASES,
  INITIAL_MILESTONES,
  INITIAL_STICKY_NOTES,
  INITIAL_ROOMS,
  INITIAL_ISSUES
} from './data/initialJournalData';
import { Navbar, ActiveTab } from './components/Navbar';
import { PhaseTimeline } from './components/PhaseTimeline';
import { MilestoneDetailModal } from './components/MilestoneDetailModal';
import { StickyNotesBoard } from './components/StickyNotesBoard';
import { CollaborationRoomView } from './components/CollaborationRoomView';
import { IssueLogView } from './components/IssueLogView';
import { InteractiveSimulators } from './components/InteractiveSimulators';
import { ExportModal } from './components/ExportModal';
import { CompensationQuotesTicker } from './components/CompensationQuotesTicker';
import { GlobalMountainRiverProgressBar } from './components/GlobalMountainRiverProgressBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminControlsBar } from './components/AdminControlsBar';
import {
  exportMilestonesToCSV,
  exportIssuesToCSV,
  exportStickyNotesToCSV,
} from './utils/exportUtils';

export default function App() {
  // Persistent States in LocalStorage
  const [phases] = useState<Phase[]>(INITIAL_PHASES);

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const saved = localStorage.getItem('omniverse_comp_milestones');
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(() => {
    try {
      const saved = localStorage.getItem('omniverse_comp_stickies');
      return saved ? JSON.parse(saved) : INITIAL_STICKY_NOTES;
    } catch {
      return INITIAL_STICKY_NOTES;
    }
  });

  const [rooms, setRooms] = useState<CollaborationRoom[]>(() => {
    try {
      const saved = localStorage.getItem('omniverse_comp_rooms');
      return saved ? JSON.parse(saved) : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  const [issues, setIssues] = useState<ProjectIssue[]>(() => {
    try {
      const saved = localStorage.getItem('omniverse_comp_issues');
      return saved ? JSON.parse(saved) : INITIAL_ISSUES;
    } catch {
      return INITIAL_ISSUES;
    }
  });

  const [strictSequential, setStrictSequential] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('omniverse_strict_sequential');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('milestones');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('omniverse_admin_active') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    try {
      sessionStorage.setItem('omniverse_admin_active', 'true');
    } catch {}
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem('omniverse_admin_active');
    } catch {}
  };

  const handleBatchCompleteAll = () => {
    const today = new Date().toISOString().slice(0, 10);
    setMilestones((prev) =>
      prev.map((m) => ({
        ...m,
        status: 'completed',
        completedDate: m.completedDate || today,
        tasks: m.tasks.map((t) => ({ ...t, completed: true })),
      }))
    );
  };

  const handleResetAllMilestones = () => {
    setMilestones(INITIAL_MILESTONES);
    localStorage.removeItem('omniverse_comp_milestones');
  };

  const handleResolveAllIssues = () => {
    setIssues((prev) =>
      prev.map((iss) => ({
        ...iss,
        status: 'verified',
        resolutionNotes: iss.resolutionNotes || 'Remediated & verified in Admin console session.',
      }))
    );
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('omniverse_comp_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('omniverse_comp_stickies', JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  useEffect(() => {
    localStorage.setItem('omniverse_comp_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('omniverse_comp_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('omniverse_strict_sequential', JSON.stringify(strictSequential));
  }, [strictSequential]);

  // Milestone updates
  const handleUpdateMilestone = (updated: Milestone) => {
    setMilestones((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    if (selectedMilestone?.id === updated.id) {
      setSelectedMilestone(updated);
    }
  };

  const handleUpdateMilestoneStatus = (milestoneId: string, status: MilestoneStatus) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === milestoneId) {
          return {
            ...m,
            status,
            completedDate: status === 'completed' ? new Date().toISOString().slice(0, 10) : m.completedDate,
          };
        }
        return m;
      })
    );
  };

  // Sticky notes handlers
  const handleAddStickyNote = (newNoteData: Omit<StickyNote, 'id' | 'createdAt'>) => {
    const newNote: StickyNote = {
      ...newNoteData,
      id: `sn-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    setStickyNotes((prev) => [newNote, ...prev]);
  };

  const handleUpdateStickyNote = (updated: StickyNote) => {
    setStickyNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleDeleteStickyNote = (noteId: string) => {
    setStickyNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Issue handlers
  const handleAddIssue = (newIssueData: Omit<ProjectIssue, 'id' | 'reportedDate'>) => {
    const count = issues.length + 101;
    const newIssue: ProjectIssue = {
      ...newIssueData,
      id: `ISS-${count}`,
      reportedDate: new Date().toISOString().slice(0, 10),
    };
    setIssues((prev) => [newIssue, ...prev]);
  };

  const handleUpdateIssue = (updated: ProjectIssue) => {
    setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  // Collaboration rooms handlers
  const handleSendMessage = (roomId: string, messageData: Omit<RoomMessage, 'id' | 'timestamp'>) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: RoomMessage = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: time,
    };
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, messages: [...r.messages, newMsg] } : r))
    );
  };

  const handleUpdateSharedNotes = (roomId: string, notes: string) => {
    setRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, sharedNotes: notes } : r)));
  };

  const handleCreateRoom = (name: string, topic: string) => {
    const newRoom: CollaborationRoom = {
      id: `room-${Date.now()}`,
      name,
      topic,
      activeParticipants: [
        {
          name: 'Dr. Niladri Nayak',
          role: 'Lead Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          status: 'active',
        },
        {
          name: 'Sarah Chen',
          role: 'Security & RBP Admin',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
          status: 'active',
        },
      ],
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          author: 'Dr. Niladri Nayak',
          role: 'Lead Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          content: `Room "${name}" established for OmniVerse Energy Ltd. collaboration.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
      sharedNotes: `Topics for ${name}:\n1. Initial scoping\n2. Actions & owners`,
    };
    setRooms((prev) => [...prev, newRoom]);
  };

  // Quick action from timeline: add sticky for specific milestone
  const handleOpenNewStickyForMilestone = (milestoneId: string) => {
    const target = milestones.find((m) => m.id === milestoneId);
    handleAddStickyNote({
      title: `Note for Step ${target?.number || ''}`,
      content: 'Record specific findings or requirements for this step...',
      color: 'yellow',
      milestoneId,
      pinned: true,
      author: 'Dr. Niladri Nayak',
      tags: ['Milestone Note'],
    });
    setActiveTab('stickies');
  };

  // Quick action from timeline: add issue for specific milestone
  const handleOpenIssueModalForMilestone = (milestoneId: string) => {
    const target = milestones.find((m) => m.id === milestoneId);
    handleAddIssue({
      title: `Defect in Step ${target?.number || ''}: ${target?.title.slice(0, 30)}...`,
      description: 'Describe the symptom or Check Tool warning...',
      severity: 'medium',
      status: 'open',
      milestoneId,
      phaseId: target?.phaseId || 'phase-1',
      assignee: 'Sarah Chen',
      reporter: 'Dr. Niladri Nayak',
    });
    setActiveTab('issues');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Enterprise Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        milestones={milestones}
        issues={issues}
        strictSequential={strictSequential}
        setStrictSequential={setStrictSequential}
        onQuickExportCSV={() => exportMilestonesToCSV(milestones, phases)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      {/* Admin Controls Ribbon (Visible only when Admin is logged in) */}
      <AdminControlsBar
        isAdmin={isAdmin}
        onLogout={handleAdminLogout}
        onBatchCompleteAll={handleBatchCompleteAll}
        onResetAllMilestones={handleResetAllMilestones}
        strictSequential={strictSequential}
        onToggleStrictSequential={() => setStrictSequential(!strictSequential)}
        onResolveAllIssues={handleResolveAllIssues}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Compensation Quotes Banner (Lime to Green Gradient) */}
        <CompensationQuotesTicker />

        {/* Global Mountain/River Milestone Progress Bar with Ambient Stream Audio */}
        <GlobalMountainRiverProgressBar
          milestones={milestones}
          phases={phases}
          onSelectPhase={() => setActiveTab('milestones')}
        />

        {activeTab === 'milestones' && (
          <PhaseTimeline
            phases={phases}
            milestones={milestones}
            issues={issues}
            stickyNotes={stickyNotes}
            strictSequential={strictSequential}
            onSelectMilestone={(m) => setSelectedMilestone(m)}
            onUpdateMilestoneStatus={handleUpdateMilestoneStatus}
            onOpenNewStickyForMilestone={handleOpenNewStickyForMilestone}
            onOpenIssueModalForMilestone={handleOpenIssueModalForMilestone}
          />
        )}

        {activeTab === 'stickies' && (
          <StickyNotesBoard
            stickyNotes={stickyNotes}
            milestones={milestones}
            onAddStickyNote={handleAddStickyNote}
            onUpdateStickyNote={handleUpdateStickyNote}
            onDeleteStickyNote={handleDeleteStickyNote}
          />
        )}

        {activeTab === 'rooms' && (
          <CollaborationRoomView
            rooms={rooms}
            milestones={milestones}
            onSendMessage={handleSendMessage}
            onUpdateSharedNotes={handleUpdateSharedNotes}
            onCreateRoom={handleCreateRoom}
          />
        )}

        {activeTab === 'issues' && (
          <IssueLogView
            issues={issues}
            milestones={milestones}
            phases={phases}
            onAddIssue={handleAddIssue}
            onUpdateIssue={handleUpdateIssue}
          />
        )}

        {activeTab === 'simulators' && <InteractiveSimulators />}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  OmniVerse Executive Implementation Dossier
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Comprehensive audit trail, sign-off certifications, and exportable documentation package.
                </p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Open Full Printable View & PDF
              </button>
            </div>

            {/* Quick Export Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => exportMilestonesToCSV(milestones, phases)}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 cursor-pointer transition-all space-y-2"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">CSV Spreadsheet</div>
                <h3 className="font-bold text-slate-900 text-sm">Download All Milestones CSV</h3>
                <p className="text-xs text-slate-500">
                  Export all 16 milestone steps, subtask completion rates, assignees, and key decisions.
                </p>
              </div>

              <div
                onClick={() => exportIssuesToCSV(issues)}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-rose-400 cursor-pointer transition-all space-y-2"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-rose-600">CSV Spreadsheet</div>
                <h3 className="font-bold text-slate-900 text-sm">Download Defect & Issue Log CSV</h3>
                <p className="text-xs text-slate-500">
                  Export all open and resolved configuration issues, severity ratings, and fix notes.
                </p>
              </div>

              <div
                onClick={() => exportStickyNotesToCSV(stickyNotes)}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 cursor-pointer transition-all space-y-2"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600">CSV Spreadsheet</div>
                <h3 className="font-bold text-slate-900 text-sm">Download Sticky Notes CSV</h3>
                <p className="text-xs text-slate-500">
                  Export all architecture reminders, XML tags, and pinned implementation caveats.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Milestone Detail Modal */}
      {selectedMilestone && (
        <MilestoneDetailModal
          milestone={selectedMilestone}
          phase={phases.find((p) => p.id === selectedMilestone.phaseId)}
          onClose={() => setSelectedMilestone(null)}
          onUpdateMilestone={handleUpdateMilestone}
          stickyNotes={stickyNotes}
          issues={issues}
          onAddStickyForMilestone={handleOpenNewStickyForMilestone}
          onAddIssueForMilestone={handleOpenIssueModalForMilestone}
        />
      )}

      {/* Full Dossier & Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        phases={phases}
        milestones={milestones}
        issues={issues}
        stickyNotes={stickyNotes}
      />

      {/* Admin Login Modal (Restricted Master Access) */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
