import React, { useEffect, useRef } from "react";

const SkillsMesh = () => {
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

    // Match hero section colors - green particles
    const PARTICLE_COLOR = '0, 229, 160'; // #00E5A0 - same as hero
    const CONNECTION_DIST = 180;
    const PARTICLE_COUNT = 50;
    let particles = [];

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
        size: 1.5 + Math.random() * 2,
      }));
    };

    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.015;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Draw connections - same style as hero
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.6;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow - same style as hero
      particles.forEach((p) => {
        const brightness = 0.5 + 0.5 * Math.sin(p.phase);

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        grad.addColorStop(0, `rgba(${PARTICLE_COLOR}, ${brightness * 0.8})`);
        grad.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${PARTICLE_COLOR})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    document.fonts.ready.then(() => draw());

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-black overflow-hidden rounded-xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
      
      {/* Ambient glow - matching hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[50%] h-[50%] bg-[#00E5A0]/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default SkillsMesh;