import { useState, useEffect } from "react";
import { useAetherStore } from "@/store/useAetherStore";
import { getArchetype } from "@/types/archetypes";

function BreathingCircle({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'idle'>('idle');
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!active) { setPhase('idle'); return; }
    let to: ReturnType<typeof setTimeout>;
    const run = () => {
      setPhase('inhale');
      to = setTimeout(() => {
        setPhase('hold');
        to = setTimeout(() => {
          setPhase('exhale');
          to = setTimeout(() => { setCycles(c => c + 1); run(); }, 8000);
        }, 7000);
      }, 4000);
    };
    run();
    return () => clearTimeout(to);
  }, [active]);

  const size = phase === 'inhale' ? 120 : phase === 'exhale' ? 56 : 80;
  const dur = phase === 'inhale' ? '4s' : phase === 'hold' ? '0.1s' : '8s';
  const labels: Record<string, string> = { inhale: 'Inhale... 4s', hold: 'Hold... 7s', exhale: 'Exhale... 8s', idle: 'Press Begin' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0' }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
        background: 'rgba(232,121,249,0.1)', border: '2px solid rgba(232,121,249,0.35)',
        boxShadow: phase !== 'idle' ? '0 0 28px rgba(232,121,249,0.3)' : 'none',
        transition: `all ${dur} ease`,
      }}>🦋</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#e879f9' }}>{labels[phase]}</div>
      {cycles > 0 && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.32)' }}>{cycles} cycles complete</div>}
    </div>
  );
}

function MeditationTimer({ onClose: _onClose }: { onClose: () => void }) {
  const { boostArchetype } = useAetherStore();
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  const pct = (timeLeft / (duration * 60)) * 100;
  const CIRC = 2 * Math.PI * 50;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(id); setRunning(false); setDone(true); boostArchetype('om', 15); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, boostArchetype]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {!running && !done && (
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 6, color: 'rgba(255,255,255,0.35)' }}>
            <span>Duration</span><span style={{ color: '#a5b4fc' }}>{duration} min</span>
          </div>
          <input type="range" min={1} max={20} value={duration}
            onChange={e => { const v = Number(e.target.value); setDuration(v); setTimeLeft(v * 60); }}
            style={{ width: '100%', height: 4, borderRadius: 99, appearance: 'none', cursor: 'pointer', background: `linear-gradient(to right, #a5b4fc ${((duration-1)/19)*100}%, rgba(255,255,255,0.1) 0%)` }} />
        </div>
      )}
      <div className="animate-heartbeat" style={{ position: 'relative', width: 112, height: 112, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle,rgba(165,180,252,0.12),transparent 70%)', border: '1px solid rgba(165,180,252,0.22)' }} />
        {running && (
          <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} width="112" height="112">
            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(165,180,252,0.08)" strokeWidth="3" />
            <circle cx="56" cy="56" r="50" fill="none" stroke="#a5b4fc" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct / 100)}
              style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 6px rgba(165,180,252,0.6))' }} />
          </svg>
        )}
        <span style={{ position: 'relative', fontSize: 40, zIndex: 1 }}>🕉️</span>
      </div>
      {running && <div style={{ fontSize: 26, fontWeight: 700, color: '#a5b4fc', fontVariantNumeric: 'tabular-nums' }}>{fmt(timeLeft)}</div>}
      {done
        ? <div style={{ fontSize: 13, color: '#a5b4fc' }}>Meditation complete ✨</div>
        : <button onClick={() => setRunning(r => !r)}
            style={{ width: '100%', padding: '11px 0', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer', background: 'rgba(165,180,252,0.14)', color: '#a5b4fc', border: '1px solid rgba(165,180,252,0.24)' }}>
            {running ? '⏸ Pause' : '▶ Begin Meditation'}
          </button>
      }
    </div>
  );
}

function MirrorJournal({ onClose }: { onClose: () => void }) {
  const { addJournalEntry, journal } = useAetherStore();
  const arch = getArchetype('mirror');
  const [text, setText] = useState('');
  const prompt = arch.journalPrompts[journal.length % arch.journalPrompts.length];

  const submit = () => {
    if (!text.trim()) return;
    addJournalEntry(text.trim(), prompt);
    onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ borderRadius: 12, padding: 14, fontSize: 13, lineHeight: 1.7, fontStyle: 'italic', background: 'rgba(224,242,254,0.05)', border: '1px solid rgba(224,242,254,0.1)', color: 'rgba(224,242,254,0.65)' }}>
        "{prompt}"
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)}
        placeholder="Write your reflection here..." rows={5}
        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(224,242,254,0.1)', borderRadius: 12, padding: 12, fontSize: 13, color: 'rgba(255,255,255,0.85)', outline: 'none', resize: 'none', fontFamily: 'Inter, sans-serif' }} />
      <button onClick={submit} disabled={!text.trim()}
        style={{
          width: '100%', padding: '11px 0', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: text.trim() ? 'pointer' : 'default',
          background: text.trim() ? 'rgba(224,242,254,0.1)' : 'rgba(255,255,255,0.05)',
          color: text.trim() ? '#e0f2fe' : 'rgba(255,255,255,0.28)',
          border: `1px solid ${text.trim() ? 'rgba(224,242,254,0.22)' : 'transparent'}`,
        }}>
        Record Reflection
      </button>
    </div>
  );
}

