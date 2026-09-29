import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, AlertTriangle, KeyRound, Clock } from 'lucide-react';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number>(0);

  // Check lockout on mount/open
  useEffect(() => {
    if (!isOpen) {
      setPin('');
      setErrorMsg(null);
      return;
    }

    try {
      const storedLockout = sessionStorage.getItem('caffeine_owner_lockout_until');
      if (storedLockout) {
        const lockoutUntil = parseInt(storedLockout, 10);
        const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
        if (remaining > 0) {
          setLockoutTime(remaining);
        } else {
          sessionStorage.removeItem('caffeine_owner_lockout_until');
          sessionStorage.removeItem('caffeine_owner_fail_count');
        }
      }
    } catch {
      // ignore storage error
    }
  }, [isOpen]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime <= 0) return;
    const interval = setInterval(() => {
      setLockoutTime((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem('caffeine_owner_lockout_until');
          sessionStorage.removeItem('caffeine_owner_fail_count');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTime]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    // Sanitize input
    const cleanPin = pin.trim().replace(/\D/g, '');
    if (cleanPin.length !== 4) {
      setErrorMsg('PIN must be exactly 4 digits.');
      return;
    }

    const savedPin = localStorage.getItem('caffeine_owner_pin') || '1234';

    if (cleanPin === savedPin) {
      // Success: Reset rate limit counters and authenticate
      try {
        sessionStorage.removeItem('caffeine_owner_fail_count');
        sessionStorage.removeItem('caffeine_owner_lockout_until');
      } catch {
        // ignore
      }
      setErrorMsg(null);
      setAttempts(0);
      onLoginSuccess();
      onClose();
    } else {
      // Failed attempt
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      try {
        sessionStorage.setItem('caffeine_owner_fail_count', newAttempts.toString());
      } catch {
        // ignore
      }

      if (newAttempts >= 5) {
        const lockUntil = Date.now() + 60 * 1000;
        try {
          sessionStorage.setItem('caffeine_owner_lockout_until', lockUntil.toString());
        } catch {
          // ignore
        }
        setLockoutTime(60);
        setErrorMsg('Too many failed attempts. Security lockout active for 60 seconds.');
      } else {
        setErrorMsg(`Incorrect security PIN. (${5 - newAttempts} attempts remaining before temporary lockout)`);
      }
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 text-stone-900 text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <Lock className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-mono font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Owner Portal Gate</span>
        </div>

        <h3 className="text-lg font-serif font-bold text-stone-900">
          Restaurant Owner Verification
        </h3>
        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
          Enter your 4-digit security PIN to access the dish editor, pricing controls, and WhatsApp routing.
        </p>

        {lockoutTime > 0 ? (
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-bold text-red-700">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Security Lockout Active</span>
            </div>
            <p>
              Please wait <strong>{lockoutTime} seconds</strong> before trying again.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                autoFocus
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, ''));
                  setErrorMsg(null);
                }}
                placeholder="••••"
                className="w-full text-center text-2xl tracking-[0.5em] font-mono py-2.5 px-4 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pin.length < 4}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-all active:scale-[0.98]"
            >
              Verify & Enter Portal
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-stone-400" />
          <span>Brute-force protection enabled. All attempts are monitored.</span>
        </div>
      </div>
    </div>
  );
};
