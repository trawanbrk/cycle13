import { getMoonPhase, getMoonLayerForWeek } from "@/lib/moon";

export default function MoonPhaseBadge({ date }: { date: Date }) {
  const moon = getMoonPhase(date);
  const layer = getMoonLayerForWeek(moon.phase, "");

  return (
    <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{moon.emoji}</span>
        <div>
          <div className="text-xs text-[#555560] uppercase tracking-wider mb-0.5">
            Лунный ритм
          </div>
          <div className="text-sm font-semibold text-[#e8e8ec]">{moon.name}</div>
          <div className="text-xs text-[#888892]">{moon.meaning}</div>
        </div>
      </div>
      {layer && (
        <div className="mt-2 pt-2 border-t border-[#2a2a32] text-xs text-[#555560]">
          {layer}
        </div>
      )}
      {moon.approximate && (
        <div className="mt-1 text-[10px] text-[#555560]">
          * Приближённый расчёт
        </div>
      )}
    </div>
  );
}