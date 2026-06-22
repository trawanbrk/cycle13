// Cycle OS — Core cycle engine
import { START_DATE, CYCLE_DAYS, WEEK_DAYS, TOTAL_CYCLES, SUITS, RANKS, type Suit, type RankInfo } from "./constants";

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function isJokerWeek(date: Date): boolean {
  const jokerStart = parseDate("2026-12-28");
  const jokerEnd = parseDate("2027-01-03");
  // After last cycle (13th cycle ends 2026-12-27) and before next cycle start (2027-01-04)
  const lastCycleEnd = parseDate("2026-12-27");
  const nextCycleStart = parseDate("2027-01-04");
  
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Check if date is in joker range (including end date)
  if (d >= jokerStart && d <= jokerEnd) return true;
  
  // Also check: after all 13 cycles from START_DATE and before next cycle
  const startD = parseDate(START_DATE);
  const totalCycleDays = TOTAL_CYCLES * CYCLE_DAYS; // 364
  const lastDay = new Date(startD);
  lastDay.setDate(lastDay.getDate() + totalCycleDays - 1); // 2026-12-27
  
  if (d > lastDay && d < nextCycleStart) return true;
  
  return false;
}

export function getDayIndex(date: Date): number {
  const start = parseDate(START_DATE);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return daysBetween(start, d);
}

// Next year start: 2027-01-04 (after Joker week)
const NEXT_YEAR_START = parseDate("2027-01-04");
const YEAR_LENGTH = TOTAL_CYCLES * CYCLE_DAYS + 7; // 364 + 7 = 371 (including joker week)

// For dates after the first year + joker week, wrap around to the next year
function getWrappedDayIndex(date: Date): number {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const rawDayIndex = getDayIndex(d);
  
  // If date is after next year start, wrap around
  if (d >= NEXT_YEAR_START) {
    const daysIntoNewYear = daysBetween(NEXT_YEAR_START, d);
    return daysIntoNewYear; // Day index relative to new year start (0-based)
  }
  
  return rawDayIndex;
}

export function getDayInCycle(dayIndex: number): number {
  if (dayIndex < 0) return -1;
  return dayIndex % CYCLE_DAYS;
}

export function getWeekInCycle(dayInCycle: number): number {
  if (dayInCycle < 0) return -1;
  return Math.floor(dayInCycle / WEEK_DAYS) + 1; // 1-indexed
}

export function getCycleNumber(dayIndex: number): number {
  if (dayIndex < 0) return 0;
  return Math.floor(dayIndex / CYCLE_DAYS) + 1; // 1-indexed
}

export function getSuitByWeek(weekNumber: number): Suit {
  const suitMap: Record<number, Suit> = {
    1: "spades",
    2: "hearts",
    3: "clubs",
    4: "diamonds",
  };
  return suitMap[weekNumber] || "spades";
}

export function getRankByCycle(cycleNumber: number): RankInfo {
  return RANKS[cycleNumber - 1] || RANKS[0];
}

export function getSuitInfoByWeek(weekNumber: number) {
  return SUITS[weekNumber];
}

export function getCardCode(cycleNumber: number, weekNumber: number): string {
  const rank = getRankByCycle(cycleNumber);
  const suitInfo = getSuitInfoByWeek(weekNumber);
  return `${rank.shortName}${suitInfo.shortName}`;
}

export function getCardName(cycleNumber: number, weekNumber: number): string {
  const rank = getRankByCycle(cycleNumber);
  const suitInfo = getSuitInfoByWeek(weekNumber);
  return `${rank.name} ${suitInfo.name.toLowerCase()}`;
}

export function getCycleStartDate(cycleNumber: number, referenceDate?: Date): Date {
  // Determine which year's start to use
  let yearStart: Date;
  if (referenceDate && referenceDate >= NEXT_YEAR_START) {
    yearStart = NEXT_YEAR_START;
  } else {
    yearStart = parseDate(START_DATE);
  }
  const d = new Date(yearStart);
  d.setDate(d.getDate() + (cycleNumber - 1) * CYCLE_DAYS);
  return d;
}

export function getCycleEndDate(cycleNumber: number, referenceDate?: Date): Date {
  const start = getCycleStartDate(cycleNumber, referenceDate);
  const end = new Date(start);
  end.setDate(end.getDate() + CYCLE_DAYS - 1);
  return end;
}

export function getWeekStartDate(cycleNumber: number, weekNumber: number, referenceDate?: Date): Date {
  const cycleStart = getCycleStartDate(cycleNumber, referenceDate);
  const d = new Date(cycleStart);
  d.setDate(d.getDate() + (weekNumber - 1) * WEEK_DAYS);
  return d;
}

export function getWeekEndDate(cycleNumber: number, weekNumber: number, referenceDate?: Date): Date {
  const weekStart = getWeekStartDate(cycleNumber, weekNumber, referenceDate);
  const d = new Date(weekStart);
  d.setDate(d.getDate() + WEEK_DAYS - 1);
  return d;
}

