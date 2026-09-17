import React, { useState, useRef } from 'react';
import { analyzeEconomicImage } from '../utils/geminiService';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { MISSIONS_DATA } from '../data/missionData';
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
  Award,
  X,
  ChevronRight,
  Compass,
  Trees,
  Ship,
  Store,
  Landmark,
  Check,
  FileSearch,
  ShieldCheck
} from 'lucide-react';

export default function MisiFotoAI({ student, updateStudentData, onOpenApiKeyModal }) {
  const [activeModalMission, setActiveModalMission] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Camera stream state
  const [useCameraMode, setUseCameraMode] = useState(false);
  const videoRef = useRef(null);

  const photoMissions = [
    {
      id: 'kebutuhan-kelangkaan',
      islandKey: 'wants',
      locationName: 'PULAU KEINGINAN',
      title: 'Misi Pengenalan Kebutuhan & Kelangkaan',
      icon: Compass,
      accentColor: 'orange',
      badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
      cardBorderHover: 'hover:border-orange-400',
      desc: 'Cari dan foto situasi atau benda di sekitarmu yang merupakan kebutuhan paling dasar manusia (seperti air minum, makanan pokok, atau pakaian) untuk melihat apa saja barang yang penting bagi kehidupan sehari-hari.',
      targetHint: 'Air minum, makanan pokok, pakaian, atau barang primer lainnya.',
      taskId: 'wants-t4'
    },
    {
      id: 'sumber-daya-alam',
      islandKey: 'resources',
      locationName: 'PULAU SUMBER DAYA',
      title: 'Misi Eksplorasi Faktor Alam',
      icon: Trees,
      accentColor: 'emerald',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      cardBorderHover: 'hover:border-emerald-400',
      desc: 'Jelajahi lingkungan sekitar dan foto kekayaan alam yang ada di sekitarmu.',
      targetHint: 'Tanaman pangan, tanah yang subur, sumber air, atau bebatuan alami.',
      taskId: 'res-t4'
    },
    {
      id: 'distribusi',
      islandKey: 'trade',
      locationName: 'PELABUHAN PERDAGANGAN',
      title: 'Misi Perdagangan & Distribusi',
      icon: Ship,
      accentColor: 'sky',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
      cardBorderHover: 'hover:border-sky-400',
      desc: 'Cari dan foto hal-hal yang berkaitan dengan penyaluran atau pengiriman barang dari satu tempat ke tempat lain.',
      targetHint: 'Kurir paket yang sedang mengantar barang, truk ekspedisi, warung kelontong, atau minimarket.',
      taskId: 'trade-t3'
    },
    {
      id: 'kayu-mebel',
      islandKey: 'forest',
      locationName: 'HUTAN SUMBERDAYA',
      title: 'Misi Konservasi & Bahan Baku',
      icon: Trees,
      accentColor: 'teal',
      badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
      cardBorderHover: 'hover:border-teal-400',
      desc: 'Cari barang-barang di sekitarmu yang terbuat dari kayu hasil hutan untuk melihat bagaimana bahan baku dimanfaatkan.',
      targetHint: 'Meja belajar kayu, kursi kayu, pensil kayu, atau bingkai foto dari kayu.',
      taskId: 'fst-t4'
    },
    {
      id: 'konsumsi',
      islandKey: 'marketplace',
      locationName: 'MISI PASAR',
      title: 'Misi Pola Konsumen & Pasar',
      icon: Store,
      accentColor: 'amber',
      badgeBg: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cardBorderHover: 'hover:border-amber-400',
      desc: 'Foto benda atau makanan yang sedang kamu pakai atau konsumsi saat ini untuk melihat kebiasaan kita sebagai konsumen.',
      targetHint: 'Buku pelajaran IPS, makanan, minuman, atau sepatu sekolah yang kamu pakai.',
      taskId: 'mkt-t4'
    },
    {
      id: 'modal-keuangan',
      islandKey: 'investment',
      locationName: 'BANK INVESTASI',
      title: 'Misi Pengelolaan Modal & Keuangan',
      icon: Landmark,
      accentColor: 'indigo',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      cardBorderHover: 'hover:border-indigo-400',
      desc: 'Cari benda-benda yang biasanya dipakai untuk membantu bekerja atau belajar agar lebih produktif.',
      targetHint: 'Peralatan kerja, mesin, laptop/komputer, atau alat produktivitas lainnya.',
      taskId: 'inv-t4'
    },
    {
      id: 'bebas',
      islandKey: 'entrepreneur',
      locationName: 'PULAU KEWIRAUSAHAAN',
      title: 'Misi Keahlian & Jenis Produksi',
      icon: Award,
      accentColor: 'purple',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      cardBorderHover: 'hover:border-purple-400',
      desc: 'Ambil foto satu saja benda di sekitarmu yang merupakan hasil buatan pabrik atau jasa (barang jadi).',
      targetHint: 'Pakaian, makanan kemasan, atau barang elektronik.',
      taskId: 'ent-t4'
    }
  ];

  const completedTasks = student?.completedTasks || [];

  // Open Pop-Up Modal for a specific mission card
  const handleOpenMission = (mission) => {
    soundFx.playClick();
    setActiveModalMission(mission);
    setImagePreview(null);
    setAnalysisResult(null);
    setUseCameraMode(false);
  };

  // Close Modal
  const handleCloseModal = () => {
    soundFx.playClick();
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setUseCameraMode(false);
    setActiveModalMission(null);
    setImagePreview(null);
    setAnalysisResult(null);
  };

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

  // Execute AI Scan
  const handleScanImage = async () => {
    if (!imagePreview || !activeModalMission) return;
    soundFx.playClick();
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeEconomicImage({
        imageBase64: imagePreview,
        mimeType,
        missionType: activeModalMission.id,
        apiKey: student.geminiApiKey
      });

      setAnalyzing(false);
      setAnalysisResult(result);

      if (result.isValid) {
        soundFx.playScanSuccess();
        
        // Auto-complete corresponding ai-scan task in MISSIONS_DATA if present
        let updatedCompletedTasks = [...(student.completedTasks || [])];
        const currentIslandMission = MISSIONS_DATA.find(m => m.aiMissionId === activeModalMission.id);
        if (currentIslandMission) {
          const aiScanTask = currentIslandMission.tasks.find(t => t.type === 'ai-scan');
          if (aiScanTask && !updatedCompletedTasks.includes(aiScanTask.id)) {
            updatedCompletedTasks.push(aiScanTask.id);
          }
        }
        if (activeModalMission.taskId && !updatedCompletedTasks.includes(activeModalMission.taskId)) {
          updatedCompletedTasks.push(activeModalMission.taskId);
        }

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
          completedTasks: updatedCompletedTasks,
          stats: {
            ...student.stats,
            aiScansVerified: (student.stats?.aiScansVerified || 0) + 1
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

  // Calculate overall verified missions count
  const verifiedCount = photoMissions.filter(m => {
    const matchedIsland = MISSIONS_DATA.find(is => is.aiMissionId === m.id);
    const aiTask = matchedIsland?.tasks?.find(t => t.type === 'ai-scan');
    return aiTask ? completedTasks.includes(aiTask.id) : completedTasks.includes(m.taskId);
  }).length;

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Image Scanner • Smart Vision Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Misi Foto AI Kegiatan Ekonomi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Pilih salah satu dari 7 Misi Foto di bawah ini, ambil/unggah foto objek nyata, dan biarkan AI Scanner mengevaluasi kaitan konsep IPS-nya!
          </p>
        </div>

        {/* Scanner Key Status & Progress */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-[10px] opacity-80 uppercase font-semibold">Progres Pemindaian</p>
              <p className="font-extrabold text-sm">{verifiedCount} / 7 Misi Selesai</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7 MISSION CARDS GRID IN EXACT REQUESTED PULAU FORMAT */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-black text-slate-900">
            Daftar 7 Misi Foto Pulau Kegiatan Ekonomi
          </h3>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Klik Misi untuk Buka Pop-Up Scanner
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {photoMissions.map((mission) => {
            const IconComp = mission.icon;
            const matchedIsland = MISSIONS_DATA.find(is => is.aiMissionId === mission.id);
            const aiTask = matchedIsland?.tasks?.find(t => t.type === 'ai-scan');
            const isVerified = aiTask ? completedTasks.includes(aiTask.id) : completedTasks.includes(mission.taskId);

            return (
              <div 
                key={mission.id}
                onClick={() => handleOpenMission(mission)}
                className={`bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-md space-y-4 ${mission.cardBorderHover} cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group`}
              >
                <div className="space-y-3">
                  {/* Header Title & Location */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200 text-emerald-600 group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase text-slate-500 block leading-tight">
                          {mission.locationName}
                        </span>
                      </div>
                    </div>

                    {isVerified ? (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200 shrink-0">
                        Target Misi
                      </span>
                    )}
                  </div>

                  {/* Mission Title */}
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors">
                    {mission.title}
                  </h4>

                  {/* Task Description */}
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      <strong className="text-slate-900 font-bold">Tugas:</strong> {mission.desc}
                    </p>
                    <p className="text-[11px] text-emerald-900 font-medium bg-emerald-50/80 p-2 rounded-xl border border-emerald-200 leading-snug">
                      <strong className="text-emerald-800 font-bold">💡 Yang harus difoto:</strong> {mission.targetHint}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <button
                  className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 text-white ${
                    isVerified
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <span>Mulai Misi Foto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* POP-UP MODAL: MISSION DETAIL & AI SCANNER INTERFACE */}
      {/* ========================================================================= */}
      {activeModalMission && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-scale-up my-auto max-h-[90vh] overflow-y-auto relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
                  {activeModalMission.locationName}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeModalMission.title}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                title="Tutup Misi Foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mission Task Explanation Banner */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <strong className="text-emerald-800 font-extrabold text-sm sm:text-base block mb-1">Tugas:</strong>
                  {activeModalMission.desc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 border-t border-emerald-200/80">
                <div className="text-xs sm:text-sm text-slate-800 font-medium">
                  <span className="font-bold text-amber-700">💡 Yang harus difoto:</span>{' '}
                  <span className="text-slate-800 font-semibold">{activeModalMission.targetHint}</span>
                </div>
                <span className="text-xs font-extrabold text-amber-700 bg-amber-100/90 px-3 py-1 rounded-lg border border-amber-300 shrink-0 self-start sm:self-auto shadow-sm">
                  Imbalan: +40 Koin & +35 XP
                </span>
              </div>
            </div>

            {/* Camera / Upload Box Area */}
            <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500/60 rounded-3xl p-6 text-center bg-slate-50 transition-colors overflow-hidden min-h-[240px] flex flex-col items-center justify-center">
              
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
                    className="max-h-64 rounded-2xl object-contain border border-slate-200 shadow-md" 
                  />

                  {/* Animated Scanner Beam overlay during analysis */}
                  {analyzing && (
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl flex flex-col items-center justify-center pointer-events-none">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
                      <Scan className="w-12 h-12 text-emerald-600 animate-spin mt-4" />
                      <p className="text-xs font-bold text-emerald-800 mt-2">Sedang Menganalisis dengan AI Scanner...</p>
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
                    <h4 className="font-extrabold text-slate-900 text-base">Ambil Foto atau Unggah Gambar</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Foto objek di sekitarmu yang sesuai dengan instruksi misi di atas.
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

            {/* Action Controls before scan */}
            {imagePreview && !analyzing && !analysisResult && (
              <div className="flex items-center justify-between gap-4 pt-2">
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
                  <span>Analisis Objek dengan AI Scanner</span>
                </button>
              </div>
            )}

            {/* AI VERIFICATION RESULTS REPORT CARD */}
            {analysisResult && (
              <div className={`p-6 rounded-3xl space-y-4 animate-fade-in shadow-sm border ${
                analysisResult.isValid ? 'bg-emerald-50/70 border-emerald-300' : 'bg-rose-50/70 border-rose-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-sm">
                    {analysisResult.isValid ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-800">Hasil Verifikasi: FOTO SUDAH SESUAI!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span className="text-rose-800">Hasil Verifikasi: FOTO KURANG SESUAI</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2 border-t border-b border-slate-200/80 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Objek Terdeteksi:</span>
                    <span className="text-sm font-extrabold text-slate-900">{analysisResult.objectName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-medium">Kategori Konsep IPS:</span>
                    <span className="text-xs font-bold text-emerald-700">{analysisResult.economicTypeDetail || analysisResult.category}</span>
                  </div>
                </div>

                {/* Teacher Explanation Feedback */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                  <p className="text-xs font-bold text-indigo-700">💬 Evaluasi Guru IPS AI:</p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{analysisResult.explanation}"
                  </p>
                </div>

                {/* Reward Badge if Valid */}
                {analysisResult.isValid && (
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-300">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-900 font-bold">Misi Foto Berhasil Diselesaikan!</p>
                        <p className="text-[11px] text-slate-600">Imbalan koin & XP telah ditambahkan</p>
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
                )}

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={resetScan}
                    className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Pindai Ulang Foto</span>
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md"
                  >
                    Tutup & Simpan Progress
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
