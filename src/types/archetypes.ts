import { ArchetypeKey } from "@/store/useAetherStore";

export interface ArchetypeDef {
  key: ArchetypeKey;
  emoji: string;
  name: string;
  subtitle: string;
  color: string;
  glowColor: string;
  bgGradient: string;
  borderColor: string;
  description: string;
  ritualLabel: string;
  quotes: string[];
  journalPrompts: string[];
}

export const ARCHETYPES: ArchetypeDef[] = [
  {
    key: 'lion', emoji: '🦁', name: 'Lion', subtitle: 'Focus & Discipline',
    color: '#fbbf24', glowColor: 'rgba(251,191,36,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(251,191,36,0.14),rgba(245,158,11,0.05))',
    borderColor: 'rgba(251,191,36,0.28)',
    description: 'The Lion commands discipline and unwavering focus. Its golden roar silences distraction.',
    ritualLabel: 'Start Focus Session',
    quotes: ['Discipline is choosing between what you want now and what you want most.', 'The lion does not concern itself with the opinion of sheep.'],
    journalPrompts: ['What one discipline would transform your life if practiced daily?'],
  },
  {
    key: 'dragon', emoji: '🐉', name: 'Dragon', subtitle: 'Power & Shadow',
    color: '#818cf8', glowColor: 'rgba(129,140,248,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(99,102,241,0.14),rgba(129,140,248,0.05))',
    borderColor: 'rgba(129,140,248,0.28)',
    description: 'The Dragon is the guardian of your total power. Ancient and wise, growing mightier with every challenge.',
    ritualLabel: 'Claim Dragon Energy',
    quotes: ['The cave you fear to enter holds the treasure you seek.', 'Power unexplored is power unexpressed.'],
    journalPrompts: ['What aspect of yourself have you been avoiding? What would embracing it unlock?'],
  },
  {
    key: 'butterfly', emoji: '🦋', name: 'Butterfly', subtitle: 'Transformation',
    color: '#e879f9', glowColor: 'rgba(232,121,249,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(192,38,211,0.14),rgba(232,121,249,0.05))',
    borderColor: 'rgba(232,121,249,0.28)',
    description: 'The Butterfly witnesses your becoming. Every habit changed, every old self shed.',
    ritualLabel: 'Begin Breathing Ritual',
    quotes: ['You cannot fly without first crawling, then walking, then leaping.', 'The caterpillar does not become the butterfly — it dissolves first.'],
    journalPrompts: ['What old habit or belief are you finally ready to release?'],
  },
  {
    key: 'phoenix', emoji: '🐦‍🔥', name: 'Phoenix', subtitle: 'Resilience & Rebirth',
    color: '#fb923c', glowColor: 'rgba(251,146,60,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(249,115,22,0.14),rgba(251,146,60,0.05))',
    borderColor: 'rgba(251,146,60,0.28)',
    description: 'The Phoenix rises from every failure. It does not fear destruction — from ash, something greater emerges.',
    ritualLabel: 'Perform the Rebirth Ritual',
    quotes: ['Rock bottom became the solid foundation upon which I built my life.', 'The Phoenix does not mourn its ashes. It becomes the flame.'],
    journalPrompts: ['What would you burn away right now to make room for something greater?'],
  },
  {
    key: 'raven', emoji: '🐦‍⬛', name: 'Raven', subtitle: 'Wisdom & Insight',
    color: '#94a3b8', glowColor: 'rgba(148,163,184,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(100,116,139,0.14),rgba(148,163,184,0.05))',
    borderColor: 'rgba(148,163,184,0.28)',
    description: 'The Raven flies between worlds, gathering hidden knowledge. It sees patterns invisible to others.',
    ritualLabel: 'Summon Raven Wisdom',
    quotes: ['The wisest minds know they know nothing — and keep asking anyway.', 'Look where others do not look.'],
    journalPrompts: ['What important question have you been avoiding asking yourself?'],
  },
  {
    key: 'rabbit', emoji: '🐇', name: 'Rabbit', subtitle: 'Agility & Flow',
    color: '#22d3ee', glowColor: 'rgba(34,211,238,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(8,145,178,0.14),rgba(34,211,238,0.05))',
    borderColor: 'rgba(34,211,238,0.28)',
    description: 'The Rabbit moves with lightning quickness, never overthinking, always in flow.',
    ritualLabel: 'Activate Sprint Mode',
    quotes: ['Done is better than perfect. Move.', 'Small daily improvements are the key to staggering long-term results.'],
    journalPrompts: ['What one small action, done consistently, would change everything?'],
  },
  {
    key: 'om', emoji: '🕉️', name: 'Om', subtitle: 'Presence & Meditation',
    color: '#a5b4fc', glowColor: 'rgba(165,180,252,0.4)',
    bgGradient: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(165,180,252,0.05))',
    borderColor: 'rgba(165,180,252,0.28)',
    description: 'The Om is the primordial sound of creation. In its silence, all answers wait.',
    ritualLabel: 'Enter Meditation Mode',
    quotes: ['The present moment is the only moment available to us.', 'Be still and know.'],
    journalPrompts: ['What happens when you stop doing and simply allow yourself to be?'],
  },
  {
    key: 'mirror', emoji: '🪞', name: 'Mirror', subtitle: 'Self-Reflection',
    color: '#e0f2fe', glowColor: 'rgba(224,242,254,0.3)',
    bgGradient: 'linear-gradient(135deg,rgba(186,230,253,0.12),rgba(224,242,254,0.05))',
    borderColor: 'rgba(224,242,254,0.22)',
    description: 'The Mirror shows you what you truly are — not who you pretend to be. Honest, unflinching.',
    ritualLabel: 'Open the Mirror',
    quotes: ['Knowing yourself is the beginning of all wisdom.', 'You cannot change what you refuse to confront.'],
    journalPrompts: ['Who are you right now, honestly — beyond roles, labels, and expectations?', 'What truth are you avoiding about your current path?'],
  },
];

export const getArchetype = (key: ArchetypeKey): ArchetypeDef =>
  ARCHETYPES.find(a => a.key === key)!;
