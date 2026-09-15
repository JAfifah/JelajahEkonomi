import React from 'react';
import { 
  Home, 
  BookOpen, 
  Camera, 
  ShoppingBag, 
  Trophy,
  Sparkles,
  MapPin,
  Compass
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'My Map', icon: Home, color: 'text-sky-600' },
    { id: 'materi', label: 'Course Hub', icon: BookOpen, color: 'text-blue-600' },
    { id: 'ai-mission', label: 'Photo Missions', icon: Camera, color: 'text-cyan-600' },
    { id: 'shop', label: 'Avatar Wardrobe', icon: ShoppingBag, color: 'text-orange-500' },
    { id: 'profile', label: 'Profil', icon: Trophy, color: 'text-amber-500' }
  ];

  const handleTabClick = (id) => {
    soundFx.playClick();
    setActiveTab(id);
  };

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-slate-800 p-5 flex flex-col justify-between shrink-0 shadow-xl border-r border-sky-300">
      
      <div className="space-y-6">
        {/* Playful Bubbly Logo matching reference image */}
        <div 
          onClick={() => handleTabClick('dashboard')}
          className="cursor-pointer group select-none py-2 px-1 text-center md:text-left"
        >
          <h1 className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_0_rgba(2,132,199,0.8)] tracking-tight font-sans italic flex items-center gap-1.5 flex-wrap">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-100 bg-clip-text text-transparent">
              Jelajah
            </span>
            <span className="text-white">Ekonomi</span>
          </h1>
        </div>

        {/* Vertical Navigation Pill Buttons */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md ${
                  isActive
                    ? 'bg-white text-slate-800 ring-4 ring-sky-200/80 shadow-lg scale-[1.02]'
                    : 'bg-white/90 hover:bg-white text-slate-700 hover:scale-[1.01]'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-sky-100' : 'bg-slate-100'}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="font-extrabold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Tag */}
      <div className="hidden md:block pt-6 border-t border-sky-300/40 text-center">
        <p className="text-xs font-semibold text-white/90">
          Media Pembelajaran IPS SMP
        </p>
        <p className="text-[10px] text-white/70">
          Kegiatan Ekonomi
        </p>
      </div>

    </aside>
  );
}
