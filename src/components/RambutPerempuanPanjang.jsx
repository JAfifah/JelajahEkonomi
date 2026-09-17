import React, { useId } from 'react';

/**
 * Component: RambutPerempuanPanjang (React SVG Asset Component)
 * 
 * Desain: Rambut panjang perempuan anime yang rapi, anggun, dan proporsional.
 * - Layering yang benar:
 *   1. Layer Belakang (Back Hair): Mengembang indah di belakang leher, bahu, dan lengan yang melambai.
 *   2. Layer Depan (Front Hair): Mahkota kepala yang bulat dan bervolume, poni dahi anime yang rapi
 *      dan manis (tidak menutupi mata), helai samping kiri ramping yang anggun di pundak kiri,
 *      serta helai pipi kanan rapi yang tidak menabrak lengan kanan saat melambai.
 */
export default function RambutPerempuanPanjang({
  color = '#1e293b',
  highlightColor = '#64748b',
  opacity = 1,
  layer = 'all', // 'back', 'front', or 'all'
  _asGroup = false,
  ...props
}) {
  const rawId = useId().replace(/:/g, '');
  const gradId = `longHairGrad_${rawId}`;
  const highlightId = `longHairHl_${rawId}`;
  const strokeColor = adjustHexColor(color, -30);

  // Gradient SVG untuk warna rambut dan highlight kilap
  const gradientDefs = (
    <defs>
      <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={adjustHexColor(color, 28)} />
        <stop offset="40%" stopColor={color} />
        <stop offset="100%" stopColor={adjustHexColor(color, -22)} />
      </linearGradient>
      <linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={highlightColor} stopOpacity="0.8" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="100%" stopColor={highlightColor} stopOpacity="0.1" />
      </linearGradient>
    </defs>
  );

  // 1. LAYER BELAKANG: Terurai lurus rapi & anggun di belakang kepala dan punggung (garis samping lurus mulus tanpa lekukan)
  const backLayer = (
    <g id="rambut-panjang-belakang" opacity={opacity}>
      {gradientDefs}

      {/* Siluet Rambut Panjang Lurus Jatuh Sempurna (Sisi Kiri & Kanan Lurus Rapi) */}
      <path
        d="M 66 38
           C 66 18 88 4 120 4
           C 152 4 174 18 174 38
           L 174 182
           C 170 185 162 185 158 182
           C 154 185 146 185 142 182
           C 138 185 130 185 126 182
           C 122 185 114 185 110 182
           C 106 185 98 185 94 182
           C 90 185 82 185 78 182
           C 74 185 70 184 66 182
           L 66 38 Z"
        fill={`url(#${gradId})`}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Garis Tekstur Alur Rambut Lurus & Halus */}
      <line x1="82" y1="45" x2="82" y2="176" stroke={adjustHexColor(color, -20)} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <line x1="100" y1="55" x2="100" y2="178" stroke={adjustHexColor(color, -16)} strokeWidth="1" strokeLinecap="round" opacity="0.25" />
      <line x1="120" y1="40" x2="120" y2="180" stroke={adjustHexColor(color, -16)} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <line x1="140" y1="55" x2="140" y2="178" stroke={adjustHexColor(color, -16)} strokeWidth="1" strokeLinecap="round" opacity="0.25" />
      <line x1="158" y1="45" x2="158" y2="176" stroke={adjustHexColor(color, -20)} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </g>
  );

  // 2. LAYER DEPAN: Poni dahi anime manis & helai samping pembingkai pipi (tanpa overlap garis samping luar)
  const frontLayer = (
    <g id="rambut-panjang-depan" opacity={opacity}>
      {gradientDefs}

      {/* Poni Dahi Anime Cantik & Helai Pembingkai Wajah Halus */}
      <path
        d="M 74 50
           C 74 24 88 8 120 8
           C 152 8 166 24 166 50
           C 166 64 164 78 160 90
           C 157 93 154 92 153 86
           C 152 76 153 58 146 46
           C 140 40 135 42 131 46
           C 126 40 120 40 116 46
           C 111 40 105 40 99 46
           C 93 40 88 42 84 50
           C 84 62 85 76 83 86
           C 82 92 79 93 77 90
           C 74 78 74 64 74 50 Z"
        fill={`url(#${gradId})`}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Detail Alur Poni Lembut */}
      <path d="M 108 22 Q 104 34 102 42" stroke={adjustHexColor(color, 25)} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M 120 20 Q 120 32 120 44" stroke={adjustHexColor(color, 25)} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M 132 22 Q 136 34 138 42" stroke={adjustHexColor(color, 25)} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />

      {/* Tekstur Alur Pembingkai Samping Pipi */}
      <path d="M 78 54 Q 76 70 79 82" stroke={adjustHexColor(color, 25)} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M 162 54 Q 164 70 161 82" stroke={adjustHexColor(color, 25)} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.35" />

      {/* Kilau Rambut Mahkota (Angel Ring Glow) */}
      <path
        d="M 90 18 C 104 12 136 12 150 18 C 138 21 102 21 90 18 Z"
        fill={`url(#${highlightId})`}
      />
      <ellipse cx="120" cy="16" rx="26" ry="3.5" fill="#ffffff" opacity="0.3" />
    </g>
  );

  if (layer === 'back') {
    return backLayer;
  }

  if (layer === 'front') {
    return frontLayer;
  }

  return (
    <g id="rambut-perempuan-panjang-group" {...props}>
      {backLayer}
      {frontLayer}
    </g>
  );
}

// Utility untuk mengatur kecerahan warna Hex
function adjustHexColor(col, amt) {
  let usePound = false;
  if (col[0] === "#") {
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
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}
