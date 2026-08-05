import { useEffect, useRef } from 'react';

const A = '20,241,217';
const NODE_COUNT = 50;
const MAX_DIST = 138;

function makeNodes(W, H) {
  return Array.from({ length: NODE_COUNT }, () => {
    const tx = Math.random() * W;
    const ty = Math.random() * H;
    return {
      x: tx, y: ty, tx, ty,
      vx: 0, vy: 0,
      dx: (Math.random() - 0.5) * 0.38,
      dy: (Math.random() - 0.5) * 0.38,
      r: 1 + Math.random() * 1.6,
      glow: Math.random() < 0.22,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function draw(ctx, nodes, W, H, t) {
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d >= MAX_DIST) continue;

      const alpha = ((1 - d / MAX_DIST) * 0.55).toFixed(3);
      const cpx = (a.x + b.x) / 2 + dy * 0.07;
      const cpy = (a.y + b.y) / 2 - dx * 0.07;

      ctx.strokeStyle = `rgba(${A},${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
      ctx.stroke();
    }
  }

  nodes.forEach(n => {
    const pulse = n.glow ? 0.5 + Math.sin(t * 1.6 + n.phase) * 0.35 : 1;

    if (n.glow) {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18 * pulse);
      g.addColorStop(0, `rgba(${A},0.15)`);
      g.addColorStop(1, `rgba(${A},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 18 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = `rgba(${A},${n.glow ? (0.6 * pulse).toFixed(2) : '0.22'})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

export default function MeshBackground({ maskPosition = '62% 50%', style }) {
  const ref = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, nodes = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      nodes = makeNodes(W, H);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) {
      draw(ctx, nodes, W, H, 0);
      return () => ro.disconnect();
    }

    let t = 0;
    const tick = () => {
      t += 0.007;
      nodes.forEach(n => {
        n.tx += n.dx;
        n.ty += n.dy;
        if (n.tx < 0 || n.tx > W) { n.dx *= -1; n.tx = Math.max(0, Math.min(W, n.tx)); }
        if (n.ty < 0 || n.ty > H) { n.dy *= -1; n.ty = Math.max(0, Math.min(H, n.ty)); }
        n.vx += (n.tx - n.x) * 0.0005;
        n.vy += (n.ty - n.y) * 0.0005;
        n.vx *= 0.97;
        n.vy *= 0.97;
        n.x += n.vx;
        n.y += n.vy;
      });
      draw(ctx, nodes, W, H, t);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      ro.disconnect();
    };
  }, []);

  const mask = `radial-gradient(ellipse 80% 90% at ${maskPosition}, black 15%, transparent 78%)`;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.1,
        maskImage: mask,
        WebkitMaskImage: mask,
        ...style,
      }}
    />
  );
}
