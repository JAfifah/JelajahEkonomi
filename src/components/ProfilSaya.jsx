import React, { useState } from 'react';
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
  Zap,
  X
} from 'lucide-react';

export default function ProfilSaya({ student, updateStudentData, currentUser, onLogout }) {
  const isAdmin = currentUser?.role === 'admin';
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetData = () => {
    soundFx.playClick();
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    soundFx.playClick();
    setShowResetConfirm(false);
    const initial = resetStudentData(currentUser);
    updateStudentData(initial);
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
    onLogout?.();
  };

  const ownedItems = AVATAR_SHOP_ITEMS.filter(item => student.inventory.includes(item.id));

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      
      {/* Top Banner & Profile Overview */}
      <div className="bg-gradient-to-r from-white via-indigo-50/60 to-purple-50/60 border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Avatar Preview Portrait Frame */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-indigo-100/80 via-white to-purple-50 border-2 border-indigo-200/80 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
            <AvatarCanvas equipped={student.equipped} size="md" viewMode="half-body" animated={true} />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
              <ShieldCheck className="w-3 h-3 text-indigo-600" />
              <span>Level {student.level}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{student.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="text-xs text-slate-600 font-medium">
                Username: <strong className="text-slate-800 font-mono">@{currentUser?.username || student.username || 'user'}</strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${isAdmin ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'}`}>
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
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Reset data game akun ini"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={handleLogoutClick}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Akun</span>
            </button>
          )}
        </div>

      </div>

      {/* Admin Quick Tools (Only Visible to Admin) */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200 p-3.5 sm:p-4 rounded-2xl shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-black text-slate-900">
                Menu Khusus Administrator (Testing Peran)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              Khusus Akun Admin
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            Gunakan tombol pintas di bawah untuk memudahkan pengujian semua fitur game:
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <button
              onClick={handleAdminAddCoins}
              className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <Zap className="w-3 h-3" />
              +1,000 Koin Edukasi
            </button>
            <button
              onClick={handleAdminUnlockBadges}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <Award className="w-3 h-3" />
              Buka Semua Lencana
            </button>
          </div>
        </div>
      )}

      {/* Grid: Stats Summary & Badges Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Quick Stats Cards */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Kuis Selesai</p>
                <p className="text-base font-black text-slate-900">{student.stats.quizzesCompleted} Kuis IPS</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Misi Foto AI Terverifikasi</p>
                <p className="text-base font-black text-slate-900">{student.stats.aiScansVerified} Foto Objek</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
                <Coins className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Total Koin Edukasi</p>
                <p className="text-base font-black text-amber-600">{student.coins} Koin</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Koleksi Item Avatar</p>
                <p className="text-base font-black text-purple-700">{ownedItems.length} Item Pakaian</p>
              </div>
            </div>

        </div>

        {/* Right Column: Badges & Unlocked Inventory */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Badges Gallery */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-black text-slate-900">Galeri Lencana Prestasi (Badges)</h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {student.badges.filter(b => b.unlocked).length} dari {student.badges.length} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
              {student.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border space-y-1.5 transition-all ${
                    badge.unlocked
                      ? 'bg-gradient-to-b from-amber-50/50 to-indigo-50/30 border-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{badge.icon}</span>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Terkunci</span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug">{badge.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Owned Inventory Catalogue */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-600" />
                <h3 className="text-base font-black text-slate-900">Lemari Koleksi Pakaian & Aksesoris</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {ownedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">{item.category}</span>
                    <h5 className="font-bold text-slate-900 text-xs leading-snug">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">{item.priorityCategory}</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                    Dimiliki
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Pop-up Dialog: Konfirmasi Reset Data Game */}
      {showResetConfirm && (
        <div 
          onClick={() => setShowResetConfirm(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl max-w-xs sm:max-w-sm w-full p-5 sm:p-6 relative animate-scale-up space-y-4 text-center"
          >
            <button
              onClick={() => setShowResetConfirm(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Batal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner border border-amber-200">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Reset Data Game?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apakah kamu yakin ingin mereset seluruh data game ke posisi awal? <br />
                <span className="text-rose-600 font-bold">(Tindakan ini tidak dapat dibatalkan)</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
