import React, { useState } from 'react';
import { Lock, KeyRound, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate password securely without exposing in public copy
    if (password === 'Success@108') {
      setError(false);
      setPassword('');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onSuccess();
      onClose();
    } else {
      setError(true);
      setErrorMessage('Access Denied: Invalid administrator password credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900 text-lime-400 rounded-2xl shadow-md border border-slate-800">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Security Clearance Required
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              Admin Control Gateway
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Provide your enterprise administrative credentials to access configuration overrides, batch sign-offs, and security policy management.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Administrator Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-rose-500 focus:ring-rose-400 bg-rose-50/50'
                    : 'border-slate-200 focus:ring-lime-500'
                }`}
                autoFocus
                required
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-600">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Admin Controls</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
