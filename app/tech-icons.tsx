// Logos das tecnologias e redes sociais, desenhados em SVG simples (sem depender de CDN).
const txt = { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 800 } as const;

const shield = (dark: string, light: string, n: string) => (
  <>
    <path fill={dark} d="M4 2h24l-2.2 25L16 30l-9.8-3z" />
    <path fill={light} d="M16 4v24l7.9-2.2L25.8 4z" />
    <text x="16" y="22.5" textAnchor="middle" fontSize="15" fill="#fff" {...txt}>{n}</text>
  </>
);

const tech: Record<string, React.ReactNode> = {
  HTML: shield("#E44D26", "#F16529", "5"),
  CSS: shield("#1572B6", "#33A9DC", "3"),
  JavaScript: (
    <>
      <rect x="2" y="2" width="28" height="28" rx="3" fill="#F7DF1E" />
      <text x="27" y="27" textAnchor="end" fontSize="13" fill="#1a1a1a" {...txt}>JS</text>
    </>
  ),
  TypeScript: (
    <>
      <rect x="2" y="2" width="28" height="28" rx="3" fill="#3178C6" />
      <text x="27" y="27" textAnchor="end" fontSize="13" fill="#fff" {...txt}>TS</text>
    </>
  ),
  React: (
    <>
      <g fill="none" stroke="#61DAFB" strokeWidth="1.6">
        <ellipse cx="16" cy="16" rx="13" ry="5" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
    </>
  ),
  "Next.js": (
    <>
      <circle cx="16" cy="16" r="13.5" fill="#000" stroke="#fff" strokeWidth="1.2" />
      <text x="16" y="21.5" textAnchor="middle" fontSize="15" fill="#fff" {...txt}>N</text>
    </>
  ),
  "Node.js": (
    <>
      <path d="M16 2.5 27.5 9v14L16 29.5 4.5 23V9z" fill="none" stroke="#5FA04E" strokeWidth="2" strokeLinejoin="round" />
      <text x="16" y="20" textAnchor="middle" fontSize="11" fill="#5FA04E" {...txt}>js</text>
    </>
  ),
  Git: (
    <>
      <rect x="6.5" y="6.5" width="19" height="19" rx="3" fill="#F05032" transform="rotate(45 16 16)" />
      <path d="M13 10.5l6 6M13 10.5v11" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="13" cy="10.5" r="2" fill="#fff" /><circle cx="13" cy="21.5" r="2" fill="#fff" /><circle cx="19" cy="16.5" r="2" fill="#fff" />
    </>
  ),
  Supabase: <path d="M17.5 2.5 5.5 18h9.5l-1 11.5L26.5 14H17z" fill="#3ECF8E" />,
};

// label = true quando o ícone aparece sozinho (sem o nome escrito ao lado).
export function Tech({ name, size = 28, label = false }: { name: string; size?: number; label?: boolean }) {
  return (
    <svg className="t" width={size} height={size} viewBox="0 0 32 32" {...(label ? { role: "img", "aria-label": name } : { "aria-hidden": true })}>
      {label && <title>{name}</title>}
      {tech[name]}
    </svg>
  );
}

const brand = {
  github: (
    <path fill="#fff" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  ),
  linkedin: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#0A66C2" />
      <path fill="#fff" d="M5.5 9.5h2.8V19H5.5zm1.4-4.4a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2M10.2 9.5h2.7v1.3c.4-.7 1.3-1.5 2.8-1.5 2.9 0 3.4 1.9 3.4 4.4V19h-2.8v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-2.7z" />
    </>
  ),
  instagram: (
    <g fill="none" stroke="#E4405F" strokeWidth="2">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r=".6" fill="#E4405F" />
    </g>
  ),
};

export function Brand({ name }: { name: keyof typeof brand }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">{brand[name]}</svg>;
}
