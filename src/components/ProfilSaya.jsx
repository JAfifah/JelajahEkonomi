import React from 'react';
import AvatarCanvas from './AvatarCanvas';
import { AVATAR_SHOP_ITEMS } from '../data/shopData';
import { soundFx } from '../utils/audio';
import { resetStudentData } from '../utils/storage';
import { 
  User, 
  Trophy, 
  Award, 
  BookOpen, 
  Camera, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  ShieldCheck,
  Package
} from 'lucide-react';

export default function ProfilSaya({ student, updateStudentData }) {
  const handleResetData = () => {
    soundFx.playClick();
    if (window.confirm('Apakah kamu yakin ingin mereset seluruh data game ke posisi awal? (Tindakan ini tidak dapat dibatalkan)')) {
      const initial = resetStudentData();
      updateStudentData(initial);
    }
  };

  const ownedItems = AVATAR_SHOP_ITEMS.filter(item => student.inventory.includes(item.id));

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Top Banner & Profile Overview */}
      <div className="bg-gradient-to-r from-white via-indigo-50/60 to-purple-50/60 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar Preview */}
          <div className="shrink-0 flex items-center justify-center">
            <AvatarCanvas equipped={student.equipped} size="md" animated={false} />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{student.schoolClass} • Level {student.level}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">{student.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Gelar Pembelajar: <span className="text-amber-600 font-bold">Master Kegiatan Ekonomi IPS</span>
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleResetData}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Data Game</span>
        </button>

      </div>

      {/* Grid: Stats Summary & Badges Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Quick Stats Cards */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Statistik Capaian Belajar
          </h3>

          <div className="space-y-3">
            
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Kuis Selesai</p>
                <p className="text-xl font-black text-slate-900">{student.stats.quizzesCompleted} Kuis IPS</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Misi Foto AI Terverifikasi</p>
                <p className="text-xl font-black text-slate-900">{student.stats.aiScansVerified} Foto Objek</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Coins className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Koin Edukasi Saat Ini</p>
                <p className="text-xl font-black text-amber-600">{student.coins} Koin</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Koleksi Item Avatar Dimiliki</p>
                <p className="text-xl font-black text-purple-700">{ownedItems.length} Item Pakaian</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Badges & Unlocked Inventory */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Badges Gallery */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black text-slate-900">Galeri Lencana Prestasi (Badges)</h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {student.badges.filter(b => b.unlocked).length} dari {student.badges.length} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {student.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border space-y-2 transition-all ${
                    badge.unlocked
                      ? 'bg-gradient-to-b from-amber-50/50 to-indigo-50/30 border-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{badge.icon}</span>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Terkunci</span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{badge.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Owned Inventory Catalogue */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-black text-slate-900">Lemari Koleksi Pakaian & Aksesoris</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ownedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">{item.category}</span>
                    <h5 className="font-extrabold text-slate-900 text-sm">{item.name}</h5>
                    <p className="text-xs text-slate-500">{item.priorityCategory}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    Dimiliki
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
