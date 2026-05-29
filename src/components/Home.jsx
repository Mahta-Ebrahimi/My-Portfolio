import React, { useEffect, useRef } from "react";

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const mouse = { x: -9999, y: -9999 };
    const MOUSE_RADIUS = 120;
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const PARTICLE_COUNT = 140;
    const CONNECTION_DIST = 150;
    let particles = [];

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
        size: 1.8 + Math.random() * 2,
      }));
    };

    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fontSize = Math.min(380, Math.max(64, window.innerWidth * 0.2));
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.font = `900 ${fontSize}px Raleway, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${-0.13 * fontSize}px`;

      // ── Step 1: solid white letter base so text always reads ──────
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      ctx.fillText("Mahta", cx, cy);

      // ── Step 2: draw mesh into an offscreen region then composite ─
      // Use source-atop so mesh only paints over existing (white text) pixels
      ctx.globalCompositeOperation = "source-atop";

      // Update particles with mouse repulsion
      particles.forEach((p) => {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_RADIUS && mdist > 0) {
          const force = (MOUSE_RADIUS - mdist) / MOUSE_RADIUS * 2.5;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.018;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Connections
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 160, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes with glow
      particles.forEach((p) => {
        const brightness = 0.65 + 0.35 * Math.sin(p.phase);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        grad.addColorStop(0, `rgba(0, 229, 160, ${brightness * 0.7})`);
        grad.addColorStop(1, "rgba(0, 229, 160, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 160, 1)`;
        ctx.fill();
      });

      // Reset composite
      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(draw);
    };

    document.fonts.ready.then(() => draw());

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">

      {/* Ambient glow behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] h-[40%] bg-[#00E5A0]/10 blur-[100px] rounded-full ai-wave" />
      </div>

      {/* Canvas — neural mesh clipped to "Mahta" */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Name + tagline */}
      <div
        className="absolute bottom-20 text-center z-20"
        style={{ fontFamily: "Raleway, sans-serif" }}
      >
        <p className="text-gray-300 text-base sm:text-xl font-medium">Mahta Ebrahimi</p>
        <p className="text-gray-300 text-base sm:text-xl font-medium">
          UI/UX Designer &nbsp;·&nbsp; Frontend Developer &nbsp;·&nbsp; AI Workflow Designer
        </p>
        <p className="mt-2 text-[#FF9533] text-lg sm:text-2xl font-semibold italic">
          Where design meets intelligence.
        </p>
      </div>

      <style>{`
        @keyframes aiWave {
          0%   { transform: translateX(-8%); }
          50%  { transform: translateX(8%);  }
          100% { transform: translateX(-8%); }
        }
        .ai-wave { animation: aiWave 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Home;
