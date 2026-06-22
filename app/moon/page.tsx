import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import AppShell from "@/components/AppShell";
import { MOON_MODES } from "@/lib/cycle13-data";

export const metadata: Metadata = {
  title: `${SEO.title} — Луна`,
  description: "Лунный ритм как режим движения: новолуние, растущая, полнолуние, убывающая.",
};

export default function MoonPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">Луна</h1>
        <p className="text-[#888892] text-sm">
          Луна в Cycle13 не предсказывает события. Она задаёт режим внимания: начать, усилить, проявить или завершить.
        </p>

        <div className="space-y-3">
          {Object.entries(MOON_MODES).map(([key, moon]) => (
            <div key={key} className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{moon.emoji}</span>
                <div>
                  <div className="text-[#e8e8ec] font-medium text-lg">{moon.name}</div>
                  <div className="text-[#888892] text-sm">{moon.meaning}</div>
                </div>
              </div>
              <div className="text-sm text-[#c8c8cc]">
                <span className="text-[#555560]">Что делать: </span>
                {moon.action}
              </div>
            </div>
          ))}
        </div>

        {/* Connection to suits */}
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
          <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">Связь луны и мастей</div>
          <div className="space-y-2 text-sm text-[#c8c8cc]">
            <div><span className="text-[#6B7B9E]">Новолуние → Пики → </span>очистить</div>
            <div><span className="text-[#B8453A]">Растущая луна → Черви → </span>соединить / зарядить</div>
            <div><span className="text-[#3A8B5A]">Полнолуние → Трефы → </span>сделать / проявить</div>
            <div><span className="text-[#C89B3C]">Убывающая луна → Бубны → </span>получить результат / завершить</div>
          </div>
        </div>

        {/* Why moon and suit may not match */}
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
          <div className="text-xs text-[#555560] uppercase tracking-wider mb-2">Почему фаза и масть могут не совпадать</div>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            Масти и луна — это два разных слоя. Масть задаёт недельную сферу внутри 28-дневного цикла.
            Лунная фаза задаёт текущий режим движения. Они не обязаны совпадать один к одному.
            Cycle13 соединяет оба слоя: например, Черви могут идти в режиме убывающей луны —
            тогда фокус людей и доверия проходит через завершение, очистку, выводы и закрытие подвисших разговоров.
          </p>
        </div>

        <div className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4">
          <p className="text-[#555560] text-xs leading-relaxed">
            Лунный слой используется как ритм рефлексии и планирования, а не как точный астрономический
            или предсказательный инструмент. Расчёт фазы — приблизительный.
          </p>
        </div>
      </div>
    </AppShell>
  );
}