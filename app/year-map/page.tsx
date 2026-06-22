import AppShell from "@/components/AppShell";
import YearMapTable from "@/components/YearMapTable";

export const metadata = {
  title: "Карта года - Cycle OS",
  description: "13 циклов года: даты, карты, темы и статусы.",
};

export default function YearMapPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Карта года</h1>
          <p className="text-[#888892] text-sm">
            13 циклов &times; 28 дней = 52 недели. Старт: 29.12.2025.
          </p>
        </div>
        <YearMapTable />
        <div className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4 text-sm text-[#888892]">
          <span className="text-[#555560]">Прогресс года:</span> 13 циклов
          покрывают 364 дня. Джокер-неделя (28.12.2026 &mdash; 03.01.2027) &mdash;
          неделя ревизии и обнуления. Новый цикл начинается 04.01.2027.
        </div>
      </div>
    </AppShell>
  );
}