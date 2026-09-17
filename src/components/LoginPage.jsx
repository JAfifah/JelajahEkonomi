import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { authenticateUser } from '../data/accountsData';
import { soundFx } from '../utils/audio';
import { loginUserApi } from '../utils/apiService';
import { saveStudentData } from '../utils/storage';
import loginBg from '../assets/login_bg.jpg';
import loginIslands from '../assets/login_islands.jpg';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    
    if (!username.trim() || !password.trim()) {
      soundFx.playWrong();
      setErrorMessage('Mohon isi username dan kata sandi terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    soundFx.playClick();

    try {
      // 1. Try MySQL Database authentication first
      const apiResult = await loginUserApi(username.trim(), password.trim());
      if (apiResult && apiResult.success) {
        soundFx.playCorrect();
        if (apiResult.studentData) {
          saveStudentData(apiResult.studentData, apiResult.user);
        }
        onLogin(apiResult.user, rememberMe);
        return;
      }

      if (apiResult && apiResult.success === false && apiResult.message) {
        soundFx.playWrong();
        setErrorMessage(apiResult.message);
        setIsLoading(false);
        return;
      }

      // 2. Fallback to offline local authentication if server is unreachable
      const result = authenticateUser(username, password);
      if (result.success) {
        soundFx.playCorrect();
        onLogin(result.user, rememberMe);
      } else {
        soundFx.playWrong();
        setErrorMessage('Username atau kata sandi salah. Silakan periksa kembali.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      const result = authenticateUser(username, password);
      if (result.success) {
        soundFx.playCorrect();
        onLogin(result.user, rememberMe);
      } else {
        soundFx.playWrong();
        setErrorMessage('Username atau kata sandi salah. Silakan periksa kembali.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#0d2238] bg-cover bg-center flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-amber-400 selection:text-slate-900 relative overflow-hidden"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Subtle deep nautical ambient overlay */}
      <div className="absolute inset-0 bg-sky-950/20 backdrop-brightness-95 pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,10,25,0.7)] border border-white/20 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Maritime Map & Jelajah Ekonomi Branding */}
        <div className="lg:col-span-6 bg-[#0f2137] p-7 sm:p-9 text-white flex flex-col justify-between relative overflow-hidden min-h-[380px] lg:min-h-[480px]">
          
          {/* Island Map Artwork in the background */}
          <img 
            src={loginIslands} 
            alt="Peta Jelajah Ekonomi" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 pointer-events-none scale-105"
          />
          
          {/* Dark gradient overlay for crystal clear typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1f35]/90 via-[#0e1f35]/55 to-[#0b1727]/90 pointer-events-none" />

          {/* Top Section: Badge & Header */}
          <div className="space-y-4 relative z-10">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b3452]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-amber-100 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Media Edukasi interaktif IPS SMP</span>
            </div>

            {/* App Title */}
            <div className="pt-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Jelajah Ekonomi
              </h1>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-[13px] text-sky-100/90 leading-relaxed font-normal pt-1 drop-shadow">
              Selamat datang para penjelajah muda! Masuk ke akunmu untuk melanjutkan misi kepulauan ekonomi, mengumpulkan koin edukasi, dan menata avatar kebanggaanmu.
            </p>
          </div>

          {/* Left Footer: Author Note */}
          <div className="mt-8 pt-5 border-t border-white/15 text-xs text-sky-200/80 font-medium flex items-center justify-between relative z-10">
            <span>Naimah S.Pd</span>
            <span>Edisi SMP / MTs</span>
          </div>

        </div>

        {/* Right Column: Clean White Login Form */}
        <div className="lg:col-span-6 p-7 sm:p-9 lg:p-10 flex flex-col justify-between bg-white relative z-10">
          
          <div>
            {/* Form Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f1f38] tracking-tight">
                Masuk Akun
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Masukkan username dan kata sandi untuk melanjutkan
              </p>
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

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Contoh: admin atau user1"
                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-slate-200/90 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal text-center focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                  Kata Sandi (Password)
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun"
                    className="w-full pl-4 pr-11 py-3.5 bg-[#f8f9fa] border border-slate-200/90 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal text-center focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 p-1 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="pt-0.5">
                <label className="flex items-center gap-2.5 cursor-pointer select-none text-slate-700 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#143d63] border-slate-300 focus:ring-[#143d63] accent-[#143d63]"
                  />
                  Ingat saya di perangkat ini
                </label>
              </div>

              {/* Submit Pill Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#173a62] via-[#102b4d] to-[#0c1f38] hover:from-[#1c4573] hover:to-[#102642] active:scale-[0.99] text-white font-black text-sm sm:text-base border border-amber-300/40 shadow-[0_8px_20px_rgba(10,25,45,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="tracking-wide">Mulai Petualangan</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

            </form>

          </div>

          {/* Right Footer: Copyright / Media info */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Media Pembelajaran IPS SMP</span>
            <span>Jelajah Ekonomi</span>
          </div>

        </div>

      </div>

    </div>
  );
}

