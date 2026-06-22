import { MOON_MODES, type MoonMode } from "@/lib/cycle13-data";

interface Props {
  mode: MoonMode;
}

export default function MoonModeCard({ mode }: Props) {
  const moon = MOON_MODES[mode];
  return (
    <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{moon.emoji}</span>
        <div>
          <div className="text-xs text-[#555560] uppercase tracking-wider">Лунный режим</div>
          <div className="text-[#e8e8ec] font-medium">{moon.name}</div>
        </div>
      </div>
      <p className="text-sm text-[#c8c8cc] mb-2">{moon.meaning}</p>
      <p className="text-sm text-[#888892]">
        <span className="text-[#555560]">Что делать: </span>
        {moon.action}
      </p>
    </div>
  );
}