import { useAetherStore } from "@/store/useAetherStore";
import { ARCHETYPES } from "@/types/archetypes";

function HeatmapGrid() {
  const cells = Array.from({ length: 70 }, () => {
    const v = Math.random();
    return v > 0.65 ? Math.floor(v * 5) : 0;
  });
  const max = Math.max(...cells, 1);
  return (
    <div>
      <div className="text-[10px] mb-2 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Activity — Last 70 Days
      </div>
      <div className="flex gap-0.5 flex-wrap">
        {cells.map((v, i) => (
          <div key={i} title={`${v} sessions`}
            className="w-[10px] h-[10px] rounded-sm transition-all duration-200 hover:scale-125"
            style={{
              background: v === 0 ? 'rgba(255,255,255,0.05)' : `rgba(0,225,255,${0.2 + (v/max)*0.75})`,
              boxShadow: v > 0 ? `0 0 4px rgba(0,225,255,${(v/max)*0.4})` : 'none',
            }} />
        ))}
      </div>
      <div className="flex justify-between text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
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
    <div className="glass-bright rounded-2xl p-5 flex flex-col gap-5 w-full">
      <div>
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Aether Level</div>
            <div className="text-3xl font-bold glow-cyan" style={{ color: '#00e1ff', fontFamily: 'Cinzel, serif' }}>{level}</div>
          </div>
          <div className="text-right">
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{xp.toLocaleString()} XP total</div>
            <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{Math.round(xpPct)}% to Lv.{level+1}</div>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${xpPct}%`, background: 'linear-gradient(90deg,#00e1ff,#8b5cf6)', boxShadow: '0 0 8px rgba(0,225,255,0.5)' }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Streak', value: streak, unit: 'days', color: '#fbbf24', emoji: '🔥' },
          { label: 'Sessions', value: sessions, unit: '', color: '#a5b4fc', emoji: '⚡' },
          { label: 'Focus', value: hours, unit: `h ${mins}m`, color: '#22d3ee', emoji: '⏱' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center"
            style={{ background: `${s.color}0d`, border: `1px solid ${s.color}22` }}>
            <div className="text-lg">{s.emoji}</div>
            <div className="text-lg font-bold mt-0.5 leading-none" style={{ color: s.color, fontFamily: 'Cinzel, serif' }}>{s.value}</div>
            <div className="text-[9px] mt-0.5 leading-none" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {s.label}{s.unit ? ` · ${s.unit}` : ''}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Archetype Energies
        </div>
        <div className="flex flex-col gap-1.5">
          {ARCHETYPES.map(arch => {
            const energy = archetypeEnergies[arch.key] ?? 0;
            return (
              <div key={arch.key} className="flex items-center gap-2">
                <span className="text-sm w-5 flex-shrink-0">{arch.emoji}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${energy}%`, background: arch.color, boxShadow: `0 0 4px ${arch.color}80` }} />
                </div>
                <span className="text-[10px] w-6 text-right flex-shrink-0" style={{ color: arch.color }}>{energy}</span>
              </div>
            );
          })}
        </div>
      </div>

      <HeatmapGrid />
    </div>
  );
}
