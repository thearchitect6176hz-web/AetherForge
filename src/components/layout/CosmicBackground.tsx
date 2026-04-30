import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.45 + 0.1,
      speed: Math.random() * 0.006 + 0.002,
      offset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.015;

      stars.forEach(s => {
        const tw = 0.4 + 0.6 * Math.sin(t * s.speed * 60 + s.offset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * tw})`;
        ctx.fill();
      });

      const w = canvas.width;
      const h = canvas.height;
      const drift = Math.sin(t * 0.03) * 30;

      const drawNebula = (cx: number, cy: number, r: number, color: [number,number,number], alpha: number) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${color},${alpha})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      };

      drawNebula(w * 0.12, h * 0.18 + drift, 340, [99,102,241], 0.09);
      drawNebula(w * 0.88, h * 0.78 - drift, 290, [0,225,255], 0.08);
      drawNebula(w * 0.5, h * 0.5, 400, [139,92,246], 0.05);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: '#050810' }}
    />
  );
}
