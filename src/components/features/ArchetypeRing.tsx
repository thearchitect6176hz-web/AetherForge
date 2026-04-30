import { ARCHETYPES } from "@/types/archetypes";
import { useAetherStore } from "@/store/useAetherStore";
import OmMandala from "./OmMandala";

export default function ArchetypeRing() {
  const { archetypeEnergies, setActiveModal } = useAetherStore();
  const ringArchetypes = ARCHETYPES.filter(a => a.key !== 'om');
  const count = ringArchetypes.length;
  const W = 480;
  const H = 480;
  const cx = W / 2;
  const cy = H / 2;
  const R = 186;
  const portalSize = 78;

  return (
    <div style={{ position: 'relative', width: W, height: H, userSelect: 'none' }}>
      {/* Orbit decorations */}
      <div className="animate-rotate-slow" style={{
        position: 'absolute', inset: 16, borderRadius: '50%',
        border: '1px dashed rgba(255,255,255,0.04)', animationDuration: '70s',
        pointerEvents: 'none',
      }} />
      <div className="animate-rotate-reverse" style={{
        position: 'absolute', inset: 40, borderRadius: '50%',
        border: '1px dashed rgba(0,225,255,0.06)', animationDuration: '90s',
        pointerEvents: 'none',
      }} />

      {/* Om center */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10, pointerEvents: 'auto',
      }}>
        <OmMandala />
      </div>

      {/* Archetype portals */}
      {ringArchetypes.map((arch, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * R - portalSize / 2;
        const y = cy + Math.sin(angle) * R - portalSize / 2 - 8;
        const energy = archetypeEnergies[arch.key] ?? 0;
        const r = portalSize / 2 - 5;
        const circ = 2 * Math.PI * r;
        const dashOffset = circ * (1 - energy / 100);

        return (
          <div key={arch.key} style={{ position: 'absolute', left: x, top: y, zIndex: 20 }}>
            <button
              onClick={() => setActiveModal(arch.key)}
              className="archetype-portal"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              title={`${arch.name} — ${arch.subtitle}`}
            >
              <div style={{ position: 'relative', width: portalSize, height: portalSize }}>
                {/* Background disc */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: arch.bgGradient,
                  border: `1px solid ${arch.borderColor}`,
                }} />
                {/* Energy ring SVG */}
                <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} width={portalSize} height={portalSize}>
                  <circle cx={portalSize/2} cy={portalSize/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx={portalSize/2} cy={portalSize/2} r={r} fill="none"
                    stroke={arch.color} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 4px ${arch.color})` }} />
                </svg>
                {/* Emoji */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: portalSize * 0.34,
                  filter: `drop-shadow(0 0 5px ${arch.glowColor})`,
                  transition: 'transform 0.25s ease',
                }}>
                  {arch.emoji}
                </div>
                {/* Energy badge */}
                <div style={{
                  position: 'absolute', bottom: -3, right: -3,
                  fontSize: 9, fontWeight: 700, padding: '1px 4px', borderRadius: 99,
                  background: 'rgba(5,8,16,0.92)',
                  border: `1px solid ${arch.borderColor}`,
                  color: arch.color,
                  lineHeight: '14px',
                }}>
                  {energy}
                </div>
              </div>
              {/* Label */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: arch.color, fontFamily: 'Cinzel, serif', lineHeight: 1 }}>
                  {arch.name}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
