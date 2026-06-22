import { SUITS } from "@/lib/constants";

export default function SuitMeaningCard() {
  const suits = Object.values(SUITS);

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {suits.map((suit) => (
        <div
          key={suit.id}
          className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl" style={{ color: suit.color }}>
              {suit.symbol}
            </span>
            <div>
              <div className="font-semibold text-[#e8e8ec]">{suit.name}</div>
              <div className="text-xs text-[#888892]">Неделя {suit.weekNumber}</div>
            </div>
          </div>
          <div className="text-sm font-medium mb-1" style={{ color: suit.color }}>
            {suit.meaning}
          </div>
          <div className="text-xs text-[#888892] italic mb-2">{suit.question}</div>
          <div className="flex flex-wrap gap-1">
            {suit.keywords.map((kw, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[#0f0f12] border border-[#2a2a32] text-[#555560]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}