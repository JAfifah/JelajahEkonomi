import React from 'react';

/**
 * Component: RambutMohawk (React SVG Asset Component)
 * 
 * Desain:
 * Gaya rambut mohawk punk modern & stylish untuk avatar.
 * Memiliki jambul duri (spikes) yang berdiri tegak, gagah, dan berdimensi di bagian tengah kepala.
 * Bagian samping kepala bersih dan rapi (clean shaved sides) dengan cambang lancip presisi
 * tanpa tempelan bayangan abu-abu yang kotor/kaku.
 * 
 * Props:
 * - color: Warna rambut utama
 * - highlightColor: Warna kilap/aksen ujung duri mohawk
 * - opacity: Opasitas layer rambut
 * - asGroup: Boolean jika ingin me-render <g> langsung di dalam SVG canvas
 */
export default function RambutMohawk({
  color = '#1e293b',
  highlightColor = '#64748b',
  opacity = 1,
  asGroup = false,
  viewBox = '0 0 240 420',
  className = '',
  ...props
}) {
  const gradId = `mohawkGrad_${Math.random().toString(36).substr(2, 9)}`;
  const hlGradId = `mohawkHl_${Math.random().toString(36).substr(2, 9)}`;
  const strokeColor = adjustHexColor(color, -35);

  const hairContent = (
    <g id="rambut-mohawk" opacity={opacity} {...props}>
      <defs>
        {/* Gradient Utama Mohawk */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustHexColor(color, 35)} />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={adjustHexColor(color, -25)} />
        </linearGradient>

        {/* Gradient Highlight Ujung Spike */}
        <linearGradient id={hlGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.9" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor={highlightColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>



      {/* 2. BASE CREST / DUDUKAN MOHAWK (Menempel Alami di Garis Rambut Kepala) */}
      <path
        d="M 94 36 
           C 102 24 110 18 120 18 
           C 130 18 138 24 146 36 
           C 138 40 130 42 120 42 
           C 110 42 102 40 94 36 Z"
        fill={`url(#${gradId})`}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 3. JAMBUL DURI MOHAWK UTAMA (Spiky Punk Crest Gagah) */}
      <path
        d="M 96 36
           L 100 24
           L 108 14
           L 112 20
           L 116 2
           L 122 10
           L 124 -6
           L 128 6
           L 134 0
           L 135 14
           L 142 12
           L 140 24
           L 146 22
           L 142 36
           C 134 40 128 42 120 42
           C 112 42 104 40 96 36 Z"
        fill={`url(#${gradId})`}
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 4. FACET HIGHLIGHT CAHAYA DURI MOHAWK (Efek 3D Berdimensi) */}
      <path
        d="M 98 34 L 100 24 L 108 14 L 110 22 L 116 2 L 118 14 L 124 -6 L 123 18 Z"
        fill={`url(#${hlGradId})`}
      />

      {/* Titik Kilau Tajam di Ujung Duri Mohawk */}
      <circle cx="108" cy="14" r="1.5" fill="#ffffff" opacity="0.8" />
      <circle cx="116" cy="2" r="1.8" fill="#ffffff" opacity="0.9" />
      <circle cx="124" cy="-6" r="2.2" fill="#ffffff" opacity="0.95" />
      <circle cx="134" cy="0" r="1.6" fill="#ffffff" opacity="0.8" />

      {/* Garis Tekstur Alur Duri */}
      <path d="M 110 24 L 112 16" stroke={adjustHexColor(color, 35)} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M 118 20 L 120 10" stroke={adjustHexColor(color, 35)} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M 124 24 L 125 12" stroke={adjustHexColor(color, 35)} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M 132 26 L 133 16" stroke={adjustHexColor(color, 35)} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

      {/* Garis Aksen Rambut Depan (Forehead Peak Detail) */}
      <path
        d="M 106 38 Q 120 42 134 38"
        stroke={adjustHexColor(color, -25)}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </g>
  );

  if (asGroup) {
    return hairContent;
  }

  return (
    <svg
      viewBox={viewBox}
      className={`overflow-visible ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {hairContent}
    </svg>
  );
}

// Helper untuk mencerahkan atau menggelapkan warna HEX
function adjustHexColor(col, amt) {
  let usePound = false;
  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}
