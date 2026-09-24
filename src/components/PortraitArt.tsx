// ---------------------------------------------------------------------------
// Code-drawn risograph portrait — everything is SVG, no raster assets.
// Duotone: warm paper + ink, rust misregistration.
// ---------------------------------------------------------------------------

const HEAD = `M 240 104
C 312 104 352 162 352 252
C 352 302 340 348 312 388
C 296 410 272 424 240 424
C 208 424 184 410 168 388
C 140 348 128 302 128 252
C 128 162 168 104 240 104 Z`;

const HAIR = `M 126 268
C 116 146 176 80 240 80
C 304 80 364 146 354 268
C 350 230 342 206 330 192
C 308 166 282 158 258 158
C 250 158 245 163 240 163
C 235 163 230 158 222 158
C 198 158 172 166 150 192
C 138 206 130 230 126 268 Z`;

function CropMark({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#1A1714" strokeWidth="2.5">
      <path d="M -9 0 H 9 M 0 -9 V 9" />
    </g>
  );
}

export default function PortraitArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 600" className={className} role="img" aria-label="Risograph-style two-tone portrait of Jayesh Bhadane">
      <defs>
        <pattern id="p-dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.7" fill="#C2410C" opacity="0.33" />
        </pattern>
        <pattern id="p-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#C2410C" strokeWidth="1.7" opacity="0.5" />
        </pattern>
        <pattern id="p-hatch-paper" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#F6F1E7" strokeWidth="1.7" opacity="0.28" />
        </pattern>
        <clipPath id="p-circle">
          <circle cx="240" cy="290" r="206" />
        </clipPath>
        <clipPath id="p-head">
          <path d={HEAD} />
        </clipPath>
      </defs>

      <rect width="480" height="600" fill="#F6F1E7" />

      <CropMark x={22} y={22} />
      <CropMark x={458} y={22} />
      <CropMark x={22} y={578} />
      <CropMark x={458} y={578} />

      <text x="46" y="34" fontFamily="'IBM Plex Mono', monospace" fontSize="11.5" letterSpacing="1.5" fill="#1A1714" opacity="0.75">
        34.0522° N / 118.2437° W
      </text>
      <text x="434" y="34" textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="11.5" letterSpacing="1.5" fill="#1A1714" opacity="0.75">
        FIELD PRINT 6
      </text>

      {/* misregistered print circles */}
      <circle cx="233" cy="297" r="222" fill="none" stroke="#C2410C" strokeWidth="3" />
      <circle cx="240" cy="290" r="222" fill="none" stroke="#1A1714" strokeWidth="3" />
      <circle cx="240" cy="290" r="206" fill="#EFE7D6" />
      <circle cx="240" cy="290" r="206" fill="url(#p-dots)" />

      <g clipPath="url(#p-circle)">
        {/* torso / sweater */}
        <path d="M 240 458 C 166 462 100 508 86 600 L 394 600 C 380 508 314 462 240 458 Z" fill="#1A1714" />
        <path d="M 240 458 C 166 462 100 508 86 600 L 394 600 C 380 508 314 462 240 458 Z" fill="url(#p-hatch-paper)" />

        {/* neck */}
        <path d="M 208 386 L 196 478 L 284 478 L 272 386 Z" fill="#F6F1E7" />
        <path d="M 210 392 C 222 434 258 434 270 392 L 270 418 C 256 456 224 456 210 418 Z" fill="#1A1714" opacity="0.22" />
        <path d="M 208 388 C 206 420 202 450 196 478" fill="none" stroke="#1A1714" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 272 388 C 274 420 278 450 284 478" fill="none" stroke="#1A1714" strokeWidth="4.5" strokeLinecap="round" />

        {/* collar */}
        <path d="M 198 468 Q 240 500 282 468" fill="none" stroke="#F6F1E7" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M 190 488 Q 240 522 290 488" fill="none" stroke="#F6F1E7" strokeWidth="3" strokeLinecap="round" opacity="0.45" />

        {/* head */}
        <path d={HEAD} fill="#F6F1E7" stroke="#1A1714" strokeWidth="5" />
        <g clipPath="url(#p-head)">
          {/* rust side-shade with hatch */}
          <path d="M 276 102 C 308 210 310 330 272 426 L 356 426 L 356 98 Z" fill="url(#p-hatch)" opacity="0.6" />
          {/* hair */}
          <path d={HAIR} fill="#1A1714" />
          <path d="M 172 152 Q 212 118 264 122" fill="none" stroke="#F6F1E7" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
          <path d="M 190 176 Q 220 150 258 152" fill="none" stroke="#F6F1E7" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
        </g>

        {/* ears */}
        <g fill="#F6F1E7" stroke="#1A1714" strokeWidth="4.5" strokeLinecap="round">
          <path d="M 128 250 C 108 244 98 260 103 278 C 107 295 119 303 131 300" fill="#F6F1E7" />
          <path d="M 352 250 C 372 244 382 260 377 278 C 373 295 361 303 349 300" fill="#F6F1E7" />
          <path d="M 116 264 C 112 272 115 284 123 289" fill="none" strokeWidth="3" />
          <path d="M 364 264 C 368 272 365 284 357 289" fill="none" strokeWidth="3" />
        </g>

        {/* brows */}
        <path d="M 168 238 Q 196 226 226 238" fill="none" stroke="#1A1714" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M 254 238 Q 284 226 312 238" fill="none" stroke="#1A1714" strokeWidth="6.5" strokeLinecap="round" />

        {/* eyes */}
        <g>
          <path d="M 176 268 Q 197 255 218 268 Q 197 280 176 268 Z" fill="#F6F1E7" stroke="#1A1714" strokeWidth="3.5" />
          <path d="M 262 268 Q 283 255 304 268 Q 283 280 262 268 Z" fill="#F6F1E7" stroke="#1A1714" strokeWidth="3.5" />
          <circle cx="197" cy="266.5" r="7.5" fill="#1A1714" />
          <circle cx="283" cy="266.5" r="7.5" fill="#1A1714" />
          <circle cx="194.5" cy="264" r="2.2" fill="#F6F1E7" />
          <circle cx="280.5" cy="264" r="2.2" fill="#F6F1E7" />
          <path d="M 176 268 Q 197 255 218 268" fill="none" stroke="#1A1714" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 262 268 Q 283 255 304 268" fill="none" stroke="#1A1714" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        {/* nose */}
        <path
          d="M 231 272 C 229 292 227 306 224 322 Q 240 332 256 322 C 253 306 251 292 249 272"
          fill="none"
          stroke="#1A1714"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="217" cy="340" rx="4.5" ry="3.2" fill="#1A1714" />
        <ellipse cx="263" cy="340" rx="4.5" ry="3.2" fill="#1A1714" />

        {/* mouth */}
        <path d="M 208 380 Q 240 394 272 380" fill="none" stroke="#1A1714" strokeWidth="5" strokeLinecap="round" />
        <path d="M 224 395 Q 240 401 256 395" fill="none" stroke="#1A1714" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        <path d="M 230 409 Q 240 413 250 409" fill="none" stroke="#1A1714" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* caption plate */}
      <rect x="0" y="552" width="480" height="48" fill="#1A1714" />
      <rect x="0" y="552" width="480" height="3" fill="#C2410C" />
      <text x="24" y="581" fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="1" fill="#F6F1E7">
        FIG. 01 · JAYESH BHADANE · DATA SCIENTIST &amp; AI/ML ENGINEER
      </text>
    </svg>
  );
}
