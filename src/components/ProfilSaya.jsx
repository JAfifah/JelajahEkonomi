import React from 'react';
import AvatarCanvas from './AvatarCanvas';
import { AVATAR_SHOP_ITEMS } from '../data/shopData';
import { soundFx } from '../utils/audio';
import { resetStudentData } from '../utils/storage';
import { 
  Award, 
  BookOpen, 
  Camera, 
  Coins, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Package,
  LogOut,
  ShieldAlert,
  Zap
} from 'lucide-react';

export default function ProfilSaya({ student, updateStudentData, currentUser, onLogout }) {
  const isAdmin = currentUser?.role === 'admin';

  const handleResetData = () => {
    soundFx.playClick();
    if (window.confirm('Apakah kamu yakin ingin mereset seluruh data game ke posisi awal? (Tindakan ini tidak dapat dibatalkan)')) {
      const initial = resetStudentData(currentUser);
      updateStudentData(initial);
    }
  };

  const handleAdminAddCoins = () => {
    soundFx.playCoin();
    updateStudentData({
      ...student,
      coins: (student.coins || 0) + 1000,
      points: (student.points || 0) + 500
    });
  };

  const handleAdminUnlockBadges = () => {
    soundFx.playLevelUp();
    const allUnlocked = (student.badges || []).map(b => ({ ...b, unlocked: true }));
    updateStudentData({
      ...student,
      badges: allUnlocked
    });
  };

  const handleLogoutClick = () => {
    soundFx.playClick();
    if (window.confirm('Apakah kamu yakin ingin keluar dari akun?')) {
      onLogout?.();
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
            <AvatarCanvas equipped={student.equipped} size="md" animated={true} />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Level {student.level}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">{student.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="text-xs text-slate-600 font-medium">
                Username: <strong className="text-slate-800 font-mono">@{currentUser?.username || student.username || 'user'}</strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${isAdmin ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'}`}>
                {isAdmin ? 'ADMIN PENGUJI' : 'AKUN SISWA'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Reset Button */}
          <button
            onClick={handleResetData}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Reset data game akun ini"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Akun</span>
            </button>
          )}
        </div>

      </div>

      {/* Admin Quick Tools (Only Visible to Admin) */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200 p-5 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-black text-slate-900">
                Menu Khusus Administrator (Testing Peran)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              Khusus Akun Admin
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Gunakan tombol pintas di bawah untuk memudahkan pengujian semua fitur game:
          </p>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={handleAdminAddCoins}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              +1,000 Koin Edukasi
            </button>
            <button
              onClick={handleAdminUnlockBadges}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              Buka Semua Lencana
            </button>
          </div>
        </div>
      )}

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
