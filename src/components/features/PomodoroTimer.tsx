import { useState, useEffect, useRef, useCallback } from "react";
import { useAetherStore } from "@/store/useAetherStore";
import { toast } from "sonner";

type TimerMode = 'focus' | 'short' | 'long';

const DURATIONS: Record<TimerMode, number> = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
const MODE_LABELS: Record<TimerMode, string> = { focus: 'Deep Focus', short: 'Short Rest', long: 'Long Rest' };
const MODE_COLORS: Record<TimerMode, string> = { focus: '#fbbf24', short: '#22d3ee', long: '#a5b4fc' };

const SIZE = 160;
const R = 66;
const CIRC = 2 * Math.PI * R;

const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

export default function PomodoroTimer() {
  const { completeFocusSession } = useAetherStore();
  const [mode, setMode] = useState<TimerMode>('focus');
  const [focusDuration, setFocusDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = mode === 'focus' ? focusDuration * 60 : DURATIONS[mode];
  const dashOffset = CIRC * (1 - timeLeft / total);
  const color = MODE_COLORS[mode];

  const stop = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setRunning(false);
  }, []);

  const handleComplete = useCallback(() => {
    stop();
    if (mode === 'focus') {
      completeFocusSession(focusDuration);
      toast.success('🌟 Focus session complete! +50 XP', {
        description: `${focusDuration} minutes of deep work. The Dragon grows stronger.`,
        duration: 4000,
      });
    } else {
      toast.success('✨ Rest complete! Time to forge again.', { duration: 3000 });
    }
  }, [mode, focusDuration, completeFocusSession, stop]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleComplete(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, handleComplete]);

  const toggle = () => {
    if (timeLeft === 0) { setTimeLeft(total); setRunning(true); }
    else setRunning(r => !r);
  };

  const reset = () => { stop(); setTimeLeft(mode === 'focus' ? focusDuration * 60 : DURATIONS[mode]); };

  const changeMode = (m: TimerMode) => {
    stop();
    setMode(m);
    setTimeLeft(m === 'focus' ? focusDuration * 60 : DURATIONS[m]);
  };

  return (
    <div className="glass-bright rounded-2xl p-5 flex flex-col items-center gap-4 w-full">
      {/* Mode tabs */}
      <div className="flex gap-1 w-full rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
        {(Object.keys(MODE_LABELS) as TimerMode[]).map(m => (
          <button key={m} onClick={() => changeMode(m)}
            className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200"
            style={{
              background: mode === m ? `${MODE_COLORS[m]}22` : 'transparent',
              color: mode === m ? MODE_COLORS[m] : 'rgba(255,255,255,0.4)',
              border: mode === m ? `1px solid ${MODE_COLORS[m]}44` : '1px solid transparent',
            }}>
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Ring */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
          <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={CIRC} strokeDashoffset={dashOffset}
            style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease', filter: `drop-shadow(0 0 8px ${color}88)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <div className="text-3xl font-bold" style={{ color, fontVariantNumeric: 'tabular-nums' }}>
            {fmt(timeLeft)}
          </div>
          <div className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {running ? MODE_LABELS[mode] : timeLeft === 0 ? 'Complete' : 'Paused'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 w-full">
        <button onClick={toggle}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: running ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${color}88, ${color}44)`,
            color: running ? 'rgba(255,255,255,0.7)' : '#050810',
            border: `1px solid ${color}44`,
          }}>
          {running ? '⏸ Pause' : timeLeft === 0 ? '↺ Restart' : '▶ Start'}
        </button>
        <button onClick={reset}
          className="px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
          ↺
        </button>
      </div>

      {mode === 'focus' && (
        <div className="w-full">
          <div className="flex justify-between text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span>Duration</span>
            <span style={{ color }}>{focusDuration} min</span>
          </div>
          <input type="range" min={5} max={90} step={5} value={focusDuration} disabled={running}
            onChange={e => { const v = Number(e.target.value); setFocusDuration(v); if (!running) setTimeLeft(v * 60); }}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${color} ${((focusDuration - 5)/85)*100}%, rgba(255,255,255,0.1) 0%)`,
              opacity: running ? 0.4 : 1,
            }} />
        </div>
      )}
    </div>
  );
}
