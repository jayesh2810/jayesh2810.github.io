import { useEffect, useRef } from "react";

/** Ported from jayesh2810.github.io ParticleCanvas.svelte — clustered node network animation. */
const clusterColors = [
  "rgba(196, 93, 62, 0.4)",
  "rgba(70, 130, 180, 0.4)",
  "rgba(100, 160, 90, 0.35)",
  "rgba(200, 170, 80, 0.4)",
];

const lineColorPrefixes = [
  "rgba(196, 93, 62, ",
  "rgba(70, 130, 180, ",
  "rgba(100, 160, 90, ",
  "rgba(200, 170, 80, ",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  cluster: number;
  cx: number;
  cy: number;
  radius: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let animationId = 0;
    let isVisible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles = [];
      const centers = [
        { x: w * 0.25, y: h * 0.35 },
        { x: w * 0.7, y: h * 0.3 },
        { x: w * 0.4, y: h * 0.7 },
        { x: w * 0.75, y: h * 0.65 },
      ];

      for (let i = 0; i < 80; i++) {
        const cluster = Math.floor(Math.random() * 4);
        const c = centers[cluster];
        particles.push({
          x: c.x + (Math.random() - 0.5) * w * 0.25,
          y: c.y + (Math.random() - 0.5) * h * 0.25,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          cluster,
          cx: c.x,
          cy: c.y,
          radius: Math.random() * 2 + 1.5,
        });
      }
    }

    function draw() {
      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.cx - p.x;
        const dy = p.cy - p.y;
        p.vx += dx * 0.0002;
        p.vy += dy * 0.0002;
        p.vx *= 0.998;
        p.vy *= 0.998;
        p.x += p.vx;
        p.y += p.vy;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (p.cluster !== q.cluster) continue;
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = lineColorPrefixes[p.cluster] + opacity + ")";
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = clusterColors[p.cluster];
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.1 },
    );
    observer.observe(canvas);

    function onResize() {
      resize();
      initParticles();
    }

    window.addEventListener("resize", onResize);
    resize();
    initParticles();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
