import { ARCHETYPES } from "@/types/archetypes";
import ArchetypePortal from "./ArchetypePortal";
import OmMandala from "./OmMandala";

export default function ArchetypeRing() {
  const ringArchetypes = ARCHETYPES.filter(a => a.key !== 'om');
  const count = ringArchetypes.length;
  const W = 500;
  const H = 500;
  const cx = W / 2;
  const cy = H / 2;
  const R = 195;
  const portalSize = 80;

  return (
    <div className="relative select-none" style={{ width: W, height: H }}>
      {/* Decorative orbit rings */}
      <div className="absolute rounded-full pointer-events-none animate-rotate-slow"
        style={{ inset: 20, border: '1px dashed rgba(255,255,255,0.04)', animationDuration: '60s' }} />
      <div className="absolute rounded-full pointer-events-none animate-rotate-reverse"
        style={{ inset: 45, border: '1px dashed rgba(0,225,255,0.05)', animationDuration: '80s' }} />

      {/* Center Om */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
        <OmMandala />
      </div>

      {/* Archetype portals */}
      {ringArchetypes.map((arch, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * R - portalSize / 2;
        const y = cy + Math.sin(angle) * R - portalSize / 2 - 10;
        return (
          <div key={arch.key} className="absolute z-20" style={{ left: x, top: y }}>
            <ArchetypePortal archetype={arch} size={portalSize} />
          </div>
        );
      })}
    </div>
  );
}
