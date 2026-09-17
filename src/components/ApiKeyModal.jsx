import React, { useState } from 'react';
import { Key, X, CheckCircle2, Sparkles, ExternalLink, ShieldCheck, Wifi, Loader2, AlertCircle } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { test9RouterConnection } from '../utils/geminiService';

export default function ApiKeyModal({ isOpen, onClose, student, updateStudentData }) {
  const [apiKeyInput, setApiKeyInput] = useState(student.geminiApiKey || '');
  const [serverUrlInput, setServerUrlInput] = useState(() => {
    return localStorage.getItem('kebutuhanquest_9router_url') || 'http://192.168.100.70:20128';
  });
  const [testStatus, setTestStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = (e) => {
    e.preventDefault();
    soundFx.playClick();
    localStorage.setItem('kebutuhanquest_9router_url', serverUrlInput.trim());
    updateStudentData({
      ...student,
      geminiApiKey: apiKeyInput.trim()
    });
    onClose();
  };

  const handleTestConnection = async () => {
    soundFx.playClick();
    setIsTesting(true);
    setTestStatus(null);
    try {
      const res = await test9RouterConnection(apiKeyInput, serverUrlInput);
      setTestStatus(res);
      if (res.success) {
        soundFx.playSuccess?.();
      }
    } catch (err) {
      setTestStatus({ success: false, message: 'Koneksi gagal: ' + err.message });
    } finally {
      setIsTesting(false);
    }
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
            <h3 className="text-xl font-black text-slate-900">Pengaturan 9Router Gateway</h3>
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
                ? 'Semua foto akan dianalisis melalui 9Router API (Server Laptop).'
                : 'Aplikasi siap digunakan 100%! Key default 9Router telah diaktifkan.'}
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSaveKey} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Alamat Server 9Router (Host / IP Laptop):
            </label>
            <div className="relative">
              <input
                type="text"
                value={serverUrlInput}
                onChange={(e) => setServerUrlInput(e.target.value)}
                placeholder="http://192.168.100.70:20128"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-500">
              IP Laptop server saat ini: <code className="font-bold text-indigo-600">http://192.168.100.70:20128</code>
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Masukkan 9Router API Key:
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-04ded80af82184d6-xji11m-80ccc120"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Test Connection Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>Menguji Koneksi ke Laptop Server...</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tes Sambungan ke Server 9Router</span>
                </>
              )}
            </button>

            {testStatus && (
              <div className={`mt-2 p-2.5 rounded-xl border text-[11px] flex items-center gap-2 ${
                testStatus.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}>
                {testStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span className="font-semibold">{testStatus.message}</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-emerald-600 flex items-center gap-1">
              💡 Status API 9Router:
            </p>
            <p>
              Default API Key 9Router (<code className="font-mono bg-slate-200 px-1 py-0.5 rounded text-[10px]">sk-04de...80ccc120</code>) di laptop server Anda sudah terhubung aktif.
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
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
