import Link from "next/link";
import TestDateBanner from "@/components/TestDateBanner";
import WeekCard from "@/components/WeekCard";
import { SUITS } from "@/lib/constants";
import { getWeekByDate, getWeeksByCycle, isJokerWeek, JOKER_WEEK, type Cycle13Week } from "@/lib/cycle13-data";

interface Props {
  testDate: string | null;
}

function isValidDateStr(s: string): boolean {
  const d = new Date(s);
  return !isNaN(d.getTime());
}

export default function CycleContent({ testDate }: Props) {
  const date = testDate && isValidDateStr(testDate) ? new Date(testDate) : new Date();
  const joker = isJokerWeek(date);
  const week = getWeekByDate(date);
  const weeks = week ? getWeeksByCycle(week.cycleNumber, date) : [];
  const validTestDate = testDate && isValidDateStr(testDate);

  return (
    <div className="space-y-5">
      {validTestDate && <TestDateBanner date={testDate!} />}

      <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">Цикл</h1>
      <p className="text-[#555560] text-xs">Цикл работает как 4 шага: очистить → соединить → сделать → зафиксировать.</p>

      {joker && (
        <div className="rounded-2xl border border-[#C89B3C]/30 bg-[#1a1a20] p-5 space-y-3">
          <div className="text-[#C89B3C] text-3xl">🃏</div>
          <div className="text-[#e8e8ec] font-medium">{JOKER_WEEK.title}</div>
          <p className="text-[#c8c8cc] text-sm">{JOKER_WEEK.description}</p>
        </div>
      )}

      {!joker && week && (
        <>
          <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-[#C89B3C]">{week.cycleNumber}</span>
              <div>
                <div className="text-xs text-[#555560] uppercase tracking-wider">Текущий цикл</div>
                <div className="text-[#e8e8ec] font-medium">{week.cycleRank}</div>
              </div>
            </div>
          </div>

          {/* 4 weeks */}
          <div className="space-y-3">
            {weeks.map((w) => (
              <WeekCard key={w.id} week={w} />
            ))}
          </div>

          {/* How to pass the cycle */}
          <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
            <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">Как пройти этот цикл</div>
            <div className="space-y-2 text-sm text-[#c8c8cc]">
              <div><span className="text-[#6B7B9E]">Неделя 1: </span>убрать лишнее</div>
              <div><span className="text-[#B8453A]">Неделя 2: </span>усилить связи</div>
              <div><span className="text-[#3A8B5A]">Неделя 3: </span>сделать работу</div>
              <div><span className="text-[#C89B3C]">Неделя 4: </span>зафиксировать результат</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
              ← Сегодня
            </Link>
            <Link href="/year" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
              Год →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}