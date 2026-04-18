import React, { useEffect, useRef } from "react";

/**
 * Subtle animated gold dust / stardust background.
 * Canvas-based for smooth performance. Fixed layer behind page content.
 */
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let particles = [];
    let animId;

    const PARTICLE_COUNT = Math.min(
      110,
      Math.max(60, Math.round((window.innerWidth * window.innerHeight) / 22000))
    );

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(1, 1);
    };

    const createParticle = (randomY = true) => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 100 * dpr,
      r: (Math.random() * 1.6 + 0.4) * dpr,
      baseOpacity: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      vy: -(Math.random() * 0.22 + 0.04) * dpr,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.025 + 0.006,
      // Some particles are tiny sparkles, others are softer glow
      isStar: Math.random() > 0.8,
    });

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(true)
      );
    };

    resize();
    init();

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    const drawStar = (ctx, x, y, r, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = `rgba(245, 208, 99, ${alpha})`;
      ctx.lineWidth = 0.6 * dpr;
      ctx.beginPath();
      ctx.moveTo(-r * 3, 0);
      ctx.lineTo(r * 3, 0);
      ctx.moveTo(0, -r * 3);
      ctx.lineTo(0, r * 3);
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        // Motion
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed;

        // wrap
        if (p.y < -20) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 10;
        if (p.x > w + 20) p.x = -10;

        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2; // 0..1
        const alpha = p.baseOpacity * (0.25 + 0.75 * twinkle);

        // Soft glow halo
        const haloR = p.r * 5;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        g.addColorStop(0, `rgba(245, 208, 99, ${alpha * 0.55})`);
        g.addColorStop(0.45, `rgba(212, 175, 55, ${alpha * 0.18})`);
        g.addColorStop(1, `rgba(212, 175, 55, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(250, 220, 130, ${Math.min(1, alpha * 1.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Occasional plus-shaped sparkle for a few particles
        if (p.isStar && twinkle > 0.85) {
          drawStar(ctx, p.x, p.y, p.r, alpha * 0.6);
        }
      });

      animId = requestAnimationFrame(tick);
    };
    tick();

    // Pause when tab hidden to save CPU
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: "screen", opacity: 0.85 }}
    />
  );
};

export default ParticlesBackground;
