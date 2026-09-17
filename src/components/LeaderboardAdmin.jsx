import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  Coins, 
  Award, 
  RefreshCw, 
  Search, 
  Activity, 
  UserCheck, 
  BookOpen, 
  Camera, 
  Calendar,
  TrendingUp,
  Zap,
  RotateCcw,
  X
} from 'lucide-react';
import AvatarCanvas from './AvatarCanvas';
import { fetchLeaderboardApi, fetchAdminActivitiesApi, resetAllStudentsApi } from '../utils/apiService';
import { soundFx } from '../utils/audio';

export default function LeaderboardAdmin({ currentUser }) {
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'activities'
  const [sortBy, setSortBy] = useState('points'); // 'points', 'level', 'coins', 'quizzes'
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [data, setData] = useState({ leaderboard: [], summary: {} });
  const [activities, setActivities] = useState([]);
  const [activityFilter, setActivityFilter] = useState('all');

  const loadLeaderboardData = async () => {
    setLoading(true);
    try {
      const res = await fetchLeaderboardApi(sortBy);
      if (res && res.success) {
        setData(res);
      }
      const acts = await fetchAdminActivitiesApi(100);
      setActivities(acts);
    } catch (err) {
      console.error('Error loading admin leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboardData();
  }, [sortBy]);

  const handleRefresh = () => {
    soundFx.playClick();
    loadLeaderboardData();
  };

  const handleResetAllStudents = async () => {
    setIsResetting(true);
    soundFx.playClick();
    try {
      const res = await resetAllStudentsApi();
      if (res && res.success) {
        soundFx.playCorrect();
        await loadLeaderboardData();
        setShowResetModal(false);
      } else {
        soundFx.playWrong();
        alert('Gagal mereset: ' + (res?.message || 'Server error'));
      }
    } catch (err) {
      console.error('Reset students error:', err);
      soundFx.playWrong();
    } finally {
      setIsResetting(false);
    }
  };

  // Filter students based on search query
  const filteredLeaderboard = (data.leaderboard || []).filter(student => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      student.name.toLowerCase().includes(q) ||
      student.username.toLowerCase().includes(q)
    );
  });

  // Top 3 Podium
  const top1 = filteredLeaderboard[0];
  const top2 = filteredLeaderboard[1];
  const top3 = filteredLeaderboard[2];

  // Filter activities
  const filteredActivities = activities.filter(act => {
    if (activityFilter === 'all') return true;
    return act.activity_type === activityFilter;
  });

  return (
    <div className="space-y-4 pb-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 rounded-2xl p-4 sm:p-5 shadow-sm text-white relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-sky-200 text-[11px] font-bold border border-white/15">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>Panel Pemantauan Guru / Admin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Papan Peringkat Siswa</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-sky-500/30 text-sky-200 border border-sky-400/40 font-semibold">
                Live Data
              </span>
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => { soundFx.playClick(); setShowResetModal(true); }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-white font-black text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              title="Reset seluruh progres akun siswa (user1-4) kembali ke 0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>Reset Siswa (0 Poin)</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Memuat Data...' : 'Segarkan Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Siswa</p>
            <p className="text-lg sm:text-xl font-black text-slate-800 truncate">
              {data.summary?.totalStudents || (data.leaderboard || []).length} Siswa
            </p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Poin Tertinggi</p>
            <p className="text-lg sm:text-xl font-black text-amber-600 truncate">
              {data.summary?.maxPoints !== undefined ? data.summary.maxPoints.toLocaleString('id-ID') : 0} Pts
            </p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Level Tertinggi</p>
            <p className="text-lg sm:text-xl font-black text-purple-600 truncate">
              Lv {data.summary?.maxLevel || 1}
            </p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Koin Beredar</p>
            <p className="text-lg sm:text-xl font-black text-emerald-600 truncate">
              {data.summary?.totalCoins !== undefined ? data.summary.totalCoins.toLocaleString('id-ID') : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Main Switcher: Leaderboard vs Activity Logs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex bg-slate-200/80 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('leaderboard'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Papan Peringkat Siswa</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); setActiveTab('activities'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'activities'
                ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-sky-500" />
            <span>Log Aktivitas & Audit Trail</span>
            {activities.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-black">
                {activities.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 shadow-sm"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: LEADERBOARD TAB */}
      {/* ========================================================================= */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-8">
          
          {/* TOP 3 PODIUM (Visible when at least 2 students exist) */}
          {filteredLeaderboard.length >= 2 && !searchQuery && (
            <div className="bg-gradient-to-b from-sky-50/70 to-indigo-50/50 border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="text-center mb-10 sm:mb-12">
                <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-200 shadow-sm inline-block">
                  Podium Juara Kelas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
                
                {/* Juara 2 (Silver) */}
                {top2 && (
                  <div className="order-2 md:order-1 bg-white rounded-3xl p-5 border-2 border-slate-300 shadow-md flex flex-col items-center text-center relative group hover:-translate-y-1 transition-transform">
                    <div className="absolute -top-4 w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-md flex items-center justify-center font-black text-slate-800 text-sm">
                      2
                    </div>
                    <div className="my-3 scale-90">
                      <AvatarCanvas equipped={top2.equipped} size="md" animated={false} />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">{top2.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">@{top2.username}</p>
                    <div className="mt-3 w-full pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Level</span>
                        <span className="font-black text-purple-600">Lv {top2.level}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Poin</span>
                        <span className="font-black text-amber-600">{top2.points} Pts</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Juara 1 (Gold - Taller & Highlighted) */}
                {top1 && (
                  <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-400 shadow-xl flex flex-col items-center text-center relative group hover:-translate-y-2 transition-transform md:-mt-6">
                    <div className="absolute -top-5 w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 border-2 border-white shadow-lg flex items-center justify-center font-black text-slate-900 text-lg">
                      1
                    </div>
                    <div className="my-2">
                      <AvatarCanvas equipped={top1.equipped} size="lg" animated={true} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-1">
                      Peringkat #1
                    </span>
                    <h4 className="font-black text-slate-900 text-lg">{top1.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">@{top1.username}</p>
                    
                    <div className="mt-4 w-full pt-3 border-t border-amber-100 grid grid-cols-3 gap-1 text-center">
                      <div className="bg-amber-100/60 p-2 rounded-xl">
                        <span className="text-[10px] text-amber-800 uppercase font-bold block">Level</span>
                        <span className="font-black text-purple-700 text-sm">Lv {top1.level}</span>
                      </div>
                      <div className="bg-amber-100/60 p-2 rounded-xl">
                        <span className="text-[10px] text-amber-800 uppercase font-bold block">Poin</span>
                        <span className="font-black text-amber-700 text-sm">{top1.points}</span>
                      </div>
                      <div className="bg-amber-100/60 p-2 rounded-xl">
                        <span className="text-[10px] text-amber-800 uppercase font-bold block">Koin</span>
                        <span className="font-black text-emerald-700 text-sm">{top1.coins}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Juara 3 (Bronze) */}
                {top3 && (
                  <div className="order-3 md:order-3 bg-white rounded-3xl p-5 border-2 border-amber-600/40 shadow-md flex flex-col items-center text-center relative group hover:-translate-y-1 transition-transform">
                    <div className="absolute -top-4 w-9 h-9 rounded-full bg-amber-100 border-2 border-white shadow-md flex items-center justify-center font-black text-amber-900 text-sm">
                      3
                    </div>
                    <div className="my-3 scale-90">
                      <AvatarCanvas equipped={top3.equipped} size="md" animated={false} />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">{top3.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">@{top3.username}</p>
                    <div className="mt-3 w-full pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Level</span>
                        <span className="font-black text-purple-600">Lv {top3.level}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Poin</span>
                        <span className="font-black text-amber-600">{top3.points} Pts</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Sort Controls & Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Table Header & Sort Filter Pills */}
            <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Daftar Peringkat Seluruh Siswa
                </h3>
                <p className="text-xs text-slate-500">
                  Urutan diperbarui otomatis dari database MySQL setiap ada aktivitas baru.
                </p>
              </div>

              {/* Sort Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto text-xs font-bold text-slate-600">
                <span className="text-[10px] text-slate-400 uppercase font-black px-2">Urutkan:</span>
                <button
                  onClick={() => setSortBy('points')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    sortBy === 'points' ? 'bg-amber-500 text-white shadow-sm font-extrabold' : 'hover:text-slate-900'
                  }`}
                >
                  🥇 Poin Tertinggi
                </button>
                <button
                  onClick={() => setSortBy('level')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    sortBy === 'level' ? 'bg-purple-600 text-white shadow-sm font-extrabold' : 'hover:text-slate-900'
                  }`}
                >
                  ⚡ Level Tertinggi
                </button>
                <button
                  onClick={() => setSortBy('coins')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    sortBy === 'coins' ? 'bg-emerald-600 text-white shadow-sm font-extrabold' : 'hover:text-slate-900'
                  }`}
                >
                  💰 Koin Terbanyak
                </button>
                <button
                  onClick={() => setSortBy('quizzes')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    sortBy === 'quizzes' ? 'bg-sky-600 text-white shadow-sm font-extrabold' : 'hover:text-slate-900'
                  }`}
                >
                  📚 Kuis Selesai
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 text-center w-16">Peringkat</th>
                    <th className="py-3.5 px-4">Siswa</th>
                    <th className="py-3.5 px-4 text-center">Level</th>
                    <th className="py-3.5 px-4 text-right">Total Poin</th>
                    <th className="py-3.5 px-4 text-right">Saldo Koin</th>
                    <th className="py-3.5 px-4 text-center">Kuis Selesai</th>
                    <th className="py-3.5 px-4 text-center">Scan Foto AI</th>
                    <th className="py-3.5 px-4 text-right">Terakhir Aktif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeaderboard.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-slate-400">
                        Tidak ada data siswa yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredLeaderboard.map((student, idx) => {
                      const rank = student.rank || idx + 1;
                      let rankBadge = (
                        <span className="font-bold text-slate-500 text-sm">#{rank}</span>
                      );
                      if (rank === 1) {
                        rankBadge = (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-sm">
                            1
                          </span>
                        );
                      } else if (rank === 2) {
                        rankBadge = (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black text-xs shadow-sm">
                            2
                          </span>
                        );
                      } else if (rank === 3) {
                        rankBadge = (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-black text-xs shadow-sm">
                            3
                          </span>
                        );
                      }

                      return (
                        <tr 
                          key={student.id || student.username}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            rank <= 3 ? 'bg-amber-50/20 font-medium' : ''
                          }`}
                        >
                          {/* Rank */}
                          <td className="py-2.5 px-3 text-center">
                            {rankBadge}
                          </td>

                          {/* Student Info & Avatar Mini */}
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-sky-100 border border-sky-200 overflow-hidden flex items-center justify-center shrink-0">
                                <div className="scale-45 origin-center -translate-y-2">
                                  <AvatarCanvas equipped={student.equipped} size="sm" animated={false} />
                                </div>
                              </div>
                              <div className="min-w-0">
                                <p className="font-extrabold text-slate-900 text-xs sm:text-sm truncate flex items-center gap-1.5">
                                  <span>{student.name}</span>
                                  {rank === 1 && (
                                    <Crown className="w-3.5 h-3.5 text-amber-500 inline fill-amber-400" />
                                  )}
                                </p>
                                <p className="text-[11px] text-slate-400 font-mono">@{student.username}</p>
                              </div>
                            </div>
                          </td>

                          {/* Level */}
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-black text-[11px] border border-purple-200">
                              <Zap className="w-2.5 h-2.5" />
                              Lv {student.level}
                            </span>
                          </td>

                          {/* Points */}
                          <td className="py-2.5 px-3 text-right">
                            <span className="font-black text-amber-600 text-sm">
                              {student.points.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-1">Pts</span>
                          </td>

                          {/* Coins */}
                          <td className="py-2.5 px-3 text-right">
                            <span className="font-extrabold text-emerald-600 text-xs">
                              {student.coins.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[9px] text-slate-400 ml-1">Koin</span>
                          </td>

                          {/* Quizzes Completed */}
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
                              {student.stats?.quizzesCompleted || 0}
                            </span>
                          </td>

                          {/* AI Scans */}
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-lg bg-cyan-100 text-cyan-800 font-bold text-[11px]">
                              {student.stats?.aiScansVerified || 0}
                            </span>
                          </td>

                          {/* Last Active */}
                          <td className="py-2.5 px-3 text-right text-[11px] text-slate-400 font-mono">
                            {student.lastLogin ? new Date(student.lastLogin).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : '-'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>
                Menampilkan <strong>{filteredLeaderboard.length}</strong> siswa dari database MySQL.
              </p>
              <p className="text-[11px] text-slate-400">
                Pembaruan terinkrementasi setiap kali siswa menyelesaikan kuis atau misi foto AI.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: AUDIT TRAIL / LOG AKTIVITAS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'activities' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-600" />
                <span>Audit Trail & Rekam Jejak Aktivitas Siswa</span>
              </h3>
            </div>

            {/* Filter by Activity Type */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto text-xs font-bold text-slate-600">
              <span className="text-[10px] text-slate-400 uppercase font-black px-2">Tipe:</span>
              <button
                onClick={() => setActivityFilter('all')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  activityFilter === 'all' ? 'bg-sky-600 text-white shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Semua ({activities.length})
              </button>
              <button
                onClick={() => setActivityFilter('quiz')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  activityFilter === 'quiz' ? 'bg-amber-500 text-white shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Kuis
              </button>
              <button
                onClick={() => setActivityFilter('ai-scan')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  activityFilter === 'ai-scan' ? 'bg-cyan-600 text-white shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Scan AI
              </button>
              <button
                onClick={() => setActivityFilter('materi')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  activityFilter === 'materi' ? 'bg-blue-600 text-white shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Materi
              </button>
              <button
                onClick={() => setActivityFilter('shop_buy')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  activityFilter === 'shop_buy' ? 'bg-purple-600 text-white shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Belanja
              </button>
              <button
                onClick={() => setActivityFilter('login')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  activityFilter === 'login' ? 'bg-slate-700 text-white shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Login
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Waktu (MySQL Timestamp)</th>
                  <th className="py-3 px-4">Siswa</th>
                  <th className="py-3 px-4">Tipe Aktivitas</th>
                  <th className="py-3 px-4">Deskripsi Aktivitas</th>
                  <th className="py-3 px-4 text-center">XP Didapat</th>
                  <th className="py-3 px-4 text-center">Koin Didapat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      Belum ada catatan aktivitas untuk kategori ini.
                    </td>
                  </tr>
                ) : (
                  filteredActivities.map((act, index) => {
                    let typeBadge = (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {act.activity_type}
                      </span>
                    );
                    if (act.activity_type === 'quiz') {
                      typeBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200">
                          📚 Kuis
                        </span>
                      );
                    } else if (act.activity_type === 'ai-scan') {
                      typeBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold border border-cyan-200">
                          📸 Scan AI
                        </span>
                      );
                    } else if (act.activity_type === 'materi') {
                      typeBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold border border-blue-200">
                          📖 Modul Materi
                        </span>
                      );
                    } else if (act.activity_type === 'shop_buy') {
                      typeBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold border border-purple-200">
                          🛍️ Toko Avatar
                        </span>
                      );
                    } else if (act.activity_type === 'login') {
                      typeBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                          🔑 Login
                        </span>
                      );
                    }

                    return (
                      <tr key={act.id || index} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 text-center text-xs text-slate-400 font-mono">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-500 font-mono">
                          {act.created_at ? new Date(act.created_at).toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          }) : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{act.student_name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">@{act.username}</p>
                        </td>
                        <td className="py-3 px-4">
                          {typeBadge}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-700 font-medium">
                          {act.title}
                          {act.details && act.details.score !== undefined && (
                            <span className="ml-2 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                              Skor: {act.details.score}
                            </span>
                          )}
                          {act.details && act.details.objectName && (
                            <span className="ml-2 font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-200">
                              Objek: {act.details.objectName}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {act.xp_earned > 0 ? (
                            <span className="font-extrabold text-purple-600 text-xs">
                              +{act.xp_earned} XP
                            </span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {act.coins_earned > 0 ? (
                            <span className="font-extrabold text-emerald-600 text-xs">
                              +{act.coins_earned} Koin
                            </span>
                          ) : act.coins_earned < 0 ? (
                            <span className="font-extrabold text-rose-600 text-xs">
                              {act.coins_earned} Koin
                            </span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Pop-up Dialog: Konfirmasi Reset Seluruh Siswa */}
      {showResetModal && (
        <div 
          onClick={() => setShowResetModal(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl max-w-xs sm:max-w-sm w-full p-5 sm:p-6 relative animate-scale-up space-y-4 text-center"
          >
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Batal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-200">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Reset Semua Siswa?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apakah kamu yakin ingin mereset seluruh akun siswa (<strong className="text-slate-800">user1, user2, user3, user4</strong>) kembali ke baseline awal 0 poin & 0 koin?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleResetAllStudents}
                disabled={isResetting}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isResetting ? 'Mereset...' : 'Ya, Reset 0'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
