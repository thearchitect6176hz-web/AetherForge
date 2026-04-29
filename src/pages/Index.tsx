import { useState } from "react";
import CosmicBackground from "@/components/layout/CosmicBackground";
import AuraHeader from "@/components/features/AuraHeader";
import ArchetypeRing from "@/components/features/ArchetypeRing";
import PomodoroTimer from "@/components/features/PomodoroTimer";
import TaskPanel from "@/components/features/TaskPanel";
import StatsPanel from "@/components/features/StatsPanel";
import ArchetypeModal from "@/components/features/ArchetypeModal";

type Tab = 'sanctuary' | 'focus' | 'quests' | 'stats';
const TABS = [
  { id: 'sanctuary' as Tab, label: 'Sanctuary', emoji: '🕉️' },
  { id: 'focus' as Tab, label: 'Focus', emoji: '🦁' },
  { id: 'quests' as Tab, label: 'Quests', emoji: '⚔️' },
  { id: 'stats' as Tab, label: 'Stats', emoji: '📊' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('sanctuary');

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden cosmic-bg">
      <CosmicBackground />

      <div className="relative z-20">
        <AuraHeader />
      </div>

      {/* Mobile tab bar */}
      <div className="sticky top-0 z-30 flex lg:hidden gap-1 px-4 py-2 mx-4 mb-2 rounded-2xl glass"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: tab === t.id ? 'rgba(0,225,255,0.12)' : 'transparent',
              color: tab === t.id ? '#00e1ff' : 'rgba(255,255,255,0.35)',
              border: `1px solid ${tab === t.id ? 'rgba(0,225,255,0.2)' : 'transparent'}`,
            }}>
            <span>{t.emoji}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative z-10 px-6 pb-8 gap-6 items-start">
        <div className="flex flex-col gap-4 w-80 flex-shrink-0 pt-2">
          <PomodoroTimer />
          <TaskPanel />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pt-4 min-h-[600px]">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold gradient-text mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
              The Aether Sanctuary
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Click an archetype to activate its ritual
            </p>
          </div>
          <ArchetypeRing />
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-lg">
            {[
              { label: '🔱 Trident — Royal Power', color: 'rgba(251,191,36,0.7)' },
              { label: '🐉 Dragon — Guardian', color: 'rgba(129,140,248,0.7)' },
              { label: '🕉️ Om — The Still Center', color: 'rgba(165,180,252,0.7)' },
            ].map(l => (
              <div key={l.label} className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: l.color }}>
                {l.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-72 flex-shrink-0 pt-2">
          <StatsPanel />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden relative z-10 px-4 pb-24">
        {tab === 'sanctuary' && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Cinzel, serif' }}>The Aether Sanctuary</h1>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Tap an archetype to activate its ritual</p>
            </div>
            <div style={{ transform: 'scale(0.82)', transformOrigin: 'top center' }}>
              <ArchetypeRing />
            </div>
          </div>
        )}
        {tab === 'focus' && <div className="max-w-sm mx-auto"><PomodoroTimer /></div>}
        {tab === 'quests' && <div className="max-w-sm mx-auto"><TaskPanel /></div>}
        {tab === 'stats' && <div className="max-w-sm mx-auto"><StatsPanel /></div>}
      </div>

      <ArchetypeModal />
    </div>
  );
}
