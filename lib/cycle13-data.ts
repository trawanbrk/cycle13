// Cycle13 — Source of Truth: единая структура данных для 52 недель
import { SUITS, RANKS, type Suit, type RankInfo } from "./constants";
import { getMoonPhase } from "./moon";

// ── Types ──────────────────────────────────────────────

export type MoonMode = "new" | "waxing" | "full" | "waning";
export type WeekStatus = "past" | "active" | "future";

export interface ScorecardItem {
  metric: string;
  plan: string;
}

export interface Cycle13Week {
  id: string;
  cycleNumber: number;
  cycleRank: string;
  weekIndexInCycle: 1 | 2 | 3 | 4;
  globalWeekIndex: number;
  card: string;
  rank: string;
  suit: Suit;
  startDate: string;
  endDate: string;
  moonMode: MoonMode;
  status: WeekStatus;
  shortFocus: string;
  plainMeaning: string;
  mainQuestion: string;
  dailyMinimum: string;
  dailyActions: string[];
  weeklyActions: string[];
  avoid: string[];
  weekResult: string[];
  eveningQuestion: string;
  scorecard: ScorecardItem[];
}

// ── Moon modes ────────────────────────────────────────

export const MOON_MODES: Record<MoonMode, { name: string; emoji: string; meaning: string; action: string }> = {
  new: { name: "Новолуние", emoji: "🌑", meaning: "старт, намерение, обнуление", action: "выбрать направление, начать мягко" },
  waxing: { name: "Растущая луна", emoji: "🌒", meaning: "усиление, рост, набор энергии", action: "развивать, добавлять, усиливать" },
  full: { name: "Полнолуние", emoji: "🌕", meaning: "пик, проявление, ясность", action: "проявить, увидеть результат, принять решение" },
  waning: { name: "Убывающая луна", emoji: "🌗", meaning: "завершение, очистка, выводы", action: "закрыть, отпустить, подвести итоги" },
};

// ── Scorecard templates by suit ───────────────────────

const SCORECARDS: Record<Suit, ScorecardItem[]> = {
  spades: [
    { metric: "Что убрано", plan: "3" },
    { metric: "Хвосты закрыты", plan: "2" },
    { metric: "Решения приняты", plan: "1" },
    { metric: "Главный результат недели", plan: "1" },
  ],
  hearts: [
    { metric: "Важные контакты", plan: "3" },
    { metric: "Честные разговоры", plan: "1" },
    { metric: "Восстановление энергии", plan: "3" },
    { metric: "Главный результат недели", plan: "1" },
  ],
  clubs: [
    { metric: "Задачи сделаны", plan: "5" },
    { metric: "Обучение", plan: "1" },
    { metric: "Система запущена", plan: "1" },
    { metric: "Главный результат недели", plan: "1" },
  ],
  diamonds: [
    { metric: "Деньги посчитаны", plan: "1" },
    { metric: "Результат зафиксирован", plan: "1" },
    { metric: "Дела завершены", plan: "3" },
    { metric: "Главный результат недели", plan: "1" },
  ],
};

// ── Week content generator ────────────────────────────

const SUIT_FOCUS: Record<Suit, string> = {
  spades: "очистить, диагностировать, отсечь лишнее",
  hearts: "соединить, зарядить, восстановить связи",
  clubs: "сделать, учиться, строить систему",
  diamonds: "зафиксировать результат, деньги, ресурс",
};

const SUIT_DAILY: Record<Suit, string> = {
  spades: "Сделай одно действие по очистке — убери лишнее.",
  hearts: "Сделай одно осознанное касание с важным человеком.",
  clubs: "Сделай одно конкретное действие руками.",
  diamonds: "Зафиксируй один результат в цифрах или решении.",
};

const SUIT_AVOID: Record<Suit, string[]> = {
  spades: ["не держаться за старое", "не распыляться", "не игнорировать узкое место"],
  hearts: ["не распыляться на случайные разговоры", "не спасать всех", "не уходить в изоляцию"],
  clubs: ["не откладывать действие", "не заменять работу планами", "не бросать начатое"],
  diamonds: ["не избегать подсчёта", "не украшать результаты", "не откладывать решение"],
};

const SUIT_EVENING: Record<Suit, string> = {
  spades: "Что я убрал сегодня, чтобы появилось место для главного?",
  hearts: "Что сегодня усилило мою энергию, доверие или связь с людьми?",
  clubs: "Какое действие я сделал руками, чтобы идея стала реальностью?",
  diamonds: "Что я получил сегодня, что доказано цифрами?",
};

