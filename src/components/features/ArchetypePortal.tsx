import { ArchetypeDef } from "@/types/archetypes";
import { useAetherStore } from "@/store/useAetherStore";

interface Props {
  archetype: ArchetypeDef;
  size?: number;
}

export default function ArchetypePortal({ archetype, size = 80 }: Props) {
  const { archetypeEnergies, setActiveModal } = useAetherStore();
  const energy = archetypeEnergies[archetype.key] ?? 0;
  const fraction = energy / 100;
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (1 - fraction);

  return (
    <button
      onClick={() => setActiveModal(archetype.key)}
      className="archetype-portal group flex flex-col items-center gap-1.5 focus:outline-none"
      title={`${archetype.name} — ${archetype.subtitle}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: archetype.bgGradient,
            border: `1px solid ${archetype.borderColor}`,
          }}
        />
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={archetype.color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 4px ${archetype.color})` }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ fontSize: size * 0.35, filter: `drop-shadow(0 0 6px ${archetype.glowColor})` }}
        >
          {archetype.emoji}
        </div>
        <div
          className="absolute -bottom-1 -right-1 text-[9px] font-bold rounded-full px-1 leading-[14px]"
          style={{
            background: 'rgba(5,8,16,0.9)',
            border: `1px solid ${archetype.borderColor}`,
            color: archetype.color,
          }}
        >
          {energy}
        </div>
      </div>
      <div className="text-center">
        <div className="text-[10px] font-semibold tracking-wide leading-none" style={{ color: archetype.color, fontFamily: 'Cinzel, serif' }}>
          {archetype.name}
        </div>
        <div className="text-[9px] mt-0.5 leading-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {archetype.subtitle.split(' ')[0]}
        </div>
      </div>
    </button>
  );
}
