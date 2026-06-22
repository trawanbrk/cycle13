// Cycle OS - Export weekly plan to text
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
  lines.push("=== CYCLE OS - PLAN NEDELI ===");
  lines.push("");
  lines.push(`Data: ${ctx.dateString}`);
  lines.push(`Karta nedeli: ${ctx.cardName} (${ctx.cardCode})`);
  lines.push(`Cikl: ${ctx.cycleNumber}`);
  lines.push(`Nedelya: ${ctx.weekStartStr} - ${ctx.weekEndStr}`);
  lines.push(`Rezhim: ${MODE_NAMES[ctx.mode]}`);
  lines.push("");
  lines.push("SMYSL:");
  lines.push(ctx.protocol.meaning);
  lines.push("");
  lines.push("GLAVNY VOPROS:");
  lines.push(ctx.protocol.question);
  lines.push("");
  lines.push("DEISTVIYA:");
  ctx.protocol.actions.forEach((a, i) => {
    const check = ctx.checklist[i] ? "[x]" : "[ ]";
    lines.push(`${check} ${i + 1}. ${a}`);
  });
  lines.push("");
  lines.push("KPI:");
  ctx.protocol.kpi.forEach((k) => lines.push(`  - ${k}`));
  lines.push("");
  lines.push("CHEGO IZBEGAT:");
  ctx.protocol.mistakes.forEach((m) => lines.push(`  - ${m}`));
  lines.push("");
  if (ctx.focusNote) {
    lines.push("MOI FOKUS NEDELI:");
    lines.push(ctx.focusNote);
    lines.push("");
  }
  lines.push("ITOGOVY VOPROS:");
  lines.push(ctx.protocol.finalQuestion);
  lines.push("");
  lines.push("=== Cycle OS - operacionnaya karta goda ===");
  return lines.join("\n");
}

export function downloadWeeklyPlanTxt(ctx: PlanContext): void {
  const text = buildWeeklyPlanText(ctx);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cycle-os-week-plan-${ctx.cardCode}-${ctx.weekStartStr}.txt`;
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