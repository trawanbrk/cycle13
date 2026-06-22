import { SUITS } from "@/lib/constants";
import { MOON_MODES, type Cycle13Week, getDayOfWeek, getProgress } from "@/lib/cycle13-data";
import DailyCheckIn from "@/components/DailyCheckIn";

interface Props {
  week: Cycle13Week;
  date: Date;
  dateString: string;
  isJoker?: boolean;
}

export default function TodayCard({ week, date, dateString, isJoker }: Props) {
  const suitInfo = SUITS[week.weekIndexInCycle];
  const moon = MOON_MODES[week.moonMode];
  const progress = getProgress(date);
  const dayName = getDayOfWeek(date);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#2a2a32] bg-gradient-to-b from-[#1a1a20] to-[#15151a] p-5 sm:p-7 space-y-4">
        {/* Header: date + day */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-[#888892] text-sm">
            Сегодня: <span className="text-[#e8e8ec] font-mono">{dateString}</span>
            <span className="text-[#555560] ml-2">{dayName}</span>
          </div>
          {!isJoker && (
            <div className="flex gap-3 text-xs text-[#555560]">
              <span>День недели: <span className="text-[#888892]">{progress.dayInWeek} из 7</span></span>
              <span>День цикла: <span className="text-[#888892]">{progress.dayInCycle} из 28</span></span>
            </div>
          )}
        </div>

        {/* Card + Moon row */}
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="text-5xl sm:text-6xl font-bold leading-none" style={{ color: suitInfo.color }}>
              {week.card}
            </div>
            <div>
              <div className="text-xs text-[#555560] uppercase tracking-wider">Карта недели</div>
              <div className="text-[#e8e8ec] font-medium">{week.rank} {suitInfo.name.toLowerCase()}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-3xl">{moon.emoji}</div>
            <div>
              <div className="text-xs text-[#555560] uppercase tracking-wider">Лунный режим</div>
              <div className="text-[#e8e8ec] text-sm">{moon.name}</div>
            </div>
          </div>
        </div>

        {/* Cycle info */}
        <div className="flex gap-4 text-sm flex-wrap">
          <div><span className="text-[#555560]">Цикл года </span><span className="text-[#e8e8ec] font-mono">{week.cycleNumber} из 13</span></div>
          <div><span className="text-[#555560]">Неделя цикла </span><span className="text-[#e8e8ec] font-mono">{week.weekIndexInCycle} из 4</span></div>
          <div><span className="text-[#555560]">Масть </span><span className="text-[#e8e8ec]">{suitInfo.name}</span></div>
        </div>
      </div>

      {/* Formula Card */}
      <div className="rounded-xl p-4 border" style={{ borderColor: `${suitInfo.color}40`, background: `${suitInfo.color}08` }}>
        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: suitInfo.color }}>
          Формула недели
        </div>
        <p className="text-[#e8e8ec] text-sm font-medium">{week.shortFormula}</p>
      </div>

      {/* Plain meaning */}
      <div className="rounded-lg bg-[#0f0f12] border border-[#22222a] p-4">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-1">Простыми словами</div>
        <p className="text-[#c8c8cc] text-sm leading-relaxed">{week.plainMeaning}</p>
      </div>

      {/* Action Mode */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 space-y-3">
        <div className="text-xs text-[#555560] uppercase tracking-wider">Действие дня по энергии</div>
        <div className="grid gap-2">
          <div className="flex gap-3 rounded-lg bg-[#0f0f12] p-3">
            <span className="text-[#888892] text-xs font-mono shrink-0 w-20">Минимум</span>
            <span className="text-[#c8c8cc] text-sm">{week.dailyMinimum}</span>
          </div>
          <div className="flex gap-3 rounded-lg bg-[#0f0f12] p-3">
            <span className="text-[#e8e8ec] text-xs font-mono shrink-0 w-20">Нормально</span>
            <span className="text-[#e8e8ec] text-sm">{week.dailyNormal}</span>
          </div>
          <div className="flex gap-3 rounded-lg bg-[#0f0f12] p-3">
            <span className="text-[#C89B3C] text-xs font-mono shrink-0 w-20">Максимум</span>
            <span className="text-[#c8c8cc] text-sm">{week.dailyMaximum}</span>
          </div>
        </div>
      </div>

      {/* 3 daily actions */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">3 действия на сегодня</div>
        <div className="space-y-2">
          {week.dailyActions.map((a, i) => (
            <div key={i} className="flex gap-2 text-sm text-[#c8c8cc]">
              <span className="text-[#555560] font-mono shrink-0">{i + 1}.</span>
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What not to do */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">Что не делать</div>
        <div className="flex gap-2 flex-wrap">
          {week.avoid.map((a, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-md bg-[#0f0f12] border border-[#22222a] text-[#888892]">
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Evening check-in */}
      <DailyCheckIn
        date={dateString}
        weekId={week.id}
        card={week.card}
        eveningQuestion={week.eveningQuestion}
      />

      {/* What to record */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-2">Что зафиксировать</div>
        <div className="flex gap-2 flex-wrap">
          {week.whatToRecord.map((r, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#0f0f12] border border-[#22222a] text-[#888892]">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}