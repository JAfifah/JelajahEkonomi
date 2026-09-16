import React from 'react';
import RambutAnakLakiLaki from './RambutAnakLakiLaki';
import RambutPerempuanPendek from './RambutPerempuanPendek';

/**
 * High-Precision Vector SVG Avatar Component (.jsx)
 * Art style matching 2D Webtoon/Cartoon anime boy with full modular attire customization.
 */
export default function AvatarCanvas({ 
  equipped, 
  previewItem = null, 
  size = 'lg', 
  viewMode = null, 
  animated = true,
  isWaving = null
}) {
  const wavingActive = isWaving !== null ? isWaving : (animated && size !== 'sm');
  // Merge equipped items with preview item if provided
  const activeEquipped = { ...(equipped || {}) };
  if (previewItem) {
    activeEquipped[previewItem.category] = previewItem.id;
    if (previewItem.category === 'accessories') {
      activeEquipped.accessory = previewItem.id;
      activeEquipped.hairstyle = previewItem.id;
    }
  }

  const skinTone = activeEquipped.skinTone || '#f9bfa7';
  const hairColor = activeEquipped.hairColor || '#4a2c20';

  // Effective view mode: size 'sm' defaults to half-body (head to chest)
  const effectiveViewMode = viewMode || (size === 'sm' ? 'half-body' : 'full');

  // Size mapping
  const sizeMap = {
    sm: { width: 44, height: 44 },
    md: { width: 140, height: 250 },
    lg: { width: 220, height: 390 },
    xl: { width: 300, height: 530 }
  };

  const { width, height } = sizeMap[size] || sizeMap.lg;
  const viewBox = (effectiveViewMode === 'half-body' || effectiveViewMode === 'bust')
    ? '25 0 190 190'
    : '0 0 240 420';

  return (
    <div className={`relative inline-flex items-center justify-center ${animated ? 'animate-bounce-subtle' : ''}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className="filter drop-shadow-xl overflow-visible transition-all duration-300"
      >
        <defs>
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skinTone} />
            <stop offset="100%" stopColor={adjustColor(skinTone, -18)} />
          </linearGradient>

          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={adjustColor(hairColor, 25)} />
            <stop offset="50%" stopColor={hairColor} />
            <stop offset="100%" stopColor={adjustColor(hairColor, -25)} />
          </linearGradient>

          <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="shortsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78869b" />
            <stop offset="100%" stopColor="#525e75" />
          </linearGradient>

          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.22" />
          </filter>

          {/* SVG Keyframe Animations */}
          <style>{`
            @keyframes avatarWaveArm {
              0%, 100% { transform: rotate(0deg); }
              12% { transform: rotate(-16deg); }
              24% { transform: rotate(14deg); }
              36% { transform: rotate(-16deg); }
              48% { transform: rotate(12deg); }
              60% { transform: rotate(-8deg); }
              72% { transform: rotate(0deg); }
            }
            @keyframes avatarBlink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.08); }
            }
            @keyframes avatarIdleBreath {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
            @keyframes avatarShadowPulse {
              0%, 100% { transform: scale(1); opacity: 0.16; }
              50% { transform: scale(0.92); opacity: 0.10; }
            }
          `}</style>
        </defs>

        {/* --- SHADOW BASE ON GROUND --- */}
        <ellipse 
          cx="120" 
          cy="410" 
          rx="65" 
          ry="8" 
          fill="#000000" 
          opacity="0.16" 
          style={animated ? { transformOrigin: '120px 410px', animation: 'avatarShadowPulse 2.6s ease-in-out infinite' } : {}}
        />

        {/* --- ANIMATED CHARACTER BODY (Idle Breathing Float) --- */}
        <g style={animated ? { animation: 'avatarIdleBreath 2.6s ease-in-out infinite' } : {}}>
          
          {/* --- BACK ACCESSORIES (e.g. Backpack / Cape) --- */}
          {renderBackAccessory(activeEquipped.accessory, activeEquipped.top)}

          {/* --- LEGS & BARE FEET BASE --- */}
          {/* Left Leg & Foot */}
          <path
            d="M 84 270 L 82 342 C 80 353 64 357 48 361 C 42 363 42 368 48 368 L 104 368 C 108 368 108 356 106 342 L 106 270 Z"
            fill="url(#skinGradient)"
            stroke={adjustColor(skinTone, -30)}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Right Leg & Foot */}
          <path
            d="M 134 270 L 134 342 C 132 356 132 368 136 368 L 192 368 C 198 368 198 363 192 361 C 176 357 158 353 156 342 L 156 270 Z"
            fill="url(#skinGradient)"
            stroke={adjustColor(skinTone, -30)}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          
          {/* Knees Shader */}
          <ellipse cx="94" cy="305" rx="5" ry="3" fill="#f43f5e" opacity="0.25" />
          <ellipse cx="146" cy="305" rx="5" ry="3" fill="#f43f5e" opacity="0.25" />

          {/* --- BOTTOMS (SHORTS / SKIRT / PANTS) --- */}
          {renderBottoms(activeEquipped.bottom)}

          {/* --- SHOES --- */}
          {renderShoes(activeEquipped.shoes)}

          {/* --- ARMS BASE --- */}
          {/* Left Arm (Relaxed) */}
          <path d="M 72 125 Q 60 180 68 245 L 82 245 Q 76 180 84 125 Z" fill="url(#skinGradient)" stroke={adjustColor(skinTone, -30)} strokeWidth="1" />

          {/* Left Hand */}
          <g>
            <path
              d="M 68 245 C 58 252 60 264 70 268 C 78 270 83 262 81 255 C 85 252 84 247 80 245 Z"
              fill="url(#skinGradient)"
              stroke={adjustColor(skinTone, -30)}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path d="M 80 247 C 77 251 76 255 77 258" fill="none" stroke={adjustColor(skinTone, -25)} strokeWidth="1" opacity="0.6" />
          </g>

          {/* Right Arm: When not waving, render resting arm and hand */}
          {!wavingActive && (
            <>
              {/* Normal Relaxed Right Arm */}
              <path d="M 168 125 Q 180 180 172 245 L 158 245 Q 164 180 156 125 Z" fill="url(#skinGradient)" stroke={adjustColor(skinTone, -30)} strokeWidth="1" />
              {/* Normal Relaxed Right Hand */}
              <g>
                <path
                  d="M 172 245 C 182 252 180 264 170 268 C 162 270 157 262 159 255 C 155 252 156 247 160 245 Z"
                  fill="url(#skinGradient)"
                  stroke={adjustColor(skinTone, -30)}
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="M 160 247 C 163 251 164 255 163 258" fill="none" stroke={adjustColor(skinTone, -25)} strokeWidth="1" opacity="0.6" />
              </g>
            </>
          )}

          {/* --- TOPS (WHITE T-SHIRT / UNIFORM / JACKET) --- */}
          {renderTops(activeEquipped.top, wavingActive)}

          {/* --- ANIMATED WAVING FOREARM & HAND (Proportional & Natural) --- */}
          {wavingActive && (
            <g 
              className="avatar-waving-arm"
              style={{ 
                transformOrigin: '178px 166px', 
                animation: animated ? 'avatarWaveArm 2.2s ease-in-out infinite' : 'none' 
              }}
            >
              {/* Proportional Forearm emerging smoothly from sleeve cuff (uniform 14-15px width) */}
              <path
                d="M 170 168 
                   C 172 150 178 130 190 96 
                   L 204 94 
                   C 192 130 186 150 185 165 Z"
                fill="url(#skinGradient)"
                stroke={adjustColor(skinTone, -30)}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              
              {/* Proportional Cartoon Waving Hand (matched scale to left hand) */}
              <path
                d="M 190 96 
                   C 186 92 183 87 182 82 
                   C 180 77 184 75 186 78 
                   C 188 80 189 82 191 78 
                   C 190 73 191 67 193 66 
                   C 195 65 197 67 197 73 
                   C 198 69 200 66 202 66 
                   C 204 66 205 69 205 73 
                   C 206 70 207 68 209 68 
                   C 211 68 211 71 210 75 
                   C 211 80 209 87 204 94 Z"
                fill="url(#skinGradient)"
                stroke={adjustColor(skinTone, -30)}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              
              {/* Palm crease detail */}
              <path d="M 189 84 Q 196 88 203 85" fill="none" stroke={adjustColor(skinTone, -25)} strokeWidth="1" opacity="0.6" />
            </g>
          )}

          {/* --- NECK & HEAD --- */}
          {/* Neck */}
          <path d="M 110 98 L 110 118 Q 120 122 130 118 L 130 98 Z" fill={adjustColor(skinTone, -12)} />
          <path d="M 110 108 Q 120 115 130 108 Z" fill="#f43f5e" opacity="0.15" />

          {/* Head Shape */}
          <path d="M 82 62 Q 80 105 120 110 Q 160 105 158 62 C 160 20 80 20 82 62 Z" fill="url(#skinGradient)" filter="url(#softShadow)" />

          {/* Ears */}
          {/* Left Ear */}
          <path
            d="M 82 58 C 70 58 70 78 82 78 Z"
            fill="url(#skinGradient)"
            stroke={adjustColor(skinTone, -30)}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M 80 64 Q 74 68 80 72" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* Right Ear */}
          <path
            d="M 158 58 C 170 58 170 78 158 78 Z"
            fill="url(#skinGradient)"
            stroke={adjustColor(skinTone, -30)}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M 160 64 Q 166 68 160 72" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* Eyes with Anime Blinking Animation */}
          <g style={animated ? { transformOrigin: '120px 65px', animation: 'avatarBlink 4.2s infinite' } : {}}>
            {/* Left Eye */}
            <ellipse cx="102" cy="65" rx="7.5" ry="9" fill="#291e1a" />
            <circle cx="100" cy="62" r="3" fill="#ffffff" />
            <circle cx="104" cy="68" r="1.5" fill="#ffffff" opacity="0.8" />

            {/* Right Eye */}
            <ellipse cx="138" cy="65" rx="7.5" ry="9" fill="#291e1a" />
            <circle cx="136" cy="62" r="3" fill="#ffffff" />
            <circle cx="140" cy="68" r="1.5" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Eyebrows */}
          <path d="M 93 51 Q 102 46 111 53" stroke="#291e1a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 129 53 Q 138 46 147 51" stroke="#291e1a" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Nose Bridge */}
          <path d="M 119 68 L 121 75 L 118 76" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />

          {/* Blush Cheeks */}
          <ellipse cx="92" cy="74" rx="8" ry="4.5" fill="#f43f5e" opacity="0.3" />
          <ellipse cx="148" cy="74" rx="8" ry="4.5" fill="#f43f5e" opacity="0.3" />

          {/* Friendly Open Smile */}
          <path d="M 106 82 Q 120 96 134 82 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5" />
          {/* Teeth */}
          <path d="M 108 83 Q 120 88 132 83 Q 120 86 108 83 Z" fill="#ffffff" />
          {/* Tongue */}
          <path d="M 112 90 Q 120 95 128 90 Q 120 96 112 90 Z" fill="#f43f5e" />

          {/* --- HAIRSTYLE / HEAD COVERING --- */}
          {renderHair(activeEquipped.accessories || activeEquipped.accessory || activeEquipped.hairstyle, hairColor)}

          {/* --- HEAD ACCESSORIES (CAP, GLASSES, CROWN) --- */}
          {renderHeadAccessory(activeEquipped.accessories || activeEquipped.accessory)}
        </g>
      </svg>

      {/* Preview Tag */}
      {previewItem && (
        <span className="absolute -top-4 right-0 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow animate-pulse z-20 whitespace-nowrap">
          PREVIEW: {previewItem.name}
        </span>
      )}
    </div>
  );
}

// =========================================================================
// ATTIRE RENDERERS MATCHING 2D WEBTOON ART STYLE
// =========================================================================

function renderTops(topId, isWaving = false) {
  switch (topId) {
    case 'top-seragam-smp':
      return (
        <g>
          {/* SMP White Uniform Shirt */}
          <path d="M 72 114 L 168 114 L 164 210 L 76 210 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Left Sleeve */}
          <path d="M 72 114 L 54 165 L 75 168 L 78 122 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Right Sleeve */}
          {renderRightSleeve(topId, isWaving)}
          {/* Collars */}
          <path d="M 98 114 L 120 138 L 88 114 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 142 114 L 120 138 L 152 114 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          {/* Blue Tie */}
          <path d="M 116 122 L 124 122 L 127 175 L 120 184 L 113 175 Z" fill="#1e3a8a" />
          {/* Badge IPS */}
          <rect x="138" y="142" width="16" height="20" rx="2" fill="#2563eb" />
          <text x="146" y="156" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">IPS</text>
        </g>
      );

    case 'top-jaket-produksi':
      return (
        <g>
          {/* Green Factory Jacket */}
          <path d="M 68 112 L 172 112 L 165 212 L 75 212 Z" fill="#059669" />
          {/* Left Sleeve */}
          <path d="M 68 112 L 48 168 L 70 172 L 74 120 Z" fill="#059669" />
          {/* Right Sleeve */}
          {renderRightSleeve(topId, isWaving)}
          {/* Zipper Line */}
          <line x1="120" y1="112" x2="120" y2="212" stroke="#fbbf24" strokeWidth="3.5" />
          {/* Pockets */}
          <rect x="85" y="165" width="24" height="28" rx="3" fill="#047857" />
          <rect x="131" y="165" width="24" height="28" rx="3" fill="#047857" />
        </g>
      );

    case 'top-rompi-kurir':
      return (
        <g>
          {/* Blue Inner Shirt */}
          <path d="M 75 114 L 165 114 L 160 210 L 80 210 Z" fill="#3b82f6" />
          {/* Left Sleeve */}
          <path d="M 68 112 L 48 168 L 70 172 L 74 120 Z" fill="#3b82f6" />
          {/* Right Sleeve */}
          {renderRightSleeve(topId, isWaving)}
          {/* Orange Vest */}
          <path d="M 68 112 L 105 112 L 110 212 L 72 212 Z" fill="#d97706" />
          <path d="M 172 112 L 135 112 L 130 212 L 168 212 Z" fill="#d97706" />
          {/* Reflective Strips */}
          <rect x="72" y="155" width="34" height="10" fill="#fef08a" />
          <rect x="134" y="155" width="34" height="10" fill="#fef08a" />
        </g>
      );

    case 'top-kaos-ips':
    default:
      return (
        <g>
          {/* White Crew-Neck T-Shirt matching reference image */}
          <path d="M 72 114 L 168 114 L 162 212 L 78 212 Z" fill="url(#shirtGradient)" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Left Sleeve */}
          <path d="M 72 114 L 52 165 L 75 168 L 78 122 Z" fill="url(#shirtGradient)" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Right Sleeve */}
          {renderRightSleeve(topId)}
          {/* Crew-Neck Collar Line */}
          <path d="M 102 114 Q 120 128 138 114" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
          {/* Shirt Fold Wrinkles */}
          <path d="M 120 170 Q 135 185 142 205" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
          <path d="M 108 190 Q 120 198 128 208" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
        </g>
      );
  }
}

function renderRightSleeve(topId) {
  switch (topId) {
    case 'top-seragam-smp':
      return <path d="M 168 114 L 188 165 L 165 168 L 162 122 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />;
    case 'top-jaket-produksi':
      return <path d="M 172 112 L 192 168 L 170 172 L 166 120 Z" fill="#059669" />;
    case 'top-rompi-kurir':
      return <path d="M 172 112 L 190 168 L 168 172 L 166 120 Z" fill="#3b82f6" />;
    case 'top-kaos-ips':
    default:
      return <path d="M 168 114 L 188 165 L 165 168 L 162 122 Z" fill="url(#shirtGradient)" stroke="#cbd5e1" strokeWidth="1.5" />;
  }
}

function renderBottoms(bottomId) {
  switch (bottomId) {
    case 'bottom-rok-smp':
      return (
        <g>
          {/* Blue Pleated Skirt */}
          <path d="M 80 205 L 160 205 L 178 275 L 62 275 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
          <line x1="95" y1="205" x2="88" y2="275" stroke="#172554" strokeWidth="2" />
          <line x1="120" y1="205" x2="120" y2="275" stroke="#172554" strokeWidth="2" />
          <line x1="145" y1="205" x2="152" y2="275" stroke="#172554" strokeWidth="2" />
        </g>
      );

    case 'bottom-celana-cargo':
      return (
        <g>
          {/* Dark Grey Cargo Pants */}
          <path d="M 82 208 L 118 208 L 114 300 L 86 300 Z" fill="#374151" stroke="#1f2937" strokeWidth="1" />
          <path d="M 122 208 L 158 208 L 154 300 L 126 300 Z" fill="#374151" stroke="#1f2937" strokeWidth="1" />
          <rect x="84" y="245" width="18" height="24" rx="3" fill="#1f2937" />
          <rect x="138" y="245" width="18" height="24" rx="3" fill="#1f2937" />
        </g>
      );

    case 'bottom-celana-emas':
      return (
        <g>
          {/* Royal Gold Pants */}
          <path d="M 82 208 L 118 208 L 114 300 L 86 300 Z" fill="url(#goldGradient)" />
          <path d="M 122 208 L 158 208 L 154 300 L 126 300 Z" fill="url(#goldGradient)" />
        </g>
      );

    case 'bottom-jeans-biru':
    default:
      return (
        <g>
          {/* Grey Shorts matching reference image */}
          <path d="M 80 208 L 118 208 L 114 275 L 82 275 Z" fill="url(#shortsGradient)" stroke="#475569" strokeWidth="1.5" />
          <path d="M 122 208 L 160 208 L 158 275 L 126 275 Z" fill="url(#shortsGradient)" stroke="#475569" strokeWidth="1.5" />
          {/* Pocket Seam Curves */}
          <path d="M 88 208 Q 98 225 82 232" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          <path d="M 152 208 Q 142 225 158 232" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          {/* Fly Seam Line */}
          <path d="M 120 208 L 120 235 Q 124 240 120 248" stroke="#334155" strokeWidth="1.5" fill="none" />
        </g>
      );
  }
}

function renderShoes(shoesId) {
  switch (shoesId) {
    case 'shoes-hitam-sekolah':
      return (
        <g>
          {/* Black School Shoes pointing outward */}
          <path
            d="M 76 334 C 74 350 58 355 46 359 C 40 362 40 374 46 374 L 108 374 C 112 374 112 354 110 334 Q 93 342 76 334 Z"
            fill="#111827"
            stroke="#030712"
            strokeWidth="1.2"
          />
          <path
            d="M 130 334 C 128 354 128 374 132 374 L 194 374 C 200 374 200 362 194 359 C 182 355 166 350 164 334 Q 147 342 130 334 Z"
            fill="#111827"
            stroke="#030712"
            strokeWidth="1.2"
          />
          {/* Soles */}
          <rect x="42" y="370" width="68" height="5" rx="2" fill="#374151" />
          <rect x="130" y="370" width="68" height="5" rx="2" fill="#374151" />
        </g>
      );

    case 'shoes-boots-lapangan':
      return (
        <g>
          {/* Brown Field Boots pointing outward with higher collar */}
          <path
            d="M 76 326 C 74 346 58 352 44 357 C 38 360 38 376 44 376 L 108 376 C 112 376 112 350 110 326 Q 93 336 76 326 Z"
            fill="#78350f"
            stroke="#451a03"
            strokeWidth="1.2"
          />
          <path
            d="M 130 326 C 128 350 128 376 132 376 L 196 376 C 202 376 202 360 196 357 C 182 352 166 346 164 326 Q 147 336 130 326 Z"
            fill="#78350f"
            stroke="#451a03"
            strokeWidth="1.2"
          />
          {/* Heavy Soles */}
          <rect x="40" y="370" width="72" height="7" rx="2" fill="#1c1917" />
          <rect x="128" y="370" width="72" height="7" rx="2" fill="#1c1917" />
        </g>
      );

    case 'shoes-sepatu-terbang':
      return (
        <g>
          {/* Sky Blue Flying Sneakers pointing outward */}
          <path
            d="M 76 334 C 74 350 58 355 46 359 C 40 362 40 374 46 374 L 108 374 C 112 374 112 354 110 334 Q 93 342 76 334 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="1.2"
          />
          <path
            d="M 130 334 C 128 354 128 374 132 374 L 194 374 C 200 374 200 362 194 359 C 182 355 166 350 164 334 Q 147 342 130 334 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="1.2"
          />
          {/* Glowing Wing accent */}
          <path d="M 78 348 L 60 344 L 70 356 Z" fill="#bae6fd" />
          <path d="M 162 348 L 180 344 L 170 356 Z" fill="#bae6fd" />
          {/* Soles */}
          <rect x="42" y="370" width="68" height="5" rx="2" fill="#38bdf8" />
          <rect x="130" y="370" width="68" height="5" rx="2" fill="#38bdf8" />
        </g>
      );

    case 'shoes-sneakers-putih':
    default:
      return (
        <g>
          {/* Blue & White Canvas Sneakers with seamless 3D collar opening */}
          {/* Left Shoe Upper Body */}
          <path
            d="M 76 334 C 74 350 58 355 46 359 C 40 362 40 374 46 374 L 108 374 C 112 374 112 354 110 334 Q 93 342 76 334 Z"
            fill="#3b82f6"
            stroke="#1d4ed8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* White Rubber Toe Cap on left tip */}
          <path d="M 46 359 C 40 362 40 374 46 374 L 60 374 C 60 364 53 360 46 359 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* White Rubber Sole */}
          <rect x="40" y="370" width="70" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* Yellow Laces on Instep */}
          <line x1="64" y1="352" x2="78" y2="344" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="358" x2="82" y2="350" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />

          {/* Right Shoe Upper Body */}
          <path
            d="M 130 334 C 128 354 128 374 132 374 L 194 374 C 200 374 200 362 194 359 C 182 355 166 350 164 334 Q 147 342 130 334 Z"
            fill="#3b82f6"
            stroke="#1d4ed8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* White Rubber Toe Cap on right tip */}
          <path d="M 194 359 C 200 362 200 374 194 374 L 180 374 C 180 364 187 360 194 359 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* White Rubber Sole */}
          <rect x="130" y="370" width="70" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* Yellow Laces on Instep */}
          <line x1="176" y1="352" x2="162" y2="344" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          <line x1="172" y1="358" x2="158" y2="350" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
  }
}

function renderHair(style, color) {
  if (!style || style === 'none' || style === 'hair-gundul-bebas' || style === 'bald') return null;

  switch (style) {
    case 'hair-rambut-laki':
    case 'short-casual':
      return <RambutAnakLakiLaki asGroup color={color} />;

    case 'hair-perempuan-pendek':
    case 'girl-short':
      return <RambutPerempuanPendek asGroup color={color} />;

    case 'hair-perempuan-panjang':
    case 'girl-long':
      return (
        <g id="hair-perempuan-panjang">
          {/* Long Back Hair Flowing Down Behind Shoulders */}
          <path
            d="M 62 170 C 58 100 70 20 120 8 C 170 20 182 100 178 170 C 166 170 162 120 162 70 C 162 30 142 14 120 12 C 98 14 78 30 78 70 C 78 120 74 170 62 170 Z"
            fill="url(#hairGradient)"
          />
          {/* Long Front Hair Strands Over Shoulders */}
          <path
            d="M 74 62 C 72 32 90 14 120 12 C 150 14 166 32 166 62
               C 170 100 168 150 158 150
               C 152 135 152 90 146 54
               C 134 42 106 42 94 54
               C 88 90 88 135 82 150
               C 72 150 70 100 74 62 Z"
            fill="url(#hairGradient)"
            stroke={adjustColor(color, -25)}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Elegant Side-Swept Bangs */}
          <path
            d="M 82 46 Q 106 34 130 48 Q 112 40 82 46 Z"
            fill="url(#hairGradient)"
          />
          <path
            d="M 116 42 Q 138 34 158 48 Q 138 40 116 42 Z"
            fill="url(#hairGradient)"
          />
          {/* Specular Highlight */}
          <ellipse cx="120" cy="18" rx="32" ry="5" fill="#ffffff" opacity="0.22" />
        </g>
      );

    case 'hair-hijab-sekolah':
    case 'hijab':
      return (
        <g id="hair-hijab">
          {/* White Student Hijab Draping Head & Shoulders */}
          <path
            d="M 58 148 C 52 95 66 12 120 10 C 174 12 188 95 182 148 C 162 152 138 156 120 156 C 102 156 78 152 58 148 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            filter="url(#softShadow)"
          />
          {/* Inner Face Oval Frame (Lingkar Muka Hijab) */}
          <path
            d="M 82 42 C 92 32 148 32 158 42 C 164 62 162 92 152 104 C 140 114 100 114 88 104 C 78 92 76 62 82 42 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {/* Blue Inner Ciput Cap at forehead */}
          <path
            d="M 86 40 Q 120 30 154 40 Q 120 35 86 40 Z"
            fill="#2563eb"
          />
          {/* Hijab Folds */}
          <path d="M 96 114 Q 120 128 144 114" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
          <path d="M 84 128 Q 120 145 156 128" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
        </g>
      );

    default:
      return null;
  }
}

function renderHeadAccessory(accId) {
  switch (accId) {
    case 'acc-topi-kebutuhan':
      return (
        <g>
          {/* Blue Baseball Cap */}
          <path d="M 76 42 Q 120 8 164 42 Z" fill="#3b82f6" />
          {/* Visor Brim */}
          <path d="M 68 42 Q 110 36 172 42 L 174 48 Q 110 42 66 48 Z" fill="#1d4ed8" />
          {/* IPS Star */}
          <polygon points="120,20 123,26 130,26 125,30 127,36 120,32 113,36 115,30 110,26 117,26" fill="#facc15" />
        </g>
      );

    case 'acc-kacamata-detektif':
      return (
        <g>
          {/* Sunglasses */}
          <rect x="90" y="58" width="24" height="16" rx="3" fill="#0f172a" />
          <rect x="126" y="58" width="24" height="16" rx="3" fill="#0f172a" />
          <line x1="114" y1="64" x2="126" y2="64" stroke="#475569" strokeWidth="3" />
          <line x1="76" y1="64" x2="90" y2="64" stroke="#475569" strokeWidth="2" />
          <line x1="150" y1="64" x2="164" y2="64" stroke="#475569" strokeWidth="2" />
          {/* Glare */}
          <line x1="92" y1="60" x2="100" y2="70" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          <line x1="128" y1="60" x2="136" y2="70" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
        </g>
      );

    case 'acc-mahkota-emas':
      return (
        <g>
          {/* Golden Crown */}
          <polygon points="85,38 95,12 110,30 120,4 130,30 145,12 155,38" fill="url(#goldGradient)" filter="url(#softShadow)" />
          {/* Jewels */}
          <circle cx="95" cy="16" r="3" fill="#ef4444" />
          <circle cx="120" cy="8" r="4" fill="#3b82f6" />
          <circle cx="145" cy="16" r="3" fill="#10b981" />
        </g>
      );

    default:
      return null;
  }
}

function renderBackAccessory(accId, topId) {
  if (accId === 'acc-tas-ransel-smp') {
    return (
      <g>
        {/* Red Backpack straps & back */}
        <rect x="58" y="118" width="124" height="85" rx="16" fill="#ef4444" filter="url(#softShadow)" />
        <rect x="68" y="128" width="104" height="65" rx="10" fill="#dc2626" />
        <text x="120" y="162" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Jelajah Ekonomi</text>
      </g>
    );
  }
  return null;
}

// Utility to lighten or darken HEX colors
function adjustColor(col, amt) {
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
