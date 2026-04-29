import { useAetherStore } from "@/store/useAetherStore";

export default function OmMandala() {
  const { level, xp } = useAetherStore();
  const intensity = Math.min(1, level / 20);

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: 200, height: 200 }}>
      <div
        className="absolute inset-0 rounded-full animate-rotate-slow"
        style={{
          border: `1px solid rgba(0,225,255,${0.15 + intensity * 0.25})`,
          boxShadow: `0 0 ${20 + intensity * 30}px rgba(0,225,255,${0.1 + intensity * 0.2})`,
        }}
      />
      <div
        className="absolute rounded-full animate-rotate-reverse"
        style={{ inset: 14, border: `1px dashed rgba(139,92,246,${0.2 + intensity * 0.3})` }}
      />
      <div
        className="absolute rounded-full animate-rotate-slow"
        style={{ inset: 28, border: `1px solid rgba(0,225,255,${0.12 + intensity * 0.2})`, animationDuration: '35s' }}
      />
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          inset: 38,
          background: `radial-gradient(circle, rgba(139,92,246,${0.15 + intensity * 0.2}), transparent 70%)`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1 animate-float">
        <span className="text-5xl" style={{ filter: `drop-shadow(0 0 ${10 + intensity * 20}px rgba(165,180,252,0.9))` }}>
          🕉️
        </span>
        <div className="text-center">
          <div className="text-xs font-bold tracking-widest uppercase glow-cyan" style={{ color: '#00e1ff', fontFamily: 'Cinzel, serif' }}>
            Lv.{level}
          </div>
          <div className="text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {xp.toLocaleString()} XP
          </div>
        </div>
      </div>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const r = 90;
        const x = Math.cos(angle) * r + 100;
        const y = Math.sin(angle) * r + 100;
        return (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{
            left: x - 3, top: y - 3,
            background: i % 2 === 0 ? 'rgba(0,225,255,0.7)' : 'rgba(139,92,246,0.7)',
            boxShadow: `0 0 6px ${i % 2 === 0 ? 'rgba(0,225,255,0.8)' : 'rgba(139,92,246,0.8)'}`,
          }} />
        );
      })}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xl animate-float"
        style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.9))', animationDelay: '1s' }}>
        🔱
      </div>
    </div>
  );
}
