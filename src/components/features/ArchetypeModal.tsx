import { useState, useEffect } from "react";
import { useAetherStore } from "@/store/useAetherStore";
import { getArchetype } from "@/types/archetypes";
import { toast } from "sonner";

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
  const dur = phase === 'inhale' ? '4000ms' : phase === 'hold' ? '100ms' : '8000ms';
  const labels: Record<string, string> = { inhale: 'Inhale... 4s', hold: 'Hold... 7s', exhale: 'Exhale... 8s', idle: 'Press Begin' };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="rounded-full flex items-center justify-center text-3xl transition-all"
        style={{ width: size, height: size, background: 'rgba(192,38,211,0.15)', border: '2px solid rgba(232,121,249,0.4)', transitionDuration: dur,
          boxShadow: phase !== 'idle' ? '0 0 30px rgba(232,121,249,0.3)' : 'none' }}>
        🦋
      </div>
      <div className="text-sm font-semibold" style={{ color: '#e879f9' }}>{labels[phase]}</div>
      {cycles > 0 && <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{cycles} cycles complete</div>}
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
    toast.success('Mirror entry recorded. +30 XP', { duration: 3000 });
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl p-4 text-sm leading-relaxed italic"
        style={{ background: 'rgba(224,242,254,0.05)', border: '1px solid rgba(224,242,254,0.1)', color: 'rgba(224,242,254,0.7)' }}>
        "{prompt}"
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)}
        placeholder="Write your reflection here..." rows={5}
        className="w-full bg-transparent text-sm outline-none resize-none rounded-xl p-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(224,242,254,0.1)', color: 'rgba(255,255,255,0.85)' }} />
      <button onClick={submit} disabled={!text.trim()}
        className="w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: text.trim() ? 'rgba(224,242,254,0.12)' : 'rgba(255,255,255,0.05)',
          color: text.trim() ? '#e0f2fe' : 'rgba(255,255,255,0.3)',
          border: `1px solid ${text.trim() ? 'rgba(224,242,254,0.25)' : 'transparent'}`,
        }}>
        Record Reflection
      </button>
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

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(id); setRunning(false); setDone(true); boostArchetype('om', 15); toast.success('Meditation complete. +15 XP', { duration: 3000 }); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, boostArchetype]);

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {!running && !done && (
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>Duration</span><span style={{ color: '#a5b4fc' }}>{duration} min</span>
          </div>
          <input type="range" min={1} max={20} value={duration}
            onChange={e => { const v = Number(e.target.value); setDuration(v); setTimeLeft(v * 60); }}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #a5b4fc ${((duration-1)/19)*100}%, rgba(255,255,255,0.1) 0%)` }} />
        </div>
      )}
      <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl relative animate-heartbeat"
        style={{ background: 'radial-gradient(circle, rgba(165,180,252,0.15), transparent 70%)', border: '1px solid rgba(165,180,252,0.25)' }}>
        🕉️
        {running && (
          <svg className="absolute inset-0 -rotate-90" width="112" height="112">
            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(165,180,252,0.08)" strokeWidth="3"/>
            <circle cx="56" cy="56" r="50" fill="none" stroke="#a5b4fc" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={314} strokeDashoffset={314*(1-pct/100)}
              style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 6px rgba(165,180,252,0.6))' }} />
          </svg>
        )}
      </div>
      {running && <div className="text-2xl font-bold" style={{ color: '#a5b4fc', fontVariantNumeric: 'tabular-nums' }}>{fmt(timeLeft)}</div>}
      {done
        ? <div className="text-sm" style={{ color: '#a5b4fc' }}>Meditation complete ✨</div>
        : <button onClick={() => setRunning(r => !r)}
            className="w-full py-2.5 rounded-xl font-bold text-sm"
            style={{ background: 'rgba(165,180,252,0.15)', color: '#a5b4fc', border: '1px solid rgba(165,180,252,0.25)' }}>
            {running ? '⏸ Pause' : '▶ Begin Meditation'}
          </button>
      }
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

  const handleClose = () => {
    setActiveModal(null);
    setBreathingActive(false);
    setPhoenixText('');
    setPhoenixDone(false);
  };

  const handleRitual = () => {
    if (activeModal === 'butterfly') {
      setBreathingActive(true);
    } else if (activeModal === 'phoenix') {
      if (phoenixText.trim()) {
        setPhoenixDone(true);
        boostArchetype('phoenix', 20);
        toast.success('Burned and reborn. +20 XP', { duration: 3000 });
      }
    } else if (activeModal === 'lion') {
      handleClose();
      toast.success('Lion awakened. Start your Pomodoro!', { duration: 2000 });
    } else if (activeModal === 'rabbit') {
      handleClose();
      toast.success('Sprint mode activated! 10 minutes. Go!', { duration: 2000 });
    } else {
      boostArchetype(activeModal, 12);
      toast.success(`${arch.name} energy channeled. +12 XP`, { duration: 2500 });
      handleClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
        onClick={handleClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-2xl p-6 flex flex-col gap-5 animate-portal-enter"
        style={{
          background: 'rgba(8,10,22,0.96)',
          border: `1px solid ${arch.borderColor}`,
          boxShadow: `0 0 60px ${arch.glowColor}, 0 0 120px ${arch.glowColor.replace('0.4','0.1').replace('0.3','0.08')}`,
          maxHeight: '90vh', overflowY: 'auto',
        }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: arch.bgGradient, border: `1px solid ${arch.borderColor}`, boxShadow: `0 0 20px ${arch.glowColor}` }}>
              {arch.emoji}
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: arch.color, fontFamily: 'Cinzel, serif' }}>{arch.name}</h2>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{arch.subtitle}</div>
            </div>
          </div>
          <button onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10 text-sm"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            ✕
          </button>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{arch.description}</p>

        <div className="rounded-xl p-4 italic text-sm leading-relaxed"
          style={{ background: `${arch.color}0a`, border: `1px solid ${arch.borderColor}`, color: `${arch.color}cc` }}>
          "{arch.quotes[0]}"
        </div>

        {activeModal === 'butterfly' && <BreathingCircle active={breathingActive} />}
        {activeModal === 'om' && <MeditationTimer onClose={handleClose} />}
        {activeModal === 'mirror' && <MirrorJournal onClose={handleClose} />}

        {activeModal === 'phoenix' && !phoenixDone && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
              What are you releasing to the flame?
            </label>
            <textarea value={phoenixText} onChange={e => setPhoenixText(e.target.value)}
              placeholder="Write what you are burning away..." rows={3}
              className="w-full bg-transparent text-sm outline-none resize-none rounded-xl p-3"
              style={{ background: 'rgba(251,146,60,0.05)', border: '1px solid rgba(251,146,60,0.2)', color: 'rgba(255,255,255,0.8)' }} />
          </div>
        )}

        {phoenixDone && (
          <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)' }}>
            <div className="text-3xl mb-2">🐦‍🔥</div>
            <div className="text-sm font-bold" style={{ color: '#fb923c' }}>The Phoenix rises from the ash.</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Your release has been witnessed.</div>
          </div>
        )}

        {activeModal !== 'om' && activeModal !== 'mirror' && !phoenixDone && (
          <button onClick={handleRitual}
            disabled={activeModal === 'phoenix' && !phoenixText.trim()}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: arch.bgGradient,
              color: arch.color,
              border: `1px solid ${arch.borderColor}`,
              boxShadow: `0 0 16px ${arch.glowColor}`,
              opacity: activeModal === 'phoenix' && !phoenixText.trim() ? 0.4 : 1,
            }}>
            {activeModal === 'butterfly' && breathingActive ? 'Stop Breathing Ritual' : arch.ritualLabel}
          </button>
        )}
      </div>
    </>
  );
}
