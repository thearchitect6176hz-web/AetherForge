import { create } from 'zustand';

export type ArchetypeKey = 'lion' | 'dragon' | 'butterfly' | 'phoenix' | 'raven' | 'rabbit' | 'om' | 'mirror';

export interface Task {
  id: string;
  text: string;
  archetype: ArchetypeKey;
  done: boolean;
  createdAt: number;
}

export interface JournalEntry {
  id: string;
  text: string;
  date: string;
  prompt: string;
}

export interface AetherState {
  xp: number;
  streak: number;
  sessions: number;
  totalMinutes: number;
  level: number;
  archetypeEnergies: Record<ArchetypeKey, number>;
  tasks: Task[];
  journal: JournalEntry[];
  lastSessionDate: string;
  activeModal: ArchetypeKey | null;

  addXP: (amount: number, archetype?: ArchetypeKey) => void;
  setActiveModal: (arch: ArchetypeKey | null) => void;
  completeFocusSession: (minutes: number) => void;
  addTask: (text: string, archetype: ArchetypeKey) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addJournalEntry: (text: string, prompt: string) => void;
  boostArchetype: (arch: ArchetypeKey, amount: number) => void;
}

const calcLevel = (xp: number) => Math.floor(1 + Math.sqrt(xp / 60));

const STORAGE_KEY = 'aetherforge-v1';

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
};

const saveState = (state: Partial<AetherState>) => {
  try {
    const { xp, streak, sessions, totalMinutes, level, archetypeEnergies, tasks, journal, lastSessionDate } = state as AetherState;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp, streak, sessions, totalMinutes, level, archetypeEnergies, tasks, journal, lastSessionDate }));
  } catch {}
};

const saved = loadState();

const DEFAULT_TASKS: Task[] = [
  { id: '1', text: 'Morning ritual meditation', archetype: 'om', done: false, createdAt: Date.now() },
  { id: '2', text: 'Write 500 words in journal', archetype: 'mirror', done: false, createdAt: Date.now() },
  { id: '3', text: 'Deep work block — project proposal', archetype: 'lion', done: true, createdAt: Date.now() },
  { id: '4', text: 'Learn a new concept or skill', archetype: 'raven', done: false, createdAt: Date.now() },
];

export const useAetherStore = create<AetherState>((set, get) => ({
  xp: saved?.xp ?? 1240,
  streak: saved?.streak ?? 12,
  sessions: saved?.sessions ?? 87,
  totalMinutes: saved?.totalMinutes ?? 1240,
  level: saved?.level ?? calcLevel(1240),
  archetypeEnergies: saved?.archetypeEnergies ?? {
    lion: 85, dragon: 92, butterfly: 67, phoenix: 78,
    raven: 55, rabbit: 40, om: 71, mirror: 63,
  },
  tasks: saved?.tasks ?? DEFAULT_TASKS,
  journal: saved?.journal ?? [],
  lastSessionDate: saved?.lastSessionDate ?? '',
  activeModal: null,

  addXP: (amount, archetype) => {
    const state = get();
    const newXP = state.xp + amount;
    const newLevel = calcLevel(newXP);
    const energies = { ...state.archetypeEnergies };
    if (archetype) energies[archetype] = Math.min(100, energies[archetype] + Math.floor(amount * 0.5));
    const next = { xp: newXP, level: newLevel, archetypeEnergies: energies };
    set(next);
    saveState({ ...get(), ...next });
  },

  setActiveModal: (arch) => set({ activeModal: arch }),

  completeFocusSession: (minutes) => {
    const state = get();
    const today = new Date().toDateString();
    const newStreak = state.lastSessionDate !== today ? state.streak + 1 : state.streak;
    const newXP = state.xp + 50;
    const newLevel = calcLevel(newXP);
    const energies = { ...state.archetypeEnergies };
    energies['lion'] = Math.min(100, energies['lion'] + 8);
    energies['dragon'] = Math.min(100, energies['dragon'] + 3);
    const next = {
      sessions: state.sessions + 1,
      totalMinutes: state.totalMinutes + minutes,
      streak: newStreak,
      xp: newXP,
      level: newLevel,
      archetypeEnergies: energies,
      lastSessionDate: today,
    };
    set(next);
    saveState({ ...get(), ...next });
  },

  addTask: (text, archetype) => {
    const tasks = [{ id: Date.now().toString(), text, archetype, done: false, createdAt: Date.now() }, ...get().tasks];
    set({ tasks });
    saveState({ ...get(), tasks });
  },

  toggleTask: (id) => {
    const state = get();
    const task = state.tasks.find(t => t.id === id);
    if (task && !task.done) get().addXP(20, task.archetype);
    const tasks = state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    set({ tasks });
    saveState({ ...get(), tasks });
  },

  deleteTask: (id) => {
    const tasks = get().tasks.filter(t => t.id !== id);
    set({ tasks });
    saveState({ ...get(), tasks });
  },

  addJournalEntry: (text, prompt) => {
    get().addXP(30, 'mirror');
    const journal = [{ id: Date.now().toString(), text, date: new Date().toLocaleDateString(), prompt }, ...get().journal];
    set({ journal });
    saveState({ ...get(), journal });
  },

  boostArchetype: (arch, amount) => {
    const state = get();
    const energies = { ...state.archetypeEnergies };
    energies[arch] = Math.min(100, energies[arch] + amount);
    get().addXP(15, arch);
    set({ archetypeEnergies: energies });
    saveState({ ...get(), archetypeEnergies: energies });
  },
}));
