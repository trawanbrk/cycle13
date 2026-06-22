"use client";

import { useState, useEffect } from "react";

export default function FocusNote({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (note: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    onSave(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
      <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
        Мой фокус недели
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Запишите 1 короткую формулировку вашего фокуса на эту неделю..."
        className="w-full bg-[#0f0f12] border border-[#2a2a32] rounded-lg p-3 text-sm text-[#e8e8ec] placeholder:text-[#555560] resize-none focus:outline-none focus:border-[#3a3a42]"
        rows={2}
      />
      <button
        onClick={handleSave}
        className="mt-2 px-3 py-1.5 rounded-lg text-xs bg-[#22222a] border border-[#2a2a32] text-[#e8e8ec] hover:bg-[#2a2a32] transition-colors"
      >
        {saved ? "✓ Сохранено" : "Сохранить"}
      </button>
    </div>
  );
}