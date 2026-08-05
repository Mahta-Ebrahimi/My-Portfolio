import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProjectCard({ project }) {
  const navigate = useNavigate();
  const [show,    setShow]    = useState(true);
  const [disp,    setDisp]    = useState(project);
  const [cardHov, setCardHov] = useState(false);

  useEffect(() => {
    if (project.id === disp.id) return;
    setShow(false);
    const t = setTimeout(() => {
      setDisp(project);
      setShow(true);
    }, 170);
    return () => clearTimeout(t);
  }, [project.id]);

  const go = useCallback(() => {
    if (disp.external) window.open(disp.route, '_blank');
    else navigate(disp.route);
  }, [disp]);

  return (
    <article
      onMouseEnter={() => setCardHov(true)}
      onMouseLeave={() => setCardHov(false)}
      onClick={go}
      style={{
        flex: 1,
        minWidth: 0,
        position: 'relative',
        background: 'var(--g-surface, rgba(12,18,24,0.80))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${cardHov ? 'var(--g-border-hov, rgba(20,241,217,0.22))' : 'var(--g-border, rgba(255,255,255,0.07))'}`,
        borderRadius: 'var(--g-radius-feat, 22px)',
        overflow: 'hidden',
        display: 'flex',
        minHeight: 460,
        cursor: 'pointer',
        transform: cardHov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: cardHov
          ? 'var(--g-shadow-feat-hov, 0 36px 90px rgba(0,0,0,0.65))'
          : 'var(--g-shadow-feat, 0 20px 60px rgba(0,0,0,0.45))',
        transition: 'transform 0.42s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.42s ease, border-color 0.42s ease',
        willChange: 'transform',
      }}
    >
      {/* Content cross-fade wrapper */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(5px)',
          transition: 'opacity 0.36s ease, transform 0.36s ease',
        }}
      >
        {/* ── Left: project info (40%) ─────────────────── */}
        <div
          style={{
            width: '40%',
            flexShrink: 0,
            padding: '56px 48px 56px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--g-divider, rgba(255,255,255,0.06))',
          }}
        >
          {/* Top block */}
          <div>
            {/* Featured Project label */}
            <p style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: 'var(--g-accent, #14F1D9)',
              margin: '0 0 28px',
            }}>
              Featured Project
            </p>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(26px, 2.8vw, 46px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--g-text, #FFFFFF)',
              margin: '0 0 20px',
            }}>
              {disp.title}
            </h2>

            {/* Description */}
            <p style={{
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--g-secondary, #A1A1AA)',
              margin: '0 0 36px',
            }}>
              {disp.description}
            </p>

            {/* Tool tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {disp.tools.map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--g-secondary, #A1A1AA)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--g-border, rgba(255,255,255,0.07))',
                    background: 'var(--g-tag-bg, rgba(255,255,255,0.03))',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: CTA button */}
          <div style={{ marginTop: 48 }}>
            <button
              onClick={e => { e.stopPropagation(); go(); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 26px',
                borderRadius: 'var(--g-pill, 50px)',
                border: '1px solid var(--g-accent-border, rgba(20,241,217,0.22))',
                background: 'var(--g-accent-bg, rgba(20,241,217,0.05))',
                color: 'var(--g-accent, #14F1D9)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
            >
              View Case Study
              <span style={{
                fontSize: 15,
                display: 'inline-block',
                transform: cardHov ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.38s ease',
              }}>
                →
              </span>
            </button>
          </div>
        </div>

        {/* ── Right: image (60%) ───────────────────────── */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '44px 48px 44px 36px',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow — only in dark mode (CSS var is none in light) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 70% 65% at 55% 50%, var(--g-accent-glow, rgba(20,241,217,0.06)) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Float animation wrapper — paused on hover */}
          <div
            className="mockup-float"
            style={{
              animation: 'mockupFloat 7s ease-in-out infinite',
              animationPlayState: cardHov ? 'paused' : 'running',
              width: '100%',
              position: 'relative',
            }}
          >
            <img
              src={disp.image}
              alt={disp.title}
              loading="eager"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 12,
                boxShadow: 'var(--g-img-shadow, 0 28px 80px rgba(0,0,0,0.65))',
                transform: cardHov ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
                transition: 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1)',
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
