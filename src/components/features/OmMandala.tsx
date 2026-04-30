import { useAetherStore } from "@/store/useAetherStore";

export default function OmMandala() {
  const { level, xp } = useAetherStore();
  const intensity = Math.min(1, level / 20);
  const SIZE = 190;
  const cx = SIZE / 2;

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}>
      {/* Outer ring */}
      <div className="animate-rotate-slow" style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: `1px solid rgba(0,225,255,${0.14 + intensity * 0.22})`,
        boxShadow: `0 0 ${20 + intensity * 28}px rgba(0,225,255,${0.08 + intensity * 0.18})`,
      }} />
      {/* Middle dashed ring */}
      <div className="animate-rotate-reverse" style={{
        position: 'absolute', inset: 14, borderRadius: '50%',
        border: `1px dashed rgba(139,92,246,${0.18 + intensity * 0.28})`,
      }} />
      {/* Inner ring */}
      <div className="animate-rotate-slow" style={{
        position: 'absolute', inset: 30, borderRadius: '50%',
        border: `1px solid rgba(0,225,255,${0.10 + intensity * 0.18})`,
        animationDuration: '40s',
      }} />
      {/* Glow core */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute', inset: 44, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(139,92,246,${0.14 + intensity * 0.18}), transparent 70%)`,
      }} />

      {/* Om symbol + level */}
      <div className="animate-float" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 48, filter: `drop-shadow(0 0 ${10 + intensity * 18}px rgba(165,180,252,0.9))` }}>🕉️</span>
        <div style={{ textAlign: 'center' }}>
          <div className="glow-cyan" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00e1ff', fontFamily: 'Cinzel, serif' }}>
            Lv.{level}
          </div>
          <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
            {xp.toLocaleString()} XP
          </div>
        </div>
      </div>

      {/* 8 dot markers around the outer edge */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const r = cx - 6;
        const x = Math.cos(angle) * r + cx;
        const y = Math.sin(angle) * r + cx;
        return (
          <div key={i} style={{
            position: 'absolute', width: 5, height: 5, borderRadius: '50%',
            left: x - 2.5, top: y - 2.5,
            background: i % 2 === 0 ? 'rgba(0,225,255,0.75)' : 'rgba(139,92,246,0.75)',
            boxShadow: `0 0 5px ${i % 2 === 0 ? 'rgba(0,225,255,0.8)' : 'rgba(139,92,246,0.8)'}`,
          }} />
        );
      })}

      {/* Trident above */}
      <div className="animate-float" style={{
        position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
        fontSize: 20, filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.9))',
        animationDelay: '1.2s',
      }}>🔱</div>
    </div>
  );
}
