import React from 'react';

/**
 * ProductInfo Component
 * Menampilkan informasi produk secara bersih dan responsif:
 * - Badge kategori (default: Kebutuhan Primer)
 * - Judul produk tebal dan besar (default: Rok Sekolah Biru SMP)
 * - Deskripsi ringkas abu-abu (default: Rok seragam SMP rapi berwarna biru tua.)
 */
export default function ProductInfo({
  category = 'Kebutuhan Primer',
  title = 'Rok Sekolah Biru SMP',
  description = 'Rok seragam SMP rapi berwarna biru tua.',
  className = ''
}) {
  return (
    <div className={`space-y-2.5 sm:space-y-3 font-sans ${className}`}>
      {/* Badge Kategori Hijau Muda */}
      <div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
          {category}
        </span>
      </div>

      {/* Judul Produk Tebal & Besar */}
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>

      {/* Deskripsi Abu-abu Responsif */}
      <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
