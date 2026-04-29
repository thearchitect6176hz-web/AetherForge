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
  ritual: string;
  ritualLabel: string;
  quotes: string[];
  journalPrompts: string[];
}

export const ARCHETYPES: ArchetypeDef[] = [
  {
    key: 'lion',
    emoji: '🦁',
    name: 'Lion',
    subtitle: 'Focus & Discipline',
    color: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.05))',
    borderColor: 'rgba(251,191,36,0.3)',
    description: 'The Lion commands discipline and unwavering focus. Its golden roar silences distraction and channels raw energy into mastery.',
    ritual: "Activate a focused Pomodoro session to awaken the Lion's strength. Each session feeds the pride.",
    ritualLabel: 'Start Focus Session',
    quotes: [
      'Discipline is choosing between what you want now and what you want most.',
      'The lion does not concern itself with the opinion of sheep.',
      'Strength does not come from winning. It comes from struggle.',
    ],
    journalPrompts: [
      'What one discipline would transform your life if practiced daily?',
      'Describe a moment you chose long-term growth over short-term comfort.',
    ],
  },
  {
    key: 'dragon',
    emoji: '🐉',
    name: 'Dragon',
    subtitle: 'Power & Shadow',
    color: '#818cf8',
    glowColor: 'rgba(129,140,248,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(129,140,248,0.05))',
    borderColor: 'rgba(129,140,248,0.3)',
    description: 'The Dragon is the guardian of your total power. Ancient and wise, it grows mightier with every challenge you overcome and shadow you integrate.',
    ritual: 'The Dragon grows with your overall XP. Complete tasks and sessions to strengthen the guardian.',
    ritualLabel: 'Claim Dragon Energy',
    quotes: [
      'The cave you fear to enter holds the treasure you seek.',
      'Your shadow is not your enemy. It is your greatest teacher.',
      'Power unexplored is power unexpressed.',
    ],
    journalPrompts: [
      'What aspect of yourself have you been avoiding? What would embracing it unlock?',
      'Describe your greatest obstacle and how it has shaped your strength.',
    ],
  },
  {
    key: 'butterfly',
    emoji: '🦋',
    name: 'Butterfly',
    subtitle: 'Transformation',
    color: '#e879f9',
    glowColor: 'rgba(232,121,249,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(192,38,211,0.15), rgba(232,121,249,0.05))',
    borderColor: 'rgba(232,121,249,0.3)',
    description: 'The Butterfly represents metamorphosis. Every habit changed, every comfort zone crossed, every old self shed — the Butterfly witnesses your becoming.',
    ritual: 'Practice the 4-7-8 breathing cycle. Inhale for 4, hold for 7, exhale for 8. Repeat 4 times.',
    ritualLabel: 'Begin Breathing Ritual',
    quotes: [
      'You cannot fly without first crawling, then walking, then leaping.',
      'Change is the only constant. Embrace it as a butterfly embraces the air.',
      'The caterpillar does not become the butterfly — it dissolves first.',
    ],
    journalPrompts: [
      'What old habit or belief are you finally ready to release?',
      'Who are you becoming that your past self could not have imagined?',
    ],
  },
  {
    key: 'phoenix',
    emoji: '🐦‍🔥',
    name: 'Phoenix',
    subtitle: 'Resilience & Rebirth',
    color: '#fb923c',
    glowColor: 'rgba(251,146,60,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,146,60,0.05))',
    borderColor: 'rgba(251,146,60,0.3)',
    description: 'The Phoenix rises from every failure, every broken streak, every dark season. It does not fear destruction — it knows that from ash, something greater always emerges.',
    ritual: 'Write down one thing you are releasing, then declare what rises in its place.',
    ritualLabel: 'Perform the Rebirth Ritual',
    quotes: [
      'Rock bottom became the solid foundation upon which I built my life.',
      'The Phoenix does not mourn its ashes. It becomes the flame.',
      'Every ending is a beginning wearing a disguise.',
    ],
    journalPrompts: [
      'What failure has taught you the most? What arose from those ashes?',
      'What would you burn away right now to make room for something greater?',
    ],
  },
  {
    key: 'raven',
    emoji: '🐦‍⬛',
    name: 'Raven',
    subtitle: 'Wisdom & Insight',
    color: '#94a3b8',
    glowColor: 'rgba(148,163,184,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(100,116,139,0.15), rgba(148,163,184,0.05))',
    borderColor: 'rgba(148,163,184,0.3)',
    description: 'The Raven flies between worlds, gathering hidden knowledge. It sees patterns invisible to others and whispers ancient truths at the edge of understanding.',
    ritual: 'Receive a Raven Insight — a reflection or question tailored to your current growth edge.',
    ritualLabel: 'Summon Raven Wisdom',
    quotes: [
      'The wisest minds know they know nothing — and keep asking anyway.',
      'Wisdom is not the accumulation of knowledge, but the integration of experience.',
      'Look where others do not look. See what others cannot see.',
    ],
    journalPrompts: [
      'What important question have you been avoiding asking yourself?',
      'What pattern keeps repeating in your life? What is it trying to teach you?',
    ],
  },
  {
    key: 'rabbit',
    emoji: '🐇',
    name: 'Rabbit',
    subtitle: 'Agility & Flow',
    color: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(34,211,238,0.05))',
    borderColor: 'rgba(34,211,238,0.3)',
    description: 'The Rabbit moves with lightning quickness, never overthinking, always in flow. It embodies the power of micro-action — small leaps that cover vast distance.',
    ritual: 'Sprint Mode: Set a 10-minute micro-focus session. One small task. Complete it now.',
    ritualLabel: 'Activate Sprint Mode',
    quotes: [
      'Done is better than perfect. Move.',
      'Small daily improvements are the key to staggering long-term results.',
      'The trick is to keep moving. The Rabbit never stops to doubt.',
    ],
    journalPrompts: [
      'What one small action, done consistently, would change everything?',
      'Where are you overthinking instead of simply moving forward?',
    ],
  },
  {
    key: 'om',
    emoji: '🕉️',
    name: 'Om',
    subtitle: 'Presence & Meditation',
    color: '#a5b4fc',
    glowColor: 'rgba(165,180,252,0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(165,180,252,0.05))',
    borderColor: 'rgba(165,180,252,0.3)',
    description: 'The Om is the primordial sound of creation — the still point in the turning world. In its silence, all answers wait. In its presence, all noise falls away.',
    ritual: 'Enter the Om field. Sit with awareness for 5 minutes. No task. No output. Simply be.',
    ritualLabel: 'Enter Meditation Mode',
    quotes: [
      'The present moment is the only moment available to us.',
      'In the silence between thoughts, you discover who you truly are.',
      'Be still and know.',
    ],
    journalPrompts: [
      'Describe the quality of your inner silence right now.',
      'What happens when you stop doing and simply allow yourself to be?',
    ],
  },
  {
    key: 'mirror',
    emoji: '🪞',
    name: 'Mirror',
    subtitle: 'Self-Reflection',
    color: '#e0f2fe',
    glowColor: 'rgba(224,242,254,0.3)',
    bgGradient: 'linear-gradient(135deg, rgba(186,230,253,0.12), rgba(224,242,254,0.05))',
    borderColor: 'rgba(224,242,254,0.25)',
    description: 'The Mirror shows you what you truly are — not who you pretend to be. Honest, unflinching, and ultimately compassionate.',
    ritual: 'Open the Mirror portal to journal your current reflection. Record where you are, honestly.',
    ritualLabel: 'Open the Mirror',
    quotes: [
      'Knowing yourself is the beginning of all wisdom.',
      'The most courageous act is still to think for yourself. Aloud.',
      'You cannot change what you refuse to confront.',
    ],
    journalPrompts: [
      'Who are you right now, honestly — beyond roles, labels, and expectations?',
      'What truth are you avoiding about your current path?',
    ],
  },
];

export const getArchetype = (key: ArchetypeKey): ArchetypeDef =>
  ARCHETYPES.find(a => a.key === key)!;
