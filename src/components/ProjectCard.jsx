import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ proj }) {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);

  const go = () =>
    proj.external ? window.open(proj.route, '_blank') : navigate(proj.route);

  return (
    <article
      onClick={go}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--g-project-card-bg, var(--g-card, rgba(10,15,21,0.86)))',
        border: `1px solid ${hov ? 'var(--g-project-card-border-hov, var(--g-border-hov, rgba(20,241,217,0.22)))' : 'var(--g-project-card-border, var(--g-border, rgba(255,255,255,0.12)))'}`,
        borderRadius: 'var(--g-radius, 22px)',
        overflow: 'hidden',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hov
          ? 'var(--g-shadow-card-hov, 0 20px 48px rgba(0,0,0,0.55))'
          : 'var(--g-shadow-card, 0 4px 20px rgba(0,0,0,0.30))',
        transition:
          'transform 0.32s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.32s ease, border-color 0.32s ease',
        willChange: 'transform',
      }}
    >
      {/* ── Image ─────────────────────────────────────── */}
      <div
        style={{
          height: 130,
          overflow: 'hidden',
          flexShrink: 0,
          background: 'var(--g-bg, #07090D)',
        }}
      >
        <img
          src={proj.image}
          alt={proj.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1)',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div style={{
        padding: '11px 14px 13px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Category */}
        <p style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--g-accent, #14F1D9)',
          margin: '0 0 4px',
        }}>
          {proj.filterCategory}
        </p>

        {/* Title */}
        <h3 style={{
          fontSize: 13,
          fontWeight: 600,
          color: hov ? 'var(--g-text, #FFFFFF)' : 'var(--g-text-dim, #E4E4E7)',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          margin: '0 0 5px',
          transition: 'color 0.25s ease',
        }}>
          {proj.title}
        </h3>

        {/* Description — 1 line */}
        <p style={{
          fontSize: 10,
          lineHeight: 1.55,
          color: 'var(--g-secondary, #A1A1AA)',
          margin: 0,
          flex: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}>
          {proj.description}
        </p>

        {/* Bottom row — arrow */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 9,
          paddingTop: 9,
          borderTop: '1px solid var(--g-border, rgba(255,255,255,0.07))',
        }}>
          <span style={{
            fontSize: 14,
            lineHeight: 1,
            color: hov ? 'var(--g-accent, #14F1D9)' : 'var(--g-subtle, #52526A)',
            transform: hov ? 'translateX(3px)' : 'translateX(0)',
            transition: 'color 0.25s ease, transform 0.25s ease',
          }}>
            →
          </span>
        </div>
      </div>
    </article>
  );
}
