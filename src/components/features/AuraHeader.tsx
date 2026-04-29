import { useAetherStore } from "@/store/useAetherStore";

export default function AuraHeader() {
  const { level, xp, streak, sessions } = useAetherStore();

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0,225,255,0.2), rgba(139,92,246,0.2))',
            border: '1px solid rgba(0,225,255,0.25)',
            boxShadow: '0 0 16px rgba(0,225,255,0.2)',
          }}>
          🔱
        </div>
        <div>
          <div className="text-lg font-bold gradient-text leading-none" style={{ fontFamily: 'Cinzel, serif' }}>
            AetherForge
          </div>
          <div className="text-[10px] tracking-widest uppercase leading-none mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Personal Mastery OS
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-end">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <span className="text-sm">🔥</span>
          <span className="text-xs font-bold" style={{ color: '#fbbf24' }}>{streak}d streak</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(0,225,255,0.08)', border: '1px solid rgba(0,225,255,0.2)' }}>
          <span className="text-xs font-bold" style={{ color: '#00e1ff' }}>Lv.{level}</span>
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{xp.toLocaleString()} XP</span>
        </div>
        <div className="items-center gap-1.5 px-3 py-1.5 rounded-full hidden sm:flex"
          style={{ background: 'rgba(165,180,252,0.08)', border: '1px solid rgba(165,180,252,0.2)' }}>
          <span className="text-sm">⚡</span>
          <span className="text-xs font-bold" style={{ color: '#a5b4fc' }}>{sessions} sessions</span>
        </div>
      </div>
    </header>
  );
}
