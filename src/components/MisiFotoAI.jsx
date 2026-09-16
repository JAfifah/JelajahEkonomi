import React, { useState, useRef } from 'react';
import { analyzeEconomicImage } from '../utils/geminiService';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Coins, 
  RotateCcw,
  Key,
  Scan,
  Zap,
  Info,
  Award
} from 'lucide-react';

export default function MisiFotoAI({ student, updateStudentData, onOpenApiKeyModal }) {
  const [selectedMission, setSelectedMission] = useState('produksi');
  const [imagePreview, setImagePreview] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Camera stream state
  const [useCameraMode, setUseCameraMode] = useState(false);
  const videoRef = useRef(null);

  const missions = [
    {
      id: 'sumber-daya-alam',
      title: 'Misi 1: Foto Objek Sumber Daya Alam',
      desc: 'Pindai objek kekayaan alam lokal di sekitarmu (tanah, tanaman pangan, air, atau batuan alam).',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'distribusi',
      title: 'Misi 2: Foto Logistik / Warung Sekitar',
      desc: 'Pindai sarana atau aktivitas penyaluran barang (kurir paket, truk angkut, warung klontong, minimarket).',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      id: 'kayu-mebel',
      title: 'Misi 3: Scan Produk Olahan Kayu',
      desc: 'Pindai barang olahan kayu hasil hutan (meja belajar, kursi, pensil kayu, bingkai, atau furnitur).',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'konsumsi',
      title: 'Misi 4: Aktivitas / Benda Konsumsi',
      desc: 'Foto barang yang sedang kamu pakai atau konsumsi (makanan, minuman, buku IPS, sepatu sekolah).',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'bebas',
      title: 'Scan Bebas Detektif Ekonomi',
      desc: 'Pindai objek apa saja di sekitarmu untuk dikategorikan oleh Google Gemini AI Engine!',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  ];

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    soundFx.playClick();
    setMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Start Camera
  const handleStartCamera = async () => {
    soundFx.playClick();
    setUseCameraMode(true);
    setImagePreview(null);
    setAnalysisResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      alert('Tidak dapat mengakses kamera perangkat. Silakan gunakan opsi Unggah Foto.');
      setUseCameraMode(false);
    }
  };

  // Capture Photo from Camera Stream
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    soundFx.playClick();

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    setImagePreview(dataUrl);
    setMimeType('image/jpeg');

    // Stop camera stream track
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setUseCameraMode(false);
  };

  // Execute Gemini AI Scan
  const handleScanImage = async () => {
    if (!imagePreview) return;
    soundFx.playClick();
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeEconomicImage({
        imageBase64: imagePreview,
        mimeType,
        missionType: selectedMission,
        apiKey: student.geminiApiKey
      });

      setAnalyzing(false);
      setAnalysisResult(result);

      if (result.isValid) {
        soundFx.playScanSuccess();
        
        // Award Student
        const newXp = student.xp + result.pointsEarned;
        let newLevel = student.level;
        let newXpToNext = student.xpToNextLevel;

        if (newXp >= newXpToNext) {
          newLevel += 1;
          newXpToNext += 100;
          soundFx.playLevelUp();
        }

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });

        updateStudentData({
          ...student,
          level: newLevel,
          xp: newXp,
          xpToNextLevel: newXpToNext,
          coins: student.coins + result.coinsEarned,
          points: student.points + result.pointsEarned,
          stats: {
            ...student.stats,
            aiScansVerified: student.stats.aiScansVerified + 1
          }
        });
      } else {
        soundFx.playWrong();
      }
    } catch (err) {
      console.error('Scan error:', err);
      setAnalyzing(false);
      alert('Terjadi kendala saat analisis AI. Silakan coba lagi.');
    }
  };

  const resetScan = () => {
    soundFx.playClick();
    setImagePreview(null);
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Image Scanner • Google Gemini Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Misi Foto AI Kegiatan Ekonomi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Cari benda atau aktivitas nyata di sekitarmu, ambil fotonya, dan biarkan Google Gemini AI mengevaluasi konsep IPS-nya!
          </p>
        </div>

        {/* Gemini Key Status Button */}
        <button
          onClick={onOpenApiKeyModal}
          className={`px-4 py-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 shadow-sm transition-all ${
            student.geminiApiKey
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
              : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
          }`}
        >
          <Key className="w-4 h-4 text-amber-500" />
          <div className="text-left">
            <p className="text-[10px] opacity-80 uppercase font-semibold">Status Integrasi AI</p>
            <p className="font-extrabold">
              {student.geminiApiKey ? 'Gemini 1.5/2.0 API Active' : 'Menggunakan Smart AI Vision Engine'}
            </p>
          </div>
        </button>
      </div>

      {/* Main Grid: Mission Selector & Scanner Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Mission Selection */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Langkah 1: Pilih Misi Pemindaian
          </h3>

          <div className="space-y-3">
            {missions.map((m) => {
              const isSelected = selectedMission === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => { soundFx.playClick(); setSelectedMission(m.id); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md scale-[1.02]'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{m.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                      Target
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Camera / Image Upload & Analysis Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Langkah 2: Ambil Foto / Unggah Gambar Objek
          </h3>

          {/* Upload / Camera Box Area */}
          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500/60 rounded-3xl p-6 text-center bg-slate-50 transition-colors overflow-hidden min-h-[260px] flex flex-col items-center justify-center">
            
            {/* Real Camera Stream View */}
            {useCameraMode && (
              <div className="space-y-4 w-full flex flex-col items-center">
                <video ref={videoRef} autoPlay playsInline className="w-full max-h-64 rounded-2xl object-cover border border-slate-300" />
                <button
                  onClick={handleCapturePhoto}
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                  <span>Ambil Foto Sekarang</span>
                </button>
              </div>
            )}

            {/* Static Image Preview */}
            {!useCameraMode && imagePreview && (
              <div className="relative w-full flex flex-col items-center space-y-4">
                <img 
                  src={imagePreview} 
                  alt="Preview Scan" 
                  className="max-h-72 rounded-2xl object-contain border border-slate-200 shadow-md" 
                />

                {/* Animated Scanner Beam overlay during analysis */}
                {analyzing && (
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
                    <Scan className="w-12 h-12 text-emerald-600 animate-spin mt-4" />
                    <p className="text-xs font-bold text-emerald-800 mt-2">Sedang Menganalisis dengan Gemini AI...</p>
                  </div>
                )}
              </div>
            )}

            {/* Initial Empty Upload State */}
            {!useCameraMode && !imagePreview && (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">Unggah Foto atau Buka Kamera</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Pilih file gambar (JPG, PNG) dari galeri perangkatmu atau ambil foto baru.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <label className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer flex items-center gap-2 shadow-md transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Pilih Gambar Galeri</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>

                  <button
                    onClick={handleStartCamera}
                    className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Gunakan Kamera</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Action & Rescan Controls */}
          {imagePreview && !analyzing && !analysisResult && (
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={resetScan}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ganti Foto</span>
              </button>

              <button
                onClick={handleScanImage}
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-md"
              >
                <Zap className="w-4 h-4" />
                <span>Analisis Objek dengan Gemini AI</span>
              </button>
            </div>
          )}

          {/* AI ANALYSIS RESULTS REPORT CARD */}
          {analysisResult && (
            <div className="bg-slate-50 border border-emerald-200 p-6 rounded-3xl space-y-4 animate-fade-in shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Laporan Evaluasi Gemini AI</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white text-slate-600 border border-slate-200">
                  {analysisResult.isRealAi ? 'Real Gemini API' : 'Smart Vision Engine'}
                </span>
              </div>

              <div className="space-y-2 border-t border-b border-slate-200 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Objek Terdeteksi:</span>
                  <span className="text-sm font-extrabold text-slate-900">{analysisResult.objectName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Detail Kegiatan Ekonomi:</span>
                  <span className="text-xs font-bold text-amber-600">{analysisResult.economicTypeDetail}</span>
                </div>
              </div>

              {/* Teacher Explanation Feedback */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <p className="text-xs font-bold text-indigo-700">💬 Ulasan Guru IPS AI:</p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{analysisResult.explanation}"
                </p>
              </div>

              {/* Reward Badge */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-800 font-bold">Misi Berhasil Diverifikasi!</p>
                    <p className="text-[11px] text-slate-600">Imbalan ditambahkan ke dompetmu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-black text-sm">
                  <span className="text-amber-600 flex items-center gap-1">
                    <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                    +{analysisResult.coinsEarned}
                  </span>
                  <span className="text-indigo-600 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    +{analysisResult.pointsEarned} XP
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={resetScan}
                  className="py-2.5 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Pindai Foto Lainnya</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
