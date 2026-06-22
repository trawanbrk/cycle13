// Cycle13 — Export weekly plan to text
import type { Mode } from "./constants";
import { MODE_NAMES } from "./constants";
import type { WeeklyProtocol } from "./protocols";

export interface PlanContext {
  dateString: string;
  cardCode: string;
  cardName: string;
  cycleNumber: number;
  weekNumber: string;
  weekStartStr: string;
  weekEndStr: string;
  mode: Mode;
  protocol: WeeklyProtocol;
  focusNote: string;
  checklist: boolean[];
}

export function buildWeeklyPlanText(ctx: PlanContext): string {
  const lines: string[] = [];
  lines.push("=== CYCLE13 — ПЛАН НЕДЕЛИ ===");
  lines.push("");
  lines.push(`Дата: ${ctx.dateString}`);
  lines.push(`Карта недели: ${ctx.cardName} (${ctx.cardCode})`);
  lines.push(`Цикл: ${ctx.cycleNumber}`);
  lines.push(`Неделя: ${ctx.weekStartStr} — ${ctx.weekEndStr}`);
  lines.push(`Режим: ${MODE_NAMES[ctx.mode]}`);
  lines.push("");
  lines.push("СМЫСЛ:");
  lines.push(ctx.protocol.meaning);
  lines.push("");
  lines.push("ГЛАВНЫЙ ВОПРОС:");
  lines.push(ctx.protocol.question);
  lines.push("");
  lines.push("ДЕЙСТВИЯ:");
  ctx.protocol.actions.forEach((a, i) => {
    const check = ctx.checklist[i] ? "[x]" : "[ ]";
    lines.push(`${check} ${i + 1}. ${a}`);
  });
  lines.push("");
  lines.push("KPI:");
  ctx.protocol.kpi.forEach((k) => lines.push(`  — ${k}`));
  lines.push("");
  lines.push("ЧЕГО ИЗБЕГАТЬ:");
  ctx.protocol.mistakes.forEach((m) => lines.push(`  — ${m}`));
  lines.push("");
  if (ctx.focusNote) {
    lines.push("МОЙ ФОКУС НЕДЕЛИ:");
    lines.push(ctx.focusNote);
    lines.push("");
  }
  lines.push("ИТОГОВЫЙ ВОПРОС:");
  lines.push(ctx.protocol.finalQuestion);
  lines.push("");
  lines.push("=== Cycle13 — календарь фокуса ===");
  return lines.join("\n");
}

export function downloadWeeklyPlanTxt(ctx: PlanContext): void {
  const text = buildWeeklyPlanText(ctx);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cycle13-week-plan-${ctx.cardCode}-${ctx.weekStartStr}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyWeeklyPlanToClipboard(ctx: PlanContext): Promise<boolean> {
  const text = buildWeeklyPlanText(ctx);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}