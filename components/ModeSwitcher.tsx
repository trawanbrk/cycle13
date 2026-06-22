"use client";

import { MODES, type Mode } from "@/lib/constants";

export default function ModeSwitcher({
  selectedMode,
  onChange,
}: {
  selectedMode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {MODES.map((mode) => {
        const isActive = mode.id === selectedMode;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
              isActive
                ? "bg-[#22222a] border-[#3a3a42] text-[#e8e8ec]"
                : "bg-[#0f0f12] border-[#2a2a32] text-[#888892] hover:text-[#e8e8ec] hover:border-[#3a3a42]"
            }`}
          >
            <span className="mr-1.5">{mode.icon}</span>
            {mode.name}
          </button>
        );
      })}
    </div>
  );
}