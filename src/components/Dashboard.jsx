import React, { useState } from 'react';
import { 
  Store, 
  Trees, 
  Ship, 
  Landmark, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Dashboard({ student, setActiveTab }) {
  const [activeIsland, setActiveIsland] = useState('marketplace');

  const handleQuestStart = (targetTab, islandName) => {
    soundFx.playClick();
    setActiveIsland(islandName);
    setActiveTab(targetTab);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      


      {/* ========================================================================= */}
      {/* KEGIATAN EKONOMI INDONESIAN MAP ASSET DISPLAY */}
      {/* ========================================================================= */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sky-100 group">
        
        {/* KEGIATAN EKONOMI Map Image Background */}
        <img 
          src="/economic_realm_map_id.jpg" 
          alt="Peta Kegiatan Ekonomi IPS SMP" 
          className="w-full h-full object-contain rounded-2xl"
        />

        {/* --- INTERACTIVE CLICKABLE PIN ICONS OVERLAYED ON ISLANDS --- */}
        
        {/* Pin 1: Pulau Keinginan (Top Left) */}
        <div 
          onClick={() => handleQuestStart('materi', 'wants')}
          className="absolute top-[26%] left-[17%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Pulau Keinginan"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-orange-400/40 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-5 h-5 fill-white text-orange-500" />
            </div>
          </div>
        </div>

        {/* Pin 2: Pulau Sumber Daya (Top Center) */}
        <div 
          onClick={() => handleQuestStart('ai-mission', 'resources')}
          className="absolute top-[26%] left-[49%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Pulau Sumber Daya"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-orange-400/40 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-5 h-5 fill-white text-orange-500" />
            </div>
          </div>
        </div>

        {/* Pin 3: Pelabuhan Perdagangan (Top Right) */}
        <div 
          onClick={() => handleQuestStart('materi', 'trade')}
          className="absolute top-[28%] right-[18%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Pelabuhan Perdagangan"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-orange-400/40 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-5 h-5 fill-white text-orange-500" />
            </div>
          </div>
        </div>

        {/* Pin 4: Misi Pasar (Middle Left) */}
        <div 
          onClick={() => handleQuestStart('materi', 'marketplace')}
          className="absolute bottom-[28%] left-[18%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Misi Pasar"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-10 h-10 rounded-full bg-amber-400/50 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 border-2 border-white shadow-2xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-6 h-6 fill-white text-amber-500" />
            </div>
          </div>
        </div>

        {/* Pin 5: Hutan Sumber Daya (Center) */}
        <div 
          onClick={() => handleQuestStart('ai-mission', 'forest')}
          className="absolute bottom-[30%] left-[48%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Hutan Sumber Daya"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-emerald-400/40 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-5 h-5 fill-white text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Pin 6: Bank Investasi (Center Right) */}
        <div 
          onClick={() => handleQuestStart('materi', 'investment')}
          className="absolute bottom-[38%] right-[28%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Bank Investasi"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-orange-400/40 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-5 h-5 fill-white text-orange-500" />
            </div>
          </div>
        </div>

        {/* Pin 7: Pulau Kewirausahaan (Bottom Right) */}
        <div 
          onClick={() => handleQuestStart('shop', 'entrepreneur')}
          className="absolute bottom-[20%] right-[18%] cursor-pointer group/pin"
          title="Klik untuk menjelajahi Pulau Kewirausahaan"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-purple-400/40 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-2 border-white shadow-xl flex items-center justify-center text-white group-hover/pin:scale-125 transition-transform">
              <MapPin className="w-5 h-5 fill-white text-purple-500" />
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4 BOTTOM QUEST CARDS GRID IN INDONESIAN */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
        
        {/* CARD 1: Misi Pasar & Produksi */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-lg space-y-4 hover:border-sky-400 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-800 text-base leading-tight">
                  Misi Pasar & Produksi
                </h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                Poin Belajar
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-1">
              {['Identifikasi 3 Kebutuhan Pasar', 'Pahami Konsep Nilai Guna', 'Analisis Jenis Produksi Barang', 'Evaluasi Tujuan Kegiatan Produksi'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleQuestStart('materi', 'marketplace')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-colors"
          >
            Mulai Misi
          </button>
        </div>

        {/* CARD 2: Misi Sumber Daya */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-lg space-y-4 hover:border-sky-400 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                  <Trees className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-800 text-base leading-tight">
                  Misi Sumber Daya
                </h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                Poin Belajar
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-1">
              {['Daftar 5 Faktor Alam Lokal', 'Pahami Tenaga Kerja Terdidik', 'Pahami Faktor Modal Produksi', 'Foto Produk dengan AI Scanner'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleQuestStart('ai-mission', 'resources')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-colors"
          >
            Mulai Misi
          </button>
        </div>

        {/* CARD 3: Misi Perdagangan */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-lg space-y-4 hover:border-sky-400 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 border border-sky-200">
                  <Ship className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-800 text-base leading-tight">
                  Misi Perdagangan
                </h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                Poin Belajar
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-1">
              {['Pelajari 3 Saluran Distribusi', 'Pahami Peran Grosir & Pengecer', 'Foto Aktivitas Kurir/Warung', 'Selesaikan Kuis Distribusi'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleQuestStart('materi', 'trade')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-colors"
          >
            Mulai Misi
          </button>
        </div>

        {/* CARD 4: Misi Kewirausahaan */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-lg space-y-4 hover:border-sky-400 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-800 text-base leading-tight">
                  Misi Kewirausahaan
                </h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                Poin Belajar
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-1">
              {['Susun Skala Prioritas Kebutuhan', 'Kelola Koin di Avatar Wardrobe', 'Pahami Kebutuhan Primer/Sekunder', 'Raih Gelar Master Ekonomi'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleQuestStart('shop', 'investment')}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-colors"
          >
            Mulai Misi
          </button>
        </div>

      </div>

    </div>
  );
}
