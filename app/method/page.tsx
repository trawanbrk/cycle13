import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import AppShell from "@/components/AppShell";
import { SUITS, RANKS } from "@/lib/constants";
import { MOON_MODES } from "@/lib/cycle13-data";

export const metadata: Metadata = {
  title: `${SEO.title} — Метод`,
  description: "Как работает Cycle13: 13 циклов, 52 карты, лунный ритм и действия дня.",
};

export default function MethodPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">Метод</h1>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Что такое Cycle13</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            Cycle13 — календарь фокуса, который соединяет карты, лунный ритм и конкретные действия дня.
            Обычный календарь показывает дату. Cycle13 показывает фокус, режим и действие.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Почему 13 циклов</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            13 циклов × 28 дней = 364 дня. Это близко к длине года и даёт ритм: каждый цикл —
            отдельная большая тема от старта до завершения. 13-й цикл заканчивает год, после него идёт Джокер-неделя ревизии.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Почему 28 дней</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            28 дней = 4 недели. Каждая неделя внутри цикла имеет свою масть и свою задачу:
            очистить → соединить → сделать → получить результат.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Почему 52 недели</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            В колоде 52 карты. В году 52 недели. Каждая неделя — своя карта.
            Номинал карты = номер цикла, масть = фаза внутри цикла.
          </p>
        </section>

        {/* Suits */}
        <section className="space-y-3">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Масти</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.values(SUITS).map((suit) => (
              <div key={suit.id} className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl" style={{ color: suit.color }}>{suit.symbol}</span>
                  <span className="text-[#e8e8ec] font-medium">{suit.name}</span>
                </div>
                <div className="text-[#888892] text-sm">{suit.meaning}</div>
                <div className="text-[#555560] text-xs mt-1">{suit.keywords.join(", ")}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Ranks */}
        <section className="space-y-3">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Номиналы</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {RANKS.map((rank) => (
              <div key={rank.id} className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3 flex items-center gap-3">
                <span className="text-lg font-bold text-[#C89B3C] w-8 text-center">{rank.shortName}</span>
                <div>
                  <div className="text-[#e8e8ec] text-sm font-medium">{rank.name}</div>
                  <div className="text-[#555560] text-xs">{rank.meaning}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Moon */}
        <section className="space-y-3">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Лунный ритм</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            Луна задаёт режим движения. Это не предсказание — это ритм рефлексии и планирования.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(MOON_MODES).map(([key, moon]) => (
              <div key={key} className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{moon.emoji}</span>
                  <span className="text-[#e8e8ec] text-sm font-medium">{moon.name}</span>
                </div>
                <div className="text-[#888892] text-xs">{moon.meaning}</div>
                <div className="text-[#555560] text-xs mt-1">{moon.action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Как пользоваться за 5 минут в день</h2>
          <div className="space-y-2 text-sm text-[#c8c8cc]">
            <div className="flex gap-2"><span className="text-[#C89B3C] font-mono">1.</span>Открой главную — увидь карту недели и лунный режим.</div>
            <div className="flex gap-2"><span className="text-[#C89B3C] font-mono">2.</span>Прочитай смысл недели простыми словами.</div>
            <div className="flex gap-2"><span className="text-[#C89B3C] font-mono">3.</span>Выбери 1 действие дня и сделай его.</div>
            <div className="flex gap-2"><span className="text-[#C89B3C] font-mono">4.</span>Вечером ответь на вечерний вопрос.</div>
            <div className="flex gap-2"><span className="text-[#C89B3C] font-mono">5.</span>Зафиксируй, что получилось и что нет.</div>
          </div>
        </section>

        {/* Formula */}
        <section className="rounded-xl border border-[#C89B3C]/30 bg-[#1a1a20] p-5 text-center">
          <div className="text-[#e8e8ec] text-lg font-medium">
            Карта → тема недели. Луна → режим движения. Действия → что сделать. Итог → что зафиксировать.
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4">
          <p className="text-[#555560] text-xs leading-relaxed">
            Cycle13 — авторская символико-операционная модель. Она не является научным, религиозным,
            историческим или предсказательным стандартом. Её задача — помочь структурировать неделю
            через фокус, действия и результат. Лунный слой используется как ритм рефлексии и планирования,
            а не как точный астрономический или предсказательный инструмент.
          </p>
        </section>
      </div>
    </AppShell>
  );
}