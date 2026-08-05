import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const A_RGB = '20,241,217';

function ProjectCard({ proj, index }) {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);

  const handleClick = () =>
    proj.external ? window.open(proj.route, '_blank') : navigate(proj.route);

  return (
    <article
      onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--g-surface, rgba(12,18,24,0.72))',
        border: `1px solid ${hov
          ? `rgba(${A_RGB},0.28)`
          : 'var(--g-border, rgba(255,255,255,0.08))'
        }`,
        borderRadius: 'var(--g-radius, 24px)',
        overflow: 'hidden',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov
          ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(${A_RGB},0.08), 0 0 40px rgba(${A_RGB},0.06)`
          : '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'transform 0.38s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.38s ease, border-color 0.38s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{
        overflow: 'hidden',
        aspectRatio: '16 / 10',
        flexShrink: 0,
        position: 'relative',
        borderRadius: 'var(--g-radius) var(--g-radius) 0 0',
        background: '#080A0E',
      }}>
        <img
          src={proj.image}
          alt={proj.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.25,0.1,0.25,1)',
          }}
        />
        {/* Image vignette */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(7,9,13,0.5) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Number + category row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            color: hov ? '#14F1D9' : '#383850',
            transition: 'color 0.3s ease',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontSize: 8, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--g-secondary, #A1A1AA)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--g-border, rgba(255,255,255,0.08))',
            padding: '3px 8px',
            borderRadius: 6,
          }}>
            {proj.navCategory}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          color: hov ? '#FFFFFF' : '#E4E4E7',
          lineHeight: 1.3,
          marginBottom: 8,
          letterSpacing: '-0.01em',
          transition: 'color 0.3s ease',
        }}>
          {proj.title}
        </h3>

        {/* One-sentence description */}
        <p style={{
          fontSize: 12,
          lineHeight: 1.65,
          color: 'var(--g-secondary, #A1A1AA)',
          marginBottom: 20,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {proj.description}
        </p>

        {/* Bottom row: role + arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--g-border, rgba(255,255,255,0.08))',
          paddingTop: 16,
          marginTop: 'auto',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#383850',
          }}>
            {proj.year}
          </span>
          <span style={{
            fontSize: 16,
            color: hov ? '#14F1D9' : '#52526A',
            transform: hov ? 'translateX(3px)' : 'translateX(0)',
            transition: 'all 0.3s ease',
          }}>
            →
          </span>
        </div>
      </div>
    </article>
  );
}

export default function WorkGrid({ projects }) {
  return (
    <section
      aria-label="All projects"
      style={{
        marginTop: 120,
        paddingTop: 80,
        borderTop: '1px solid var(--g-border, rgba(255,255,255,0.08))',
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: 52 }}>
        <p style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--g-accent, #14F1D9)',
          marginBottom: 12,
        }}>
          All Work
        </p>
        <h2 style={{
          fontSize: 'clamp(24px, 2.2vw, 36px)',
          fontWeight: 700,
          color: 'var(--g-text, #ffffff)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Every Project
        </h2>
      </div>

      {/* 4-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
      }}>
        {projects.map((proj, idx) => (
          <ProjectCard key={proj.id} proj={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}
