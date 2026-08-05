import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const A     = '#14F1D9';
const A_RGB = '20,241,217';

/* ── Neural mesh canvas ─────────────────────────────────────────
   Renders flowing lines, bezier curves, glowing nodes.
   opacity: canvas element itself is set to 5-9% externally.    */
function useMesh(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    let raf, time = 0;
    let nodes = [];

    const init = () => {
      el.width  = el.offsetWidth;
      el.height = el.offsetHeight;
      const W = el.width, H = el.height;
      nodes = Array.from({ length: 65 }, (_, i) => ({
        x:    Math.random() * W,
        y:    Math.random() * H,
        vx:   (Math.random() - 0.5) * 0.18,
        vy:   (Math.random() - 0.5) * 0.18,
        r:    Math.random() * 1.3 + 0.3,
        base: Math.random() * 0.55 + 0.25, // opacity multiplier
        phase: Math.random() * Math.PI * 2,
        glow:  i < 14,
      }));
    };

    const tick = () => {
      time += 0.007;
      const W = el.width, H = el.height;
      ctx.clearRect(0, 0, W, H);

      // Update positions (bounce off walls)
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0)  { n.x = 0;  n.vx =  Math.abs(n.vx); }
        if (n.x > W)  { n.x = W;  n.vx = -Math.abs(n.vx); }
        if (n.y < 0)  { n.y = 0;  n.vy =  Math.abs(n.vy); }
        if (n.y > H)  { n.y = H;  n.vy = -Math.abs(n.vy); }
      }

      // Straight connections (< 130 px)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16900) {
            const a = ((1 - Math.sqrt(d2) / 130) * 0.9).toFixed(3);
            ctx.strokeStyle = `rgba(${A_RGB},${a})`;
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Bezier curves between medium-distance pairs (120–260 px, sampled)
      for (let i = 0; i < nodes.length; i += 2) {
        for (let j = i + 3; j < nodes.length; j += 4) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > 120 && d < 260) {
            const a = ((1 - Math.abs(d - 190) / 70) * 0.3).toFixed(3);
            const mx = (nodes[i].x + nodes[j].x) / 2 + dy  * 0.15;
            const my = (nodes[i].y + nodes[j].y) / 2 - dx  * 0.15;
            ctx.strokeStyle = `rgba(${A_RGB},${a})`;
            ctx.lineWidth   = 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.quadraticCurveTo(mx, my, nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes with pulse + optional glow halo
      for (const n of nodes) {
        const pulse = (Math.sin(time + n.phase) * 0.5 + 0.5);
        const a     = (n.base * (0.08 + pulse * 0.04)).toFixed(3);
        const r     = n.r + pulse * 0.4;

        if (n.glow) {
          ctx.fillStyle = `rgba(${A_RGB},${(parseFloat(a) * 0.25).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 6, 0, 6.2832);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${A_RGB},${a})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, 6.2832);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(init);
    ro.observe(el);
    init();
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [ref]);
}

/* ── Pill CTA button ───────────────────────────────────────── */
function PillButton({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '13px 28px',
        borderRadius: 'var(--g-pill, 50px)',
        background: `rgba(12,18,24,${hov ? 0.95 : 0.72})`,
        border: `1px solid rgba(${A_RGB},${hov ? 0.45 : 0.22})`,
        backdropFilter: 'blur(12px)',
        color: A,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        boxShadow: hov
          ? `0 0 36px rgba(${A_RGB},0.18), 0 8px 24px rgba(0,0,0,0.3)`
          : `0 0 18px rgba(${A_RGB},0.07)`,
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.38s cubic-bezier(0.25,0.1,0.25,1)',
        width: 'fit-content',
      }}
    >
      {children}
      <span style={{
        fontSize: 16,
        transform: hov ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.38s ease',
        display: 'inline-block',
      }}>→</span>
    </button>
  );
}

/* ── Main featured component ───────────────────────────────── */
export default function WorkFeatured({ project, index }) {
  const navigate     = useNavigate();
  const canvasBgRef  = useRef(null);
  const canvasFgRef  = useRef(null);
  const panelRef     = useRef(null);
  const [show, setShow]   = useState(true);
  const [proj, setProj]   = useState(project);
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });

  // Honour prefers-reduced-motion
  const noMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  useMesh(canvasBgRef);
  useMesh(canvasFgRef);

  // Cross-fade on project change (380ms ≈ within 350-450ms spec)
  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => { setProj(project); setShow(true); }, 200);
    return () => clearTimeout(t);
  }, [project.id]);

  // Parallax — max ±2° rotation
  const onMove = useCallback((e) => {
    if (!panelRef.current || noMotion) return;
    const r = panelRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top)  / r.height - 0.5) * -4,  // ±2deg
      y: ((e.clientX - r.left) / r.width  - 0.5) *  4,  // ±2deg
    });
  }, [noMotion]);

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  const isResting = tilt.x === 0 && tilt.y === 0;

  const handleCTA = () =>
    proj.external ? window.open(proj.route, '_blank') : navigate(proj.route);

  return (
    <section
      ref={panelRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={`Featured: ${proj.title}`}
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        borderLeft: '1px solid var(--g-border, rgba(255,255,255,0.08))',
      }}
    >
      {/* ── Background canvas (behind everything) */}
      <canvas
        ref={canvasBgRef}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: 0.08, pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Ambient radial glow behind image area */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: 0, top: '15%', bottom: '15%',
        width: '58%',
        background: `radial-gradient(ellipse at 55% 50%, rgba(${A_RGB},0.08) 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── Cross-fade content wrapper */}
      <div
        className="g-transition"
        style={{
          position: 'relative', zIndex: 2,
          height: '100%',
          display: 'flex',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.38s ease, transform 0.38s ease',
        }}
      >
        {/* ── LEFT: glass text panel ──────────────────────────── */}
        <div style={{
          flex: '0 0 42%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 36px 48px 52px',
        }}>

          {/* Glass card */}
          <div style={{
            background: 'var(--g-surface, rgba(12,18,24,0.72))',
            border: '1px solid var(--g-border, rgba(255,255,255,0.08))',
            borderRadius: 'var(--g-radius, 24px)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            {/* Featured label + number */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.32em',
                textTransform: 'uppercase', color: A,
              }}>
                Featured Project
              </span>
              <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.15)',
              }}>
                {String(index + 1).padStart(2, '0')} / {String(10).padStart(2, '0')}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--g-border)', marginBottom: 24 }} />

            {/* Category */}
            <p style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--g-secondary, #A1A1AA)',
              marginBottom: 14,
            }}>
              {proj.category}
            </p>

            {/* Large title */}
            <h2 style={{
              fontSize: 'clamp(30px, 2.8vw, 48px)',
              fontWeight: 700,
              color: 'var(--g-text, #ffffff)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              marginBottom: 20,
            }}>
              {proj.title}
            </h2>

            {/* Description */}
            <p style={{
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--g-secondary, #A1A1AA)',
              marginBottom: 24,
            }}>
              {proj.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {proj.tools.map(tool => (
                <span key={tool} style={{
                  fontSize: 9, fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 'var(--g-radius-sm, 12px)',
                  border: '1px solid var(--g-border, rgba(255,255,255,0.08))',
                  color: 'var(--g-secondary, #A1A1AA)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  {tool}
                </span>
              ))}
            </div>

            {/* Role · Year */}
            <p style={{
              fontSize: 11,
              color: '#383850',
              marginBottom: 28,
              letterSpacing: '0.04em',
            }}>
              <span style={{ color: '#52526A' }}>{proj.role}</span>
              <span style={{ color: '#2E2E3E', margin: '0 8px' }}>·</span>
              <span style={{ color: '#52526A' }}>{proj.year}</span>
            </p>

            {/* CTA */}
            <PillButton onClick={handleCTA}>
              View Case Study
            </PillButton>
          </div>
        </div>

        {/* ── RIGHT: floating mockup ───────────────────────────── */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '36px 52px 36px 16px',
          position: 'relative',
        }}>
          {/* Float wrapper — CSS animation only translates Y */}
          <div
            className={noMotion ? '' : 'mockup-float'}
            style={{
              animation: noMotion ? 'none' : 'mockupFloat 7s ease-in-out infinite',
              width: '100%',
              maxWidth: 620,
              position: 'relative',
            }}
          >
            {/* Tilt wrapper — JS-driven perspective rotation */}
            <div style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isResting
                ? 'transform 0.9s cubic-bezier(0.25,0.1,0.25,1)'
                : 'transform 0.06s linear',
              willChange: 'transform',
              position: 'relative',
            }}>
              {/* Glass frame */}
              <div style={{
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: 'var(--g-radius, 24px)',
                border: '1px solid rgba(255,255,255,0.12)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: `
                  0 0 0 1px rgba(${A_RGB},0.08),
                  0 48px 100px rgba(0,0,0,0.7),
                  0 0 80px rgba(${A_RGB},0.06)
                `,
                background: '#0a0c10',
              }}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />

                {/* Top glass reflection */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 80,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)',
                  pointerEvents: 'none', borderRadius: 'var(--g-radius) var(--g-radius) 0 0',
                }} />

                {/* Thin cyan top accent line */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `rgba(${A_RGB},0.35)`,
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Ground glow */}
              <div aria-hidden="true" style={{
                position: 'absolute',
                bottom: -20, left: '10%', right: '10%', height: 20,
                background: `radial-gradient(ellipse at 50% 0%, rgba(${A_RGB},0.14), transparent 70%)`,
                filter: 'blur(8px)',
              }} />
            </div>
          </div>

          {/* Foreground canvas — very low opacity, gives depth */}
          <canvas
            ref={canvasFgRef}
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              opacity: 0.025, pointerEvents: 'none', zIndex: 10,
            }}
          />
        </div>
      </div>
    </section>
  );
}
