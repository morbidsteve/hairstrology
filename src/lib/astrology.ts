/**
 * Hairstrology — sun-sign data used by the Client Insights tool.
 *
 * This is intentionally hand-written, plain-language guidance Kristina can
 * edit. It is NOT a substitute for a real natal chart — it's a conversation
 * starter for stylists behind the chair.
 *
 * For each sign we store:
 *  - element / modality / ruling planet (the basics)
 *  - vibe: one sentence on how this client tends to show up
 *  - conversationStarters: things they *love* to talk about
 *  - avoid: topics that tend to land badly
 *  - chairTips: practical advice for the appointment itself
 *  - rebookCadence: roughly how often they want to come back
 */

export type Element = "Fire" | "Earth" | "Air" | "Water";
export type Modality = "Cardinal" | "Fixed" | "Mutable";

export interface SignProfile {
  name: string;
  symbol: string;
  dateRange: string;
  element: Element;
  modality: Modality;
  rulingPlanet: string;
  vibe: string;
  conversationStarters: string[];
  avoid: string[];
  chairTips: string[];
  rebookCadence: string;
}

export const SIGNS: SignProfile[] = [
  {
    name: "Aries",
    symbol: "♈",
    dateRange: "Mar 21 – Apr 19",
    element: "Fire",
    modality: "Cardinal",
    rulingPlanet: "Mars",
    vibe: "Walks in already mid-sentence. Wants the appointment to move.",
    conversationStarters: [
      "Their next big project or competitive goal",
      "Workouts, sports, anything that involves pushing themselves",
      "A bolder version of what they were going to ask for",
    ],
    avoid: [
      "Long, philosophical detours when they're on the clock",
      "Negging a recent decision they're already committed to",
    ],
    chairTips: [
      "Confirm timing up-front — they hate feeling stuck",
      "Suggest one decisive change rather than three small ones",
      "Read back what you're about to do; they want to feel heard quickly",
    ],
    rebookCadence: "Every 4–6 weeks — they get bored of their hair fast.",
  },
  {
    name: "Taurus",
    symbol: "♉",
    dateRange: "Apr 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    rulingPlanet: "Venus",
    vibe: "Comes in already loyal. Will keep coming back for a decade if the chair feels good.",
    conversationStarters: [
      "Food, restaurants, anything sensory",
      "Their garden, their pets, their home upgrades",
      "Long-running shows or comfort rewatches",
    ],
    avoid: [
      "Pushing a dramatic change without warming them up to it",
      "Chaotic energy in the room",
    ],
    chairTips: [
      "Make the scalp massage count — that's the loyalty hook",
      "Offer water/tea by name, not as an afterthought",
      "When suggesting change, frame it as a refinement of what works",
    ],
    rebookCadence: "Every 6–8 weeks — they want a routine they can count on.",
  },
  {
    name: "Gemini",
    symbol: "♊",
    dateRange: "May 21 – Jun 20",
    element: "Air",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    vibe: "Has six stories before they even sit down. Loves the conversation as much as the cut.",
    conversationStarters: [
      "What they're reading or what podcast they just finished",
      "Group-chat drama (kept anonymous)",
      "Travel plans, even speculative ones",
    ],
    avoid: [
      "Silent appointments — reads as you being upset with them",
      "Locking them into one option without alternatives",
    ],
    chairTips: [
      "Offer two or three directions and let them pick",
      "Keep them updated as you work — they want to be in the loop",
      "Send a follow-up text — they remember small gestures",
    ],
    rebookCadence: "Every 5–7 weeks — they re-engage faster after a reminder.",
  },
  {
    name: "Cancer",
    symbol: "♋",
    dateRange: "Jun 21 – Jul 22",
    element: "Water",
    modality: "Cardinal",
    rulingPlanet: "Moon",
    vibe: "The chair is half hair appointment, half therapy. Treat it as both.",
    conversationStarters: [
      "Family — kids, parents, the family dog",
      "Their home, cooking, anything nesting",
      "How they're feeling that week (they will tell you)",
    ],
    avoid: [
      "Brushing past it when they share something heavy",
      "Surprising them with a price increase mid-service",
    ],
    chairTips: [
      "Lead with check-in, then style — never the other way around",
      "Remember the names they mentioned last time; it matters",
      "If they're going through something, offer a softer service",
    ],
    rebookCadence: "Every 6 weeks — they want continuity, especially in hard seasons.",
  },
  {
    name: "Leo",
    symbol: "♌",
    dateRange: "Jul 23 – Aug 22",
    element: "Fire",
    modality: "Fixed",
    rulingPlanet: "Sun",
    vibe: "Wants the appointment to feel like an event. Will refer their entire friend group if it does.",
    conversationStarters: [
      "What they're celebrating right now",
      "Compliments — but specific ones, not generic",
      "Their creative projects",
    ],
    avoid: [
      "Comparing them unfavorably to another client",
      "Cutting their story off to talk to the next chair",
    ],
    chairTips: [
      "Show them the back with a real flourish",
      "Suggest a signature look that's *theirs*, not a trend",
      "Photo before they leave — they'll post and tag you",
    ],
    rebookCadence: "Every 4–6 weeks — they want to stay camera-ready.",
  },
  {
    name: "Virgo",
    symbol: "♍",
    dateRange: "Aug 23 – Sep 22",
    element: "Earth",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    vibe: "Has a Pinterest board with notes. Will notice if your station is messy.",
    conversationStarters: [
      "Their work, especially the craft of it",
      "Wellness habits, supplements, routines",
      "Specific product ingredients (they read labels)",
    ],
    avoid: [
      "Vague answers about what you're doing",
      "Improvising without telling them you're improvising",
    ],
    chairTips: [
      "Walk them through your plan before you start",
      "Recommend products with the *why* — not just the brand",
      "Be on time. They notice and it sets the whole tone.",
    ],
    rebookCadence: "Every 5–7 weeks — they like a predictable system.",
  },
  {
    name: "Libra",
    symbol: "♎",
    dateRange: "Sep 23 – Oct 22",
    element: "Air",
    modality: "Cardinal",
    rulingPlanet: "Venus",
    vibe: "Wants the room to feel beautiful and the decision to feel collaborative.",
    conversationStarters: [
      "Design, fashion, anything aesthetic",
      "A choice they're stuck on (offer to weigh in)",
      "Their relationships — they're always thinking about them",
    ],
    avoid: [
      "Putting all the decision pressure on them",
      "Anything that feels confrontational",
    ],
    chairTips: [
      "Offer your professional opinion gently but clearly",
      "Show two finished references and pick the stronger one together",
      "Keep the music tasteful — they're noticing",
    ],
    rebookCadence: "Every 6 weeks — they like balance and ritual.",
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dateRange: "Oct 23 – Nov 21",
    element: "Water",
    modality: "Fixed",
    rulingPlanet: "Pluto (trad. Mars)",
    vibe: "Quiet at first. Once they trust you, they will tell you everything.",
    conversationStarters: [
      "Whatever they bring up first — follow their lead",
      "True crime, psychology, anything with depth",
      "The transformation they actually want (it's bigger than they said)",
    ],
    avoid: [
      "Surface-level small talk — feels fake to them",
      "Repeating their private details to other clients",
    ],
    chairTips: [
      "Earn the trust early — that's the whole relationship",
      "When they finally ask for a big change, take it seriously",
      "Confidentiality is your most important product",
    ],
    rebookCadence: "Every 6–8 weeks — slow to commit, intensely loyal once they do.",
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dateRange: "Nov 22 – Dec 21",
    element: "Fire",
    modality: "Mutable",
    rulingPlanet: "Jupiter",
    vibe: "Half their stories are from another country. Loves a stylist who can keep up.",
    conversationStarters: [
      "Travel — where they've been, where they're going",
      "Big ideas, philosophy, what's wrong with the world",
      "Their next adventure or course or move",
    ],
    avoid: [
      "Boxing them into a 'safe' look",
      "Acting offended by their bluntness",
    ],
    chairTips: [
      "Suggest the more adventurous option — they'll thank you",
      "Recommend low-maintenance styles for their travel weeks",
      "Pre-book the next two appointments while they're sitting there",
    ],
    rebookCadence: "Every 7–8 weeks, but only if they're in town.",
  },
  {
    name: "Capricorn",
    symbol: "♑",
    dateRange: "Dec 22 – Jan 19",
    element: "Earth",
    modality: "Cardinal",
    rulingPlanet: "Saturn",
    vibe: "Books in advance. Pays without drama. Wants you to be excellent and respectful of their time.",
    conversationStarters: [
      "Work, ambitions, what they're building",
      "Long-term plans (they have them all)",
      "A book/podcast on craft or business",
    ],
    avoid: [
      "Running late",
      "Trying to upsell too aggressively",
    ],
    chairTips: [
      "Be professional first, friendly second — they prefer that order",
      "Frame premium services as investments, not indulgences",
      "Send a clean invoice; they remember the small operational stuff",
    ],
    rebookCadence: "Every 5–6 weeks, scheduled months out.",
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dateRange: "Jan 20 – Feb 18",
    element: "Air",
    modality: "Fixed",
    rulingPlanet: "Uranus (trad. Saturn)",
    vibe: "Wants to feel like they're not like other clients. Often, they aren't.",
    conversationStarters: [
      "A weird idea they've been thinking about",
      "Tech, sci-fi, anything future-leaning",
      "Causes they care about",
    ],
    avoid: [
      "Treating them like everyone else",
      "Too much physical fussing — they need their space",
    ],
    chairTips: [
      "Offer something unconventional — color placement, an asymmetric line",
      "Give them autonomy on the small choices",
      "They'll send other unusual people to you if you nail it",
    ],
    rebookCadence: "Every 6–10 weeks — variable, depends on what they're up to.",
  },
  {
    name: "Pisces",
    symbol: "♓",
    dateRange: "Feb 19 – Mar 20",
    element: "Water",
    modality: "Mutable",
    rulingPlanet: "Neptune (trad. Jupiter)",
    vibe: "Comes in a bit dreamy, leaves feeling like they had a spa day.",
    conversationStarters: [
      "Music, art, movies — anything atmospheric",
      "Whatever they're feeling that day",
      "Their creative work",
    ],
    avoid: [
      "Pushing a hyper-structured 'plan' without softness",
      "Bright fluorescent energy",
    ],
    chairTips: [
      "Soft lighting, soft voice — the energy of the chair matters",
      "Bring them back to specifics when the brief gets vague",
      "Send them home with one product that smells beautiful",
    ],
    rebookCadence: "Every 6–8 weeks — they'll drift if you don't pre-book.",
  },
];

