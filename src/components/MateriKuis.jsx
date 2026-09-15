import React, { useState } from 'react';
import { MATERI_KEGIATAN_EKONOMI } from '../data/materiData';
import { QUIZ_LEVELS } from '../data/kuisData';
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
  BrainCircuit
} from 'lucide-react';

export default function MateriKuis({ student, updateStudentData }) {
  const [subTab, setSubTab] = useState('materi'); // 'materi' | 'kuis'
  const [selectedMateriIndex, setSelectedMateriIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // Quick check state for materi
  const [quickAnswer, setQuickAnswer] = useState(null);
  const [quickResult, setQuickResult] = useState(null);

  // Quiz player state
  const [selectedLevelId, setSelectedLevelId] = useState('level-1');
  const [activeQuizState, setActiveQuizState] = useState(null); // null when selecting level

  const currentMateri = MATERI_KEGIATAN_EKONOMI[selectedMateriIndex];

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
      // Finish Quiz
      const finalScore = activeQuizState.score;
      const rewardCoins = activeQuizState.level.rewardCoins;
      const rewardXp = activeQuizState.level.rewardXp;

      // Reward player
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

      // Trigger Confetti
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

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* Top Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Pusat Pembelajaran & Evaluasi IPS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Modul & Kuis Kegiatan Ekonomi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Pahami materi dasar IPS SMP dan uji kemampuanmu untuk memenangkan Koin Edukasi!
          </p>
        </div>

        {/* Sub Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => { soundFx.playClick(); setSubTab('materi'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              subTab === 'materi'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Materi Pembelajaran</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); setSubTab('kuis'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              subTab === 'kuis'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Kuis Adaptif</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: MATERI IPS MODUL INTERAKTIF */}
      {/* ========================================================================= */}
      {subTab === 'materi' && (
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
              if (materi.id === 'konsumsi') IconComponent = ShoppingCart;

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

              {/* Text-to-Speech Button */}
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
              <p className="font-medium">📌 <span className="font-bold text-amber-800">Inti Konsep:</span> {currentMateri.summary}</p>
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

                {/* Type Cards (e.g. Produksi Barang vs Jasa) */}
                {sec.typeCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sec.typeCards.map((tc, tcIdx) => (
                      <div key={tcIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-indigo-700 text-base">{tc.title}</h5>
                        <p className="text-xs text-slate-600">{tc.desc}</p>
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
                        <span>{b}</span>
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
                        <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
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
                        <p className="text-xs text-slate-600">{ch.desc}</p>
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
                        <span className="text-xs text-slate-600">{pr.desc}</span>
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

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: KUIS ADAPTIF EVALUASI */}
      {/* ========================================================================= */}
      {subTab === 'kuis' && (
        <div className="space-y-8">
          
          {/* If no quiz active, show Level Selector */}
          {!activeQuizState && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Pilih Tingkat Kesulitan Kuis</h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Selesaikan kuis untuk mengumpulkan Koin Edukasi dan menaikkan Level karaktermu!
                </p>
              </div>

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
                        {/* Rewards */}
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

                        {/* Action Button */}
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

          {/* ACTIVE QUIZ PLAYER INTERFACE */}
          {activeQuizState && (
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              
              {/* QUIZ FINISHED RESULTS SCREEN */}
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

                  {/* Score & Rewards Box */}
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
                /* QUIZ ACTIVE QUESTION SCREEN */
                <>
                  {/* Progress Top Bar */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>
                      Soal {activeQuizState.currentQuestionIndex + 1} dari {activeQuizState.level.questions.length}
                    </span>
                    <span className="text-amber-600 font-extrabold">
                      Skor Sementara: {activeQuizState.score} Pts
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${((activeQuizState.currentQuestionIndex + 1) / activeQuizState.level.questions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Text */}
                  <div className="space-y-2 pt-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                      Kategori: {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
                      {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].question}
                    </h4>
                  </div>

                  {/* Options */}
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

                  {/* Explanation Box */}
                  {activeQuizState.showExplanation && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 animate-fade-in">
                      <p className="text-xs font-bold text-amber-800">💡 Penjelasan Jawaban Pembelajaran:</p>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {activeQuizState.level.questions[activeQuizState.currentQuestionIndex].explanation}
                      </p>
                    </div>
                  )}

                  {/* Bottom Action Controls */}
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

    </div>
  );
}
