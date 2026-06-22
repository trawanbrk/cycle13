import AppShell from "@/components/AppShell";
import LogicBlock from "@/components/LogicBlock";
import SuitMeaningCard from "@/components/SuitMeaningCard";
import RankMeaningCard from "@/components/RankMeaningCard";

export const metadata = {
  title: "Логика системы - Cycle OS",
  description:
    "13 циклов, 28 дней, 4 недели, 4 масти. Формула: очистить, соединить, сделать, получить результат.",
};

export default function LogicPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Логика системы</h1>
          <p className="text-[#888892] text-sm">
            Почему 13 циклов, 28 дней и 4 недели. Как связаны колода и год.
          </p>
        </div>

        <LogicBlock />

        <div>
          <h2 className="text-lg font-bold mb-3">Масть недели</h2>
          <SuitMeaningCard />
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Номинал цикла</h2>
          <RankMeaningCard />
        </div>
      </div>
    </AppShell>
  );
}