import { useRef, useEffect, useState } from 'react';

const ACCENT     = '#14F1D9';
const ACCENT_40  = 'rgba(20,241,217,0.4)';
const ACCENT_70  = 'rgba(20,241,217,0.7)';
const ACCENT_BG  = 'rgba(20,241,217,0.04)';

export default function WorkNav({ projects, activeIndex, setActiveIndex }) {
  const itemRefs = useRef([]);
  const [hov, setHov] = useState(null);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <nav
      className="g-nav"
      aria-label="Project list"
      style={{
        height: '100%',
        overflowY: 'auto',
        paddingRight: 4,
      }}
    >
      {/* Label */}
      <p style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: ACCENT,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '1px solid var(--g-border, rgba(255,255,255,0.08))',
      }}>
        Projects
      </p>

      {projects.map((proj, idx) => {
        const active   = idx === activeIndex;
        const hovering = hov === idx;

        return (
          <button
            key={proj.id}
            ref={el => { itemRefs.current[idx] = el; }}
            onClick={() => setActiveIndex(idx)}
            onMouseEnter={() => setHov(idx)}
            onMouseLeave={() => setHov(null)}
            aria-current={active ? 'true' : undefined}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
              padding: '16px 0 16px 18px',
              borderLeft: `2px solid ${
                active   ? ACCENT :
                hovering ? ACCENT_40 :
                'transparent'
              }`,
              borderBottom: '1px solid var(--g-border, rgba(255,255,255,0.08))',
              background: active
                ? `linear-gradient(90deg, ${ACCENT_BG} 0%, transparent 80%)`
                : hovering ? 'rgba(255,255,255,0.015)' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              gap: 14,
              transition: 'background 0.3s ease, border-color 0.3s ease',
              outline: 'none',
            }}
          >
            {/* Index number */}
            <span style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: active ? ACCENT : hovering ? ACCENT_70 : '#383850',
              transition: 'color 0.3s ease',
              flexShrink: 0,
              marginTop: 2,
              lineHeight: 1,
            }}>
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Title + category */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                lineHeight: 1.3,
                color: active ? '#FFFFFF' : hovering ? '#E4E4E7' : '#71717A',
                transition: 'color 0.3s ease',
                margin: '0 0 4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {proj.title}
              </p>
              <p style={{
                fontSize: 9,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: active ? ACCENT_70 : '#383850',
                transition: 'color 0.3s ease',
                margin: 0,
              }}>
                {proj.navCategory}
              </p>
            </div>

            {/* Arrow indicator */}
            <span style={{
              fontSize: 15,
              lineHeight: 1,
              color: active ? ACCENT : hovering ? ACCENT_40 : 'transparent',
              transition: 'color 0.3s ease, transform 0.3s ease',
              transform: active || hovering ? 'translateX(0)' : 'translateX(-3px)',
              flexShrink: 0,
              marginTop: 2,
              marginRight: 6,
            }}>
              ›
            </span>
          </button>
        );
      })}
    </nav>
  );
}
