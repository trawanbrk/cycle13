import AppShell from "@/components/AppShell";
import { getMoonPhase, getMoonLayerForWeek, type MoonPhase } from "@/lib/moon";
import { getCurrentCycleContext } from "@/lib/cycle";

export const metadata = {
  title: "Лунный ритм - Cycle OS",
  description: "Природный слой ритма: 4 фазы Луны и их связь с системой.",
};

const phaseDetails: Record<MoonPhase, { title: string; desc: string }> = {
  new: {
    title: "Новолуние",
    desc: "Начало, тишина, семя, обнуление. Время заложить основу для нового цикла. Связано с Пиками — очищением и подготовкой пространства.",
  },
  waxing: {
    title: "Растущая Луна",
    desc: "Набор энергии, желание, связь, притяжение. Время соединяться с людьми и собирать ресурс. Связано с Червами — людьми, энергией, доверием.",
  },
  full: {
    title: "Полнолуние",
    desc: "Пик, проявление, максимум энергии. Время действовать и проявлять. Связано с Трефами — действиями, работой, запуском.",
  },
  waning: {
    title: "Убывающая Луна",
    desc: "Спад, сбор, выводы, освобождение. Время собирать урожай и подводить итоги. Связано с Бубнами — результатом, метриками, выводами.",
  },
};

export default function MoonPage() {
  const now = new Date();
  const moon = getMoonPhase(now);
  const ctx = getCurrentCycleContext(now);
  const layer = getMoonLayerForWeek(moon.phase, ctx.suitInfo?.meaning || "");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Лунный ритм</h1>
          <p className="text-[#888892] text-sm">
            Дополнительный природный слой ритма. Не предсказание &mdash; метафора.
          </p>
        </div>

        {/* Current phase */}
        <div className="rounded-2xl border border-[#2a2a32] bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] p-8 text-center">
          <div className="text-6xl mb-4">{moon.emoji}</div>
          <div className="text-2xl font-bold mb-2">{moon.name}</div>
          <div className="text-[#888892] max-w-md mx-auto mb-3">
            {moon.meaning}
          </div>
          {layer && (
            <div className="text-sm text-[#555560] mt-3 pt-3 border-t border-[#2a2a32]">
              {layer}
            </div>
          )}
          {moon.approximate && (
            <div className="mt-2 text-xs text-[#555560]">
              * Приближённый расчёт фазы Луны
            </div>
          )}
        </div>

        {/* Connection */}
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
          <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
            Связь с системой
          </div>
          <div className="space-y-2 text-sm text-[#888892]">
            <p>
              <span className="text-[#e8e8ec]">Новолуние</span> &rarr; Пики &rarr;
              очистить
            </p>
            <p>
              <span className="text-[#e8e8ec]">Растущая Луна</span> &rarr; Черви
              &rarr; соединить / зарядить
            </p>
            <p>
              <span className="text-[#e8e8ec]">Полнолуние</span> &rarr; Треф &rarr;
              сделать / проявить
            </p>
            <p>
              <span className="text-[#e8e8ec]">Убывающая Луна</span> &rarr; Бубны
              &rarr; получить результат / завершить
            </p>
          </div>
        </div>

        {/* 4 phases */}
        <div className="grid sm:grid-cols-2 gap-3">
          {(["new", "waxing", "full", "waning"] as MoonPhase[]).map((phase) => {
            const detail = phaseDetails[phase];
            const info = getMoonPhase(
              phase === "new"
                ? new Date(2026, 1, 28)
                : phase === "waxing"
                ? new Date(2026, 2, 5)
                : phase === "full"
                ? new Date(2026, 2, 13)
                : new Date(2026, 2, 20)
            );
            return (
              <div
                key={phase}
                className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{info.emoji}</span>
                  <div className="font-semibold text-[#e8e8ec]">
                    {detail.title}
                  </div>
                </div>
                <p className="text-sm text-[#888892]">{detail.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-[#2a2a32] bg-[#0f0f12] p-4 text-center text-sm text-[#555560]">
          Лунный цикл не всегда идеально совпадает с 28-дневным циклом системы.
          Лунный слой &mdash; это дополнительная природная метафора ритма, а не
          основа системы.
        </div>
      </div>
    </AppShell>
  );
}