const SUIT_RESULT: Record<Suit, string[]> = {
  spades: ["что убрано", "какие хвосты закрыты", "какие решения приняты", "что больше не тянем"],
  hearts: ["с кем был контакт", "что изменилось", "какая договорённость появилась", "что дало энергию"],
  clubs: ["какие задачи сделаны", "что запущено", "что изучено", "какая система создана"],
  diamonds: ["сколько заработано", "что доказано", "что завершено", "что масштабировать"],
};

function generateWeek(
  cycleNumber: number,
  weekIndexInCycle: 1 | 2 | 3 | 4,
  globalWeekIndex: number,
  startDate: string,
  endDate: string,
  moonMode: MoonMode,
  status: WeekStatus,
): Cycle13Week {
  const rankInfo: RankInfo = RANKS[cycleNumber - 1] || RANKS[0];
  const suitInfo = SUITS[weekIndexInCycle];
  const card = `${rankInfo.shortName}${suitInfo.shortName}`;

  const plainMeaning = `Неделя ${card} соединяет «${rankInfo.meaning}» и тему «${suitInfo.meaning.toLowerCase()}». Лунный режим: ${MOON_MODES[moonMode].name.toLowerCase()} — ${MOON_MODES[moonMode].action}.`;

  return {
    id: `c${cycleNumber}w${weekIndexInCycle}`,
    cycleNumber,
    cycleRank: rankInfo.name,
    weekIndexInCycle,
    globalWeekIndex,
    card,
    rank: rankInfo.name,
    suit: suitInfo.id,
    startDate,
    endDate,
    moonMode,
    status,
    shortFocus: SUIT_FOCUS[suitInfo.id],
    plainMeaning,
    mainQuestion: suitInfo.question,
    dailyMinimum: SUIT_DAILY[suitInfo.id],
    dailyActions: [
      `${rankInfo.name}: ${suitInfo.meaning.toLowerCase()} — ${MOON_MODES[moonMode].action}.`,
      `Выбери 1 конкретный шаг в теме «${rankInfo.keywords[0]}».`,
      `Зафиксируй: ${SUIT_RESULT[suitInfo.id][0]} — конкретный итог дня.`,
    ],
    weeklyActions: [
      `Определи главное в теме «${rankInfo.name} — ${rankInfo.keywords[0]}».`,
      `Реализуй фокус недели: ${SUIT_FOCUS[suitInfo.id]}.`,
      `Лунный режим: ${MOON_MODES[moonMode].action} — не пропускай этот слой.`,
      `Сделай 3 конкретных действия в сфере «${suitInfo.name.toLowerCase()}».`,
      `Зафиксируй: ${SUIT_RESULT[suitInfo.id].join(", ")}.`,
    ],
    avoid: SUIT_AVOID[suitInfo.id],
    weekResult: SUIT_RESULT[suitInfo.id],
    eveningQuestion: SUIT_EVENING[suitInfo.id],
    scorecard: SCORECARDS[suitInfo.id],
  };
}

// ── 52 weeks calendar (generated) ────────────────────

