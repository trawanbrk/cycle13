import { SUITS } from "@/lib/constants";
import type { Cycle13Week } from "@/lib/cycle13-data";

interface Props {
  week: Cycle13Week;
}

export default function WeekCard({ week }: Props) {
  const suitInfo = SUITS[week.weekIndexInCycle];
  const isActive = week.status === "active";

  return (
    <div
      className={`rounded-xl border p-5 space-y-3 transition-all ${
        isActive
          ? "border-[#C89B3C]/40 bg-[#1a1a20] ring-1 ring-[#C89B3C]/20"
          : "border-[#2a2a32] bg-[#1a1a20]"
      }`}
    >
      {/* Card + dates */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold" style={{ color: suitInfo.color }}>
            {week.card}
          </span>
          <div>
            <div className="text-[#e8e8ec] font-medium text-sm">
              {week.rank} {suitInfo.name.toLowerCase()}
            </div>
            <div className="text-xs text-[#555560] font-mono">
              {week.startDate} — {week.endDate}
            </div>
          </div>
        </div>
        {isActive && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-[#C89B3C]/20 text-[#C89B3C] font-medium">
            Активная неделя
          </span>
        )}
        {week.status === "past" && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-[#1a1a20] text-[#555560] border border-[#2a2a32]">
            Прошла
          </span>
        )}
        {week.status === "future" && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-[#1a1a20] text-[#555560] border border-[#2a2a32]">
            Впереди
          </span>
        )}
      </div>

      {/* Focus */}
      <div className="text-sm text-[#c8c8cc]">
        <span className="text-[#555560]">Фокус: </span>
        {week.shortFocus}
      </div>

      {/* Main question */}
      <div className="text-sm text-[#888892] italic">
        {week.mainQuestion}
      </div>

      {/* Daily minimum */}
      <div className="text-sm">
        <span className="text-[#555560]">Действие дня: </span>
        <span className="text-[#e8e8ec]">{week.dailyMinimum}</span>
      </div>

      {/* Result */}
      <div className="flex gap-1.5 flex-wrap">
        {week.weekResult.map((r, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#0f0f12] border border-[#22222a] text-[#888892]">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}