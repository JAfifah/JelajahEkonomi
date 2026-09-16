import React, { useState } from 'react';
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
  ShoppingBag
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { MISSIONS_DATA } from '../data/missionData';
import { toggleTaskCompletion } from '../utils/storage';
import confetti from 'canvas-confetti';
import mapImage from '../assets/economic_realm_map_id.jpg';

export default function Dashboard({ student, updateStudentData, setActiveTab, onNavigateToCourseHub }) {
  const [selectedMissionModal, setSelectedMissionModal] = useState(null);

  const completedSet = new Set(student?.completedTasks || []);

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
          title="Klik untuk membuka Misi 1: Pulau Keinginan"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-amber-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-orange-500" />
            </div>
          </div>
        </div>

        {/* Pin 2: Pulau Sumber Daya (Top Center) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[1])}
          className="absolute top-[25%] left-[48%] cursor-pointer group/pin z-10"
          title="Klik untuk membuka Misi 2: Pulau Sumber Daya"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-emerald-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Pin 3: Pelabuhan Perdagangan (Top Right) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[2])}
          className="absolute top-[26%] right-[17%] cursor-pointer group/pin z-10"
          title="Klik untuk membuka Misi 3: Pelabuhan Perdagangan"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-sky-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-sky-500" />
            </div>
          </div>
        </div>

        {/* Pin 4: Misi Pasar (Middle Left) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[3])}
          className="absolute bottom-[28%] left-[17%] cursor-pointer group/pin z-10"
          title="Klik untuk membuka Misi 4: Misi Pasar"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-yellow-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Pin 5: Hutan Sumberdaya (Center) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[4])}
          className="absolute bottom-[30%] left-[48%] cursor-pointer group/pin z-10"
          title="Klik untuk membuka Misi 5: Hutan Sumberdaya"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-teal-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-teal-500" />
            </div>
          </div>
        </div>

        {/* Pin 6: Bank Investasi (Center Right) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[5])}
          className="absolute bottom-[38%] right-[28%] cursor-pointer group/pin z-10"
          title="Klik untuk membuka Misi 6: Bank Investasi"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-indigo-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Pin 7: Pulau Kewirausahaan (Bottom Right) */}
        <div 
          onClick={() => handleOpenMissionDetail(MISSIONS_DATA[6])}
          className="absolute bottom-[20%] right-[17%] cursor-pointer group/pin z-10"
          title="Klik untuk membuka Misi 7: Pulau Kewirausahaan"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-purple-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-purple-500" />
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 7 MISSION CARDS GRID IN EXACT REQUESTED FORMAT */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-sky-600" />
            <span>Daftar 7 Misi Pulau Kegiatan Ekonomi</span>
          </h2>
          <button 
            onClick={() => onNavigateToCourseHub && onNavigateToCourseHub('misi')}
            className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            title="Klik untuk membuka Course Hub > Misi"
          >
            <span>{completedSet.size} / {MISSIONS_DATA.reduce((acc, m) => acc + (m.tasks?.length || 0), 0)} Tugas Selesai</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MISSIONS_DATA.map((mission) => {
            const IconComp = getIconComponent(mission.icon);
            const missionTasks = mission.tasks || [];
            const doneCount = missionTasks.filter(t => completedSet.has(t.id)).length;
            const isAllDone = doneCount === missionTasks.length;

            return (
              <div 
                key={mission.id}
                className={`bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-lg space-y-4 ${mission.cardBorderHover} transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="space-y-3">
                  {/* Header Title & Tag */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center shrink-0 border border-sky-200 text-sky-600">
                        <IconComp className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase text-slate-800 block leading-tight">
                          {mission.locationName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-2 pt-1">
                    {missionTasks.map((task) => {
                      const isTaskDone = completedSet.has(task.id);
                      return (
                        <div 
                          key={task.id}
                          onClick={(e) => handleTaskClick(e, task, mission)}
                          className="flex items-start gap-2 text-xs font-bold text-slate-700 cursor-pointer group/item select-none hover:text-emerald-700 transition-colors"
                          title={isTaskDone ? "Tugas Selesai (Auto-Checked)" : "Klik untuk membaca materi & menyelesaikan tugas"}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 mt-0.5 transition-all ${
                            isTaskDone 
                              ? 'bg-emerald-500 border border-emerald-600 text-white font-black scale-105' 
                              : 'bg-emerald-50 border border-emerald-400 text-emerald-600 group-hover/item:border-emerald-600'
                          }`}>
                            ✓
                          </div>
                          <span className={`line-clamp-2 text-[11px] leading-tight ${isTaskDone ? 'line-through opacity-70 text-slate-500' : ''}`}>
                            {task.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <button
                  onClick={() => handleOpenMissionDetail(mission)}
                  className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 text-white ${
                    isAllDone
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <span>Mulai Misi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MISSION DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedMissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            
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
                      title={isDone ? "Tugas Selesai (Auto-Checked)" : "Klik untuk membaca materi & menyelesaikan tugas"}
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
              <button
                onClick={() => handleActionNavigate(selectedMissionModal.targetTab)}
                className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center gap-2 shadow-lg transition-colors"
              >
                <span>Buka Modul Pembelajaran Misi Ini</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
