import { useAetherStore } from "@/store/useAetherStore";
import { ARCHETYPES } from "@/types/archetypes";

function HeatmapGrid() {
  const cells = Array.from({ length: 70 }, (_, i) => {
    const v = Math.sin(i * 0.7 + 1.4) * 0.5 + 0.5;
    return v > 0.6 ? Math.ceil(v * 4) : 0;
  });
  const max = Math.max(...cells, 1);

  return (
    <div>
      <div style={{ fontSize: 9, marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
        Activity — Last 70 Days
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {cells.map((v, i) => (
          <div key={i} title={`${v} sessions`}
            style={{
              width: 10, height: 10, borderRadius: 2,
              background: v === 0 ? 'rgba(255,255,255,0.05)' : `rgba(0,225,255,${0.18 + (v/max)*0.72})`,
              boxShadow: v > 0 ? `0 0 4px rgba(0,225,255,${(v/max)*0.4})` : 'none',
              transition: 'transform 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, marginTop: 5, color: 'rgba(255,255,255,0.2)' }}>
        <span>70 days ago</span><span>Today</span>
      </div>
    </div>
  );
}

export default function StatsPanel() {
  const { xp, level, streak, sessions, totalMinutes, archetypeEnergies } = useAetherStore();

  const xpForLevel = (l: number) => (l - 1) * (l - 1) * 60;
  const xpProgress = xp - xpForLevel(level);
  const xpNeeded = xpForLevel(level + 1) - xpForLevel(level);
  const xpPct = Math.min(100, xpNeeded > 0 ? (xpProgress / xpNeeded) * 100 : 100);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <div className="glass-bright" style={{ borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
      {/* Level & XP */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Aether Level</div>
            <div className="glow-cyan" style={{ fontSize: 34, fontWeight: 700, color: '#00e1ff', fontFamily: 'Cinzel, serif', lineHeight: 1 }}>{level}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.48)' }}>{xp.toLocaleString()} XP</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.24)' }}>{Math.round(xpPct)}% to Lv.{level+1}</div>
          </div>
        </div>
        <div style={{ width: '100%', height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 99, width: `${xpPct}%`, background: 'linear-gradient(90deg,#00e1ff,#8b5cf6)', boxShadow: '0 0 8px rgba(0,225,255,0.5)', transition: 'width 0.7s ease' }} />
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {[
          { label: 'Streak', value: streak, unit: 'days', color: '#fbbf24', emoji: '🔥' },
          { label: 'Sessions', value: sessions, unit: '', color: '#a5b4fc', emoji: '⚡' },
          { label: 'Focus', value: hours, unit: `h ${mins}m`, color: '#22d3ee', emoji: '⏱' },
        ].map(s => (
          <div key={s.label} style={{
            borderRadius: 12, padding: '10px 8px', textAlign: 'center',
            background: `${s.color}0e`, border: `1px solid ${s.color}22`,
          }}>
            <div style={{ fontSize: 18 }}>{s.emoji}</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2, lineHeight: 1, color: s.color, fontFamily: 'Cinzel, serif' }}>{s.value}</div>
            <div style={{ fontSize: 9, marginTop: 3, color: 'rgba(255,255,255,0.32)' }}>{s.label}{s.unit ? ` · ${s.unit}` : ''}</div>
          </div>
        ))}
      </div>

      {/* Archetype energies */}
      <div>
        <div style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10, color: 'rgba(255,255,255,0.32)' }}>
          Archetype Energies
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {ARCHETYPES.map(arch => {
            const energy = archetypeEnergies[arch.key] ?? 0;
            return (
              <div key={arch.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, width: 18, flexShrink: 0 }}>{arch.emoji}</span>
                <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${energy}%`, background: arch.color, boxShadow: `0 0 4px ${arch.color}80`, transition: 'width 0.7s ease' }} />
                </div>
                <span style={{ fontSize: 10, width: 22, textAlign: 'right', flexShrink: 0, color: arch.color }}>{energy}</span>
              </div>
            );
          })}
        </div>
      </div>

      <HeatmapGrid />
    </div>
  );
}
