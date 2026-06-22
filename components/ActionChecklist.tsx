"use client";

import { useState } from "react";

export default function ActionChecklist({
  actions,
  checklist,
  onChange,
}: {
  actions: string[];
  checklist: boolean[];
  onChange: (checklist: boolean[]) => void;
}) {
  const [local, setLocal] = useState(checklist);

  const toggle = (i: number) => {
    const next = [...local];
    next[i] = !next[i];
    setLocal(next);
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
      <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
        Мини-чеклист
      </div>
      <div className="space-y-2">
        {actions.map((action, i) => (
          <label
            key={i}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                local[i]
                  ? "bg-[#3A8B5A] border-[#3A8B5A]"
                  : "border-[#2a2a32] group-hover:border-[#3a3a42]"
              }`}
            >
              {local[i] && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span
              className={`text-sm ${
                local[i] ? "text-[#555560] line-through" : "text-[#e8e8ec]"
              }`}
            >
              {action}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}