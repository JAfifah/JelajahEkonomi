import React, { useState } from 'react';
import { Key, X, CheckCircle2, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ApiKeyModal({ isOpen, onClose, student, updateStudentData }) {
  const [apiKeyInput, setApiKeyInput] = useState(student.geminiApiKey || '');

  if (!isOpen) return null;

  const handleSaveKey = (e) => {
    e.preventDefault();
    soundFx.playClick();
    updateStudentData({
      ...student,
      geminiApiKey: apiKeyInput.trim()
    });
    onClose();
  };

  const handleRemoveKey = () => {
    soundFx.playClick();
    setApiKeyInput('');
    updateStudentData({
      ...student,
      geminiApiKey: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Pengaturan 9Router API Key</h3>
            <p className="text-xs text-slate-500">Integrasi AI Router untuk Misi Foto AI</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
          student.geminiApiKey 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          <ShieldCheck className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-extrabold text-sm">
              Status: {student.geminiApiKey ? 'Terhubung dengan 9Router API' : 'Mode Smart Vision Engine (Aktif Tambahan)'}
            </p>
            <p className="text-[11px] opacity-90 mt-0.5">
              {student.geminiApiKey
                ? 'Semua foto akan dianalisis melalui 9Router API.'
                : 'Aplikasi siap digunakan 100%! Key default 9Router telah diaktifkan.'}
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSaveKey} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Masukkan 9Router API Key:
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-aba05541f9164d44-bhi1xh-a5e4130e"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-emerald-600 flex items-center gap-1">
              💡 Status API 9Router:
            </p>
            <p>
              Default API Key 9Router (<code className="font-mono bg-slate-200 px-1 py-0.5 rounded text-[10px]">sk-aba0...a5e4130e</code>) sudah dikonfigurasi secara otomatis untuk pemindaian foto AI.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            {student.geminiApiKey && (
              <button
                type="button"
                onClick={handleRemoveKey}
                className="py-2.5 px-4 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold text-xs"
              >
                Hapus API Key
              </button>
            )}

            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 border border-slate-200"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg"
              >
                Simpan API Key
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
