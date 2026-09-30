/** Decorative hero artwork: abstract product cards (doctor slots, medicine, bed availability). No text, so nothing to translate. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false" className={className}>
      <rect x="24" y="24" width="432" height="312" rx="24" fill="#CFE7EF" opacity="0.6" />

      {/* Doctor slots card */}
      <g transform="translate(56 52)">
        <rect width="236" height="156" rx="14" fill="#fff" stroke="#DDE5EB" />
        <circle cx="38" cy="40" r="20" fill="#E8F4F8" />
        <path d="M38 30v20M28 40h20" stroke="#0B6E8A" strokeWidth="4" strokeLinecap="round" />
        <rect x="70" y="28" width="90" height="8" rx="4" fill="#0F1F2B" opacity="0.85" />
        <rect x="70" y="44" width="62" height="6" rx="3" fill="#4B5B68" opacity="0.5" />
        <rect x="170" y="30" width="48" height="20" rx="10" fill="#E7F5EE" />
        <circle cx="182" cy="40" r="4" fill="#17784A" />
        <rect x="192" y="37" width="18" height="6" rx="3" fill="#17784A" opacity="0.6" />
        <rect x="20" y="82" width="60" height="28" rx="8" fill="#E8F4F8" />
        <rect x="88" y="82" width="60" height="28" rx="8" fill="#0B6E8A" />
        <rect x="156" y="82" width="60" height="28" rx="8" fill="#E8F4F8" />
        <rect x="20" y="122" width="196" height="20" rx="8" fill="#DDE5EB" />
      </g>

      {/* Bed availability card */}
      <g transform="translate(64 236)">
        <rect width="172" height="84" rx="14" fill="#fff" stroke="#DDE5EB" />
        <rect x="18" y="26" width="12" height="36" rx="3" fill="#0B6E8A" />
        <rect x="18" y="42" width="72" height="20" rx="4" fill="#CFE7EF" />
        <rect x="34" y="30" width="26" height="11" rx="5.5" fill="#fff" stroke="#DDE5EB" />
        <rect x="24" y="62" width="4" height="8" fill="#4B5B68" opacity="0.5" />
        <rect x="82" y="62" width="4" height="8" fill="#4B5B68" opacity="0.5" />
        <circle cx="116" cy="34" r="5" fill="#17784A" />
        <rect x="126" y="31" width="30" height="6" rx="3" fill="#4B5B68" opacity="0.5" />
        <rect x="108" y="50" width="48" height="8" rx="4" fill="#0F1F2B" opacity="0.8" />
      </g>

      {/* Medicine card */}
      <g transform="translate(248 116)">
        <rect width="184" height="136" rx="14" fill="#fff" stroke="#DDE5EB" />
        <rect x="24" y="22" width="36" height="14" rx="4" fill="#095A72" />
        <rect x="20" y="34" width="44" height="72" rx="8" fill="#0B6E8A" />
        <rect x="27" y="56" width="30" height="28" rx="4" fill="#fff" opacity="0.92" />
        <path d="M42 62v16M34 70h16" stroke="#0B6E8A" strokeWidth="3" strokeLinecap="round" />
        <rect x="84" y="30" width="80" height="8" rx="4" fill="#0F1F2B" opacity="0.85" />
        <rect x="84" y="48" width="56" height="6" rx="3" fill="#4B5B68" opacity="0.5" />
        <rect x="84" y="82" width="50" height="22" rx="11" fill="#E8F4F8" />
        <rect x="142" y="82" width="22" height="22" rx="11" fill="#0B6E8A" />
        <path d="M153 88v10M148 93h10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Decorative crosses */}
      <path d="M420 62v18M411 71h18" stroke="#0B6E8A" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
      <path d="M44 216v12M38 222h12" stroke="#0B6E8A" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}
