// Ilustração padrão do topo (dev de moletom com notebook). Para usar sua foto/avatar, preencha SITE.avatar em site.ts.
export default function Avatar() {
  return (
    <svg className="avatar" viewBox="0 0 440 460" role="img" aria-label="Ilustração de um desenvolvedor com notebook">
      <defs>
        <radialGradient id="av-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c6cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* moletom */}
      <path d="M40 460c8-88 60-130 128-148h104c68 18 120 60 128 148z" fill="#14141c" />
      <path d="M150 300c0-38 140-38 140 0 0 30-28 52-70 52s-70-22-70-52" fill="#1d1d27" />
      <path d="M190 250h60l2 68c-12 12-52 12-64 0z" fill="#c98b67" />
      <path d="M160 306c18 46 102 46 120 0l12 16c-24 50-120 50-144 0z" fill="#0e0e15" />
      <path d="M200 350l-4 60M240 350l4 60" stroke="#2a2a36" strokeWidth="4" strokeLinecap="round" />
      {/* cabeça */}
      <ellipse cx="161" cy="196" rx="11" ry="18" fill="#d99a74" />
      <ellipse cx="279" cy="196" rx="11" ry="18" fill="#d99a74" />
      <path d="M162 170c0-54 30-78 58-78s58 24 58 78c0 52-24 92-58 92s-58-40-58-92" fill="#e3a882" />
      <path d="M164 190c4 46 28 74 56 74s52-28 56-74c-8 24-22 36-32 38-8-8-40-8-48 0-10-2-24-14-32-38" fill="#3a2a22" opacity=".55" />
      <path d="M198 226q22-10 44 0-22-4-44 0" fill="#2d201a" opacity=".7" />
      <path d="M206 237q14 6 28 0" stroke="#8a4f3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M158 168c-8-58 24-94 68-92 40 2 66 30 58 90-6-26-14-38-26-46-20 12-58 12-82 4-8 12-14 26-18 44" fill="#1a1310" />
      <path d="M180 160q14-8 28-2M232 158q14-6 28 2" stroke="#1a1310" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="194" cy="179" rx="5" ry="4" fill="#1f1612" />
      <ellipse cx="246" cy="179" rx="5" ry="4" fill="#1f1612" />
      <path d="M220 184q-4 22-8 26 8 4 16 0" stroke="#b97a58" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* óculos */}
      <g stroke="#15110f" strokeWidth="4" fill="rgba(255,255,255,.08)">
        <rect x="172" y="164" width="42" height="30" rx="9" />
        <rect x="226" y="164" width="42" height="30" rx="9" />
      </g>
      <path d="M214 176q6-4 12 0M172 174l-10-4M268 174l10-4" stroke="#15110f" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* notebook */}
      <path d="M120 352h200q6 0 6 6l4 42H110l4-42q0-6 6-6" fill="#262838" stroke="#34364a" strokeWidth="2" />
      <path d="M110 400h220l14 60H96z" fill="#1f2030" />
      <circle cx="220" cy="378" r="18" fill="url(#av-glow)" />
      <circle cx="220" cy="378" r="6" fill="#ede9fe" />
    </svg>
  );
}
