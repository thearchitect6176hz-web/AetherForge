import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAetherStore = create<AetherState>()(
  persist(
    (set, get) => ({
      xp: 1240,
      streak: 12,
      sessions: 87,
      totalMinutes: 1240,
      level: calcLevel(1240),
      archetypeEnergies: {
        lion: 85, dragon: 92, butterfly: 67, phoenix: 78,
        raven: 55, rabbit: 40, om: 71, mirror: 63,
      },
      tasks: [
        { id: '1', text: 'Complete morning ritual meditation', archetype: 'om', done: false, createdAt: Date.now() },
        { id: '2', text: 'Write 500 words in journal', archetype: 'mirror', done: false, createdAt: Date.now() },
        { id: '3', text: 'Deep work block - project proposal', archetype: 'lion', done: true, createdAt: Date.now() },
        { id: '4', text: 'Learn a new concept or skill', archetype: 'raven', done: false, createdAt: Date.now() },
      ],
      journal: [],
      lastSessionDate: '',
      activeModal: null,

      addXP: (amount, archetype) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = calcLevel(newXP);
        const energies = { ...state.archetypeEnergies };
        if (archetype) {
          energies[archetype] = Math.min(100, energies[archetype] + Math.floor(amount * 0.5));
        }
        return { xp: newXP, level: newLevel, archetypeEnergies: energies };
      }),

      setActiveModal: (arch) => set({ activeModal: arch }),

      completeFocusSession: (minutes) => set((state) => {
        const today = new Date().toDateString();
        const newStreak = state.lastSessionDate !== today ? state.streak + 1 : state.streak;
        const newXP = state.xp + 50;
        const newLevel = calcLevel(newXP);
        const energies = { ...state.archetypeEnergies };
        energies['lion'] = Math.min(100, energies['lion'] + 8);
        energies['dragon'] = Math.min(100, energies['dragon'] + 3);
        return {
          sessions: state.sessions + 1,
          totalMinutes: state.totalMinutes + minutes,
          streak: newStreak,
          xp: newXP,
          level: newLevel,
          archetypeEnergies: energies,
          lastSessionDate: today,
        };
      }),

      addTask: (text, archetype) => set((state) => ({
        tasks: [{
          id: Date.now().toString(),
          text,
          archetype,
          done: false,
          createdAt: Date.now(),
        }, ...state.tasks],
      })),

      toggleTask: (id) => set((state) => {
        const task = state.tasks.find(t => t.id === id);
        if (task && !task.done) {
          get().addXP(20, task.archetype);
        }
        return {
          tasks: state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t),
        };
      }),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
      })),

      addJournalEntry: (text, prompt) => set((state) => {
        get().addXP(30, 'mirror');
        return {
          journal: [{
            id: Date.now().toString(),
            text,
            date: new Date().toLocaleDateString(),
            prompt,
          }, ...state.journal],
        };
      }),

      boostArchetype: (arch, amount) => set((state) => {
        const energies = { ...state.archetypeEnergies };
        energies[arch] = Math.min(100, energies[arch] + amount);
        get().addXP(15, arch);
        return { archetypeEnergies: energies };
      }),
    }),
    { name: 'aetherforge-state' }
  )
);
