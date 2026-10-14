import React, { useState } from 'react';
import {
  CollaborationRoom,
  RoomMessage,
  Milestone
} from '../types/journal';
import {
  Users,
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Pin,
  Clock,
  Plus
} from 'lucide-react';

interface CollaborationRoomViewProps {
  rooms: CollaborationRoom[];
  milestones: Milestone[];
  onSendMessage: (roomId: string, message: Omit<RoomMessage, 'id' | 'timestamp'>) => void;
  onUpdateSharedNotes: (roomId: string, notes: string) => void;
  onCreateRoom: (name: string, topic: string) => void;
}

export const CollaborationRoomView: React.FC<CollaborationRoomViewProps> = ({
  rooms,
  milestones,
  onSendMessage,
  onUpdateSharedNotes,
  onCreateRoom,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || '');
  const [messageText, setMessageText] = useState('');
  const [selectedMilestoneRef, setSelectedMilestoneRef] = useState('');
  const [isDecision, setIsDecision] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomTopic, setNewRoomTopic] = useState('');

  const currentRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentRoom) return;

    onSendMessage(currentRoom.id, {
      author: 'Dr. Niladri Nayak',
      role: 'Lead Enterprise Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      content: messageText.trim(),
      milestoneRef: selectedMilestoneRef || undefined,
      isDecision: isDecision,
    });

    setMessageText('');
    setIsDecision(false);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    onCreateRoom(newRoomName.trim(), newRoomTopic.trim() || 'Collaboration room');
    setNewRoomName('');
    setNewRoomTopic('');
    setIsCreatingRoom(false);
  };

  if (!currentRoom) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              OmniVerse Collaboration & Architecture Rooms
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time consultation spaces for steering committee alignment, data model validation, and sign-offs.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingRoom(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Room</span>
        </button>
      </div>

      {/* Room Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {rooms.map((room) => {
          const isActive = room.id === currentRoom.id;
          return (
            <button
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{room.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-100 text-slate-600'
              }`}>
                {room.activeParticipants.length} online
              </span>
            </button>
          );
        })}
      </div>

      {/* New Room Modal */}
      {isCreatingRoom && (
        <div className="p-4 bg-white rounded-2xl border-2 border-indigo-400 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Create Custom Collaboration Room
          </h3>
          <form onSubmit={handleCreateRoom} className="space-y-3">
            <input
              type="text"
              placeholder="Room Name (e.g. EMEA Wave 2 Launch Alignment)"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Topic / Scope summary"
              value={newRoomTopic}
              onChange={(e) => setNewRoomTopic(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreatingRoom(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Room Layout: Two Columns (Chat / Activity vs Shared Whiteboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Room Discussion Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
          
          {/* Room Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{currentRoom.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-1">{currentRoom.topic}</p>
            </div>

            {/* Participants list */}
            <div className="flex items-center -space-x-1.5">
              {currentRoom.activeParticipants.map((p, idx) => (
                <div key={idx} className="relative group" title={`${p.name} (${p.role})`}>
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ring-1 ring-white ${
                    p.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40">
            {currentRoom.messages.map((msg) => {
              const linkedMilestone = milestones.find((m) => m.id === msg.milestoneRef);

              return (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl border text-xs shadow-sm ${
                    msg.isDecision
                      ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-500/20'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={msg.avatar}
                        alt={msg.author}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-bold text-slate-900">{msg.author}</span>
                      <span className="text-[10px] text-slate-400">({msg.role})</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      {msg.isDecision && (
                        <span className="flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Official Architecture Decision
                        </span>
                      )}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-slate-800 leading-relaxed pl-7">{msg.content}</p>

                  {linkedMilestone && (
                    <div className="mt-2 pl-7 flex items-center gap-1 text-[11px] text-blue-700 font-medium">
                      <span>Referenced:</span>
                      <span className="bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Step {linkedMilestone.number}: {linkedMilestone.title}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Post configuration recommendation, ask architect, or record review note..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 px-1">
              <div className="flex items-center gap-2">
                <span>Link to Milestone:</span>
                <select
                  value={selectedMilestoneRef}
                  onChange={(e) => setSelectedMilestoneRef(e.target.value)}
                  className="bg-slate-100 border border-slate-200 rounded px-2 py-0.5 text-[11px] text-slate-700 focus:outline-none"
                >
                  <option value="">None</option>
                  {milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      Step {m.number}: {m.title.slice(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDecision}
                  onChange={(e) => setIsDecision(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-slate-700">Flag as Key Architecture Decision</span>
              </label>
            </div>
          </form>
        </div>

        {/* Right Column (1 Col): Room Shared Notes & Whiteboard */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col h-[650px] overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Room Shared Whiteboard
            </h3>
            <span className="text-[10px] text-slate-400">Auto-saved</span>
          </div>

          <textarea
            value={currentRoom.sharedNotes}
            onChange={(e) => onUpdateSharedNotes(currentRoom.id, e.target.value)}
            className="flex-1 w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
            placeholder="Type shared room notes, agreements, or draft formula definitions here..."
          />

          <div className="mt-3 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-[11px] text-indigo-900 space-y-1">
            <span className="font-bold">Collaboration Room Guidelines:</span>
            <p>All members of the OmniVerse implementation team have read and write permissions to this shared whiteboard.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
