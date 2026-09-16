import React from 'react';
import { 
  Sparkles, 
  Coins, 
  Trophy, 
  BookOpen, 
  Camera, 
  ShoppingBag, 
  User, 
  Map,
  Volume2, 
  VolumeX, 
  Key,
  Flame
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ 
  student, 
  activeTab, 
  setActiveTab, 
  soundMuted, 
  setSoundMuted, 
  onOpenApiKeyModal 
}) {
  const handleTabClick = (tabId) => {
    soundFx.playClick();
    setActiveTab(tabId);
  };

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    setSoundMuted(isMuted);
  };

  const navItems = [
    { id: 'dashboard', label: 'My Map', icon: Map, color: 'text-amber-400' },
    { id: 'materi', label: 'Course Hub', icon: BookOpen, color: 'text-blue-400' },
    { id: 'ai-mission', label: 'Photo Missions', icon: Camera, color: 'text-emerald-400' },
    { id: 'shop', label: 'Avatar Wardrobe', icon: ShoppingBag, color: 'text-purple-400' },
    { id: 'profile', label: 'Profil', icon: User, color: 'text-pink-400' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleTabClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-500 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-600 bg-clip-text text-transparent tracking-tight">
                Jelajah Ekonomi
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide">
                IPS SMP: Produksi • Distribusi • Konsumsi
              </p>
            </div>
          </div>

          {/* Student Status Bar (Coins, Points, Level) */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shadow-inner">
            
            {/* Level */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 border border-amber-200 rounded-xl text-amber-800 font-bold text-xs">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Lv. {student.level}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-orange-100 border border-orange-200 rounded-xl text-orange-800 font-bold text-xs" title="Daily Streak Belajar">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{student.dailyStreak} Hari</span>
            </div>

            {/* Edukasi Coins */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 border border-yellow-200 rounded-xl text-yellow-800 font-extrabold text-xs">
              <Coins className="w-4 h-4 text-yellow-600 fill-yellow-600" />
              <span>{student.coins} Koin</span>
            </div>

            {/* Learning Points */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-100 border border-indigo-200 rounded-xl text-indigo-800 font-extrabold text-xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{student.points} XP</span>
            </div>

          </div>

          {/* Right Action Icons (Audio) */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
              title={soundMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center justify-between sm:justify-start sm:gap-2 overflow-x-auto py-2 border-t border-slate-200 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