function buildAllWeeks(referenceDate?: Date): Cycle13Week[] {
  const weeks: Cycle13Week[] = [];
  const ref = referenceDate || new Date();
  const refDayIndex = getDayIndex(ref);
  const refCycle = Math.floor(refDayIndex / 28) + 1;
  const refWeekInCycle = Math.floor(refDayIndex % 28 / 7) + 1;
  const refGlobalWeek = Math.floor(refDayIndex / 7) + 1;

  const start = new Date(2025, 11, 29); // 2025-12-29

  for (let c = 1; c <= 13; c++) {
    for (let w = 1 as 1 | 2 | 3 | 4; w <= 4; w++) {
      const globalWeek = (c - 1) * 4 + w;
      const weekStart = new Date(start);
      weekStart.setDate(weekStart.getDate() + (globalWeek - 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const startDate = formatDate(weekStart);
      const endDate = formatDate(weekEnd);

      // Calculate moon mode from real approximate moon phase (middle of week)
      const weekMid = new Date(weekStart);
      weekMid.setDate(weekMid.getDate() + 3); // day 4 of week
      const moonPhase = getMoonPhase(weekMid);
      const moonMode = moonPhase.phase as MoonMode;

      let status: WeekStatus = "future";
      if (globalWeek < refGlobalWeek) status = "past";
      else if (globalWeek === refGlobalWeek) status = "active";

      weeks.push(
        generateWeek(c, w, globalWeek, startDate, endDate, moonMode, status),
      );
    }
  }

  return weeks;
}

// ── Helpers ───────────────────────────────────────────

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getDayIndex(date: Date): number {
  const start = parseDate("2025-12-29");
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const ms = d.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

// ── Joker week ────────────────────────────────────────

export const JOKER_WEEK = {
  startDate: "2026-12-28",
  endDate: "2027-01-03",
  card: "Джокер",
  title: "Джокер-неделя",
  description:
    "Неделя вне основного цикла. Время ревизии года, обнуления, очистки, сборки выводов и подготовки нового цикла.",
  actions: [
    "Подведи итог года — что сработало, что нет.",
    "Очисти всё лишнее — задачи, контакты, обязательства.",
    "Собери выводы в один документ или заметку.",
    "Подготовь фокус на новый цикл.",
  ],
  avoid: ["не начинать новое", "не тащить старое в новый цикл", "не игнорировать рефлексию"],
  eveningQuestion: "Что я вынес из этого года, что станет фундаментом следующего?",
};

// ── Public API ───────────────────────────────────────

export function getAllWeeks(referenceDate?: Date): Cycle13Week[] {
  return buildAllWeeks(referenceDate);
}

export function getWeekByDate(date: Date): Cycle13Week | null {
  const refDayIndex = getDayIndex(date);
  if (refDayIndex < 0) return null;

  const jokerStart = parseDate(JOKER_WEEK.startDate);
  const jokerEnd = parseDate(JOKER_WEEK.endDate);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d >= jokerStart && d <= jokerEnd) return null; // Joker week

  // After next cycle start (2027-01-04) — wrap around
  const nextCycleStart = parseDate("2027-01-04");
  let effectiveDayIndex = refDayIndex;
  if (d >= nextCycleStart) {
    effectiveDayIndex = Math.floor((d.getTime() - nextCycleStart.getTime()) / (1000 * 60 * 60 * 24));
  }

  const cycleNumber = Math.floor(effectiveDayIndex / 28) + 1;
  const weekInCycle = (Math.floor(effectiveDayIndex % 28 / 7) + 1) as 1 | 2 | 3 | 4;
  const globalWeek = (cycleNumber - 1) * 4 + weekInCycle;

  const weeks = buildAllWeeks(d);
  const week = weeks[globalWeek - 1] || null;
  if (!week) return null;

  // Override moon mode with real calculation for today's date
  const realMoon = getMoonPhase(d);
  return {
    ...week,
    moonMode: realMoon.phase as MoonMode,
    plainMeaning: week.plainMeaning.replace(
      MOON_MODES[week.moonMode].name.toLowerCase(),
      realMoon.name.toLowerCase(),
    ),
  };
}

export function getWeeksByCycle(cycleNumber: number, referenceDate?: Date): Cycle13Week[] {
  const weeks = buildAllWeeks(referenceDate);
  return weeks.filter((w) => w.cycleNumber === cycleNumber);
}

export function getCycleWeeks(cycleNumber: number, referenceDate?: Date): Cycle13Week[] {
  return getWeeksByCycle(cycleNumber, referenceDate);
}

export function getYearMap(referenceDate?: Date): Cycle13Week[] {
  return buildAllWeeks(referenceDate);
}

export function isJokerWeek(date: Date): boolean {
  const jokerStart = parseDate(JOKER_WEEK.startDate);
  const jokerEnd = parseDate(JOKER_WEEK.endDate);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return d >= jokerStart && d <= jokerEnd;
}

export function getDayOfWeek(date: Date): string {
  const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  return days[date.getDay()];
}

export function getProgress(date: Date): { dayInWeek: number; dayInCycle: number; weekPercent: number; cyclePercent: number } {
  const refDayIndex = getDayIndex(date);
  const dayInCycle = refDayIndex % 28;
  const dayInWeek = dayInCycle % 7;
  return {
    dayInWeek: dayInWeek + 1,
    dayInCycle: dayInCycle + 1,
    weekPercent: Math.round(((dayInWeek + 1) / 7) * 100),
    cyclePercent: Math.round(((dayInCycle + 1) / 28) * 100),
  };
}

export { formatDate, parseDate, getDayIndex };