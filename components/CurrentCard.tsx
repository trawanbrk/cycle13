import type { CycleContext } from "@/lib/cycle";

export default function CurrentCard({ ctx }: { ctx: CycleContext }) {
  if (ctx.isJoker) {
    return (
      <div className="relative rounded-2xl border border-[#2a2a32] bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] p-8 sm:p-12 text-center">
        <div className="text-7xl sm:text-8xl mb-4">🃏</div>
        <div className="text-2xl sm:text-3xl font-bold mb-2">Джокер-неделя</div>
        <div className="text-[#888892] text-sm mb-4">
          {ctx.weekStartStr} &mdash; {ctx.weekEndStr}
        </div>
        <div className="text-[#888892] max-w-md mx-auto">
          Ревизия, обнуление, сборка года. Неделя для подведения итогов и подготовки к новому циклу.
        </div>
      </div>
    );
  }

  const suitColor = ctx.suitInfo.color;

  return (
    <div className="relative rounded-2xl border border-[#2a2a32] bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] p-6 sm:p-10 overflow-hidden">
      {/* Background watermark */}
      <div
        className="absolute top-1/2 right-4 -translate-y-1/2 text-[180px] sm:text-[240px] font-bold opacity-5 select-none pointer-events-none"
        style={{ color: suitColor }}
      >
        {ctx.suitInfo.symbol}
      </div>

      <div className="relative z-10">
        <div className="text-[#888892] text-sm mb-1">Карта недели</div>
        <div className="flex items-baseline gap-3 mb-4">
          <div
            className="text-5xl sm:text-7xl font-bold tracking-tight"
            style={{ color: suitColor }}
          >
            {ctx.cardCode}
          </div>
          <div className="text-xl sm:text-2xl text-[#888892]">
            {ctx.cardName}
          </div>
        </div>
        <div className="text-base sm:text-lg text-[#e8e8ec] mb-2">
          {ctx.suitInfo.meaning}
        </div>
        <div className="text-sm text-[#888892] mb-6">
          {ctx.rank.meaning}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="rounded-lg bg-[#0f0f12] border border-[#2a2a32] p-3">
            <div className="text-[#555560] text-xs mb-1">Цикл</div>
            <div className="font-semibold">{ctx.cycleNumber}</div>
          </div>
          <div className="rounded-lg bg-[#0f0f12] border border-[#2a2a32] p-3">
            <div className="text-[#555560] text-xs mb-1">Неделя</div>
            <div className="font-semibold">{ctx.weekNumber} / 4</div>
          </div>
          <div className="rounded-lg bg-[#0f0f12] border border-[#2a2a32] p-3">
            <div className="text-[#555560] text-xs mb-1">Даты недели</div>
            <div className="font-semibold text-xs">
              {ctx.weekStartStr} &mdash; {ctx.weekEndStr}
            </div>
          </div>
          <div className="rounded-lg bg-[#0f0f12] border border-[#2a2a32] p-3">
            <div className="text-[#555560] text-xs mb-1">Даты цикла</div>
            <div className="font-semibold text-xs">
              {ctx.cycleStartStr} &mdash; {ctx.cycleEndStr}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}