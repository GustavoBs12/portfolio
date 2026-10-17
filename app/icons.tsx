// Ícones de interface em traço (herdam a cor do texto).
const paths = {
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  download: <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16" />,
  cap: <><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></>,
  book: <path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zm16 0h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" />,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Quote() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20c3 0 7-1.5 7-8V5H3v7h4c0 4-4 4.5-4 4.5zm11 0c3 0 7-1.5 7-8V5h-7v7h4c0 4-4 4.5-4 4.5z" />
    </svg>
  );
}

export function Heart() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="amor" role="img">
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}
