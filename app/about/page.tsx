import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: `${SEO.title} — О проекте`,
  description: "Cycle13 — календарь фокуса для предпринимателей, создателей и людей в трансформации.",
};

export default function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e8e8ec] tracking-tight">О проекте</h1>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Что такое Cycle13</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            Cycle13 — календарь фокуса, который соединяет карты, лунный ритм и конкретные действия дня.
            Карта показывает тему недели. Луна показывает режим движения. Действия показывают, что сделать сегодня.
            Итог показывает, что зафиксировать.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Для чего он нужен</h2>
          <p className="text-[#c8c8cc] text-sm leading-relaxed">
            Чтобы не просто планировать задачи, а понимать контекст недели: в каком цикле ты находишься,
            какая тема работает, в каком режиме двигаться и что конкретно сделать сегодня.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Для кого</h2>
          <ul className="text-[#c8c8cc] text-sm space-y-1.5">
            <li className="flex gap-2"><span className="text-[#C89B3C]">•</span>Для тех, кто хочет лучше держать фокус</li>
            <li className="flex gap-2"><span className="text-[#C89B3C]">•</span>Для тех, кто любит недельное планирование</li>
            <li className="flex gap-2"><span className="text-[#C89B3C]">•</span>Для предпринимателей, создателей, специалистов</li>
            <li className="flex gap-2"><span className="text-[#C89B3C]">•</span>Для людей в личной трансформации</li>
            <li className="flex gap-2"><span className="text-[#C89B3C]">•</span>Для тех, кому нужен мягкий ритм действий, а не жёсткий таск-менеджер</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Чем это не является</h2>
          <ul className="text-[#c8c8cc] text-sm space-y-1.5">
            <li className="flex gap-2"><span className="text-[#888892]">✗</span>Не гадание</li>
            <li className="flex gap-2"><span className="text-[#888892]">✗</span>Не предсказание событий</li>
            <li className="flex gap-2"><span className="text-[#888892]">✗</span>Не религиозная система</li>
            <li className="flex gap-2"><span className="text-[#888892]">✗</span>Не медицинская рекомендация</li>
            <li className="flex gap-2"><span className="text-[#888892]">✗</span>Не финансовая рекомендация</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg text-[#e8e8ec] font-medium">Roadmap</h2>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2"><span className="text-[#C89B3C] font-mono shrink-0">v1.2</span><span className="text-[#c8c8cc]">карты + луна + действия</span></div>
            <div className="flex gap-2"><span className="text-[#888892] font-mono shrink-0">v1.3</span><span className="text-[#888892]">локальные заметки / итоги</span></div>
            <div className="flex gap-2"><span className="text-[#888892] font-mono shrink-0">v1.4</span><span className="text-[#888892]">режимы Life / Business / Creator / Founder</span></div>
            <div className="flex gap-2"><span className="text-[#888892] font-mono shrink-0">v1.5</span><span className="text-[#888892]">AI Week Architect</span></div>
            <div className="flex gap-2"><span className="text-[#888892] font-mono shrink-0">v2.0</span><span className="text-[#888892]">персональные сценарии</span></div>
          </div>
        </section>

        <section className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4">
          <p className="text-[#555560] text-xs leading-relaxed">
            Cycle13 — авторская символико-операционная модель. Она не является научным, религиозным,
            историческим или предсказательным стандартом. Её задача — помочь структурировать неделю
            через фокус, действия и результат.
          </p>
        </section>
      </div>
    </AppShell>
  );
}