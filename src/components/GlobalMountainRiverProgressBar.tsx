import React, { useState, useEffect } from 'react';
import { Milestone, Phase } from '../types/journal';
import {
  Mountain,
  Waves,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Flag,
  Compass,
  ArrowRight
} from 'lucide-react';
import { natureAudio } from '../utils/natureAudio';

interface GlobalMountainRiverProgressBarProps {
  milestones: Milestone[];
  phases: Phase[];
  onSelectPhase?: (phaseId: string) => void;
}

export const GlobalMountainRiverProgressBar: React.FC<GlobalMountainRiverProgressBarProps> = ({
  milestones,
  phases,
  onSelectPhase,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const inProgressCount = milestones.filter((m) => m.status === 'in_progress').length;
  const totalCount = milestones.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Toggle ambient mountain river stream sound
  const toggleSound = () => {
    const playing = natureAudio.toggle();
    setIsPlayingAudio(playing);
    if (playing) {
      natureAudio.setVolume(volume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    natureAudio.setVolume(val);
  };

  const playDropSound = () => {
    natureAudio.playWaterChime();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      natureAudio.stop();
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-5 overflow-hidden relative">
      
      {/* Background Topographic / River Contour Ambient Lines */}
      <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none">
        <Mountain className="w-80 h-80 text-emerald-950" />
      </div>

      {/* Header Info with Sound Control & Altitude Metaphor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl shadow-md shadow-lime-500/20 text-slate-950 font-bold border border-lime-300">
            <Mountain className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                Implementation Expedition
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-lime-600" />
                Summit to Reservoir: Milestone Journey
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              Global Configuration Progress
              <span className="text-sm font-bold text-lime-600 bg-lime-50 px-2.5 py-0.5 rounded-full border border-lime-200">
                {percentage}% Reached
              </span>
            </h3>
          </div>
        </div>

        {/* Mountain & River Theme Sound Controls */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-2xl shadow-inner self-start sm:self-auto">
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-lime-500 to-emerald-600 text-slate-950 shadow-md shadow-lime-500/20 ring-2 ring-lime-400'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
            title="Toggle calming Mountain Breeze & Flowing River soundscape"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>River Stream: ON</span>
                <span className="flex space-x-0.5 ml-1">
                  <span className="w-1 h-3 bg-slate-950 rounded-full animate-bounce"></span>
                  <span className="w-1 h-4 bg-slate-950 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-2 bg-slate-950 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Mountain Sound: Muted</span>
              </>
            )}
          </button>

          {isPlayingAudio && (
            <div className="flex items-center gap-2 px-2 hidden sm:flex">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 accent-emerald-600 cursor-pointer"
                title="Soundscape Volume"
              />
            </div>
          )}

          <button
            onClick={playDropSound}
            className="p-1.5 hover:bg-slate-200/80 rounded-lg text-slate-500 hover:text-emerald-700 transition-colors"
            title="Play mountain water droplet chime"
          >
            <Waves className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual River Stream Progress Track */}
      <div className="relative pt-2 pb-1">
        {/* River Bed Container */}
        <div className="h-6 w-full bg-slate-100 rounded-full p-1 border border-slate-200 shadow-inner overflow-hidden relative">
          
          {/* Flowing Water Gradient Bar */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-500 transition-all duration-700 relative overflow-hidden shadow-sm"
            style={{ width: `${Math.max(percentage, 5)}%` }}
          >
            {/* Ambient Water Glistening Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Waypoint Markers on the River Path */}
        <div className="grid grid-cols-5 gap-1 pt-3 text-[11px]">
          {phases.map((phase, idx) => {
            const pMilestones = milestones.filter((m) => m.phaseId === phase.id);
            const pCompleted = pMilestones.filter((m) => m.status === 'completed').length;
            const isPhaseDone = pCompleted === pMilestones.length && pMilestones.length > 0;
            const isPhaseCurrent = pCompleted > 0 && !isPhaseDone;

            return (
              <div
                key={phase.id}
                onClick={() => onSelectPhase && onSelectPhase(phase.id)}
                className={`flex flex-col items-center text-center cursor-pointer group p-1.5 rounded-xl transition-all ${
                  isPhaseDone
                    ? 'text-emerald-800'
                    : isPhaseCurrent
                    ? 'text-blue-800 font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  {isPhaseDone ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                      isPhaseCurrent
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300'
                        : 'bg-slate-100 text-slate-500 border-slate-300'
                    }`}>
                      {phase.number}
                    </div>
                  )}
                  <span className="font-bold text-[10px] uppercase tracking-tighter">
                    Phase {phase.number}
                  </span>
                </div>

                <span className="font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-1 text-xs">
                  {phase.badge}
                </span>

                <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                  {pCompleted}/{pMilestones.length} Done
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* River Basin Statistics Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-slate-400">Total Milestones:</span>{' '}
            <span className="font-bold text-slate-900">{totalCount}</span>
          </div>
          <div>
            <span className="text-slate-400">Signed Off:</span>{' '}
            <span className="font-bold text-emerald-600">{completedCount}</span>
          </div>
          <div>
            <span className="text-slate-400">In Stream:</span>{' '}
            <span className="font-bold text-blue-600">{inProgressCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-medium text-slate-700">
          <Flag className="w-3.5 h-3.5 text-lime-600" />
          <span>Destination: 100% Employee Central Publish & Reward Letters</span>
        </div>
      </div>

    </div>
  );
};
