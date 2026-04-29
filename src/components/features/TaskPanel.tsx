import { useState } from "react";
import { useAetherStore, ArchetypeKey } from "@/store/useAetherStore";
import { ARCHETYPES, getArchetype } from "@/types/archetypes";
import { toast } from "sonner";

export default function TaskPanel() {
  const { tasks, addTask, toggleTask, deleteTask } = useAetherStore();
  const [text, setText] = useState("");
  const [archetype, setArchetype] = useState<ArchetypeKey>("lion");
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<'active' | 'all' | 'done'>('active');

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text.trim(), archetype);
    setText("");
    setShowAdd(false);
    toast.success(`Quest added to ${getArchetype(archetype).name}s domain`, { duration: 2000 });
  };

  const handleToggle = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task && !task.done) toast.success("Task slain! +20 XP", { duration: 2000 });
    toggleTask(id);
  };

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );

  const donePct = tasks.length > 0 ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0;

  return (
    <div className="glass-bright rounded-2xl p-5 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(255,255,255,0.9)' }}>
            Quest Log
          </h3>
          <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {tasks.filter(t => !t.done).length} active · {tasks.filter(t => t.done).length} slain
          </div>
        </div>
        <button onClick={() => setShowAdd(v => !v)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-200"
          style={{
            background: showAdd ? 'rgba(0,225,255,0.15)' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${showAdd ? 'rgba(0,225,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
            color: showAdd ? '#00e1ff' : 'rgba(255,255,255,0.5)',
          }}>
          {showAdd ? '−' : '+'}
        </button>
      </div>

      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${donePct}%`, background: 'linear-gradient(90deg, #00e1ff, #8b5cf6)' }} />
      </div>

      {showAdd && (
        <div className="rounded-xl p-3 flex flex-col gap-2"
          style={{ background: 'rgba(0,225,255,0.04)', border: '1px solid rgba(0,225,255,0.12)' }}>
          <input value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Describe your quest..."
            className="w-full bg-transparent text-sm outline-none"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            autoFocus />
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 flex-1 flex-wrap">
              {ARCHETYPES.map(a => (
                <button key={a.key} onClick={() => setArchetype(a.key)} title={a.name}
                  className="w-6 h-6 rounded-full text-sm flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: archetype === a.key ? `${a.color}33` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${archetype === a.key ? a.color : 'transparent'}`,
                  }}>
                  {a.emoji}
                </button>
              ))}
            </div>
            <button onClick={handleAdd} disabled={!text.trim()}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200"
              style={{
                background: text.trim() ? 'rgba(0,225,255,0.2)' : 'rgba(255,255,255,0.05)',
                color: text.trim() ? '#00e1ff' : 'rgba(255,255,255,0.3)',
                border: `1px solid ${text.trim() ? 'rgba(0,225,255,0.3)' : 'transparent'}`,
              }}>
              Add
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-1">
        {(['active', 'all', 'done'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-2.5 py-1 text-[10px] font-semibold rounded-lg capitalize transition-all"
            style={{
              background: filter === f ? 'rgba(0,225,255,0.12)' : 'rgba(255,255,255,0.04)',
              color: filter === f ? '#00e1ff' : 'rgba(255,255,255,0.35)',
              border: `1px solid ${filter === f ? 'rgba(0,225,255,0.2)' : 'transparent'}`,
            }}>
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <div className="text-center py-6 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {filter === 'done' ? 'No slain quests yet' : 'Quest log is empty'}
          </div>
        )}
        {filtered.map(task => {
          const arch = getArchetype(task.archetype);
          return (
            <div key={task.id}
              className="flex items-start gap-3 p-2.5 rounded-xl group transition-all duration-200"
              style={{
                background: task.done ? 'rgba(255,255,255,0.02)' : `${arch.color}08`,
                border: `1px solid ${task.done ? 'rgba(255,255,255,0.05)' : arch.borderColor}`,
              }}>
              <button onClick={() => handleToggle(task.id)}
                className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  border: `2px solid ${task.done ? arch.color : arch.borderColor}`,
                  background: task.done ? `${arch.color}33` : 'transparent',
                }}>
                {task.done && <span style={{ color: arch.color, fontSize: 8 }}>✓</span>}
              </button>
              <span className="text-xs flex-1 leading-relaxed"
                style={{
                  color: task.done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)',
                  textDecoration: task.done ? 'line-through' : 'none',
                }}>
                {task.text}
              </span>
              <span className="text-sm flex-shrink-0 opacity-60" title={arch.name}>{arch.emoji}</span>
              <button onClick={() => deleteTask(task.id)}
                className="flex-shrink-0 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity text-xs"
                style={{ color: 'rgba(255,100,100,0.8)' }}>
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
