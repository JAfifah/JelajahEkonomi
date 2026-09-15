import React from 'react';

/**
 * Component: RambutAnakLakiLaki (React SVG Asset Component)
 * 
 * Deskripsi:
 * Komponen React SVG vektor 2D datar (Flat Design) untuk gaya rambut pendek kasual, 
 * rapi, dan natural anak laki-laki. Dirancang presisi untuk dipasangkan di atas kepala
 * karakter ilustrasi 2D bulat tanpa menutupi bagian telinga.
 * 
 * Props:
 * - color: Warna utama rambut (default: '#2c1a14' - Cokelat Gelap / Hitam Kartun)
 * - highlightColor: Warna aksen kilap/highlight (default: '#684534')
 * - opacity: Opasitas layer rambut (default: 1)
 * - asGroup: Jika true, me-render tag <g> untuk dimasukkan langsung dalam <svg> canvas.
 *            Jika false, me-render tag <svg> pembungkus standalone.
 * - viewBox: Ukuran viewBox SVG jika standalone (default: '0 0 240 420')
 * - className: CSS Class untuk kontainer SVG
 */
export default function RambutAnakLakiLaki({
  color = '#2c1a14',
  highlightColor = '#684534',
  opacity = 1,
  asGroup = false,
  viewBox = '0 0 240 420',
  className = '',
  ...props
}) {
  // Unik ID untuk Gradient SVG agar tidak bentrok jika dipanggil berulang
  const gradientId = `hairBoyGrad_${Math.random().toString(36).substr(2, 9)}`;
  const highlightGradId = `hairBoyHighlight_${Math.random().toString(36).substr(2, 9)}`;

  // Konten Grafik Rambut (SVG Path Elements)
  const hairContent = (
    <g id="rambut-anak-laki-laki" opacity={opacity} {...props}>
      <defs>
        {/* Gradient Utama Warna Rambut (Hitam / Cokelat Gelap) */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustHexColor(color, 35)} />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={adjustHexColor(color, -25)} />
        </linearGradient>

        {/* Gradient Highlight Aksen Tipis Kartun */}
        <linearGradient id={highlightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor={highlightColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* 1. LAYER SILUET BELAKANG (Memberi Volume Rambut di Belakang Kepala) */}
      <path
        d="M 72 65 
           C 66 38 82 10 120 8 
           C 158 10 174 38 168 65 
           C 166 72 160 70 159 60 
           C 162 38 149 14 120 12 
           C 91 14 78 38 81 60 
           C 80 70 74 72 72 65 Z"
        fill={`url(#${gradientId})`}
      />

      {/* 2. LAYER SHADOW DI BAWAH PONI (Bayangan Halus pada Dahi) */}
      <path
        d="M 77 42 
           C 82 46 86 44 91 48
           C 97 43 102 46 108 48
           C 114 42 120 46 126 49
           C 132 43 138 47 144 48
           C 150 42 155 46 160 48
           C 164 42 165 52 165 56
           Q 120 54 75 56
           Z"
        fill="#000000"
        opacity="0.12"
      />

      {/* 3. LAYER UTAMA RAMBUT PENDEK RAPI (Modern Layered Boy Cut) */}
      {/* 
         Koordinat Presisi Kepala Bulat:
         - Top Crown: Y=8 s/d 14
         - Left Sideburns (Cambang Kiri): Berhenti di X=79, Y=54 (Telinga Kiri di X=70-82 Y=58-78 -> TIDAK TERPAUT/TERTUTUP)
         - Right Sideburns (Cambang Kanan): Berhenti di X=161, Y=54 (Telinga Kanan di X=158-170 Y=58-78 -> TIDAK TERPAUT/TERTUTUP)
         - Forehead Bangs (Poni Dahi): Berada di rentang Y=38 s/d 46 (Alis di Y=46-53 -> Alis Tetap Terlihat)
      */}
      <path
        d="M 78 54
           C 74 44 79 26 91 18
           C 103 11 119 9 135 11
           L 142 6 L 145 14
           L 153 10 L 154 18
           L 161 15 L 160 23
           C 166 32 167 44 162 54
           L 158 46
           L 152 48 
           L 146 42 
           L 139 47 
           L 131 41 
           L 124 47 
           L 116 40 
           L 109 46 
           L 101 39 
           L 95 45 
           L 87 39 
           L 83 46
           Z"
        fill={`url(#${gradientId})`}
        stroke={adjustHexColor(color, -40)}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 4. AKSEN HIGHLIGHT TIPIS KASAI KARTUN (Glow Melengkung di Mahkota Rambut) */}
      {/* Highlight Kilap Utama */}
      <path
        d="M 96 20 C 110 14 130 14 144 20 C 134 23 110 23 96 20 Z"
        fill={`url(#${highlightGradId})`}
      />
      {/* Pantulan Cahaya Garis Tipis (Anime Specular Line) */}
      <path
        d="M 102 18 Q 120 13 138 18"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      
      {/* 5. TEKSTUR STRUKTUR HELAI RAMBUT (Detail Garis Tekstur Kasual Rapi) */}
      <path d="M 92 24 Q 96 32 94 38" stroke={adjustHexColor(color, 25)} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M 112 18 Q 115 28 112 36" stroke={adjustHexColor(color, 25)} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M 136 21 Q 138 30 134 38" stroke={adjustHexColor(color, 25)} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M 152 26 Q 154 34 150 42" stroke={adjustHexColor(color, 25)} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
    </g>
  );

  // Jika dipanggil di dalam <svg> lain (misal AvatarCanvas), kembalikan elemen <g>
  if (asGroup) {
    return hairContent;
  }

  // Jika dipanggil standalone, bungkus dengan tag <svg>
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={`overflow-visible ${className}`}
      {...props}
    >
      {hairContent}
    </svg>
  );
}

/**
 * Helper function untuk menyesuaikan kecerahan warna HEX (gelap/terang)
 */
function adjustHexColor(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = (num >> 8 & 0x00FF) + amt;
  let B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
