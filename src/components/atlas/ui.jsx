import React, { useEffect, useRef, useState } from 'react';

// Secondary violet on the dark page, deeper violet in the portfolio's light mode (see atlas.css)
export const ACCENT = 'var(--page-accent)';

// ── Icons (24px grid, 1.8 stroke) ─────────────────────────────────────────────
const PATHS = {
  overview:  <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  chart:     <><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-7" /></>,
  users:     <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M18.5 14.8c1.7.8 2.7 2.6 3 5.2" /></>,
  billing:   <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19" /><path d="M6.5 15h4" /></>,
  plug:      <><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0V8Z" /><path d="M12 17v4" /></>,
  settings:  <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" /></>,
  search:    <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  plus:      <path d="M12 5v14M5 12h14" />,
  download:  <><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M4 20h16" /></>,
  filter:    <path d="M3 5h18l-7 8.5V19l-4 2v-7.5L3 5Z" />,
  calendar:  <><rect x="3" y="4.5" width="18" height="16.5" rx="2" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></>,
  chevDown:  <path d="m6 9 6 6 6-6" />,
  chevUp:    <path d="m6 15 6-6 6 6" />,
  chevLeft:  <path d="m15 6-6 6 6 6" />,
  chevRight: <path d="m9 6 6 6-6 6" />,
  sort:      <><path d="m8 9 4-4 4 4" /><path d="m16 15-4 4-4-4" /></>,
  check:     <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x:         <path d="M6 6l12 12M18 6 6 18" />,
  info:      <><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.6v.1" /></>,
  warning:   <><path d="M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9.5v4M12 17v.1" /></>,
  success:   <><circle cx="12" cy="12" r="9" /><path d="m8.2 12.3 2.6 2.6 5-5.2" /></>,
  error:     <><circle cx="12" cy="12" r="9" /><path d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6" /></>,
  bell:      <><path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" /><path d="M10 20a2.2 2.2 0 0 0 4 0" /></>,
  arrowUp:   <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
  arrowDown: <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>,
  more:      <><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></>,
  menu:      <path d="M4 7h16M4 12h16M4 17h16" />,
  mail:      <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>,
  trash:     <><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" /></>,
  layers:    <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  copy:      <><rect x="8.5" y="8.5" width="12" height="12" rx="2" /><path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" /></>,
  external:  <><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
};

export const Icon = ({ name, size, className = '', style }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false"
  >
    {PATHS[name]}
  </svg>
);

// ATLAS logomark — a compass-like diamond built from the brand violet
export const Logo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#7C3AED" />
    <path d="M16 6 24 16 16 26 8 16Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 6v20M8 16h16" stroke="#C4B5FD" strokeWidth="1.4" />
  </svg>
);

// ── Scroll reveal (IntersectionObserver, CSS handles reduced motion) ──────────
export function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`at-reveal ${inView ? 'is-in' : ''} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

// ── Section header for the dark portfolio page ────────────────────────────────
export const SectionHeader = ({ num, label, title, children }) => (
  <Reveal className="mb-10 md:mb-14 max-w-[760px]">
    <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-4" style={{ color: ACCENT }}>
      {num} — {label}
    </p>
    <h2 className="text-white font-bold leading-[1.1] mb-5" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em' }}>
      {title}
    </h2>
    {children && <div className="text-[#9CA3AF] text-[16px] md:text-[17px] leading-[1.7] space-y-4">{children}</div>}
  </Reveal>
);

// ── Documentation board (light surface on the dark page) ─────────────────────
export const Board = ({ title, meta, children, className = '', bodyClass = '' }) => (
  <Reveal className={`at-board ${className}`}>
    {(title || meta) && (
      <div className="at-board__head">
        <h3 className="at-board__title">{title}</h3>
        {meta && <span className="at-board__meta">{meta}</span>}
      </div>
    )}
    <div className={`at-board__body ${bodyClass}`}>{children}</div>
  </Reveal>
);

export const SpecLabel = ({ children, className = '' }) => (
  <p className={`at-spec-label ${className}`}>{children}</p>
);

export const SampleNote = ({ children = 'Illustrative sample data — not real customers or results', dark = false }) => (
  <p className="font-mono text-[11px] tracking-[0.06em] uppercase" style={{ color: dark ? '#6B7280' : '#64748B' }}>
    {children}
  </p>
);

// ── ScaledFrame: renders a fixed-width design and scales it to fit ────────────
// Keeps desktop/tablet/mobile mockups pixel-accurate without horizontal overflow.
export function ScaledFrame({ width, children, className = '', label }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(undefined);

  useEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return;
      const s = Math.min(1, outer.current.clientWidth / width);
      setScale(s);
      setHeight(inner.current.offsetHeight * s);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(outer.current);
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className={className} style={{ height, position: 'relative', maxWidth: width, margin: '0 auto' }} role="group" aria-label={label}>
      <div ref={inner} style={{ width, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}
