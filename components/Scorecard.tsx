import type { Cycle13Week } from "@/lib/cycle13-data";

interface Props {
  week: Cycle13Week;
}

export default function Scorecard({ week }: Props) {
  return (
    <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
      <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
        Scorecard недели
      </div>
      <div className="space-y-2">
        {week.scorecard.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-[#c8c8cc]">{item.metric}</span>
            <span className="text-[#888892] font-mono">{item.plan}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-[#22222a] text-xs text-[#555560]">
        Цель недели — закрыть все метрики scorecard
      </div>
    </div>
  );
}