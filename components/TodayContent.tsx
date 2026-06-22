import Link from "next/link";
import TodayCard from "@/components/TodayCard";
import TestDateBanner from "@/components/TestDateBanner";
import {
  getWeekByDate,
  isJokerWeek,
  JOKER_WEEK,
  getProgress,
  getDayOfWeek,
  type Cycle13Week,
} from "@/lib/cycle13-data";
import { getMoonPhase } from "@/lib/moon";

interface Props {
  testDate: string | null;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const d2 = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${d2}`;
}

function isValidDateStr(s: string): boolean {
  const d = new Date(s);
  return !isNaN(d.getTime());
}

export default function TodayContent({ testDate }: Props) {
  // Determine date — server-side, no useState
  let date: Date;
  let validTestDate = false;

  if (testDate && isValidDateStr(testDate)) {
    date = new Date(testDate);
    validTestDate = true;
  } else {
    date = new Date();
  }

  const dateString = formatDate(date);
  const joker = isJokerWeek(date);
  const week = getWeekByDate(date);
  const moon = getMoonPhase(date);
  const progress = getProgress(date);
  const dayName = getDayOfWeek(date);

  return (
    <div className="space-y-5">
      {validTestDate && testDate && <TestDateBanner date={testDate} />}

      {/* Hero */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">
          Сегодня в Cycle13
        </h1>
        <p className="text-[#888892] text-sm">
          Карта недели, лунный режим и конкретное действие дня.
        </p>
      </div>

      {/* Micro-copy */}
      {!joker && week && (
        <p className="text-[#555560] text-xs">
          Не нужно делать всё. Выбери одно действие и закрой его сегодня.
        </p>
      )}

      {/* Joker week */}
      {joker && (
        <div className="rounded-2xl border border-[#C89B3C]/30 bg-gradient-to-b from-[#1a1a20] to-[#15151a] p-5 sm:p-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-bold text-[#C89B3C]">🃏</span>
            <div>
              <div className="text-xs text-[#555560] uppercase tracking-wider">Карта недели</div>
              <div className="text-[#e8e8ec] font-medium text-lg">{JOKER_WEEK.title}</div>
            </div>
          </div>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">{JOKER_WEEK.description}</p>
          <div className="space-y-1">
            <div className="text-xs text-[#555560] uppercase tracking-wider">Действия</div>
            {JOKER_WEEK.actions.map((a, i) => (
              <div key={i} className="flex gap-2 text-sm text-[#c8c8cc]">
                <span className="text-[#555560] font-mono">{i + 1}.</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {JOKER_WEEK.avoid.map((a, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#1a1a20] border border-[#2a2a32] text-[#888892]">
                {a}
              </span>
            ))}
          </div>
          <div className="rounded-lg bg-[#1a1a20] border border-[#2a2a32] p-3">
            <div className="text-xs text-[#555560] uppercase tracking-wider mb-1">Вечерний вопрос</div>
            <p className="text-[#e8e8ec] text-sm italic">{JOKER_WEEK.eveningQuestion}</p>
          </div>
        </div>
      )}

      {/* Normal week */}
      {!joker && week && (
        <>
          {/* Progress bars */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3">
              <div className="flex justify-between text-xs text-[#555560] mb-1">
                <span>День недели</span>
                <span className="font-mono">{progress.dayInWeek} из 7</span>
              </div>
              <div className="h-1.5 bg-[#0f0f12] rounded-full overflow-hidden">
                <div className="h-full bg-[#888892] rounded-full" style={{ width: `${progress.weekPercent}%` }} />
              </div>
            </div>
            <div className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3">
              <div className="flex justify-between text-xs text-[#555560] mb-1">
                <span>День цикла</span>
                <span className="font-mono">{progress.dayInCycle} из 28</span>
              </div>
              <div className="h-1.5 bg-[#0f0f12] rounded-full overflow-hidden">
                <div className="h-full bg-[#C89B3C] rounded-full" style={{ width: `${progress.cyclePercent}%` }} />
              </div>
            </div>
          </div>

          <TodayCard week={week} date={date} dateString={dateString} />

          {/* Moon card */}
          <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4 flex items-center gap-4">
            <span className="text-3xl">{moon.emoji}</span>
            <div className="flex-1">
              <div className="text-xs text-[#555560] uppercase tracking-wider">Луна сегодня</div>
              <div className="text-[#e8e8ec] text-sm font-medium">{moon.name}</div>
              <div className="text-[#888892] text-xs">{moon.meaning}</div>
            </div>
            <span className="text-xs text-[#555560]">приблизительный расчёт</span>
          </div>

          {/* CTA */}
          <div className="grid sm:grid-cols-4 gap-3 pt-2">
            <Link href="/week" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
              📋 Неделя
            </Link>
            <Link href="/cycle" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
              🔄 Цикл
            </Link>
            <Link href="/year" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
              📅 Год
            </Link>
            <Link href="/method" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
              🧩 Метод
            </Link>
          </div>
        </>
      )}
    </div>
  );
}