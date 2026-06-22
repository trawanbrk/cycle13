import { RANKS } from "@/lib/constants";

export default function RankMeaningCard() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {RANKS.map((rank) => (
        <div
          key={rank.id}
          className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#555560] font-mono">
              {rank.id}
            </span>
            <span className="font-semibold text-[#e8e8ec] text-sm">
              {rank.name}
            </span>
          </div>
          <div className="text-xs text-[#888892] mt-1">{rank.meaning}</div>
        </div>
      ))}
    </div>
  );
}