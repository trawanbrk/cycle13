import Link from "next/link";
import { getCycleWeeks, type CycleContext } from "@/lib/cycle";

export default function CycleCard({ ctx }: { ctx: CycleContext }) {
  if (ctx.isJoker) {
    return (
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-6 text-center">
        <div className="text-4xl mb-3">🃏</div>
        <div className="text-lg font-bold mb-2">Джокер-неделя</div>
        <div className="text-[#888892] text-sm">
          {ctx.weekStartStr} &mdash; {ctx.weekEndStr}
        </div>
        <div className="text-[#888892] text-sm mt-2 max-w-md mx-auto">
          Ревизия, обнуление, сборка года. Неделя для подведения итогов и подготовки к новому циклу.
        </div>
      </div>
    );
  }

  const weeks = getCycleWeeks(ctx.cycleNumber, ctx.date);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="flex items-baseline justify-between mb-1">
          <div className="text-lg font-bold">
            Цикл {ctx.cycleNumber}: {ctx.rank.name}
          </div>
          <div className="text-xs text-[#555560] font-mono">
            {ctx.cycleStartStr} &mdash; {ctx.cycleEndStr}
          </div>
        </div>
        <div className="text-sm text-[#888892]">{ctx.rank.meaning}</div>
      </div>

      <div className="grid gap-3">
        {weeks.map((week) => {
          const isCurrentWeek = week.weekNumber === ctx.weekNumber;
          return (
            <div
              key={week.weekNumber}
              className={`rounded-xl border p-4 transition-all ${
                isCurrentWeek
                  ? "border-[#C89B3C]/40 bg-[#C89B3C]/5"
                  : "border-[#2a2a32] bg-[#1a1a20]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-2xl"
                    style={{ color: week.suitInfo.color }}
                  >
                    {week.suitInfo.symbol}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">
                      Неделя {week.weekNumber}: {week.suitInfo.name}
                    </div>
                    <div className="text-xs text-[#555560]">
                      {week.suitInfo.meaning}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-lg font-bold"
                    style={{ color: week.suitInfo.color }}
                  >
                    {week.cardCode}
                  </div>
                  {isCurrentWeek && (
                    <div className="text-[10px] text-[#C89B3C] uppercase tracking-wider">
                      текущая
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-[#555560] font-mono">
                {week.startDate} &mdash; {week.endDate}
              </div>
              <div className="text-xs text-[#888892] mt-1 italic">
                {week.suitInfo.question}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[#2a2a32] bg-[#0f0f12] p-4">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-1">
          Что должно выйти к концу цикла
        </div>
        <div className="text-sm text-[#888892]">
          К концу 4-й недели ({ctx.cycleEndStr}) у вас должен быть зафиксирован
          результат цикла &mdash; цифры, выводы, решение по масштабированию.
        </div>
      </div>
    </div>
  );
}