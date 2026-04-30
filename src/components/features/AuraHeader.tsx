import { useAetherStore } from "@/store/useAetherStore";

export default function AuraHeader() {
  const { level, xp, streak, sessions } = useAetherStore();

  return (
    <header style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          background: 'linear-gradient(135deg, rgba(0,225,255,0.18), rgba(139,92,246,0.18))',
          border: '1px solid rgba(0,225,255,0.22)',
          boxShadow: '0 0 14px rgba(0,225,255,0.18)',
        }}>🔱</div>
        <div>
          <div className="gradient-text" style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Cinzel, serif', lineHeight: 1 }}>
            AetherForge
          </div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>
            Personal Mastery OS
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 99, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{streak}d</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 99, background: 'rgba(0,225,255,0.08)', border: '1px solid rgba(0,225,255,0.2)' }}>
          <span className="glow-cyan" style={{ fontSize: 12, fontWeight: 700, color: '#00e1ff' }}>Lv.{level}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.32)' }}>{xp.toLocaleString()} XP</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 99, background: 'rgba(165,180,252,0.08)', border: '1px solid rgba(165,180,252,0.2)' }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc' }}>{sessions}</span>
        </div>
      </div>
    </header>
  );
}
