import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Coins
} from 'lucide-react';
import { DEFAULT_ACCOUNTS, authenticateUser } from '../data/accountsData';
import { soundFx } from '../utils/audio';
import jelakomLogo from '../assets/jelakom.png';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrorMessage('');
    
    if (!username.trim() || !password.trim()) {
      soundFx.playWrong();
      setErrorMessage('Mohon isi username dan kata sandi terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    soundFx.playClick();

    setTimeout(() => {
      const result = authenticateUser(username, password);
      if (result.success) {
        soundFx.playCorrect();
        onLogin(result.user, rememberMe);
      } else {
        soundFx.playWrong();
        setErrorMessage('Username atau password salah! (Catatan: username dan password sama, misal admin / admin atau user1 / user1)');
        setIsLoading(false);
      }
    }, 250);
  };

  const handleQuickSelect = (acc) => {
    soundFx.playClick();
    setUsername(acc.username);
    setPassword(acc.password);
    setErrorMessage('');
    
    // Auto-login on quick card click for convenience
    setIsLoading(true);
    setTimeout(() => {
      soundFx.playCorrect();
      onLogin(acc, rememberMe);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-700 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-amber-400 selection:text-slate-900 relative overflow-hidden">
      
      {/* Playful Floating Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left / Top Banner: Jelajah Ekonomi Branding */}
        <div className="lg:col-span-5 bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle decoration patterns */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

          {/* Header & Logo */}
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-bold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Media Edukasi Interaktif IPS SMP</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/95 p-1.5 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform flex items-center justify-center border border-white/40">
                <img src={jelakomLogo} alt="Logo Jelajah Ekonomi" className="w-full h-full object-contain drop-shadow" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow">
                  Jelajah Ekonomi
                </h1>
                <p className="text-xs text-sky-100 font-medium mt-0.5">
                  Produksi • Distribusi • Konsumsi
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed pt-2">
              Selamat datang para penjelajah muda! Masuk ke akunmu untuk melanjutkan misi kepulauan ekonomi, mengumpulkan koin edukasi, dan menata avatar kebanggaanmu.
            </p>
          </div>

          {/* Quick Account Information Box */}
          <div className="mt-8 pt-6 border-t border-white/15 space-y-3 relative z-10">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-[11px] text-sky-100 space-y-1.5">
              <p className="font-semibold text-white flex items-center gap-1">
                💡 <span className="text-amber-300">Format Akun & Password:</span>
              </p>
              <p className="leading-snug text-sky-100/90">
                Password setiap akun <strong>sama persis</strong> dengan username-nya:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sky-200 font-mono text-[11px]">
                <li><span className="text-amber-300 font-bold">admin</span> / <span className="text-white">admin</span> (Admin Tester)</li>
                <li><span className="text-amber-300 font-bold">user1</span> / <span className="text-white">user1</span> (Siswa)</li>
                <li><span className="text-amber-300 font-bold">user2</span> / <span className="text-white">user2</span> (Siswa)</li>
                <li><span className="text-amber-300 font-bold">user3</span> / <span className="text-white">user3</span> (Siswa)</li>
                <li><span className="text-amber-300 font-bold">user4</span> / <span className="text-white">user4</span> (Siswa)</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right / Main: Login Form & Quick Select */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Masuk Akun
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Pilih salah satu akun pengujian atau masukkan username
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs font-semibold animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                <div className="flex-1">
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sky-600" />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Contoh: admin atau user1"
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                  {username && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">
                      ID
                    </span>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-sky-600" />
                    Kata Sandi (Password)
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    Sama dengan username
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun"
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none"
                    title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 border-slate-300 focus:ring-sky-500"
                  />
                  Ingat saya di perangkat ini
                </label>
                <span className="text-sky-600 font-bold text-[11px]">
                  5 Akun Tersedia
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Mulai Petualangan</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

            </form>

            {/* Quick 1-Click Select Buttons */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  1-Klik Masuk Akun Uji Coba:
                </p>
                <span className="text-[10px] text-slate-400 font-medium">Klik langsung login</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEFAULT_ACCOUNTS.map((acc) => {
                  const isAdmin = acc.role === 'admin';
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleQuickSelect(acc)}
                      className={`p-2.5 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-95 group relative flex flex-col justify-between ${
                        isAdmin
                          ? 'bg-rose-50/70 border-rose-200 hover:border-rose-400 hover:bg-rose-100/70'
                          : 'bg-slate-50 border-slate-200 hover:border-sky-300 hover:bg-sky-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-xs font-black font-mono ${isAdmin ? 'text-rose-700' : 'text-sky-700'}`}>
                          {acc.username}
                        </span>
                        {isAdmin ? (
                          <span className="px-1.5 py-0.5 rounded-md bg-rose-200 text-rose-800 text-[9px] font-black uppercase tracking-wider">
                            Admin
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold">
                            Lv.{acc.level}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 truncate w-full">
                        {acc.name.split(' ')[0]}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                        <Coins className="w-3 h-3 text-amber-500" />
                        <span>{acc.coins}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Tersedia 5 Akun Siap Uji
            </span>
            <span className="text-slate-400 text-[11px] font-medium">
              Jelajah Ekonomi IPS SMP
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
