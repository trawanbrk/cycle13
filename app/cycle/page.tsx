import AppShell from "@/components/AppShell";
import CycleCard from "@/components/CycleCard";
import { getCurrentCycleContext } from "@/lib/cycle";

export const metadata = {
  title: "Текущий цикл - Cycle OS",
  description: "Текущий 28-дневный цикл: 4 недели по мастям.",
};

export default function CyclePage() {
  const ctx = getCurrentCycleContext(new Date());

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Текущий цикл</h1>
          <p className="text-[#888892] text-sm">
            4 недели цикла: Пики &rarr; Черви &rarr; Трефы &rarr; Бубны.
          </p>
        </div>
        <CycleCard ctx={ctx} />
      </div>
    </AppShell>
  );
}