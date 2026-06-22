"use client";

import type { WeeklyProtocol } from "@/lib/protocols";
import { MODE_NAMES, type Mode } from "@/lib/constants";

export default function WeeklyProtocolCard({
  protocol,
  mode,
}: {
  protocol: WeeklyProtocol;
  mode: Mode;
}) {
  return (
    <div className="space-y-6">
      {/* Meaning */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-2">
          Смысл &middot; {MODE_NAMES[mode]}
        </div>
        <p className="text-[#e8e8ec] text-base leading-relaxed">{protocol.meaning}</p>
        <div className="mt-3 pt-3 border-t border-[#2a2a32]">
          <div className="text-xs text-[#555560] mb-1">Главный вопрос недели</div>
          <p className="text-[#888892] italic">{protocol.question}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
          3 действия недели
        </div>
        <ol className="space-y-2">
          {protocol.actions.map((action, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-[#555560] font-mono shrink-0">{i + 1}.</span>
              <span className="text-[#e8e8ec]">{action}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* KPI */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
          KPI недели
        </div>
        <ul className="space-y-1.5">
          {protocol.kpi.map((kpi, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="text-[#C89B3C]">&#9670;</span>
              <span className="text-[#e8e8ec]">{kpi}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mistakes */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
          Чего избегать
        </div>
        <ul className="space-y-1.5">
          {protocol.mistakes.map((mistake, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="text-[#B8453A]">&#10005;</span>
              <span className="text-[#888892]">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Final Question */}
      <div className="rounded-xl border border-[#C89B3C]/30 bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-2">
          Итоговый вопрос недели
        </div>
        <p className="text-[#e8e8ec] text-lg font-medium leading-relaxed">
          {protocol.finalQuestion}
        </p>
      </div>
    </div>
  );
}