// Sun-sign lookup by month + day (1-indexed month).
// This is the standard tropical-zodiac approximation; good enough for a stylist
// conversation tool. (Cusp birthdays are inherent — Hairstrology gives the most
// common dominant-sign reading.)
const SIGN_DATES: Array<{ name: string; month: number; day: number }> = [
  { name: "Capricorn", month: 1, day: 20 }, // Dec 22 – Jan 19
  { name: "Aquarius", month: 2, day: 19 }, // Jan 20 – Feb 18
  { name: "Pisces", month: 3, day: 21 }, // Feb 19 – Mar 20
  { name: "Aries", month: 4, day: 20 }, // Mar 21 – Apr 19
  { name: "Taurus", month: 5, day: 21 }, // Apr 20 – May 20
  { name: "Gemini", month: 6, day: 21 }, // May 21 – Jun 20
  { name: "Cancer", month: 7, day: 23 }, // Jun 21 – Jul 22
  { name: "Leo", month: 8, day: 23 }, // Jul 23 – Aug 22
  { name: "Virgo", month: 9, day: 23 }, // Aug 23 – Sep 22
  { name: "Libra", month: 10, day: 23 }, // Sep 23 – Oct 22
  { name: "Scorpio", month: 11, day: 22 }, // Oct 23 – Nov 21
  { name: "Sagittarius", month: 12, day: 22 }, // Nov 22 – Dec 21
  { name: "Capricorn", month: 12, day: 32 }, // Dec 22 – Dec 31
];

export function sunSignFor(month: number, day: number): SignProfile | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  for (const entry of SIGN_DATES) {
    if (month < entry.month || (month === entry.month && day < entry.day)) {
      return SIGNS.find((s) => s.name === entry.name) ?? null;
    }
  }
  return SIGNS.find((s) => s.name === "Capricorn") ?? null;
}

export function signByName(name: string): SignProfile | null {
  return SIGNS.find((s) => s.name.toLowerCase() === name.toLowerCase()) ?? null;
}
