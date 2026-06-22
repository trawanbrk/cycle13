import Link from "next/link";
import TestDateBanner from "@/components/TestDateBanner";
import Scorecard from "@/components/Scorecard";
import MoonModeCard from "@/components/MoonModeCard";
import { SUITS } from "@/lib/constants";
import { getWeekByDate, isJokerWeek, JOKER_WEEK, MOON_MODES, type Cycle13Week } from "@/lib/cycle13-data";

interface Props {
  testDate: string | null;
}

function isValidDateStr(s: string): boolean {
  const d = new Date(s);
  return !isNaN(d.getTime());
}

export default function WeekContent({ testDate }: Props) {
  const date = testDate && isValidDateStr(testDate) ? new Date(testDate) : new Date();
  const joker = isJokerWeek(date);
  const week = getWeekByDate(date);
  const validTestDate = testDate && isValidDateStr(testDate);

  return (
    <div className="space-y-5">
      {validTestDate && <TestDateBanner date={testDate!} />}

      <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">Неделя</h1>
      <p className="text-[#555560] text-xs">Неделя считается пройденной не по настроению, а по зафиксированным действиям и выводам.</p>

      {joker && (
        <div className="rounded-2xl border border-[#C89B3C]/30 bg-[#1a1a20] p-5 sm:p-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-bold text-[#C89B3C]">🃏</span>
            <div>
              <div className="text-[#e8e8ec] font-medium text-lg">{JOKER_WEEK.title}</div>
              <div className="text-xs text-[#555560] font-mono">{JOKER_WEEK.startDate} — {JOKER_WEEK.endDate}</div>
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
        </div>
      )}

      {!joker && week && (() => {
        const suitInfo = SUITS[week.weekIndexInCycle];
        return (
          <>
            {/* Card header */}
            <div className="rounded-2xl border border-[#2a2a32] bg-gradient-to-b from-[#1a1a20] to-[#15151a] p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl sm:text-6xl font-bold" style={{ color: suitInfo.color }}>
                  {week.card}
                </span>
                <div>
                  <div className="text-xs text-[#555560] uppercase tracking-wider">Карта недели</div>
                  <div className="text-[#e8e8ec] font-medium text-lg">
                    {week.rank} {suitInfo.name.toLowerCase()}
                  </div>
                  <div className="text-xs text-[#555560] font-mono mt-1">
                    {week.startDate} — {week.endDate}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 text-sm flex-wrap">
                <div><span className="text-[#555560]">Цикл года </span><span className="text-[#e8e8ec]">{week.cycleNumber} из 13 — {week.cycleRank}</span></div>
                <div><span className="text-[#555560]">Неделя цикла </span><span className="text-[#e8e8ec]">{week.weekIndexInCycle} из 4</span></div>
                <div><span className="text-[#555560]">Масть </span><span className="text-[#e8e8ec]">{suitInfo.name}</span></div>
              </div>

              {/* Plain meaning */}
              <div className="rounded-lg bg-[#0f0f12] border border-[#22222a] p-4">
                <div className="text-xs text-[#555560] uppercase tracking-wider mb-1">Смысл недели</div>
                <p className="text-[#c8c8cc] text-sm leading-relaxed">{week.plainMeaning}</p>
              </div>

              {/* Formula */}
              <div className="rounded-lg p-4 border" style={{ borderColor: `${suitInfo.color}40`, background: `${suitInfo.color}08` }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: suitInfo.color }}>Формула недели</div>
                <p className="text-[#e8e8ec] text-sm font-medium">{week.shortFormula}</p>
              </div>

              {/* Action Mode */}
              <div className="rounded-lg border border-[#22222a] bg-[#0f0f12] p-4 space-y-2">
                <div className="text-xs text-[#555560] uppercase tracking-wider mb-2">Действие по энергии</div>
                <div className="grid gap-2">
                  <div className="flex gap-3 rounded bg-[#1a1a20] p-2">
                    <span className="text-[#888892] text-xs font-mono shrink-0 w-20">Минимум</span>
                    <span className="text-[#c8c8cc] text-sm">{week.dailyMinimum}</span>
                  </div>
                  <div className="flex gap-3 rounded bg-[#1a1a20] p-2">
                    <span className="text-[#e8e8ec] text-xs font-mono shrink-0 w-20">Нормально</span>
                    <span className="text-[#e8e8ec] text-sm">{week.dailyNormal}</span>
                  </div>
                  <div className="flex gap-3 rounded bg-[#1a1a20] p-2">
                    <span className="text-[#C89B3C] text-xs font-mono shrink-0 w-20">Максимум</span>
                    <span className="text-[#c8c8cc] text-sm">{week.dailyMaximum}</span>
                  </div>
                </div>
              </div>

              {/* Main question */}
              <div className="rounded-lg bg-[#1a1a20] border border-[#2a2a32] p-4">
                <div className="text-xs text-[#555560] uppercase tracking-wider mb-1">Главный вопрос недели</div>
                <p className="text-[#e8e8ec] font-medium">{week.mainQuestion}</p>
              </div>
            </div>

            {/* Moon */}
            <MoonModeCard mode={week.moonMode} />

            {/* 5 weekly actions */}
            <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
              <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">5 действий недели</div>
              <div className="space-y-2">
                {week.weeklyActions.map((a, i) => (
                  <div key={i} className="flex gap-2 text-sm text-[#c8c8cc]">
                    <span className="text-[#555560] font-mono shrink-0">{i + 1}.</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 daily actions */}
            <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
              <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">3 действия дня</div>
              <div className="space-y-2">
                {week.dailyActions.map((a, i) => (
                  <div key={i} className="flex gap-2 text-sm text-[#c8c8cc]">
                    <span className="text-[#555560] font-mono shrink-0">{i + 1}.</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid */}
            <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
              <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">Что не делать</div>
              <div className="flex gap-2 flex-wrap">
                {week.avoid.map((a, i) => (
                  <span key={i} className="text-sm px-3 py-1.5 rounded-md bg-[#0f0f12] border border-[#22222a] text-[#888892]">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Scorecard */}
            <Scorecard week={week} />

            {/* Week result */}
            <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
              <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">Как понять, что неделя прошла хорошо</div>
              <div className="space-y-2">
                {week.weekResult.map((r, i) => (
                  <div key={i} className="flex gap-2 text-sm text-[#c8c8cc]">
                    <span className="text-[#C89B3C] shrink-0">✓</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening question */}
            <div className="rounded-xl bg-[#1a1a20] border border-[#2a2a32] p-4">
              <div className="text-xs text-[#555560] uppercase tracking-wider mb-1">Вечерний вопрос</div>
              <p className="text-[#e8e8ec] text-sm italic">{week.eveningQuestion}</p>
            </div>

            {/* What to record */}
            <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
              <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">Что зафиксировать</div>
              <div className="flex gap-2 flex-wrap">
                {week.whatToRecord.map((r, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#0f0f12] border border-[#22222a] text-[#888892]">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              <Link href="/" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
                ← Сегодня
              </Link>
              <Link href="/cycle" className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors">
                Цикл →
              </Link>
            </div>
          </>
        );
      })()}
    </div>
  );
}