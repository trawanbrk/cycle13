import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import AppShell from "@/components/AppShell";
import { getYearMap, JOKER_WEEK, getWeekByDate } from "@/lib/cycle13-data";
import { SUITS, RANKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SEO.title} — Год`,
  description: "13 циклов, 52 недели: карта года Cycle13.",
};

export default function YearPage() {
  const now = new Date();
  const weeks = getYearMap(now);
  const currentWeek = getWeekByDate(now);

  // Group by cycle
  const cycles: Record<number, typeof weeks> = {};
  weeks.forEach((w) => {
    if (!cycles[w.cycleNumber]) cycles[w.cycleNumber] = [];
    cycles[w.cycleNumber].push(w);
  });

  return (
    <AppShell>
      <div className="space-y-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">Год</h1>
        <p className="text-[#888892] text-sm">13 циклов × 4 недели = 52 недели + Джокер-неделя</p>

        {/* Cycle table */}
        <div className="space-y-3">
          {Object.entries(cycles).map(([cycleNum, cycleWeeks]) => {
            const rank = RANKS[Number(cycleNum) - 1];
            const isCurrent = currentWeek?.cycleNumber === Number(cycleNum);
            return (
              <div
                key={cycleNum}
                className={`rounded-xl border p-4 ${
                  isCurrent
                    ? "border-[#C89B3C]/40 bg-[#1a1a20] ring-1 ring-[#C89B3C]/20"
                    : "border-[#2a2a32] bg-[#1a1a20]"
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#C89B3C]">{cycleNum}</span>
                    <div>
                      <div className="text-[#e8e8ec] font-medium text-sm">{rank.name}</div>
                      <div className="text-xs text-[#555560]">{rank.meaning}</div>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#C89B3C]/20 text-[#C89B3C] font-medium">
                      Текущий
                    </span>
                  )}
                </div>

                {/* 4 weeks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {cycleWeeks.map((w) => {
                    const suitInfo = SUITS[w.weekIndexInCycle];
                    const isCurrentWeek = currentWeek?.id === w.id;
                    return (
                      <div
                        key={w.id}
                        className={`rounded-lg border p-2 text-xs ${
                          isCurrentWeek
                            ? "border-[#C89B3C]/40 bg-[#0f0f12]"
                            : "border-[#22222a] bg-[#0f0f12]"
                        }`}
                      >
                        <div className="font-bold text-sm" style={{ color: suitInfo.color }}>
                          {w.card}
                        </div>
                        <div className="text-[#555560] font-mono text-[10px] mt-0.5">
                          {w.startDate.slice(5)} — {w.endDate.slice(5)}
                        </div>
                        <div className="text-[#888892] mt-0.5">{suitInfo.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Joker week */}
        <div className="rounded-xl border border-[#C89B3C]/30 bg-[#1a1a20] p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🃏</span>
            <div>
              <div className="text-[#e8e8ec] font-medium">{JOKER_WEEK.title}</div>
              <div className="text-xs text-[#555560] font-mono">{JOKER_WEEK.startDate} — {JOKER_WEEK.endDate}</div>
            </div>
          </div>
          <p className="text-[#c8c8cc] text-sm">{JOKER_WEEK.description}</p>
        </div>
      </div>
    </AppShell>
  );
}