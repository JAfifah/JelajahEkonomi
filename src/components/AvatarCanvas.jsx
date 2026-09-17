import React from 'react';
import RambutAnakLakiLaki from './RambutAnakLakiLaki';
import RambutPerempuanPendek from './RambutPerempuanPendek';
import RambutPerempuanPanjang from './RambutPerempuanPanjang';
import RambutMohawk from './RambutMohawk';
import jelakomLogo from '../assets/jelakom.png';

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
    if (previewItem.category === 'bottoms') {
      activeEquipped.bottom = previewItem.id;
      activeEquipped.bottoms = previewItem.id;
    }
    if (previewItem.category === 'tops') {
      activeEquipped.top = previewItem.id;
      activeEquipped.tops = previewItem.id;
    }
    if (previewItem.category === 'accessories') {
      activeEquipped.accessory = previewItem.id;
      activeEquipped.hairstyle = previewItem.id;
      activeEquipped.accessories = previewItem.id;
    }
  }

  const skinTone = activeEquipped.skinTone || '#f9bfa7';
  const hairColor = activeEquipped.hairColor || '#4a2c20';

  // Effective view mode: size 'sm' defaults to half-body (head to chest)
  const effectiveViewMode = viewMode || (size === 'sm' ? 'half-body' : 'full');
  const isHalfBody = effectiveViewMode === 'half-body' || effectiveViewMode === 'bust';

  // Size mapping
  const sizeMap = {
    sm: { width: 44, height: 44 },
    md: isHalfBody ? { width: 76, height: 76 } : { width: 140, height: 250 },
    lg: isHalfBody ? { width: 120, height: 120 } : { width: 220, height: 390 },
    xl: { width: 300, height: 530 }
  };

  const { width, height } = sizeMap[size] || sizeMap.lg;
  const viewBox = isHalfBody
    ? '25 0 190 190'
    : '0 0 240 420';

  return (
    <div className={`relative inline-flex items-center justify-center ${animated ? 'animate-bounce-subtle' : ''}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className={`filter drop-shadow-xl ${isHalfBody ? 'overflow-hidden rounded-full' : 'overflow-visible'} transition-all duration-300`}
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
            @keyframes goldSparkleTwinkle {
              0%, 100% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
              }
              25% {
                transform: scale(0.65) rotate(45deg);
                opacity: 0.75;
              }
              50% {
                transform: scale(1.25) rotate(90deg);
                opacity: 1;
              }
              75% {
                transform: scale(0.65) rotate(135deg);
                opacity: 0.75;
              }
            }
            @keyframes goldGlitterPulse {
              0%, 100% {
                opacity: 0.2;
                transform: scale(0.6);
              }
              50% {
                opacity: 1;
                transform: scale(1.4);
              }
            }
            .gold-twinkle {
              transform-box: fill-box;
              transform-origin: center;
            }
            @keyframes lightningZapPulse {
              0%, 100% {
                filter: drop-shadow(0 0 2px #facc15);
                opacity: 0.9;
              }
              50% {
                filter: drop-shadow(0 0 6px #38bdf8) drop-shadow(0 0 9px #fef08a);
                opacity: 1;
              }
            }
            @keyframes electricSparkleTwinkle {
              0%, 100% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
              }
              25% {
                transform: scale(0.65) rotate(45deg);
                opacity: 0.8;
              }
              50% {
                transform: scale(1.3) rotate(90deg);
                opacity: 1;
              }
              75% {
                transform: scale(0.65) rotate(135deg);
                opacity: 0.8;
              }
            }
            @keyframes electricArcFlash {
              0%, 100% {
                opacity: 0;
                transform: scale(0.6);
              }
              20%, 45% {
                opacity: 1;
                transform: scale(1.2);
              }
              70% {
                opacity: 0.2;
              }
            }
            .electric-sparkle {
              transform-box: fill-box;
              transform-origin: center;
            }
          `}</style>
        </defs>

        {/* --- SHADOW BASE ON GROUND --- */}
        {!isHalfBody && (
          <ellipse 
            cx="120" 
            cy="410" 
            rx="65" 
            ry="8" 
            fill="#000000" 
            opacity="0.16" 
            style={animated ? { transformOrigin: '120px 410px', animation: 'avatarShadowPulse 2.6s ease-in-out infinite' } : {}}
          />
        )}

        {/* --- ANIMATED CHARACTER BODY (Idle Breathing Float) --- */}
        <g style={animated ? { animation: 'avatarIdleBreath 2.6s ease-in-out infinite' } : {}}>
          
          {/* --- BACK ACCESSORIES (e.g. Backpack / Cape) --- */}
          {renderBackAccessory(activeEquipped.accessory, activeEquipped.top)}

          {/* --- BACK HAIR (e.g. for flowing long hair behind torso) --- */}
          {renderBackHair(activeEquipped.accessories || activeEquipped.accessory || activeEquipped.hairstyle, hairColor)}

          {/* --- LEGS & BARE FEET BASE --- */}
          {!isHalfBody && (
            <>
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
              {renderBottoms(activeEquipped.bottoms || activeEquipped.bottom)}

              {/* --- SHOES --- */}
              {renderShoes(activeEquipped.shoes)}
            </>
          )}

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
          {renderTops(activeEquipped.tops || activeEquipped.top, wavingActive)}

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

      {/* Preview Tag (Rapi, Simetris di Tengah, & Tidak Miring) */}
      {previewItem && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md z-20 whitespace-nowrap flex items-center gap-1.5 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-white inline-block" />
          Preview: {previewItem.name}
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

          {/* Saku Dada Kemeja SMP */}
          <path 
            d="M 134 140 L 158 140 L 158 168 L 146 173 L 134 168 Z" 
            fill="#ffffff" 
            stroke="#cbd5e1" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
          />
          <line x1="134" y1="144" x2="158" y2="144" stroke="#e2e8f0" strokeWidth="1" />

          {/* ========================================================================= */}
          {/* LOGO OSIS SMP RESMI INDONESIA */}
          {/* ========================================================================= */}
          <g id="logo-osis-smp">
            {/* 1. Perisai Dasar Kuning Emas OSIS */}
            <path 
              d="M 138.5 161 
                 C 137.5 158 138 152 138 149 
                 C 138 144.5 141.5 143 146 143 
                 C 150.5 143 154 144.5 154 149 
                 C 154 152 154.5 158 153.5 161 Z" 
              fill="#facc15" 
              stroke="#0f172a" 
              strokeWidth="0.8" 
              strokeLinejoin="round"
            />

            {/* 2. Lengkungan Pelangi Merah Putih di Kubah Atas */}
            <path 
              d="M 139.2 149.5 C 139.5 145.2 142.2 144 146 144 C 149.8 144 152.5 145.2 152.8 149.5" 
              fill="none" 
              stroke="#dc2626" 
              strokeWidth="1.2" 
            />
            <path 
              d="M 140.2 150 C 140.5 146.5 142.8 145.2 146 145.2 C 149.2 145.2 151.5 146.5 151.8 150" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="0.8" 
            />

            {/* 3. Tangkai Padi Kuning Keemasan (Kiri) */}
            <path d="M 139.5 159 Q 140 154 141.2 150.5" fill="none" stroke="#d97706" strokeWidth="0.9" />
            <circle cx="140.2" cy="152" r="0.6" fill="#fef08a" stroke="#b45309" strokeWidth="0.3" />
            <circle cx="139.8" cy="154" r="0.6" fill="#fef08a" stroke="#b45309" strokeWidth="0.3" />
            <circle cx="139.5" cy="156" r="0.6" fill="#fef08a" stroke="#b45309" strokeWidth="0.3" />
            <circle cx="139.2" cy="158" r="0.6" fill="#fef08a" stroke="#b45309" strokeWidth="0.3" />

            {/* 4. Tangkai Kapas Hijau Putih (Kanan) */}
            <path d="M 152.5 159 Q 152 154 150.8 150.5" fill="none" stroke="#15803d" strokeWidth="0.9" />
            <circle cx="151.8" cy="152" r="0.7" fill="#ffffff" stroke="#15803d" strokeWidth="0.4" />
            <circle cx="152.2" cy="154" r="0.7" fill="#ffffff" stroke="#15803d" strokeWidth="0.4" />
            <circle cx="152.5" cy="156" r="0.7" fill="#ffffff" stroke="#15803d" strokeWidth="0.4" />
            <circle cx="152.8" cy="158" r="0.7" fill="#ffffff" stroke="#15803d" strokeWidth="0.4" />

            {/* 5. Sepasang Tangan Penopang (Merah Bata) */}
            <path d="M 143.2 155.5 C 143.2 153.5 144.2 152.2 144.6 154" fill="none" stroke="#b91c1c" strokeWidth="1" strokeLinecap="round" />
            <path d="M 148.8 155.5 C 148.8 153.5 147.8 152.2 147.4 154" fill="none" stroke="#b91c1c" strokeWidth="1" strokeLinecap="round" />

            {/* 6. Bunga Bintang 5 Sudut Putih (Inti Lambang OSIS) */}
            <polygon 
              points="146,147.5 148,150 147.2,152.5 144.8,152.5 144,150" 
              fill="#ffffff" 
              stroke="#0f172a" 
              strokeWidth="0.5" 
              strokeLinejoin="round" 
            />
            <circle cx="146" cy="150" r="0.7" fill="#facc15" stroke="#0f172a" strokeWidth="0.3" />

            {/* 7. Buku Terbuka Putih di Bawah */}
            <path 
              d="M 143 158.5 
                 Q 144.5 157.8 146 159 
                 Q 147.5 157.8 149 158.5 
                 L 149 156.5 
                 Q 147.5 155.8 146 157 
                 Q 144.5 155.8 143 156.5 Z" 
              fill="#ffffff" 
              stroke="#0f172a" 
              strokeWidth="0.5" 
              strokeLinejoin="round" 
            />
            <line x1="146" y1="157" x2="146" y2="159" stroke="#0f172a" strokeWidth="0.4" />

            {/* 8. Pita Dasar Hitam & Plakat Merah "OSIS" */}
            <path 
              d="M 137.5 161.5 
                 L 154.5 161.5 
                 C 155.5 164 154.5 165.5 153 165.5 
                 L 139 165.5 
                 C 137.5 165.5 136.5 164 137.5 161.5 Z" 
              fill="#0f172a" 
              stroke="#000000" 
              strokeWidth="0.5" 
            />
            <rect 
              x="138.8" 
              y="162.2" 
              width="14.4" 
              height="2.8" 
              rx="0.6" 
              fill="#dc2626" 
              stroke="#991b1b" 
              strokeWidth="0.3" 
            />
            <text 
              x="146" 
              y="164.5" 
              fill="#ffffff" 
              fontSize="2.4" 
              fontWeight="900" 
              textAnchor="middle" 
              letterSpacing="0.4" 
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              OSIS
            </text>
          </g>
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
        <g id="top-kaos-ips">
          {/* White Crew-Neck T-Shirt matching reference image */}
          <path d="M 72 114 L 168 114 L 162 212 L 78 212 Z" fill="url(#shirtGradient)" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Left Sleeve */}
          <path d="M 72 114 L 52 165 L 75 168 L 78 122 Z" fill="url(#shirtGradient)" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Right Sleeve */}
          {renderRightSleeve(topId)}
          {/* Crew-Neck Collar Line */}
          <path d="M 102 114 Q 120 128 138 114" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
          {/* Shirt Fold Wrinkles */}
          <path d="M 120 178 Q 135 190 142 205" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
          <path d="M 108 192 Q 120 198 128 208" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

          {/* Logo Kebanggaan Pejuang IPS Jelajah Ekonomi (jelakom.png) */}
          <image 
            href={jelakomLogo} 
            xlinkHref={jelakomLogo} 
            x="103" 
            y="126" 
            width="34" 
            height="34" 
            preserveAspectRatio="xMidYMid meet" 
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}
          />

          {/* Tulisan Branded "Jelajah Ekonomi" Khas Squad IPS */}
          <g id="brand-text-jelajah-ekonomi">
            {/* Cyan Blue Badge Banner */}
            <rect 
              x="83" 
              y="161" 
              width="74" 
              height="14" 
              rx="7" 
              fill="#0ea5e9" 
              stroke="#0284c7" 
              strokeWidth="1" 
              style={{ filter: 'drop-shadow(0 1px 2px rgba(2,132,199,0.35))' }}
            />
            {/* Text: "Jelajah" (Kuning Emas) & "Ekonomi" (Putih Bersih) Tebal Miring */}
            <text 
              x="120" 
              y="171.5" 
              textAnchor="middle" 
              fontSize="7.5" 
              fontWeight="900" 
              fontStyle="italic"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.3"
            >
              <tspan fill="#fde047" style={{ filter: 'drop-shadow(0.5px 1px 0px rgba(180,83,9,0.5))' }}>Jelajah </tspan>
              <tspan fill="#ffffff" style={{ filter: 'drop-shadow(0.5px 1px 0px rgba(3,105,161,0.6))' }}>Ekonomi</tspan>
            </text>
          </g>
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
        <g id="bottom-rok-smp">
          {/* Blue Pleated Skirt (Panjang Sopan Khas Seragam SMP) */}
          <path 
            d="M 76 206 
               L 164 206 
               L 184 310 
               C 184 313 181 315 177 315 
               L 63 315 
               C 59 315 56 313 56 310 Z" 
            fill="#1e3a8a" 
            stroke="#172554" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
          {/* Skirt pleat lines (Lipatan Rok Rempel SMP) */}
          <line x1="82" y1="206" x2="68" y2="315" stroke="#172554" strokeWidth="1.5" />
          <line x1="98" y1="206" x2="92" y2="315" stroke="#172554" strokeWidth="1.5" />
          <line x1="114" y1="206" x2="114" y2="315" stroke="#172554" strokeWidth="1.5" />
          <line x1="126" y1="206" x2="126" y2="315" stroke="#172554" strokeWidth="1.5" />
          <line x1="142" y1="206" x2="148" y2="315" stroke="#172554" strokeWidth="1.5" />
          <line x1="158" y1="206" x2="172" y2="315" stroke="#172554" strokeWidth="1.5" />
          
          {/* Subtle Highlight & Soft Shadow on Pleats */}
          <path d="M 114 206 L 126 206 L 126 314 L 114 314 Z" fill="#2563eb" opacity="0.18" />
          <path d="M 98 206 L 114 206 L 114 314 L 92 314 Z" fill="#172554" opacity="0.12" />
          
          {/* Bottom Hem Stitch Line */}
          <line x1="60" y1="311" x2="180" y2="311" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
        </g>
      );

    case 'bottom-celana-smp':
      return (
        <g id="bottom-celana-smp">
          {/* SMP Blue Long Uniform Pants */}
          <path d="M 78 208 L 118 208 L 114 340 L 78 340 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
          <path d="M 122 208 L 162 208 L 162 340 L 126 340 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
          <line x1="96" y1="214" x2="96" y2="336" stroke="#172554" strokeWidth="1.2" opacity="0.6" />
          <line x1="144" y1="214" x2="144" y2="336" stroke="#172554" strokeWidth="1.2" opacity="0.6" />
        </g>
      );

    case 'bottom-celana-cargo':
      return (
        <g id="bottom-celana-cargo">
          {/* Dark Charcoal Tactical Cargo Pants - Full Length matching SMP pants */}
          {/* Left Leg */}
          <path 
            d="M 78 208 L 118 208 L 114 340 L 78 340 Z" 
            fill="#374151" 
            stroke="#1f2937" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
          {/* Right Leg */}
          <path 
            d="M 122 208 L 162 208 L 162 340 L 126 340 Z" 
            fill="#374151" 
            stroke="#1f2937" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />

          {/* Waist & Front Fly Seams */}
          <path d="M 120 208 L 120 234 Q 123 238 120 244" stroke="#1f2937" strokeWidth="1.5" fill="none" />
          
          {/* Upper Slash Hand Pockets */}
          <path d="M 82 210 Q 94 225 80 232" stroke="#1f2937" strokeWidth="1.5" fill="none" />
          <path d="M 158 210 Q 146 225 160 232" stroke="#1f2937" strokeWidth="1.5" fill="none" />

          {/* Left Side Cargo Pocket with 3D Flap */}
          <rect x="76" y="254" width="22" height="28" rx="2" fill="#2e3846" stroke="#1f2937" strokeWidth="1.2" />
          <line x1="87" y1="255" x2="87" y2="281" stroke="#1f2937" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          {/* Left Flap */}
          <path d="M 75 250 L 99 250 L 99 257 L 87 261 L 75 257 Z" fill="#1f2937" stroke="#111827" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="87" cy="256" r="1.5" fill="#94a3b8" />

          {/* Right Side Cargo Pocket with 3D Flap */}
          <rect x="142" y="254" width="22" height="28" rx="2" fill="#2e3846" stroke="#1f2937" strokeWidth="1.2" />
          <line x1="153" y1="255" x2="153" y2="281" stroke="#1f2937" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          {/* Right Flap */}
          <path d="M 141 250 L 165 250 L 165 257 L 153 261 L 141 257 Z" fill="#1f2937" stroke="#111827" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="153" cy="256" r="1.5" fill="#94a3b8" />

          {/* Knee Reinforcement Panels (Tactical Seams) */}
          <path d="M 80 297 L 112 297" stroke="#1f2937" strokeWidth="1.2" strokeDasharray="3 1.5" opacity="0.7" />
          <path d="M 80 311 L 112 311" stroke="#1f2937" strokeWidth="1.2" strokeDasharray="3 1.5" opacity="0.7" />
          <path d="M 128 297 L 160 297" stroke="#1f2937" strokeWidth="1.2" strokeDasharray="3 1.5" opacity="0.7" />
          <path d="M 128 311 L 160 311" stroke="#1f2937" strokeWidth="1.2" strokeDasharray="3 1.5" opacity="0.7" />

          {/* Ankle Cuffs at Bottom */}
          <rect x="78" y="335" width="36" height="5" rx="1" fill="#1f2937" stroke="#111827" strokeWidth="1" />
          <rect x="126" y="335" width="36" height="5" rx="1" fill="#1f2937" stroke="#111827" strokeWidth="1" />
        </g>
      );

    case 'bottom-celana-emas':
      return (
        <g id="bottom-celana-emas">
          {/* Royal Gold Long Pants with Sultan Sparkles */}
          {/* Left Leg */}
          <path 
            d="M 78 208 L 118 208 L 114 340 L 78 340 Z" 
            fill="url(#goldGradient)" 
            stroke="#b45309" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
          {/* Right Leg */}
          <path 
            d="M 122 208 L 162 208 L 162 340 L 126 340 Z" 
            fill="url(#goldGradient)" 
            stroke="#b45309" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />

          {/* Golden Seams & Creases */}
          <line x1="96" y1="214" x2="96" y2="336" stroke="#fef08a" strokeWidth="1.2" opacity="0.8" />
          <line x1="144" y1="214" x2="144" y2="336" stroke="#fef08a" strokeWidth="1.2" opacity="0.8" />
          
          {/* Royal Waistband & Golden Buckle */}
          <rect x="78" y="206" width="84" height="6" rx="1.5" fill="#d97706" stroke="#92400e" strokeWidth="1" />
          <rect x="113" y="205" width="14" height="8" rx="2" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
          <polygon points="120,206 123,209 120,212 117,209" fill="#3b82f6" />

          {/* Ankle Golden Hem Lines */}
          <line x1="78" y1="337" x2="114" y2="337" stroke="#fef08a" strokeWidth="1.5" />
          <line x1="126" y1="337" x2="162" y2="337" stroke="#fef08a" strokeWidth="1.5" />

          {/* --- ANIMATED SULTAN SPARKLES (✨ Twinkling Diamond Stars) --- */}
          {/* Sparkle 1: Paha Kiri Atas */}
          <g transform="translate(92, 238)" className="gold-twinkle" style={{ animation: 'goldSparkleTwinkle 1.8s ease-in-out infinite 0s' }}>
            <path d="M 0 -8 Q 1.5 -1.5 8 0 Q 1.5 1.5 0 8 Q -1.5 1.5 -8 0 Q -1.5 -1.5 0 -8 Z" fill="#fef08a" />
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Sparkle 2: Paha Kanan Atas */}
          <g transform="translate(146, 248) scale(1.1)" className="gold-twinkle" style={{ animation: 'goldSparkleTwinkle 2.2s ease-in-out infinite 0.6s' }}>
            <path d="M 0 -8 Q 1.5 -1.5 8 0 Q 1.5 1.5 0 8 Q -1.5 1.5 -8 0 Q -1.5 -1.5 0 -8 Z" fill="#fef08a" />
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Sparkle 3: Lutut Kiri */}
          <g transform="translate(100, 284) scale(0.95)" className="gold-twinkle" style={{ animation: 'goldSparkleTwinkle 1.9s ease-in-out infinite 1.2s' }}>
            <path d="M 0 -8 Q 1.5 -1.5 8 0 Q 1.5 1.5 0 8 Q -1.5 1.5 -8 0 Q -1.5 -1.5 0 -8 Z" fill="#fef08a" />
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Sparkle 4: Betis Kanan */}
          <g transform="translate(136, 304) scale(0.9)" className="gold-twinkle" style={{ animation: 'goldSparkleTwinkle 2.4s ease-in-out infinite 0.3s' }}>
            <path d="M 0 -8 Q 1.5 -1.5 8 0 Q 1.5 1.5 0 8 Q -1.5 1.5 -8 0 Q -1.5 -1.5 0 -8 Z" fill="#fef08a" />
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Sparkle 5: Kaki Kiri Bawah */}
          <g transform="translate(88, 328) scale(1.05)" className="gold-twinkle" style={{ animation: 'goldSparkleTwinkle 2.0s ease-in-out infinite 1.5s' }}>
            <path d="M 0 -8 Q 1.5 -1.5 8 0 Q 1.5 1.5 0 8 Q -1.5 1.5 -8 0 Q -1.5 -1.5 0 -8 Z" fill="#fef08a" />
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Sparkle 6: Kaki Kanan Bawah */}
          <g transform="translate(152, 326)" className="gold-twinkle" style={{ animation: 'goldSparkleTwinkle 1.7s ease-in-out infinite 0.9s' }}>
            <path d="M 0 -8 Q 1.5 -1.5 8 0 Q 1.5 1.5 0 8 Q -1.5 1.5 -8 0 Q -1.5 -1.5 0 -8 Z" fill="#fef08a" />
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* --- AMBIENT PULSING GLITTER DOTS --- */}
          <circle cx="108" cy="226" r="1.6" fill="#ffffff" className="gold-twinkle" style={{ animation: 'goldGlitterPulse 1.6s ease-in-out infinite 0.2s' }} />
          <circle cx="132" cy="268" r="1.8" fill="#ffffff" className="gold-twinkle" style={{ animation: 'goldGlitterPulse 2.0s ease-in-out infinite 0.8s' }} />
          <circle cx="94" cy="308" r="1.5" fill="#ffffff" className="gold-twinkle" style={{ animation: 'goldGlitterPulse 1.7s ease-in-out infinite 1.3s' }} />
          <circle cx="142" cy="336" r="1.7" fill="#ffffff" className="gold-twinkle" style={{ animation: 'goldGlitterPulse 2.1s ease-in-out infinite 0.5s' }} />
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
        <g id="shoes-hitam-sekolah">
          {/* Balanced Black School Loafers */}
          <path
            d="M 80 339 C 78 350 64 356 49 360 C 43 362 43 369 47 369 L 106 369 C 109 369 109 354 107 339 Q 93 345 80 339 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 133 339 C 131 354 131 369 134 369 L 193 369 C 197 369 197 362 191 360 C 176 356 162 350 160 339 Q 147 345 133 339 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Leather Shine Accent */}
          <path d="M 58 363 Q 75 357 92 363" stroke="#475569" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 148 363 Q 165 357 182 363" stroke="#475569" strokeWidth="1.2" fill="none" opacity="0.6" />
          {/* Soles */}
          <rect x="43" y="367.5" width="65" height="5" rx="2" fill="#334155" />
          <rect x="132" y="367.5" width="65" height="5" rx="2" fill="#334155" />
        </g>
      );

    case 'shoes-boots-lapangan':
      return (
        <g id="shoes-boots-lapangan">
          {/* Balanced Brown Field Boots */}
          <path
            d="M 79 333 C 77 348 63 354 47 358 C 41 361 41 369 46 369 L 107 369 C 110 369 110 352 108 333 Q 93 340 79 333 Z"
            fill="#78350f"
            stroke="#451a03"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 132 333 C 130 352 130 369 133 369 L 194 369 C 199 369 199 361 193 358 C 177 354 163 348 161 333 Q 147 340 132 333 Z"
            fill="#78350f"
            stroke="#451a03"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Boot Straps */}
          <line x1="80" y1="343" x2="106" y2="343" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="134" y1="343" x2="160" y2="343" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" />
          {/* Heavy Lug Soles */}
          <rect x="42" y="368" width="67" height="5.5" rx="2" fill="#1c1917" />
          <rect x="131" y="368" width="67" height="5.5" rx="2" fill="#1c1917" />
        </g>
      );

    case 'shoes-sepatu-terbang':
      return (
        <g id="shoes-sepatu-terbang">
          {/* Balanced Sky Blue Flying Sneakers with Turbo Lightning Sparkles */}
          {/* Left Shoe Body */}
          <path
            d="M 80 339 C 78 350 64 356 49 360 C 43 362 43 369 47 369 L 106 369 C 109 369 109 354 107 339 Q 93 345 80 339 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Right Shoe Body */}
          <path
            d="M 133 339 C 131 354 131 369 134 369 L 193 369 C 197 369 197 362 191 360 C 176 356 162 350 160 339 Q 147 345 133 339 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Glowing Neon Soles */}
          <rect x="43" y="367.5" width="65" height="5" rx="2" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 3px #38bdf8)' }} />
          <line x1="46" y1="369.5" x2="105" y2="369.5" stroke="#e0f2fe" strokeWidth="1.2" opacity="0.85" />
          <rect x="132" y="367.5" width="65" height="5" rx="2" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 3px #38bdf8)' }} />
          <line x1="135" y1="369.5" x2="194" y2="369.5" stroke="#e0f2fe" strokeWidth="1.2" opacity="0.85" />

          {/* --- LEFT LIGHTNING BOLT WITH ELECTRIC ZAP PULSE --- */}
          <g style={{ animation: 'lightningZapPulse 1.6s ease-in-out infinite' }}>
            <path
              d="M 82 344 L 66 353 L 74 353 L 53 364 L 69 355 L 61 355 Z"
              fill="#facc15"
              stroke="#b45309"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M 79 346 L 68 352 L 73 352 L 58 361 L 68 356 L 63 356 Z"
              fill="#fef08a"
            />
          </g>

          {/* Left Electric Arc Zaps */}
          <path d="M 46 360 L 51 356 L 48 354 L 54 350" stroke="#67e8f9" strokeWidth="1.2" fill="none" className="electric-sparkle" style={{ animation: 'electricArcFlash 1.8s ease-in-out infinite 0.2s' }} />
          <path d="M 88 358 L 93 355 L 90 353 L 95 350" stroke="#fef08a" strokeWidth="1.2" fill="none" className="electric-sparkle" style={{ animation: 'electricArcFlash 2.2s ease-in-out infinite 0.9s' }} />

          {/* Left Shoe Animated Diamond Sparkles ✨ */}
          {/* Tip Sparkle */}
          <g transform="translate(53, 364)" className="electric-sparkle" style={{ animation: 'electricSparkleTwinkle 1.6s ease-in-out infinite 0s' }}>
            <path d="M 0 -7 Q 1.3 -1.3 7 0 Q 1.3 1.3 0 7 Q -1.3 1.3 -7 0 Q -1.3 -1.3 0 -7 Z" fill="#38bdf8" opacity="0.9" />
            <path d="M 0 -5.5 Q 0.8 -0.8 5.5 0 Q 0.8 0.8 0 5.5 Q -0.8 0.8 -5.5 0 Q -0.8 -0.8 0 -5.5 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.3" fill="#fef08a" />
          </g>
          {/* Middle Sparkle */}
          <g transform="translate(70, 353) scale(0.9)" className="electric-sparkle" style={{ animation: 'electricSparkleTwinkle 1.9s ease-in-out infinite 0.6s' }}>
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#facc15" />
            <path d="M 0 -4.5 Q 0.6 -0.6 4.5 0 Q 0.6 0.6 0 4.5 Q -0.6 0.6 -4.5 0 Q -0.6 -0.6 0 -4.5 Z" fill="#ffffff" />
          </g>
          {/* Top Sparkle */}
          <g transform="translate(82, 344) scale(0.85)" className="electric-sparkle" style={{ animation: 'electricSparkleTwinkle 2.1s ease-in-out infinite 1.1s' }}>
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#67e8f9" />
            <path d="M 0 -4.5 Q 0.6 -0.6 4.5 0 Q 0.6 0.6 0 4.5 Q -0.6 0.6 -4.5 0 Q -0.6 -0.6 0 -4.5 Z" fill="#ffffff" />
          </g>
          <circle cx="60" cy="347" r="1.5" fill="#fef08a" className="electric-sparkle" style={{ animation: 'goldGlitterPulse 1.5s ease-in-out infinite 0.3s' }} />

          {/* --- RIGHT LIGHTNING BOLT WITH ELECTRIC ZAP PULSE --- */}
          <g style={{ animation: 'lightningZapPulse 1.6s ease-in-out infinite 0.3s' }}>
            <path
              d="M 158 344 L 174 353 L 166 353 L 187 364 L 171 355 L 179 355 Z"
              fill="#facc15"
              stroke="#b45309"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M 161 346 L 172 352 L 167 352 L 182 361 L 172 356 L 177 356 Z"
              fill="#fef08a"
            />
          </g>

          {/* Right Electric Arc Zaps */}
          <path d="M 194 360 L 189 356 L 192 354 L 186 350" stroke="#67e8f9" strokeWidth="1.2" fill="none" className="electric-sparkle" style={{ animation: 'electricArcFlash 1.8s ease-in-out infinite 0.7s' }} />
          <path d="M 152 358 L 147 355 L 150 353 L 145 350" stroke="#fef08a" strokeWidth="1.2" fill="none" className="electric-sparkle" style={{ animation: 'electricArcFlash 2.2s ease-in-out infinite 1.4s' }} />

          {/* Right Shoe Animated Diamond Sparkles ✨ */}
          {/* Tip Sparkle */}
          <g transform="translate(187, 364)" className="electric-sparkle" style={{ animation: 'electricSparkleTwinkle 1.7s ease-in-out infinite 0.3s' }}>
            <path d="M 0 -7 Q 1.3 -1.3 7 0 Q 1.3 1.3 0 7 Q -1.3 1.3 -7 0 Q -1.3 -1.3 0 -7 Z" fill="#38bdf8" opacity="0.9" />
            <path d="M 0 -5.5 Q 0.8 -0.8 5.5 0 Q 0.8 0.8 0 5.5 Q -0.8 0.8 -5.5 0 Q -0.8 -0.8 0 -5.5 Z" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.3" fill="#fef08a" />
          </g>
          {/* Middle Sparkle */}
          <g transform="translate(170, 353) scale(0.9)" className="electric-sparkle" style={{ animation: 'electricSparkleTwinkle 2.0s ease-in-out infinite 0.8s' }}>
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#facc15" />
            <path d="M 0 -4.5 Q 0.6 -0.6 4.5 0 Q 0.6 0.6 0 4.5 Q -0.6 0.6 -4.5 0 Q -0.6 -0.6 0 -4.5 Z" fill="#ffffff" />
          </g>
          {/* Top Sparkle */}
          <g transform="translate(158, 344) scale(0.85)" className="electric-sparkle" style={{ animation: 'electricSparkleTwinkle 2.2s ease-in-out infinite 1.3s' }}>
            <path d="M 0 -6 Q 1 -1 6 0 Q 1 1 0 6 Q -1 1 -6 0 Q -1 -1 0 -6 Z" fill="#67e8f9" />
            <path d="M 0 -4.5 Q 0.6 -0.6 4.5 0 Q 0.6 0.6 0 4.5 Q -0.6 0.6 -4.5 0 Q -0.6 -0.6 0 -4.5 Z" fill="#ffffff" />
          </g>
          <circle cx="180" cy="347" r="1.5" fill="#fef08a" className="electric-sparkle" style={{ animation: 'goldGlitterPulse 1.5s ease-in-out infinite 0.9s' }} />
        </g>
      );

    case 'shoes-sneakers-putih':
    default:
      return (
        <g id="shoes-sneakers-putih">
          {/* Left Sneaker (Balanced Clean White Sneaker) */}
          {/* Left Shoe Upper Body */}
          <path
            d="M 80 339 C 78 350 64 356 49 360 C 43 362 43 369 47 369 L 106 369 C 109 369 109 354 107 339 Q 93 345 80 339 Z"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Left Subtle Shading */}
          <path
            d="M 80 339 C 78 350 64 356 49 360 L 53 369 L 106 369 C 109 369 109 354 107 339 Z"
            fill="#f8fafc"
            opacity="0.8"
          />
          {/* Left Toe Bumper */}
          <path
            d="M 49 360 C 43 362 43 369 47 369 L 61 369 C 61 362 54 360 49 360 Z"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          {/* Left Rubber Sole */}
          <rect x="43" y="367.5" width="65" height="5" rx="2.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.1" />
          <line x1="45" y1="370" x2="106" y2="370" stroke="#cbd5e1" strokeWidth="0.9" />
          {/* Laces */}
          <line x1="66" y1="353" x2="78" y2="346" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="66" y1="353" x2="78" y2="346" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="70" y1="359" x2="82" y2="352" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="359" x2="82" y2="352" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />

          {/* Right Sneaker (Balanced Clean White Sneaker) */}
          {/* Right Shoe Upper Body */}
          <path
            d="M 133 339 C 131 354 131 369 134 369 L 193 369 C 197 369 197 362 191 360 C 176 356 162 350 160 339 Q 147 345 133 339 Z"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Right Subtle Shading */}
          <path
            d="M 133 339 C 131 354 131 369 134 369 L 187 369 L 191 360 C 176 356 162 350 160 339 Z"
            fill="#f8fafc"
            opacity="0.8"
          />
          {/* Right Toe Bumper */}
          <path
            d="M 191 360 C 197 362 197 369 193 369 L 179 369 C 179 362 186 360 191 360 Z"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          {/* Right Rubber Sole */}
          <rect x="132" y="367.5" width="65" height="5" rx="2.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.1" />
          <line x1="134" y1="370" x2="195" y2="370" stroke="#cbd5e1" strokeWidth="0.9" />
          {/* Laces */}
          <line x1="174" y1="353" x2="162" y2="346" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="174" y1="353" x2="162" y2="346" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="170" y1="359" x2="158" y2="352" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="170" y1="359" x2="158" y2="352" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
  }
}

function renderBackHair(style, color) {
  if (!style || style === 'none' || style === 'hair-gundul-bebas' || style === 'bald') return null;
  if (style === 'hair-perempuan-panjang' || style === 'girl-long') {
    return <RambutPerempuanPanjang layer="back" asGroup color={color} />;
  }
  return null;
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
      return <RambutPerempuanPanjang layer="front" asGroup color={color} />;

    case 'hair-mohawk':
    case 'mohawk':
    case 'hair-hijab-sekolah':
    case 'hijab':
      return <RambutMohawk asGroup color={color} />;

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
