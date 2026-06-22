import type { CycleContext } from "@/lib/cycle";

export default function ProgressBar({ ctx }: { ctx: CycleContext }) {
  const { progress } = ctx;
  return (
    <div className="rounded-lg bg-[#1a1a20] border border-[#2a2a32] p-4">
      <div className="flex justify-between text-xs text-[#888892] mb-2">
        <span>Прогресс цикла</span>
        <span>
          {progress.daysElapsed} / {progress.totalDays} дней ({progress.percent}%)
        </span>
      </div>
      <div className="h-2 rounded-full bg-[#0f0f12] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress.percent}%`,
            backgroundColor: ctx.suitInfo.color,
          }}
        />
      </div>
    </div>
  );
}