export function getCycleProgress(date: Date): { daysElapsed: number; totalDays: number; percent: number } {
  const dayIndex = getWrappedDayIndex(date);
  const cycleNumber = getCycleNumber(dayIndex);
  const dayInCycle = getDayInCycle(dayIndex);
  
  return {
    daysElapsed: dayInCycle + 1,
    totalDays: CYCLE_DAYS,
    percent: Math.round(((dayInCycle + 1) / CYCLE_DAYS) * 100),
  };
}

export interface CycleContext {
  isJoker: boolean;
  date: Date;
  dateString: string;
  dayIndex: number;
  cycleNumber: number;
  weekNumber: number;
  dayInCycle: number;
  cardCode: string;
  cardName: string;
  rank: RankInfo;
  suitInfo: typeof SUITS[1];
  cycleStartDate: Date;
  cycleEndDate: Date;
  weekStartDate: Date;
  weekEndDate: Date;
  cycleStartStr: string;
  cycleEndStr: string;
  weekStartStr: string;
  weekEndStr: string;
  progress: { daysElapsed: number; totalDays: number; percent: number };
}

export function getCurrentCycleContext(date: Date): CycleContext {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayIndex = getWrappedDayIndex(d);
  const joker = isJokerWeek(d);
  
  if (joker) {
    const jokerStart = parseDate("2026-12-28");
    const jokerEnd = parseDate("2027-01-03");
    return {
      isJoker: true,
      date: d,
      dateString: formatDate(d),
      dayIndex,
      cycleNumber: 0,
      weekNumber: 0,
      dayInCycle: -1,
      cardCode: "Joker",
      cardName: "Джокер",
      rank: RANKS[0],
      suitInfo: SUITS[1],
      cycleStartDate: jokerStart,
      cycleEndDate: jokerEnd,
      weekStartDate: jokerStart,
      weekEndDate: jokerEnd,
      cycleStartStr: formatDate(jokerStart),
      cycleEndStr: formatDate(jokerEnd),
      weekStartStr: formatDate(jokerStart),
      weekEndStr: formatDate(jokerEnd),
      progress: { daysElapsed: 0, totalDays: 7, percent: 0 },
    };
  }
  
  const cycleNumber = getCycleNumber(dayIndex);
  const dayInCycle = getDayInCycle(dayIndex);
  const weekNumber = getWeekInCycle(dayInCycle);
  const rank = getRankByCycle(cycleNumber);
  const suitInfo = getSuitInfoByWeek(weekNumber);
  const cardCode = getCardCode(cycleNumber, weekNumber);
  const cardName = getCardName(cycleNumber, weekNumber);
  const cycleStartDate = getCycleStartDate(cycleNumber, d);
  const cycleEndDate = getCycleEndDate(cycleNumber, d);
  const weekStartDate = getWeekStartDate(cycleNumber, weekNumber, d);
  const weekEndDate = getWeekEndDate(cycleNumber, weekNumber, d);
  const progress = getCycleProgress(d);
  
  return {
    isJoker: false,
    date: d,
    dateString: formatDate(d),
    dayIndex,
    cycleNumber,
    weekNumber,
    dayInCycle,
    cardCode,
    cardName,
    rank,
    suitInfo,
    cycleStartDate,
    cycleEndDate,
    weekStartDate,
    weekEndDate,
    cycleStartStr: formatDate(cycleStartDate),
    cycleEndStr: formatDate(cycleEndDate),
    weekStartStr: formatDate(weekStartDate),
    weekEndStr: formatDate(weekEndDate),
    progress,
  };
}

export interface YearMapEntry {
  cycleNumber: number;
  rankId: number;
  rankName: string;
  rankMeaning: string;
  startDate: string;
  endDate: string;
  status: "past" | "current" | "future";
}

export function getYearMap(referenceDate?: Date): YearMapEntry[] {
  const ref = referenceDate || new Date();
  const refDayIndex = getWrappedDayIndex(ref);
  const refCycle = getCycleNumber(refDayIndex);
  
  return RANKS.map((rank, i) => {
    const cycleNum = i + 1;
    const start = getCycleStartDate(cycleNum, ref);
    const end = getCycleEndDate(cycleNum, ref);
    let status: "past" | "current" | "future" = "future";
    if (cycleNum < refCycle) status = "past";
    else if (cycleNum === refCycle) status = "current";
    else status = "future";
    
    return {
      cycleNumber: cycleNum,
      rankId: rank.id,
      rankName: rank.name,
      rankMeaning: rank.meaning,
      startDate: formatDate(start),
      endDate: formatDate(end),
      status,
    };
  });
}

export function getCycleWeeks(cycleNumber: number, referenceDate?: Date) {
  const weeks = [];
  for (let w = 1; w <= 4; w++) {
    weeks.push({
      weekNumber: w,
      suitInfo: getSuitInfoByWeek(w),
      cardCode: getCardCode(cycleNumber, w),
      cardName: getCardName(cycleNumber, w),
      startDate: formatDate(getWeekStartDate(cycleNumber, w, referenceDate)),
      endDate: formatDate(getWeekEndDate(cycleNumber, w, referenceDate)),
    });
  }
  return weeks;
}

export { formatDate, parseDate };
