import React from 'react';

/**
 * Component: RambutPerempuanPendek (React SVG Asset Component)
 * 
 * Gaya Rambut: Potongan bob pendek manis dan rapi untuk perempuan.
 * Kontur poni dahi dan samping wajah yang halus, bersih, dan seamless.
 */
export default function RambutPerempuanPendek({
  color = '#251712',
  highlightColor = '#5e3c2f',
  opacity = 1,
  asGroup = false,
  viewBox = '0 0 240 420',
  className = '',
  ...props
}) {
  const gradientId = `hairGirlShortGrad_${Math.random().toString(36).substr(2, 9)}`;
  const highlightGradId = `hairGirlShortHighlight_${Math.random().toString(36).substr(2, 9)}`;

  const hairContent = (
    <g id="rambut-perempuan-pendek" opacity={opacity} {...props}>
      <defs>
        {/* Gradient Warna Rambut Utama (Hitam / Cokelat Tua Vector) */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustHexColor(color, 35)} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={adjustHexColor(color, -25)} />
        </linearGradient>

        {/* Gradient Aksen Highlight Kilap Kartun */}
        <linearGradient id={highlightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.75" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor={highlightColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* 1. LAYER SILUET BELAKANG (Volume Rambut Bob Belakang Kepala) */}
      <path
        d="M 68 84 
           C 64 30 84 10 120 8 
           C 156 10 176 30 172 84 
           L 164 88 
           C 168 40 152 14 120 12 
           C 88 14 72 40 76 88 Z"
        fill={`url(#${gradientId})`}
      />

      {/* 2. LAYER UTAMA RAMBUT BOB & PONI DAHI SEAMLESS (Tanpa Overlap Garis Stroke) */}
      <path
        d="M 76 56 
           C 74 30 90 12 120 10 
           C 150 12 166 30 164 56
           C 168 74 166 92 156 92
           C 152 78 154 58 148 48
           Q 134 40 120 43
           Q 106 40 92 48
           C 86 58 88 78 84 92
           C 74 92 72 74 76 56 Z"
        fill={`url(#${gradientId})`}
        stroke={adjustHexColor(color, -40)}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 3. DETAIL HELAI PONI MANIS SOFT (Tekstur Alur Rambut Halus Tanpa Garis Tebal) */}
      <path
        d="M 108 24 Q 104 36 102 44"
        stroke={adjustHexColor(color, 25)}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 132 24 Q 136 36 138 44"
        stroke={adjustHexColor(color, 25)}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* 4. AKSEN KILAP / HIGHLIGHT MANIS (Cartoon Specular Glow) */}
      <path
        d="M 94 20 C 108 14 132 14 146 20 C 134 23 108 23 94 20 Z"
        fill={`url(#${highlightGradId})`}
      />
      <ellipse cx="120" cy="18" rx="28" ry="4" fill="#ffffff" opacity="0.25" />

      {/* 5. TEKSTUR HELAI RAMBUT BOB SAMPING */}
      <path d="M 80 62 Q 78 76 82 86" stroke={adjustHexColor(color, 25)} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M 160 62 Q 162 76 158 86" stroke={adjustHexColor(color, 25)} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
    </g>
  );

  if (asGroup) {
    return hairContent;
  }

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
