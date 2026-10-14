import React, { useState } from 'react';
import {
  StickyNote,
  NoteColor,
  Milestone
} from '../types/journal';
import {
  Plus,
  Pin,
  Trash2,
  Tag,
  Filter,
  FileSpreadsheet,
  Calendar,
  Sparkles,
  Layers,
  Search,
  Check
} from 'lucide-react';
import { exportStickyNotesToCSV } from '../utils/exportUtils';

interface StickyNotesBoardProps {
  stickyNotes: StickyNote[];
  milestones: Milestone[];
  onAddStickyNote: (note: Omit<StickyNote, 'id' | 'createdAt'>) => void;
  onUpdateStickyNote: (note: StickyNote) => void;
  onDeleteStickyNote: (noteId: string) => void;
}

const COLOR_CLASSES: Record<NoteColor, { bg: string; border: string; text: string; header: string }> = {
  yellow: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-950',
    header: 'bg-amber-100/70 border-b border-amber-200 text-amber-900',
  },
  blue: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-950',
    header: 'bg-sky-100/70 border-b border-sky-200 text-sky-900',
  },
  green: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-950',
    header: 'bg-emerald-100/70 border-b border-emerald-200 text-emerald-900',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-950',
    header: 'bg-purple-100/70 border-b border-purple-200 text-purple-900',
  },
  amber: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-950',
    header: 'bg-orange-100/70 border-b border-orange-200 text-orange-900',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-950',
    header: 'bg-rose-100/70 border-b border-rose-200 text-rose-900',
  },
};

export const StickyNotesBoard: React.FC<StickyNotesBoardProps> = ({
  stickyNotes,
  milestones,
  onAddStickyNote,
  onUpdateStickyNote,
  onDeleteStickyNote,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<NoteColor>('yellow');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('');
  const [tagsInput, setTagsInput] = useState('OmniVerse Requirement');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [pinnedOnly, setPinnedOnly] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddStickyNote({
      title: title.trim(),
      content: content.trim(),
      color,
      milestoneId: selectedMilestoneId || undefined,
      pinned: false,
      author: 'Dr. Niladri Nayak',
      tags: tags.length ? tags : ['Note'],
    });

    setTitle('');
    setContent('');
    setIsCreating(false);
  };

  const filteredNotes = stickyNotes.filter((note) => {
    if (pinnedOnly && !note.pinned) return false;
    if (colorFilter !== 'all' && note.color !== colorFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchContent = note.content.toLowerCase().includes(q);
      const matchAuthor = note.author.toLowerCase().includes(q);
      const matchTags = note.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchAuthor && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner and Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Implementation Sticky Notes Wall
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pin technical reminders, client requirements, XML tags, and architecture insights directly to milestones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportStickyNotesToCSV(stickyNotes)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Notes CSV</span>
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Sticky Note</span>
          </button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sticky notes by title, tags, or content..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setPinnedOnly(!pinnedOnly)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              pinnedOnly
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span>Pinned Only</span>
          </button>

          <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
            {(['all', 'yellow', 'blue', 'green', 'purple', 'amber', 'rose'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setColorFilter(c)}
                className={`w-6 h-6 rounded-full border transition-all ${
                  c === 'all'
                    ? 'bg-slate-200 border-slate-300 text-[10px] font-bold text-slate-700 flex items-center justify-center'
                    : c === 'yellow'
                    ? 'bg-amber-300 border-amber-400'
                    : c === 'blue'
                    ? 'bg-sky-300 border-sky-400'
                    : c === 'green'
                    ? 'bg-emerald-300 border-emerald-400'
                    : c === 'purple'
                    ? 'bg-purple-300 border-purple-400'
                    : c === 'amber'
                    ? 'bg-orange-300 border-orange-400'
                    : 'bg-rose-300 border-rose-400'
                } ${colorFilter === c ? 'ring-2 ring-slate-800 ring-offset-1 scale-110' : 'opacity-80 hover:opacity-100'}`}
                title={`Filter ${c}`}
              >
                {c === 'all' && 'ALL'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New Sticky Note Modal / Form */}
      {isCreating && (
        <div className="p-5 bg-white rounded-2xl border-2 border-amber-400 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Create Implementation Sticky Note
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lump Sum Split Threshold Note"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Attach to Milestone (Optional)</label>
                <select
                  value={selectedMilestoneId}
                  onChange={(e) => setSelectedMilestoneId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Global Project Scratchpad</option>
                  {milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      Step {m.number}: {m.title.slice(0, 45)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Content / Insights</label>
              <textarea
                rows={3}
                placeholder="Write specific configuration instructions, caveats, or client sign-off rules..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="OmniVerse Requirement, XML Tweak, Critical"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sticky Color</label>
                <div className="flex items-center gap-2">
                  {(['yellow', 'blue', 'green', 'purple', 'amber', 'rose'] as NoteColor[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full border transition-all ${
                        c === 'yellow'
                          ? 'bg-amber-300 border-amber-400'
                          : c === 'blue'
                          ? 'bg-sky-300 border-sky-400'
                          : c === 'green'
                          ? 'bg-emerald-300 border-emerald-400'
                          : c === 'purple'
                          ? 'bg-purple-300 border-purple-400'
                          : c === 'amber'
                          ? 'bg-orange-300 border-orange-400'
                          : 'bg-rose-300 border-rose-400'
                      } ${color === c ? 'ring-2 ring-slate-800 ring-offset-1 scale-110' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Create Sticky Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => {
          const colors = COLOR_CLASSES[note.color] || COLOR_CLASSES.yellow;
          const linkedMilestone = milestones.find((m) => m.id === note.milestoneId);

          return (
            <div
              key={note.id}
              className={`rounded-2xl border-2 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden ${colors.bg} ${colors.border}`}
            >
              {/* Sticky Note Top Bar */}
              <div className={`px-4 py-2.5 flex items-center justify-between text-xs font-bold ${colors.header}`}>
                <div className="flex items-center gap-1.5 line-clamp-1">
                  <span>{note.title}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdateStickyNote({ ...note, pinned: !note.pinned })}
                    className={`p-1 rounded hover:bg-black/10 transition-colors ${
                      note.pinned ? 'text-amber-800 font-extrabold' : 'text-slate-400 opacity-60'
                    }`}
                    title={note.pinned ? 'Unpin Note' : 'Pin Note'}
                  >
                    <Pin className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={() => onDeleteStickyNote(note.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-black/10 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className={`text-xs sm:text-sm leading-relaxed ${colors.text} whitespace-pre-wrap`}>
                  {note.content}
                </p>

                {/* Milestone Reference Ribbon */}
                <div className="mt-4 pt-3 border-t border-black/10 space-y-2 text-[11px]">
                  {linkedMilestone ? (
                    <div className="flex items-center gap-1 font-semibold text-slate-700 bg-white/60 px-2 py-1 rounded-lg border border-black/5">
                      <Layers className="w-3 h-3 text-blue-600" />
                      <span className="line-clamp-1">Step {linkedMilestone.number}: {linkedMilestone.title}</span>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">Global Project Note</div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-white/80 border border-black/10 text-slate-700 text-[10px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{note.author}</span>
                    <span>{note.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
