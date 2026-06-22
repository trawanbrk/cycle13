import AppShell from "@/components/AppShell";

export const metadata = {
  title: "О проекте - Cycle OS",
  description:
    "Cycle OS - авторская символико-операционная модель для структурирования недели через фокус, действия и результат.",
};

export default function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold mb-1">О проекте</h1>
          <p className="text-[#888892] text-sm">
            Cycle OS &mdash; открытая операционная карта года.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 space-y-3">
          <h2 className="text-lg font-bold">Что такое Cycle OS</h2>
          <p className="text-[#888892] text-sm">
            Cycle OS &mdash; авторская символико-операционная карта года через 13
            циклов, 52 недели, 4 фазы и символику колоды. Её задача &mdash; дать
            недельный ритм фокуса, действий и результата.
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 space-y-3">
          <h2 className="text-lg font-bold">Зачем использовать</h2>
          <p className="text-[#888892] text-sm">
            Сайт даёт практический ответ на вопрос: «Где мы сейчас в цикле года и
            что конкретно делать на этой неделе?»
          </p>
          <div className="text-sm text-[#888892]">
            Формула применения:
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 rounded bg-[#0f0f12] border border-[#2a2a32] text-[#e8e8ec]">
                неделя
              </span>
              <span className="text-[#555560]">&rarr;</span>
              <span className="px-2 py-1 rounded bg-[#0f0f12] border border-[#2a2a32] text-[#e8e8ec]">
                фокус
              </span>
              <span className="text-[#555560]">&rarr;</span>
              <span className="px-2 py-1 rounded bg-[#0f0f12] border border-[#2a2a32] text-[#e8e8ec]">
                действия
              </span>
              <span className="text-[#555560]">&rarr;</span>
              <span className="px-2 py-1 rounded bg-[#0f0f12] border border-[#2a2a32] text-[#e8e8ec]">
                итог
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 space-y-3">
          <h2 className="text-lg font-bold">Почему старт 29.12.2025</h2>
          <p className="text-[#888892] text-sm">
            29 декабря 2025 года &mdash; понедельник, старт первой полной недели
            вокруг 1 января 2026. Это фиксированный авторский якорь системы. Дату
            старта нельзя изменить через интерфейс &mdash; она жёстко зафиксирована
            в коде.
          </p>
        </div>

        <div className="rounded-xl border border-[#C89B3C]/30 bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] p-5 space-y-3">
          <h2 className="text-lg font-bold text-[#C89B3C]">Дисклеймер</h2>
          <p className="text-[#888892] text-sm">
            Cycle OS &mdash; авторская символико-операционная модель. Она не
            является научным, религиозным, историческим или предсказательным
            стандартом. Её задача &mdash; помочь структурировать неделю через
            фокус, действия и результат.
          </p>
          <div className="pt-2 border-t border-[#2a2a32] text-xs text-[#555560]">
            Это не гадание. Это не древняя система. Это не предсказание. Это
            операционная карта недели.
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 space-y-3">
          <h2 className="text-lg font-bold">Roadmap</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-[#C89B3C] font-mono text-xs">v1.1</span>
              <span className="text-[#888892] ml-2">
                улучшенные локальные заметки, история недель, печатная версия
              </span>
            </div>
            <div>
              <span className="text-[#C89B3C] font-mono text-xs">v1.2</span>
              <span className="text-[#888892] ml-2">
                AI Week Architect, генерация плана недели по карте
              </span>
            </div>
            <div>
              <span className="text-[#C89B3C] font-mono text-xs">v1.3</span>
              <span className="text-[#888892] ml-2">
                приватный личный кабинет, база данных, личные планы
              </span>
            </div>
            <div>
              <span className="text-[#C89B3C] font-mono text-xs">v1.4</span>
              <span className="text-[#888892] ml-2">
                публичный SaaS, подписка, разные режимы
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}