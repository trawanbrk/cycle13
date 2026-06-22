import { getYearMap } from "@/lib/cycle";

export default function YearMapTable({ referenceDate }: { referenceDate?: Date }) {
  const map = getYearMap(referenceDate);

  const statusStyles: Record<string, string> = {
    past: "text-[#555560]",
    current: "text-[#C89B3C] font-bold",
    future: "text-[#888892]",
  };

  const statusLabels: Record<string, string> = {
    past: "прошёл",
    current: "текущий",
    future: "будущий",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#2a2a32] bg-[#1a1a20]">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-[#2a2a32] text-[#555560] text-xs uppercase tracking-wider">
            <th className="text-left px-4 py-3">Цикл</th>
            <th className="text-left px-4 py-3">Карта</th>
            <th className="text-left px-4 py-3">Тема</th>
            <th className="text-left px-4 py-3">Даты</th>
            <th className="text-left px-4 py-3">Статус</th>
          </tr>
        </thead>
        <tbody>
          {map.map((entry) => (
            <tr
              key={entry.cycleNumber}
              className={`border-b border-[#2a2a32] last:border-0 ${
                entry.status === "current" ? "bg-[#22222a]/50" : ""
              }`}
            >
              <td className="px-4 py-3 font-mono text-[#e8e8ec]">
                {entry.cycleNumber}
              </td>
              <td className="px-4 py-3 text-[#e8e8ec]">{entry.rankName}</td>
              <td className="px-4 py-3 text-[#888892] text-xs">
                {entry.rankMeaning}
              </td>
              <td className="px-4 py-3 text-[#888892] text-xs font-mono">
                {entry.startDate} &mdash; {entry.endDate}
              </td>
              <td className={`px-4 py-3 text-xs ${statusStyles[entry.status]}`}>
                {statusLabels[entry.status]}
              </td>
            </tr>
          ))}
          {/* Joker Week */}
          <tr className="border-t-2 border-[#2a2a32] bg-[#0f0f12]">
            <td className="px-4 py-3 font-mono">
              <span className="text-[#888892]">★</span>
            </td>
            <td className="px-4 py-3 text-[#888892]">Джокер</td>
            <td className="px-4 py-3 text-[#555560] text-xs">
              Ревизия, обнуление, сборка года
            </td>
            <td className="px-4 py-3 text-[#888892] text-xs font-mono">
              2026-12-28 &mdash; 2027-01-03
            </td>
            <td className="px-4 py-3 text-[#555560] text-xs">special</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}