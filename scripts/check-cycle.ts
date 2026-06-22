#!/usr/bin/env npx tsx
// scripts/check-cycle.ts - Verify control dates for Cycle OS
import { getCurrentCycleContext } from "../lib/cycle";

interface CheckCase {
  date: string;
  expectedCycle: number;
  expectedWeek: number;
  expectedCard: string;
  expectedJoker?: boolean;
}

const checks: CheckCase[] = [
  { date: "2026-06-15", expectedCycle: 7, expectedWeek: 1, expectedCard: "7♠" },
  { date: "2026-06-21", expectedCycle: 7, expectedWeek: 1, expectedCard: "7♠" },
  { date: "2026-06-22", expectedCycle: 7, expectedWeek: 2, expectedCard: "7♥" },
  { date: "2026-06-29", expectedCycle: 7, expectedWeek: 3, expectedCard: "7♣" },
  { date: "2026-07-06", expectedCycle: 7, expectedWeek: 4, expectedCard: "7♦" },
  { date: "2026-07-12", expectedCycle: 7, expectedWeek: 4, expectedCard: "7♦" },
  { date: "2026-07-13", expectedCycle: 8, expectedWeek: 1, expectedCard: "8♠" },
  { date: "2026-12-28", expectedCycle: 0, expectedWeek: 0, expectedCard: "Joker", expectedJoker: true },
  { date: "2027-01-03", expectedCycle: 0, expectedWeek: 0, expectedCard: "Joker", expectedJoker: true },
  { date: "2027-01-04", expectedCycle: 1, expectedWeek: 1, expectedCard: "Туз♠" },
];

let allPass = true;

for (const check of checks) {
  const [y, m, d] = check.date.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const ctx = getCurrentCycleContext(date);

  const cycleOk = ctx.isJoker
    ? check.expectedJoker === true
    : ctx.cycleNumber === check.expectedCycle;
  const weekOk = ctx.isJoker
    ? check.expectedJoker === true
    : ctx.weekNumber === check.expectedWeek;
  const cardOk = ctx.cardCode === check.expectedCard;

  const pass = cycleOk && weekOk && cardOk;
  if (!pass) allPass = false;

  const status = pass ? "✓ PASS" : "✗ FAIL";
  console.log(
    `${status} | ${check.date} | cycle=${ctx.cycleNumber} (exp ${check.expectedCycle}) | week=${ctx.weekNumber} (exp ${check.expectedWeek}) | card=${ctx.cardCode} (exp ${check.expectedCard})${ctx.isJoker ? " | JOKER" : ""}`
  );
}

console.log(allPass ? "\n=== ALL CHECKS PASSED ===" : "\n=== SOME CHECKS FAILED ===");