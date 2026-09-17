import React from 'react';
import AvatarCanvas from './AvatarCanvas';
import { LogOut, ShieldAlert, UserCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function HeaderBar({ student, currentUser, onLogout }) {
  const isAdmin = currentUser?.role === 'admin';

  const handleLogoutClick = () => {
    soundFx.playClick();
    onLogout?.();
  };

  return (
    <header className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
      
      {/* Student Profile Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
          <AvatarCanvas equipped={student.equipped} size="sm" viewMode="half-body" animated={false} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
              {student.name}
            </h2>
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-300">
                <ShieldAlert className="w-3 h-3" />
                ADMIN TESTER
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700 border border-sky-200">
                <UserCheck className="w-3 h-3" />
                SISWA
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Currencies & Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
        
        {/* Koin Edukasi Badge */}
        <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full shadow-sm">
          <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            🪙
          </div>
          <span className="text-xs font-bold text-slate-700">
            Koin: <span className="font-black text-amber-600">{student.coins.toLocaleString()}</span>
          </span>
        </div>

        {/* Level Badge */}
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shadow-sm">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            🏆
          </div>
          <span className="text-xs font-bold text-slate-700">
            Lv: <span className="font-black text-emerald-600">{student.level}</span>
          </span>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Keluar dari akun saat ini"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        )}

      </div>

    </header>
  );
}
