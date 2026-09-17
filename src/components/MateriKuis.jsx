import React, { useState, useEffect, useRef } from 'react';
import { MATERI_KEGIATAN_EKONOMI } from '../data/materiData';
import { QUIZ_LEVELS } from '../data/kuisData';
import { MISSIONS_DATA } from '../data/missionData';
import { toggleTaskCompletion } from '../utils/storage';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Factory, 
  Truck, 
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Coins,
  Check,
  BrainCircuit,
  Flag,
  ChevronRight,
  X,
  Compass,
  Trees,
  Ship,
  Store,
  Landmark,
  Award
} from 'lucide-react';

export default function MateriKuis({ 
  student, 
  updateStudentData, 
  subTab: controlledSubTab, 
  setSubTab: setControlledSubTab,
  setActiveTab,
  initialSelectedMission,
  onClearInitialMission,
  initialMateriId,
  onClearInitialMateriId
}) {
  const [localSubTab, setLocalSubTab] = useState('materi');
  const activeSubTab = controlledSubTab || localSubTab;

  const handleSubTabChange = (newSubTab) => {
    soundFx.playClick();
    if (setControlledSubTab) {
      setControlledSubTab(newSubTab);
    } else {
      setLocalSubTab(newSubTab);
    }
  };

  const [selectedMateriIndex, setSelectedMateriIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // Quick check & scroll state for materi modules
  const [quickAnswer, setQuickAnswer] = useState(null);
  const [quickResult, setQuickResult] = useState(null);
  const [completedQuickChecks, setCompletedQuickChecks] = useState({});
  const [scrolledModules, setScrolledModules] = useState({});
  const bottomSentinelRef = useRef(null);

  // Quiz player state
  const [selectedLevelId, setSelectedLevelId] = useState('level-1');
  const [activeQuizState, setActiveQuizState] = useState(null);

  // Mission tab state
  const [selectedMissionModal, setSelectedMissionModal] = useState(null);

  useEffect(() => {
    if (initialMateriId) {
      const idx = MATERI_KEGIATAN_EKONOMI.findIndex(m => m.id === initialMateriId);
      if (idx !== -1) {
        setSelectedMateriIndex(idx);
        if (setControlledSubTab) {
          setControlledSubTab('materi');
        } else {
          setLocalSubTab('materi');
        }
      }
      if (onClearInitialMateriId) {
        onClearInitialMateriId();
      }
    }
  }, [initialMateriId, onClearInitialMateriId, setControlledSubTab]);

  useEffect(() => {
    if (initialSelectedMission) {
      setSelectedMissionModal(initialSelectedMission);
      if (onClearInitialMission) {
        onClearInitialMission();
      }
    }
  }, [initialSelectedMission, onClearInitialMission]);

  const currentMateri = MATERI_KEGIATAN_EKONOMI[selectedMateriIndex];

  // IntersectionObserver & Scroll Tracking to detect reading to the bottom
  useEffect(() => {
    if (!currentMateri) return;
    const currentId = currentMateri.id;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setScrolledModules((prev) => ({ ...prev, [currentId]: true }));
        }
      },
      { threshold: 0.1 }
    );

    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    const handleScroll = () => {
      const windowBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      if (windowBottom >= documentHeight - 150) {
        setScrolledModules((prev) => ({ ...prev, [currentId]: true }));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedMateriIndex, currentMateri]);

  const completedSet = new Set(student?.completedTasks || []);

  // Manual Override Block: Clicking task checklist items redirects directly to module/activity
  const handleTaskClick = (e, taskObj, parentMission = null) => {
    e.stopPropagation();
    soundFx.playClick();

    if (completedSet.has(taskObj.id)) return;

    const targetMateriId = parentMission?.materiId || taskObj.materiId;
    if (taskObj.type === 'materi') {
      const idx = MATERI_KEGIATAN_EKONOMI.findIndex(m => m.id === targetMateriId);
      if (idx !== -1) {
        setSelectedMateriIndex(idx);
      }
      handleSubTabChange('materi');
      if (selectedMissionModal) setSelectedMissionModal(null);
    } else if (taskObj.type === 'ai-scan') {
      if (setActiveTab) setActiveTab('ai-mission');
    } else if (taskObj.type === 'quiz') {
      handleSubTabChange('kuis');
      if (selectedMissionModal) setSelectedMissionModal(null);
    } else if (taskObj.type === 'shop') {
      if (setActiveTab) setActiveTab('shop');
    } else {
      handleSubTabChange('materi');
      if (selectedMissionModal) setSelectedMissionModal(null);
    }
  };

  // Automated Mission Integration: Triggered when "Selesaikan Materi" button is clicked
  const handleFinishMateriModule = () => {
    if (!student || !updateStudentData || !currentMateri) return;

    soundFx.playScanSuccess();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    const currentCompleted = student.completedTasks || [];
    const tasksToComplete = [];

    MISSIONS_DATA.forEach(mission => {
      if (mission.materiId === currentMateri.id) {
        (mission.tasks || []).forEach(task => {
          if (task.type === 'materi' && !currentCompleted.includes(task.id)) {
            tasksToComplete.push(task);
          }
        });
      }
    });

    let updatedCompleted = [...currentCompleted];
    let newCoins = student.coins;
    let newXp = student.xp;
    let newPoints = student.points;

    let coinsAwarded = 0;
    tasksToComplete.forEach(task => {
      if (!updatedCompleted.includes(task.id)) {
        updatedCompleted.push(task.id);
        const reward = task.rewardCoins !== undefined ? task.rewardCoins : 5;
        newCoins += reward;
        coinsAwarded += reward;
        newXp += task.rewardXp || 20;
        newPoints += task.rewardXp || 20;
      }
    });

    // Pastikan selalu mendapatkan minimal 5 koin saat menyelesaikan materi
    if (coinsAwarded === 0) {
      newCoins += 5;
      newXp += 10;
      newPoints += 10;
    }

    soundFx.playCoin();

    let newLevel = student.level;
    let newXpToNext = student.xpToNextLevel;
    if (newXp >= newXpToNext) {
      newLevel += 1;
      newXpToNext += 100;
      soundFx.playLevelUp();
    }

    const updatedBadges = (student.badges || []).map(b => {
      if (b.id === 'b7' && updatedCompleted.length >= 28) {
        return { ...b, unlocked: true };
      }
      return b;
    });

    updateStudentData({
      ...student,
      coins: newCoins,
      xp: newXp,
      points: newPoints,
      level: newLevel,
      xpToNextLevel: newXpToNext,
      completedTasks: updatedCompleted,
      badges: updatedBadges
    });
  };

  // Voice Narration handler using Web Speech API
  const handleToggleSpeech = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Browser kamu tidak mendukung fitur pembacaan suara.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const handleMateriChange = (idx) => {
    soundFx.playClick();
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    setSelectedMateriIndex(idx);
    setQuickAnswer(null);
    setQuickResult(null);
  };

  // Quick Check submit
  const handleQuickCheck = (optionIdx) => {
    setQuickAnswer(optionIdx);
    setCompletedQuickChecks((prev) => ({ ...prev, [currentMateri.id]: true }));
    if (optionIdx === currentMateri.quickCheck.correctAnswer) {
      soundFx.playCorrect();
      setQuickResult({
        correct: true,
        text: 'Benar sekali! ' + currentMateri.quickCheck.explanation
      });
    } else {
      soundFx.playWrong();
      setQuickResult({
        correct: false,
        text: 'Kurang tepat. ' + currentMateri.quickCheck.explanation
      });
    }
  };

  // --- QUIZ FUNCTIONS ---
  const startQuiz = (levelObj) => {
    soundFx.playClick();
    setActiveQuizState({
      level: levelObj,
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      isFinished: false,
      selectedOption: null,
      showExplanation: false
    });
  };

  const handleSelectOption = (index) => {
    if (activeQuizState.showExplanation) return;
    soundFx.playClick();
    setActiveQuizState(prev => ({ ...prev, selectedOption: index }));
  };

  const handleSubmitAnswer = () => {
    const q = activeQuizState.level.questions[activeQuizState.currentQuestionIndex];
    const isCorrect = activeQuizState.selectedOption === q.correctIndex;

    if (isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playWrong();
    }

    setActiveQuizState(prev => ({
      ...prev,
      showExplanation: true,
      score: isCorrect ? prev.score + 20 : prev.score,
      userAnswers: [...prev.userAnswers, { questionId: q.id, selected: prev.selectedOption, isCorrect }]
    }));
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    const nextIdx = activeQuizState.currentQuestionIndex + 1;
    if (nextIdx >= activeQuizState.level.questions.length) {
      const finalScore = activeQuizState.score;
      const rewardCoins = activeQuizState.level.rewardCoins;
      const rewardXp = activeQuizState.level.rewardXp;

      const newXp = student.xp + rewardXp;
      let newLevel = student.level;
      let newXpToNext = student.xpToNextLevel;

      if (newXp >= newXpToNext) {
        newLevel += 1;
        newXpToNext += 100;
        soundFx.playLevelUp();
      } else {
        soundFx.playCoin();
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      updateStudentData({
        ...student,
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNext,
        coins: student.coins + rewardCoins,
        points: student.points + rewardXp,
        stats: {
          ...student.stats,
          quizzesCompleted: student.stats.quizzesCompleted + 1,
          quizScoreSum: student.stats.quizScoreSum + finalScore
        }
      });

      setActiveQuizState(prev => ({
        ...prev,
        isFinished: true
      }));
    } else {
      setActiveQuizState(prev => ({
        ...prev,
        currentQuestionIndex: nextIdx,
        selectedOption: null,
        showExplanation: false
      }));
    }
  };

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
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Top Header & 3 Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Pusat Pembelajaran & Evaluasi IPS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Course Hub IPS
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Pelajari materi, selesaikan kuis, dan jalankan 7 Misi Pulau Kegiatan Ekonomi!
          </p>
        </div>

        {/* 3 Sub Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSubTabChange('materi')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeSubTab === 'materi'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Materi Pembelajaran</span>
          </button>

          <button
            onClick={() => handleSubTabChange('kuis')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeSubTab === 'kuis'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Kuis Adaptif</span>
          </button>

          <button
            onClick={() => handleSubTabChange('misi')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeSubTab === 'misi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flag className="w-4 h-4" />
            <span>Misi Ekonomi</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: MATERI IPS MODUL INTERAKTIF */}
      {/* ========================================================================= */}
      {activeSubTab === 'materi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Module Pillar Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Pilih Pilar Kegiatan Ekonomi
            </h3>

            {MATERI_KEGIATAN_EKONOMI.map((materi, idx) => {
              const isSelected = selectedMateriIndex === idx;
              let IconComponent = Factory;
              if (materi.id === 'distribusi') IconComponent = Truck;
              if (materi.id === 'pola-konsumen-pasar') IconComponent = ShoppingCart;

              return (
                <div
                  key={materi.id}
                  onClick={() => handleMateriChange(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? `bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-md scale-[1.02]`
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${materi.badgeColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{materi.title}</h4>
                      <p className="text-xs text-slate-500">{materi.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Module Detailed Content */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
            
            {/* Header Banner */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${currentMateri.badgeColor} mb-2`}>
                  Modul Pembelajaran IPS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{currentMateri.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{currentMateri.subtitle}</p>
              </div>

              <button
                onClick={() => handleToggleSpeech(currentMateri.summary)}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  speaking 
                    ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Baca Ringkasan Suara"
              >
                {speaking ? <VolumeX className="w-5 h-5 text-rose-600" /> : <Volume2 className="w-5 h-5 text-indigo-600" />}
                <span className="hidden sm:inline">{speaking ? 'Hentikan Suara' : 'Dengarkan Ringkasan'}</span>
              </button>
            </div>

             {/* Summary Box */}
            <div className="bg-amber-50 border border-amber-200 p-4 sm:p-5 rounded-2xl text-slate-800 text-sm leading-relaxed">
              <p className="font-medium">📌 <span className="font-bold text-amber-800">Inti Konsep:</span> <span dangerouslySetInnerHTML={{ __html: currentMateri.summary?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-950 font-bold">$1</strong>') }} /></p>
            </div>

            {/* Sections Loop */}
            {currentMateri.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h4 className="text-lg font-extrabold text-indigo-700 border-l-4 border-indigo-600 pl-3">
                  {sec.heading}
                </h4>

                {sec.content && (
                  <p className="text-slate-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sec.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>') }} />
                )}

                {/* Key Points */}
                {sec.keyPoints && (
                  <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {sec.keyPoints.map((kp, kpIdx) => (
                      <div key={kpIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: kp.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-800 font-bold">$1</strong>') }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Type Cards */}
                {sec.typeCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sec.typeCards.map((tc, tcIdx) => (
                      <div key={tcIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-indigo-700 text-base">{tc.title}</h5>
                        <p className="text-xs text-slate-600" dangerouslySetInnerHTML={{ __html: tc.desc?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-bold">$1</strong>') }} />
                        <div className="bg-amber-50 p-2.5 rounded-xl text-[11px] text-amber-800 font-medium border border-amber-200">
                          <strong>Contoh:</strong> {tc.examples}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullets List */}
                {sec.bullets && (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-2">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                )}

                {/* Factors List */}
                {sec.factors && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sec.factors.map((f, fIdx) => (
                      <div key={fIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">{f.name}</h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">{f.type}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-bold">$1</strong>') }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Saluran Distribusi Cards */}
                {sec.channels && (
                  <div className="space-y-3">
                    {sec.channels.map((ch, chIdx) => (
                      <div key={chIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className="font-bold text-slate-900 text-sm sm:text-base">{ch.name}</h5>
                          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg">
                            {ch.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600" dangerouslySetInnerHTML={{ __html: ch.desc?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-bold">$1</strong>') }} />
                        <p className="text-xs text-emerald-700 italic">Contoh: {ch.example}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Factors List Consumption */}
                {sec.factorsList && (
                  <div className="space-y-4">
                    {sec.factorsList.map((fl, flIdx) => (
                      <div key={flIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-amber-700 text-sm">{fl.category}</h5>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {fl.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">✔</span>
                              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>') }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Priorities List */}
                {sec.priorities && (
                  <div className="space-y-2">
                    {sec.priorities.map((pr, prIdx) => (
                      <div key={prIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="font-bold text-xs text-amber-800">{pr.label}</span>
                        <span className="text-xs text-slate-600" dangerouslySetInnerHTML={{ __html: pr.desc?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}

            {/* Quick Check Quiz Box */}
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                <span>Uji Cepat Pemahaman Siswa</span>
              </div>
              
              <h5 className="text-base font-extrabold text-slate-900">
                {currentMateri.quickCheck.question}
              </h5>

              <div className="space-y-2">
                {currentMateri.quickCheck.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleQuickCheck(optIdx)}
                    disabled={quickAnswer !== null}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      quickAnswer === optIdx
                        ? optIdx === currentMateri.quickCheck.correctAnswer
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                          : 'bg-rose-100 border-rose-400 text-rose-800 font-bold'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {quickResult && (
                <div className={`p-4 rounded-xl text-xs sm:text-sm font-bold border animate-fade-in ${
                  quickResult.correct ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-rose-100 border-rose-300 text-rose-800'
                }`}>
                  {quickResult.text}
                </div>
              )}
            </div>

            {/* Bottom "Selesaikan Materi" Interactive Section */}
            {(() => {
              const associatedMateriTasks = currentMateri 
                ? MISSIONS_DATA.flatMap(m => m.materiId === currentMateri.id ? m.tasks.filter(t => t.type === 'materi') : [])
                : [];
              const isModuleCompleted = associatedMateriTasks.length > 0 
                && associatedMateriTasks.every(t => completedSet.has(t.id));
              
              // Requirements must be actually performed by the user during reading session
              const hasScrolled = !!scrolledModules[currentMateri?.id];
              const hasCompletedQuickCheck = !!completedQuickChecks[currentMateri?.id] || quickAnswer !== null;
              
              // Unlocks only when both requirements are fulfilled
              const isReadyToFinish = hasScrolled && hasCompletedQuickCheck;

              return (
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  {/* Syarat Aktifnya Tombol Box */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                          Syarat Kelengkapan Modul Ini:
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
                          🪙 +5 Koin
                        </span>
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                        isModuleCompleted 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : isReadyToFinish 
                          ? 'bg-sky-100 text-sky-800 border-sky-300' 
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {isModuleCompleted ? 'Materi Selesai ✔' : isReadyToFinish ? 'Siap Diselesaikan ✨' : 'Belum Lengkap 🔒'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                        hasScrolled || isModuleCompleted 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' 
                          : 'bg-white border-slate-200 text-slate-500'
                      }`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          hasScrolled || isModuleCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {hasScrolled || isModuleCompleted ? '✓' : '🔒'}
                        </div>
                        <span>1. Scroll & membaca sampai paling bawah</span>
                      </div>

                      <div className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                        hasCompletedQuickCheck || isModuleCompleted 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' 
                          : 'bg-white border-slate-200 text-slate-500'
                      }`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          hasCompletedQuickCheck || isModuleCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {hasCompletedQuickCheck || isModuleCompleted ? '✓' : '🔒'}
                        </div>
                        <span>2. Jawab Uji Cepat Pemahaman Siswa</span>
                      </div>
                    </div>
                  </div>

                  {/* Selesaikan Materi Button */}
                  <button
                    onClick={handleFinishMateriModule}
                    disabled={!isReadyToFinish || isModuleCompleted}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg ${
                      isModuleCompleted
                        ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400 cursor-default shadow-none'
                        : isReadyToFinish
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse shadow-emerald-200 cursor-pointer scale-[1.01]'
                        : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-80 shadow-none'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {isModuleCompleted 
                        ? 'Materi Ini Telah Diselesaikan! (+5 Koin Didapatkan ✔)' 
                        : isReadyToFinish 
                        ? 'Selesaikan Materi ✨ (+5 Koin)' 
                        : 'Selesaikan Materi (Terkunci 🔒 • Hadiah +5 Koin)'}
                    </span>
                  </button>
                </div>
              );
            })()}

            {/* Bottom Sentinel element for IntersectionObserver */}
            <div ref={bottomSentinelRef} className="h-4 w-full" />

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: KUIS ADAPTIF EVALUASI */}
      {/* ========================================================================= */}
      {activeSubTab === 'kuis' && (
        <div className="space-y-8">
          {!activeQuizState && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUIZ_LEVELS.map((level) => {
                  const isUnlocked = student.level >= level.unlockedAtLevel;
                  return (
                    <div
                      key={level.id}
                      className={`bg-white border rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-sm transition-all ${
                        isUnlocked 
                          ? 'border-slate-200 hover:border-indigo-400 hover:scale-[1.02] shadow-md' 
                          : 'border-slate-200 opacity-60 bg-slate-50'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                            {level.badge}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {level.questions.length} Soal
                          </span>
                        </div>

                        <h4 className="text-xl font-extrabold text-slate-900">{level.name}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{level.description}</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-500">Imbalan Kuis:</span>
                          <div className="flex items-center gap-3">
                            <span className="text-amber-600 flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> +{level.rewardCoins}
                            </span>
                            <span className="text-indigo-600 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> +{level.rewardXp} XP
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => isUnlocked && startQuiz(level)}
                          disabled={!isUnlocked}
                          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            isUnlocked
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {isUnlocked ? (
                            <>
                              <span>Mulai Kuis</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          ) : (
                            <span>Buka di Level {level.unlockedAtLevel}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeQuizState && (
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              {activeQuizState.isFinished ? (
                <div className="text-center space-y-6 py-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-600">
                    <Trophy className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900">Kuis Selesai! 🎉</h3>
                    <p className="text-slate-600 text-sm">
                      Selamat! Kamu telah menyelesaikan {activeQuizState.level.name}
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl max-w-md mx-auto grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 font-semibold">Skor Akhir</p>
                      <p className="text-3xl font-black text-amber-600">{activeQuizState.score} Pts</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-semibold">Koin Diperoleh</p>
                      <p className="text-3xl font-black text-amber-600 flex items-center justify-center gap-1">
                        <Coins className="w-6 h-6 text-amber-500 fill-amber-500" />
                        +{activeQuizState.level.rewardCoins}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveQuizState(null)}
                    className="py-3.5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
                  >
                    Kembali ke Daftar Level Kuis
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>
                      Soal {activeQuizState.currentQuestionIndex + 1} dari {activeQuizState.level.questions.length}
                    </span>
                    <span className="text-amber-600 font-extrabold">
                      Skor Sementara: {activeQuizState.score} Pts
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${((activeQuizState.currentQuestionIndex + 1) / activeQuizState.level.questions.length) * 100}%` }}
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                      Kategori: {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
                      {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].question}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].options.map((optionText, oIdx) => {
                      const isSelected = activeQuizState.selectedOption === oIdx;
                      const isCorrect = oIdx === activeQuizState.level.questions[activeQuizState.currentQuestionIndex].correctIndex;
                      
                      let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                      if (isSelected) {
                        optionStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500';
                      }
                      if (activeQuizState.showExplanation) {
                        if (isCorrect) {
                          optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-rose-100 border-rose-400 text-rose-800 font-bold';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          disabled={activeQuizState.showExplanation}
                          className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{optionText}</span>
                          </div>
                          {activeQuizState.showExplanation && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {activeQuizState.showExplanation && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 animate-fade-in">
                      <p className="text-xs font-bold text-amber-800">💡 Penjelasan Jawaban Pembelajaran:</p>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].explanation}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    {!activeQuizState.showExplanation ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={activeQuizState.selectedOption === null}
                        className={`py-3 px-6 rounded-xl font-bold text-sm transition-all ${
                          activeQuizState.selectedOption !== null
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Kunci Jawaban
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-md"
                      >
                        <span>
                          {activeQuizState.currentQuestionIndex + 1 === activeQuizState.level.questions.length ? 'Lihat Hasil Akhir' : 'Lanjut Soal Berikutnya'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: MISI EKONOMI 7 PULAU */}
      {/* ========================================================================= */}
      {activeSubTab === 'misi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xl font-black text-slate-900">
              Daftar 7 Misi Pulau Kegiatan Ekonomi
            </h3>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {completedSet.size} / 28 Tugas Selesai
            </span>
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

                    <div className="space-y-2 pt-1">
                      {missionTasks.map((task) => {
                        const isTaskDone = completedSet.has(task.id);
                        return (
                          <div 
                            key={task.id}
                            onClick={(e) => handleTaskClick(e, task, mission)}
                            className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer group/item select-none hover:text-emerald-700 transition-colors"
                            title={isTaskDone ? "Tugas Selesai (Auto-Checked)" : "Klik untuk membaca materi & menyelesaikan tugas"}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 transition-all ${
                              isTaskDone 
                                ? 'bg-emerald-500 border border-emerald-600 text-white font-black scale-105' 
                                : 'bg-emerald-50 border border-emerald-400 text-emerald-600 group-hover/item:border-emerald-600'
                            }`}>
                              ✓
                            </div>
                            <span className={`line-clamp-1 ${isTaskDone ? 'line-through opacity-70 text-slate-500' : ''}`}>
                              {task.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMissionModal(mission)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Mulai Misi</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MISSION DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedMissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            
            <button
              onClick={() => setSelectedMissionModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

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

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  const targetMateriId = selectedMissionModal.materiId;
                  const currentTargetTab = selectedMissionModal.targetTab;
                  setSelectedMissionModal(null);
                  if (currentTargetTab === 'materi') {
                    handleSubTabChange('materi');
                    if (targetMateriId) {
                      const idx = MATERI_KEGIATAN_EKONOMI.findIndex(m => m.id === targetMateriId);
                      if (idx !== -1) {
                        setSelectedMateriIndex(idx);
                      }
                    }
                  } else if (setActiveTab) {
                    setActiveTab(currentTargetTab);
                  }
                }}
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
