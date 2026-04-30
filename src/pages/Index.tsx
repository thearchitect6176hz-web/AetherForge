import { useState } from "react";
import CosmicBackground from "@/components/layout/CosmicBackground";
import AuraHeader from "@/components/features/AuraHeader";
import ArchetypeRing from "@/components/features/ArchetypeRing";
import PomodoroTimer from "@/components/features/PomodoroTimer";
import TaskPanel from "@/components/features/TaskPanel";
import StatsPanel from "@/components/features/StatsPanel";
import ArchetypeModal from "@/components/features/ArchetypeModal";

type Tab = 'sanctuary' | 'focus' | 'quests' | 'stats';
const TABS: { id: Tab; emoji: string; label: string }[] = [
  { id: 'sanctuary', emoji: '🕉️', label: 'Sanctuary' },
  { id: 'focus', emoji: '🦁', label: 'Focus' },
  { id: 'quests', emoji: '⚔️', label: 'Quests' },
  { id: 'stats', emoji: '📊', label: 'Stats' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('sanctuary');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }} className="cosmic-bg">
      <CosmicBackground />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <AuraHeader />
      </div>

      {/* Mobile tabs */}
      <div className="glass" style={{
        position: 'sticky', top: 0, zIndex: 30,
        display: 'flex', gap: 4, margin: '0 16px 8px', padding: '6px',
        borderRadius: 16,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: 10, fontSize: 11, fontWeight: 600, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              background: tab === t.id ? 'rgba(0,225,255,0.12)' : 'transparent',
              color: tab === t.id ? '#00e1ff' : 'rgba(255,255,255,0.32)',
              border: `1px solid ${tab === t.id ? 'rgba(0,225,255,0.22)' : 'transparent'}`,
              transition: 'all 0.2s',
            }}>
            <span style={{ fontSize: 16 }}>{t.emoji}</span>
            <span style={{ fontSize: 9, letterSpacing: '0.06em' }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop layout (lg+) */}
      <div style={{ display: 'none' }} className="lg:flex" >
        {/* lg flex override via media — use inline approach below */}
      </div>

      {/* Responsive layout via CSS classes */}
      <div className="hidden lg:flex" style={{ position: 'relative', zIndex: 10, padding: '0 24px 32px', gap: 24, alignItems: 'flex-start' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300, flexShrink: 0, paddingTop: 8 }}>
          <PomodoroTimer />
          <TaskPanel />
        </div>

        {/* Center — Sanctuary */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 16, minHeight: 580 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h1 className="gradient-text" style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Cinzel, serif', lineHeight: 1 }}>
              The Aether Sanctuary
            </h1>
            <p style={{ fontSize: 13, marginTop: 6, color: 'rgba(255,255,255,0.32)' }}>
              Click an archetype to activate its ritual
            </p>
          </div>
          <ArchetypeRing />
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, maxWidth: 480 }}>
            {[
              { label: '🔱 Trident — Royal Power', color: 'rgba(251,191,36,0.65)' },
              { label: '🐉 Dragon — The Guardian', color: 'rgba(129,140,248,0.65)' },
              { label: '🕉️ Om — The Still Center', color: 'rgba(165,180,252,0.65)' },
            ].map(l => (
              <div key={l.label} style={{
                fontSize: 10, padding: '4px 12px', borderRadius: 99,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                color: l.color,
              }}>
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280, flexShrink: 0, paddingTop: 8 }}>
          <StatsPanel />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden" style={{ position: 'relative', zIndex: 10, padding: '8px 16px 96px' }}>
        {tab === 'sanctuary' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <h1 className="gradient-text" style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>The Aether Sanctuary</h1>
              <p style={{ fontSize: 11, marginTop: 5, color: 'rgba(255,255,255,0.32)' }}>Tap an archetype to activate its ritual</p>
            </div>
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
              <ArchetypeRing />
            </div>
          </div>
        )}
        {tab === 'focus' && (
          <div style={{ maxWidth: 360, margin: '0 auto' }}>
            <PomodoroTimer />
          </div>
        )}
        {tab === 'quests' && (
          <div style={{ maxWidth: 360, margin: '0 auto' }}>
            <TaskPanel />
          </div>
        )}
        {tab === 'stats' && (
          <div style={{ maxWidth: 360, margin: '0 auto' }}>
            <StatsPanel />
          </div>
        )}
      </div>

      <ArchetypeModal />
    </div>
  );
}
