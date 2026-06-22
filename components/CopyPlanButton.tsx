"use client";

import { useState } from "react";
import type { PlanContext } from "@/lib/export-plan";
import { copyWeeklyPlanToClipboard, downloadWeeklyPlanTxt } from "@/lib/export-plan";

export default function CopyPlanButton({ ctx }: { ctx: PlanContext }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyWeeklyPlanToClipboard(ctx);
    setCopied(ok);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleCopy}
        className="px-4 py-2 rounded-lg text-sm bg-[#22222a] border border-[#2a2a32] text-[#e8e8ec] hover:bg-[#2a2a32] transition-colors"
      >
        {copied ? "✓ Скопировано" : "📋 Скопировать план недели"}
      </button>
      <button
        onClick={() => downloadWeeklyPlanTxt(ctx)}
        className="px-4 py-2 rounded-lg text-sm bg-[#0f0f12] border border-[#2a2a32] text-[#888892] hover:text-[#e8e8ec] hover:border-[#3a3a42] transition-colors"
      >
        ⬇ Скачать TXT
      </button>
    </div>
  );
}