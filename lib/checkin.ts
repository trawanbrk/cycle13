// Cycle13 — Daily Check-in localStorage
export interface DailyCheckIn {
  date: string;
  weekId: string;
  card: string;
  completedMinimum: boolean;
  completedMainAction: boolean;
  answeredEveningQuestion: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

const PREFIX = "cycle13:checkin:";

export function getCheckIn(date: string): DailyCheckIn | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(`${PREFIX}${date}`);
  if (!val) return null;
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
}

export function saveCheckIn(checkIn: DailyCheckIn): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${PREFIX}${checkIn.date}`, JSON.stringify(checkIn));
}

export function deleteCheckIn(date: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`${PREFIX}${date}`);
}

export function getLast7DaysCheckIns(): DailyCheckIn[] {
  if (typeof window === "undefined") return [];
  const result: DailyCheckIn[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = formatDate(d);
    const ci = getCheckIn(dateStr);
    if (ci) result.push(ci);
  }
  return result;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}