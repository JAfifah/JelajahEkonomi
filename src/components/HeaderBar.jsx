import React from 'react';
import AvatarCanvas from './AvatarCanvas';
import { Coins, Sparkles, Key } from 'lucide-react';

export default function HeaderBar({ student, onOpenApiKeyModal }) {
  return (
    <header className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      
      {/* Student Profile Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
          <AvatarCanvas equipped={student.equipped} size="sm" viewMode="half-body" animated={false} />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
            {student.name}
          </h2>
        </div>
      </div>

      {/* Currencies & Gemini API */}
      <div className="flex items-center gap-4 flex-wrap justify-end">
        
        {/* Koin Edukasi Badge */}
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            🪙
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            Koin Edukasi: <span className="font-black text-amber-600">{student.coins.toLocaleString()}</span>
          </span>
        </div>

        {/* Poin Belajar Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            💎
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            Poin Belajar: <span className="font-black text-emerald-600">{student.points.toLocaleString()}</span>
          </span>
        </div>

        {/* Gemini API Key */}
        <button
          onClick={onOpenApiKeyModal}
          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
            student.geminiApiKey
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
          }`}
          title="Pengaturan Google Gemini API Key"
        >
          <Key className="w-4 h-4 text-amber-500" />
          <span className="hidden md:inline">
            {student.geminiApiKey ? 'Gemini AI Active' : 'API Key'}
          </span>
        </button>

      </div>

    </header>
  );
}
