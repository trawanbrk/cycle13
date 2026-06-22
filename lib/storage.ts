// Cycle13 — LocalStorage (browser only, no server data)
import type { Mode } from "./constants";

const SELECTED_MODE_KEY = "cycle13:selected-mode";
const FOCUS_KEY_PREFIX = "cycle13:focus";
const CHECKLIST_KEY_PREFIX = "cycle13:checklist";

export function getSelectedMode(): Mode | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(SELECTED_MODE_KEY);
  if (!val) return null;
  const validModes: Mode[] = ["personality", "business", "body", "money", "relationships", "creation"];
  return validModes.includes(val as Mode) ? (val as Mode) : null;
}

export function setSelectedMode(mode: Mode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SELECTED_MODE_KEY, mode);
}

export function getFocusNote(cardCode: string, weekStart: string): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(`${FOCUS_KEY_PREFIX}:${cardCode}:${weekStart}`) || "";
}

export function setFocusNote(cardCode: string, weekStart: string, note: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${FOCUS_KEY_PREFIX}:${cardCode}:${weekStart}`, note);
}

export function getChecklist(cardCode: string, mode: Mode, weekStart: string): boolean[] {
  if (typeof window === "undefined") return [false, false, false];
  const key = `${CHECKLIST_KEY_PREFIX}:${cardCode}:${mode}:${weekStart}`;
  const val = localStorage.getItem(key);
  if (!val) return [false, false, false];
  try {
    return JSON.parse(val);
  } catch {
    return [false, false, false];
  }
}

export function setChecklist(cardCode: string, mode: Mode, weekStart: string, checklist: boolean[]): void {
  if (typeof window === "undefined") return;
  const key = `${CHECKLIST_KEY_PREFIX}:${cardCode}:${mode}:${weekStart}`;
  localStorage.setItem(key, JSON.stringify(checklist));
}