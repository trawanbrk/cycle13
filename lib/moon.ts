// Cycle OS — Lunar phase calculator (approximate, no external API)

export type MoonPhase = "new" | "waxing" | "full" | "waning";

export interface MoonPhaseInfo {
  phase: MoonPhase;
  name: string;
  meaning: string;
  emoji: string;
  approximate: boolean;
}

// Reference new moon: 2025-12-29 (coincidentally the Cycle OS start date, but that's a coincidence)
// Actually using a known new moon date: 2026-01-21 was a new moon, but let's use a more reliable reference.
// Known new moon: 2026-02-28 00:00 UTC (approximate)
// Synodic month: ~29.53 days
const KNOWN_NEW_MOON = new Date(Date.UTC(2026, 1, 28, 0, 0, 0)); // Feb 28 2026
const SYNODIC_MONTH = 29.530588853;

export function getMoonPhase(date: Date): MoonPhaseInfo {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffMs = d.getTime() - KNOWN_NEW_MOON.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
  // Normalize to [0, SYNODIC_MONTH)
  let phase = diffDays % SYNODIC_MONTH;
  if (phase < 0) phase += SYNODIC_MONTH;
  
  let moonPhase: MoonPhase;
  let name: string;
  let meaning: string;
  let emoji: string;
  
  if (phase < 1.84566) {
    moonPhase = "new";
    name = "Новолуние";
    meaning = "Начало, тишина, семя, обнуление";
    emoji = "🌑";
  } else if (phase < 5.537) {
    moonPhase = "waxing";
    name = "Растущая Луна";
    meaning = "Набор энергии, желание, связь, притяжение";
    emoji = "🌒";
  } else if (phase < 9.228) {
    moonPhase = "waxing";
    name = "Растущая Луна";
    meaning = "Набор энергии, желание, связь, притяжение";
    emoji = "🌓";
  } else if (phase < 12.919) {
    moonPhase = "waxing";
    name = "Растущая Луна";
    meaning = "Набор энергии, желание, связь, притяжение";
    emoji = "🌔";
  } else if (phase < 16.611) {
    moonPhase = "full";
    name = "Полнолуние";
    meaning = "Пик, проявление, максимум энергии";
    emoji = "🌕";
  } else if (phase < 20.302) {
    moonPhase = "waning";
    name = "Убывающая Луна";
    meaning = "Спад, сбор, выводы, освобождение";
    emoji = "🌖";
  } else if (phase < 23.993) {
    moonPhase = "waning";
    name = "Убывающая Луна";
    meaning = "Спад, сбор, выводы, освобождение";
    emoji = "🌗";
  } else if (phase < 27.684) {
    moonPhase = "waning";
    name = "Убывающая Луна";
    meaning = "Спад, сбор, выводы, освобождение";
    emoji = "🌘";
  } else {
    moonPhase = "new";
    name = "Новолуние";
    meaning = "Начало, тишина, семя, обнуление";
    emoji = "🌑";
  }
  
  return {
    phase: moonPhase,
    name,
    meaning,
    emoji,
    approximate: true,
  };
}

export function getMoonLayerForWeek(phase: MoonPhase, suitMeaning: string): string {
  const connections: Record<MoonPhase, string> = {
    new: "Новолуние → Пики → очистить",
    waxing: "Растущая Луна → Черви → соединить / зарядить",
    full: "Полнолуние → Трефы → сделать / проявить",
    waning: "Убывающая Луна → Бубны → получить результат / завершить",
  };
  return connections[phase] || "";
}
