import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Trees, 
  Ship, 
  Landmark, 
  Sparkles, 
  MapPin, 
  Compass, 
  Award, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Coins, 
  BookOpen, 
  Camera, 
  ShoppingBag,
  Check,
  Lock,
  Trophy,
  Zap
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { MISSIONS_DATA } from '../data/missionData';
import { checkAndAwardCompletedIslands, toggleTaskCompletion } from '../utils/storage';
import confetti from 'canvas-confetti';
import mapImage from '../assets/economic_realm_map_id.jpg';

export default function Dashboard({ student, updateStudentData, setActiveTab, onNavigateToCourseHub }) {
  const [selectedMissionModal, setSelectedMissionModal] = useState(null);
  const [islandNotification, setIslandNotification] = useState(null);

  const completedSet = new Set(student?.completedTasks || []);

  // Pengecekan status penyelesaian seluruh task di suatu pulau
  const isIslandCompleted = (mission) => {
    const mTasks = mission?.tasks || [];
    return mTasks.length > 0 && mTasks.every(t => completedSet.has(t.id));
  };

  // Perhitungan progres global real-time
  const allTasksList = MISSIONS_DATA.flatMap(m => m.tasks || []);
  const totalTasksCount = allTasksList.length;
  const completedTasksCount = allTasksList.filter(t => completedSet.has(t.id)).length;
  const progressPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  const completedIslandsCount = MISSIONS_DATA.filter(m => isIslandCompleted(m)).length;

  // Auto-award bonus pulau tuntas (+50 XP & +50 Koin) dengan proteksi hanya 1 kali seumur hidup
  useEffect(() => {
    if (student && updateStudentData) {
      const { updatedStudent, newlyCompletedIslands } = checkAndAwardCompletedIslands(student, MISSIONS_DATA);
      if (newlyCompletedIslands.length > 0) {
        soundFx.playLevelUp();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
        updateStudentData(updatedStudent);
        const islandNames = newlyCompletedIslands.map(m => m.locationName || m.title).join(', ');
        setIslandNotification(`Hebat! Seluruh misi di ${islandNames} telah tuntas 100%! Bonus +50 Poin XP & +50 Koin telah ditambahkan ke profilmu!`);
      }
    }
  }, [student?.completedTasks?.length]);

  // Otomatis hilangkan notifikasi pop up setelah 10 detik jika tombol silang tidak ditekan
  useEffect(() => {
    if (!islandNotification) return;
    const timer = setTimeout(() => {
      setIslandNotification(null);
    }, 10000);
    return () => clearTimeout(timer);
  }, [islandNotification]);

  const handleTaskClick = (e, taskObj, parentMission = null) => {
    e.stopPropagation();
    soundFx.playClick();
    
    // If task is completed, do nothing
    if (completedSet.has(taskObj.id)) return;

    // Manual override block: Navigate directly to the corresponding module/activity
    const targetMateriId = parentMission?.materiId || taskObj.materiId;
    if (taskObj.type === 'materi') {
      if (onNavigateToCourseHub) {
        onNavigateToCourseHub('materi', null, targetMateriId);
      } else {
        setActiveTab('materi');
      }
    } else if (taskObj.type === 'ai-scan') {
      setActiveTab('ai-mission');
    } else if (taskObj.type === 'quiz') {
      if (onNavigateToCourseHub) {
        onNavigateToCourseHub('kuis');
      } else {
        setActiveTab('materi');
      }
    } else if (taskObj.type === 'shop') {
      setActiveTab('shop');
    } else {
      if (onNavigateToCourseHub) {
        onNavigateToCourseHub('materi', null, targetMateriId);
      }
    }
  };

  const handleOpenMissionDetail = (mission) => {
    // Jika semua task sudah selesai, jangan izinkan pengulangan dari awal
    if (isIslandCompleted(mission)) {
      soundFx.playClick();
      setIslandNotification(`Misi di ${mission.locationName} sudah selesai 100% dan tidak perlu diulang kembali.`);
      return;
    }
    soundFx.playClick();
    if (onNavigateToCourseHub) {
      onNavigateToCourseHub('misi', mission);
    } else {
      setSelectedMissionModal(mission);
    }
  };

  const handleActionNavigate = (targetTab) => {
    soundFx.playClick();
    setSelectedMissionModal(null);
    setActiveTab(targetTab);
  };

  // Map icon helper
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Trees': return Trees;
      case 'Ship': return Ship;
      case 'Store': return Store;
      case 'Landmark': return Landmark;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* ========================================================================= */}
      {/* MAP GRAPHIC DISPLAY WITH INTERACTIVE PINS */}
      {/* ========================================================================= */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sky-100 group">
        
        {/* Map Background Image */}
        <img 
          src={mapImage} 
          alt="Peta 7 Pulau Kegiatan Ekonomi IPS SMP" 
          className="w-full h-full object-contain rounded-2xl"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${import.meta.env.BASE_URL}economic_realm_map_id.jpg`;
          }}
        />

        {/* --- INTERACTIVE CLICKABLE PIN ICONS OVERLAYED ON ALL 7 ISLANDS --- */}
        
        {/* Pin 1: Pulau Keinginan (Top Left) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[0])}
          className="absolute top-[24%] left-[16%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[0]) ? "Misi Pulau Keinginan Telah Selesai ✓" : "Klik untuk membuka Misi 1: Pulau Keinginan"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[0]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-amber-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-orange-500" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pin 2: Pulau Sumber Daya (Top Center) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[1])}
          className="absolute top-[25%] left-[48%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[1]) ? "Misi Pulau Sumber Daya Telah Selesai ✓" : "Klik untuk membuka Misi 2: Pulau Sumber Daya"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[1]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-emerald-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-emerald-500" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pin 3: Pelabuhan Perdagangan (Top Right) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[2])}
          className="absolute top-[26%] right-[17%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[2]) ? "Misi Pelabuhan Perdagangan Telah Selesai ✓" : "Klik untuk membuka Misi 3: Pelabuhan Perdagangan"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[2]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-sky-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-sky-500" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pin 4: Misi Pasar (Middle Left) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[3])}
          className="absolute bottom-[28%] left-[17%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[3]) ? "Misi Pasar Telah Selesai ✓" : "Klik untuk membuka Misi 4: Misi Pasar"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[3]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-yellow-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-yellow-500" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pin 5: Hutan Sumberdaya (Center) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[4])}
          className="absolute bottom-[30%] left-[48%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[4]) ? "Misi Hutan Sumberdaya Telah Selesai ✓" : "Klik untuk membuka Misi 5: Hutan Sumberdaya"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[4]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-teal-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-teal-500" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pin 6: Bank Investasi (Center Right) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[5])}
          className="absolute bottom-[38%] right-[28%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[5]) ? "Misi Bank Investasi Telah Selesai ✓" : "Klik untuk membuka Misi 6: Bank Investasi"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[5]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-indigo-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-indigo-500" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pin 7: Pulau Kewirausahaan (Bottom Right) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[6])}
          className="absolute bottom-[20%] right-[17%] cursor-pointer group/pin z-10"
          title={isIslandCompleted(MISSIONS_DATA[6]) ? "Misi Pulau Kewirausahaan Telah Selesai ✓" : "Klik untuk membuka Misi 7: Pulau Kewirausahaan"}
        >
          <div className="relative flex items-center justify-center">
            {isIslandCompleted(MISSIONS_DATA[6]) ? (
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-110 transition-transform">
                <Check className="w-6 h-6 stroke-[3] text-white" />
              </div>
            ) : (
              <>
                <span className="absolute w-8 h-8 rounded-full bg-purple-400/50 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-purple-500" />
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Floating Pop-up Notification Toast for Completed Island */}
      {islandNotification && (
        <div 
          className="fixed top-6 left-1/2 z-[9999] w-[92%] max-w-xl animate-popup-toast drop-shadow-2xl"
          role="alert"
        >
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white rounded-3xl shadow-2xl border-2 border-emerald-300/60 overflow-hidden backdrop-blur-md">
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  🏆
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-sm sm:text-base text-white tracking-wide">
                      Pemberitahuan Misi Pulau
                    </h4>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-emerald-100">
                      10 detik
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mt-0.5">
                    {islandNotification}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIslandNotification(null)}
                className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 border border-white/25"
                title="Tutup pemberitahuan"
                aria-label="Tutup pemberitahuan"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Indikator progres durasi 10 detik */}
            <div className="h-1.5 w-full bg-black/20">
              <div className="h-full bg-white/80 animate-toast-countdown" />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INDIKATOR PROGRES GLOBAL REAL-TIME (LIGHT THEME) */}
      {/* ========================================================================= */}
      <div className="bg-white text-slate-800 p-4 sm:p-5 rounded-2xl shadow-md border-2 border-slate-200/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Progres Jelajah Pulau Ekonomi
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
                <span>Statistik Penyelesaian Tugas</span>
                {progressPercentage === 100 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black shadow-sm">
                    Master Ekonomi 👑
                  </span>
                )}
              </h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <div className="bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 text-left sm:text-right shadow-sm">
                <span className="text-[9px] text-sky-700 block font-bold uppercase">Pulau Tuntas</span>
                <span className="text-xs sm:text-sm font-black text-sky-900">
                  {completedIslandsCount} / {MISSIONS_DATA.length} Pulau
                </span>
              </div>
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-left sm:text-right shadow-sm">
                <span className="text-[9px] text-emerald-700 block font-bold uppercase">Tugas Selesai</span>
                <span className="text-xs sm:text-sm font-black text-emerald-800">
                  {completedTasksCount} / {totalTasksCount} Tugas ({progressPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Visual Animated Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 transition-all duration-700 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 px-0.5">
              <span>0% Selesai</span>
              <span className="text-slate-600 font-medium">
                {totalTasksCount - completedTasksCount > 0 
                  ? `Sisa ${totalTasksCount - completedTasksCount} tugas lagi menuju kelulusan penuh` 
                  : '🎉 Seluruh tugas dan pulau berhasil kamu tuntaskan!'}
              </span>
              <span className="text-emerald-600 font-mono font-black">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7 MISSION CARDS GRID IN EXACT REQUESTED FORMAT */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            Daftar 7 Misi Pulau Kegiatan Ekonomi
          </h2>
          <button 
            onClick={() => onNavigateToCourseHub && onNavigateToCourseHub('misi')}
            className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Klik untuk membuka Course Hub > Misi"
          >
            <span>{completedTasksCount} / {totalTasksCount} Tugas Selesai</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {MISSIONS_DATA.map((mission) => {
            const IconComp = getIconComponent(mission.icon);
            const missionTasks = mission.tasks || [];
            const doneCount = missionTasks.filter(t => completedSet.has(t.id)).length;
            const isAllDone = isIslandCompleted(mission);

            return (
              <div 
                key={mission.id}
                className={`bg-white border-2 rounded-2xl p-4 flex flex-col justify-between shadow-md space-y-3 transition-all duration-200 ${
                  isAllDone
                    ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/30 to-white shadow-emerald-100/50'
                    : `border-slate-200 ${mission.cardBorderHover} hover:shadow-lg hover:-translate-y-0.5`
                }`}
              >
                <div className="space-y-2.5">
                  {/* Header Title & Tag */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isAllDone 
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700' 
                          : 'bg-sky-100 border-sky-200 text-sky-600'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-black uppercase text-slate-800 block leading-tight truncate">
                          {mission.locationName}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge jika Selesai */}
                    {isAllDone && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black border border-emerald-300 shrink-0 shadow-xs">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Selesai
                      </span>
                    )}
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-1.5 pt-0.5">
                    {missionTasks.map((task) => {
                      const isTaskDone = completedSet.has(task.id);
                      return (
                        <div 
                          key={task.id}
                          onClick={(e) => handleTaskClick(e, task, mission)}
                          className="flex items-start gap-1.5 text-xs font-bold text-slate-700 cursor-pointer group/item select-none hover:text-emerald-700 transition-colors"
                          title={isTaskDone ? "Tugas Selesai (Tersimpan)" : "Klik untuk membaca materi & menyelesaikan tugas"}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] shrink-0 mt-0.5 transition-all ${
                            isTaskDone 
                              ? 'bg-emerald-500 border border-emerald-600 text-white font-black scale-105 shadow-xs' 
                              : 'bg-emerald-50 border border-emerald-400 text-emerald-600 group-hover/item:border-emerald-600'
                          }`}>
                            ✓
                          </div>
                          <span className={`line-clamp-2 text-[10px] leading-snug ${isTaskDone ? 'line-through opacity-60 text-slate-400 font-normal' : ''}`}>
                            {task.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Button */}
                {isAllDone ? (
                  <button
                    disabled={true}
                    className="w-full py-2 px-3 rounded-lg font-black text-xs bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center justify-center gap-1.5 shadow-none select-none transition-colors"
                    title="Seluruh tugas misi di pulau ini telah selesai (tidak dapat diulang kembali dari awal)"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Misi Selesai ✓</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenMissionDetail(mission)}
                    className="w-full py-2 px-3 rounded-lg font-extrabold text-xs bg-emerald-600 hover:bg-emerald-500 active:scale-98 shadow-sm text-white transition-all flex items-center justify-center gap-1 cursor-pointer group"
                  >
                    <span>Mulai Misi</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MISSION DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedMissionModal && (
        <div 
          onClick={() => setSelectedMissionModal(null)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedMissionModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 uppercase">
                {selectedMissionModal.locationName}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedMissionModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedMissionModal.description}
              </p>
            </div>

            {/* Tasks Progress Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Kemajuan Tugas Misi Ini</span>
                <span className="text-emerald-700">
                  {selectedMissionModal.tasks.filter(t => completedSet.has(t.id)).length} dari {selectedMissionModal.tasks.length} Selesai
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${(selectedMissionModal.tasks.filter(t => completedSet.has(t.id)).length / selectedMissionModal.tasks.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Interactive Checklist inside Modal */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Daftar Tugas Misi:
              </h4>

              <div className="space-y-2.5">
                {selectedMissionModal.tasks.map((task) => {
                  const isDone = completedSet.has(task.id);
                  return (
                    <div 
                      key={task.id}
                      onClick={(e) => handleTaskClick(e, task, selectedMissionModal)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isDone 
                          ? 'bg-emerald-50/60 border-emerald-300' 
                          : 'bg-white border-slate-200 hover:border-sky-300'
                      }`}
                      title={isDone ? "Tugas Selesai (Tersimpan)" : "Klik untuk membaca materi & menyelesaikan tugas"}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isDone 
                            ? 'bg-emerald-500 text-white border border-emerald-600' 
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        }`}>
                          ✓
                        </div>
                        <div>
                          <h5 className={`font-extrabold text-sm text-slate-900 ${isDone ? 'line-through text-slate-500' : ''}`}>
                            {task.text}
                          </h5>
                          <p className="text-xs text-slate-600 mt-0.5">{task.detail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-extrabold text-xs text-amber-600 shrink-0 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                        <Coins className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>+{task.rewardCoins}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Modal Action */}
            <div className="pt-2 flex justify-end">
              {selectedMissionModal.tasks.every(t => completedSet.has(t.id)) ? (
                <button
                  disabled={true}
                  className="py-3 px-6 rounded-2xl bg-slate-100 text-slate-400 border border-slate-200 font-black text-sm flex items-center gap-2 cursor-not-allowed select-none"
                  title="Seluruh tugas misi di pulau ini telah selesai"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Misi Selesai ✓</span>
                </button>
              ) : (
                <button
                  onClick={() => handleActionNavigate(selectedMissionModal.targetTab)}
                  className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <span>Buka Modul Pembelajaran Misi Ini</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
