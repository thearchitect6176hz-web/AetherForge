import { useState } from "react";
import { useAetherStore, ArchetypeKey } from "@/store/useAetherStore";
import { ARCHETYPES, getArchetype } from "@/types/archetypes";

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
  };

  const handleToggle = (id: string) => {
    toggleTask(id);
  };

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );

  const donePct = tasks.length > 0 ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0;

  return (
    <div className="glass-bright" style={{ borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Quest Log</h3>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>
            {tasks.filter(t => !t.done).length} active · {tasks.filter(t => t.done).length} slain
          </div>
        </div>
        <button onClick={() => setShowAdd(v => !v)} style={{
          width: 32, height: 32, borderRadius: 8, fontSize: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: showAdd ? 'rgba(0,225,255,0.14)' : 'rgba(255,255,255,0.07)',
          border: `1px solid ${showAdd ? 'rgba(0,225,255,0.32)' : 'rgba(255,255,255,0.1)'}`,
          color: showAdd ? '#00e1ff' : 'rgba(255,255,255,0.5)',
          transition: 'all 0.2s',
        }}>
          {showAdd ? '−' : '+'}
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 99, width: `${donePct}%`, background: 'linear-gradient(90deg,#00e1ff,#8b5cf6)', transition: 'width 0.6s ease' }} />
      </div>

      {/* Add form */}
      {showAdd && (
        <div style={{ borderRadius: 12, padding: 12, background: 'rgba(0,225,255,0.04)', border: '1px solid rgba(0,225,255,0.12)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Describe your quest..."
            autoFocus
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              fontSize: 13, color: 'rgba(255,255,255,0.85)',
            }} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4, flex: 1, flexWrap: 'wrap' }}>
              {ARCHETYPES.map(a => (
                <button key={a.key} onClick={() => setArchetype(a.key)} title={a.name}
                  style={{
                    width: 24, height: 24, borderRadius: '50%', fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: archetype === a.key ? `${a.color}33` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${archetype === a.key ? a.color : 'transparent'}`,
                    cursor: 'pointer', transition: 'transform 0.15s',
                  }}>
                  {a.emoji}
                </button>
              ))}
            </div>
            <button onClick={handleAdd} disabled={!text.trim()}
              style={{
                padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: text.trim() ? 'pointer' : 'default',
                background: text.trim() ? 'rgba(0,225,255,0.2)' : 'rgba(255,255,255,0.05)',
                color: text.trim() ? '#00e1ff' : 'rgba(255,255,255,0.3)',
                border: `1px solid ${text.trim() ? 'rgba(0,225,255,0.28)' : 'transparent'}`,
              }}>
              Add
            </button>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {(['active', 'all', 'done'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '4px 10px', fontSize: 10, fontWeight: 600, borderRadius: 8, textTransform: 'capitalize', cursor: 'pointer',
              background: filter === f ? 'rgba(0,225,255,0.12)' : 'rgba(255,255,255,0.04)',
              color: filter === f ? '#00e1ff' : 'rgba(255,255,255,0.32)',
              border: `1px solid ${filter === f ? 'rgba(0,225,255,0.2)' : 'transparent'}`,
              transition: 'all 0.2s',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 240, overflowY: 'auto', paddingRight: 2 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0', fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
            {filter === 'done' ? 'No slain quests yet' : 'Quest log is empty'}
          </div>
        )}
        {filtered.map(task => {
          const arch = getArchetype(task.archetype);
          return (
            <div key={task.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 10px', borderRadius: 10,
                background: task.done ? 'rgba(255,255,255,0.02)' : `${arch.color}09`,
                border: `1px solid ${task.done ? 'rgba(255,255,255,0.05)' : arch.borderColor}`,
                transition: 'all 0.2s',
              }}>
              <button onClick={() => handleToggle(task.id)}
                style={{
                  marginTop: 2, width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  border: `2px solid ${task.done ? arch.color : arch.borderColor}`,
                  background: task.done ? `${arch.color}33` : 'transparent',
                  transition: 'all 0.2s',
                }}>
                {task.done && <span style={{ color: arch.color, fontSize: 8 }}>✓</span>}
              </button>
              <span style={{
                fontSize: 12, flex: 1, lineHeight: 1.5,
                color: task.done ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.82)',
                textDecoration: task.done ? 'line-through' : 'none',
              }}>
                {task.text}
              </span>
              <span style={{ fontSize: 14, flexShrink: 0, opacity: 0.6 }}>{arch.emoji}</span>
              <button onClick={() => deleteTask(task.id)}
                style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'rgba(255,100,100,0.7)', opacity: 0.5, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}>
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