export default function ArchetypeModal() {
  const { activeModal, setActiveModal, boostArchetype } = useAetherStore();
  const [breathingActive, setBreathingActive] = useState(false);
  const [phoenixText, setPhoenixText] = useState('');
  const [phoenixDone, setPhoenixDone] = useState(false);

  if (!activeModal) return null;
  const arch = getArchetype(activeModal);

  const handleClose = () => { setActiveModal(null); setBreathingActive(false); setPhoenixText(''); setPhoenixDone(false); };

  const handleRitual = () => {
    if (activeModal === 'butterfly') { setBreathingActive(true); }
    else if (activeModal === 'phoenix') { if (phoenixText.trim()) { setPhoenixDone(true); boostArchetype('phoenix', 20); } }
    else if (activeModal === 'lion' || activeModal === 'rabbit') { handleClose(); }
    else { boostArchetype(activeModal, 12); handleClose(); }
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', cursor: 'pointer' }} />

      {/* Modal */}
      <div className="animate-portal-enter" style={{
        position: 'fixed', top: '50%', left: '50%', zIndex: 50,
        width: 'calc(100% - 32px)', maxWidth: 420,
        borderRadius: 20, padding: 24,
        display: 'flex', flexDirection: 'column', gap: 18,
        background: 'rgba(6,8,20,0.97)',
        border: `1px solid ${arch.borderColor}`,
        boxShadow: `0 0 50px ${arch.glowColor}, 0 0 100px ${arch.glowColor.replace(/[\d.]+\)$/, '0.08)')}`,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, fontSize: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: arch.bgGradient, border: `1px solid ${arch.borderColor}`,
              boxShadow: `0 0 18px ${arch.glowColor}`,
            }}>{arch.emoji}</div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: arch.color, fontFamily: 'Cinzel, serif', lineHeight: 1 }}>{arch.name}</h2>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.36)', marginTop: 3 }}>{arch.subtitle}</div>
            </div>
          </div>
          <button onClick={handleClose} style={{
            width: 30, height: 30, borderRadius: 8, fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)',
          }}>✕</button>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.58)' }}>{arch.description}</p>

        {/* Quote */}
        <div style={{ borderRadius: 12, padding: 14, fontSize: 13, lineHeight: 1.7, fontStyle: 'italic', background: `${arch.color}0b`, border: `1px solid ${arch.borderColor}`, color: `${arch.color}cc` }}>
          "{arch.quotes[0]}"
        </div>

        {/* Ritual-specific UI */}
        {activeModal === 'butterfly' && <BreathingCircle active={breathingActive} />}
        {activeModal === 'om' && <MeditationTimer onClose={handleClose} />}
        {activeModal === 'mirror' && <MirrorJournal onClose={handleClose} />}

        {activeModal === 'phoenix' && !phoenixDone && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.36)' }}>
              What are you releasing to the flame?
            </label>
            <textarea value={phoenixText} onChange={e => setPhoenixText(e.target.value)}
              placeholder="Write what you are burning away..." rows={3}
              style={{ width: '100%', background: 'rgba(251,146,60,0.05)', border: '1px solid rgba(251,146,60,0.18)', borderRadius: 12, padding: 12, fontSize: 13, color: 'rgba(255,255,255,0.82)', outline: 'none', resize: 'none', fontFamily: 'Inter, sans-serif' }} />
          </div>
        )}

        {phoenixDone && (
          <div style={{ borderRadius: 12, padding: 16, textAlign: 'center', background: 'rgba(251,146,60,0.09)', border: '1px solid rgba(251,146,60,0.28)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🐦‍🔥</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fb923c' }}>The Phoenix rises from the ash.</div>
            <div style={{ fontSize: 11, marginTop: 5, color: 'rgba(255,255,255,0.36)' }}>Your release has been witnessed.</div>
          </div>
        )}

        {/* CTA */}
        {activeModal !== 'om' && activeModal !== 'mirror' && !phoenixDone && (
          <button onClick={handleRitual}
            disabled={activeModal === 'phoenix' && !phoenixText.trim()}
            style={{
              width: '100%', padding: '13px 0', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              background: arch.bgGradient, color: arch.color,
              border: `1px solid ${arch.borderColor}`,
              boxShadow: `0 0 14px ${arch.glowColor}`,
              opacity: activeModal === 'phoenix' && !phoenixText.trim() ? 0.4 : 1,
              transition: 'all 0.2s',
            }}>
            {activeModal === 'butterfly' && breathingActive ? 'Stop Breathing Ritual' : arch.ritualLabel}
          </button>
        )}
      </div>
    </>
  );
}
