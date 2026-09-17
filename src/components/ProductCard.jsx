import React from 'react';

/**
 * Sub-komponen Kapsul Badge Kategori
 * Mendukung varian warna kebutuhan primer, sekunder, dan tersier
 */
export function CategoryBadge({ 
  label = 'Kebutuhan Primer', 
  variant = 'primer',
  className = '' 
}) {
  const variantStyles = {
    primer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    sekunder: 'bg-amber-50 text-amber-700 border-amber-200',
    tersier: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const selectedVariant = variantStyles[variant] || variantStyles.primer;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-xs transition-colors ${selectedVariant} ${className}`}
    >
      {label}
    </span>
  );
}

/**
 * Sub-komponen Info Header Produk
 * Menampilkan Badge, Judul, dan Deskripsi
 */
export function ProductInfo({
  category = 'Kebutuhan Primer',
  categoryVariant = 'primer',
  title = 'Celana Panjang Biru SMP',
  description = 'Celana seragam sekolah SMP rapi berwarna biru tua.',
  className = ''
}) {
  return (
    <div className={`space-y-2 sm:space-y-3 ${className}`}>
      {/* Badge Kategori */}
      <div>
        <CategoryBadge label={category} variant={categoryVariant} />
      </div>

      {/* Judul Produk */}
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
        {title}
      </h3>

      {/* Deskripsi Produk */}
      <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/**
 * Komponen Utama: ProductCard (Modular & Responsif)
 * Dapat digunakan langsung tanpa props (default: Celana Panjang Biru SMP)
 * atau dikustomisasi secara modular melalui props & children slot.
 */
export default function ProductCard({
  category = 'Kebutuhan Primer',
  categoryVariant = 'primer',
  title = 'Celana Panjang Biru SMP',
  description = 'Celana seragam sekolah SMP rapi berwarna biru tua.',
  icon,
  children,
  className = '',
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 hover:border-indigo-300 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      {/* Bagian Konten Utama */}
      <div className="space-y-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-2">
            {icon}
          </div>
        )}

        <ProductInfo
          category={category}
          categoryVariant={categoryVariant}
          title={title}
          description={description}
        />
      </div>

      {/* Slot Modular Tambahan (misal: harga, tombol aksi, dll) */}
      {children && (
        <div className="mt-6 pt-4 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}
