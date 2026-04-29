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

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.6 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.008 + 0.002,
      offset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      stars.forEach(s => {
        const tw = 0.4 + 0.6 * Math.sin(t * s.speed * 60 + s.offset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * tw})`;
        ctx.fill();
      });

      const drift = Math.sin(t * 0.04) * 25;
      const w = canvas.width;
      const h = canvas.height;

      const drawNebula = (cx: number, cy: number, r: number, color: [number,number,number], alpha: number) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${color.join(',')},${alpha})`);
        g.addColorStop(1, `rgba(${color.join(',')},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      };

      drawNebula(w * 0.15, h * 0.2 + drift, 350, [99,102,241], 0.08);
      drawNebula(w * 0.85, h * 0.75 - drift, 300, [0,225,255], 0.07);
      drawNebula(w * 0.5, h * 0.5, 420, [139,92,246], 0.05);

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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#050810' }}
    />
  );
}
