"use client";

import { useState, useEffect } from "react";
import {
  getCheckIn,
  saveCheckIn,
  deleteCheckIn,
  getLast7DaysCheckIns,
  isLocalStorageAvailable,
  type DailyCheckIn,
} from "@/lib/checkin";

interface Props {
  date: string;
  weekId: string;
  card: string;
  eveningQuestion: string;
}

export default function DailyCheckIn({ date, weekId, card, eveningQuestion }: Props) {
  const [checkIn, setCheckIn] = useState<DailyCheckIn | null>(null);
  const [min, setMin] = useState(false);
  const [main, setMain] = useState(false);
  const [evening, setEvening] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [history, setHistory] = useState<DailyCheckIn[]>([]);

  useEffect(() => {
    const ok = isLocalStorageAvailable();
    setStorageOk(ok);
    if (!ok) return;

    const existing = getCheckIn(date);
    if (existing) {
      setMin(existing.completedMinimum);
      setMain(existing.completedMainAction);
      setEvening(existing.answeredEveningQuestion);
      setNote(existing.note || "");
    } else {
      setMin(false);
      setMain(false);
      setEvening(false);
      setNote("");
    }
    setHistory(getLast7DaysCheckIns());
  }, [date]);

  function handleSave() {
    if (!storageOk) return;
    const now = new Date().toISOString();
    const ci: DailyCheckIn = {
      date,
      weekId,
      card,
      completedMinimum: min,
      completedMainAction: main,
      answeredEveningQuestion: evening,
      note: note.trim() || undefined,
      createdAt: checkIn?.createdAt || now,
      updatedAt: now,
    };
    saveCheckIn(ci);
    setCheckIn(ci);
    setSaved(true);
    setHistory(getLast7DaysCheckIns());
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClear() {
    if (!storageOk) return;
    deleteCheckIn(date);
    setMin(false);
    setMain(false);
    setEvening(false);
    setNote("");
    setCheckIn(null);
    setHistory(getLast7DaysCheckIns());
  }

  function handleCopy() {
    const lines: string[] = [];
    lines.push(`=== Cycle13 — итог дня ${date} ===`);
    lines.push(`Карта: ${card}`);
    lines.push(`Минимум: ${min ? "✓" : "✗"}`);
    lines.push(`Главное действие: ${main ? "✓" : "✗"}`);
    lines.push(`Вечерний вопрос: ${evening ? "✓" : "✗"}`);
    if (note) lines.push(`Заметка: ${note}`);
    lines.push(eveningQuestion);
    const text = lines.join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
  }

  if (!storageOk) {
    return (
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 text-center">
        <p className="text-[#888892] text-sm">
          Чек-ин недоступен в этом браузере, но ты можешь скопировать итог вручную.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Check-in */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 space-y-4">
        <div className="text-xs text-[#555560] uppercase tracking-wider">Отметь день</div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={min}
              onChange={(e) => setMin(e.target.checked)}
              className="w-4 h-4 accent-[#C89B3C] rounded"
            />
            <span className="text-sm text-[#c8c8cc]">Сделал минимум дня</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={main}
              onChange={(e) => setMain(e.target.checked)}
              className="w-4 h-4 accent-[#C89B3C] rounded"
            />
            <span className="text-sm text-[#c8c8cc]">Сделал главное действие</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={evening}
              onChange={(e) => setEvening(e.target.checked)}
              className="w-4 h-4 accent-[#C89B3C] rounded"
            />
            <span className="text-sm text-[#c8c8cc]">Ответил на вечерний вопрос</span>
          </label>
        </div>

        {/* Evening question */}
        <div className="rounded-lg bg-[#0f0f12] border border-[#22222a] p-3">
          <div className="text-xs text-[#555560] mb-1">Вечерний вопрос</div>
          <p className="text-[#e8e8ec] text-sm italic">{eveningQuestion}</p>
        </div>

        {/* Note */}
        <div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Короткий итог дня..."
            className="w-full rounded-lg bg-[#0f0f12] border border-[#22222a] p-3 text-sm text-[#e8e8ec] placeholder-[#555560] resize-none focus:outline-none focus:border-[#C89B3C]/40"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#C89B3C] text-[#0f0f12] text-sm font-medium hover:bg-[#d4a94a] transition-colors"
          >
            {saved ? "✓ Сохранено" : "Сохранить локально"}
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg border border-[#2a2a32] text-[#888892] text-sm hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors"
          >
            Скопировать итог
          </button>
          {checkIn && (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg border border-[#2a2a32] text-[#555560] text-sm hover:text-[#888892] transition-colors"
            >
              Очистить
            </button>
          )}
        </div>

        <p className="text-xs text-[#555560]">
          Данные сохраняются только в браузере на этом устройстве. Без аккаунта и сервера.
        </p>
        <p className="text-[#555560] text-xs">Лучше короткий честный итог, чем идеальная запись.</p>
      </div>

      {/* History */}
      {history.length > 0 ? (
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-[#555560] uppercase tracking-wider">Последние 7 дней</div>
            <span className="text-[#555560] text-xs">История хранится только на этом устройстве</span>
          </div>
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.date} className="flex items-center gap-3 text-sm">
                <span className="text-[#555560] font-mono text-xs shrink-0">{h.date.slice(5)}</span>
                <span className="text-[#e8e8ec] font-mono shrink-0">{h.card}</span>
                <span className="text-[#888892] text-xs flex-1 truncate">
                  {h.note || `${h.completedMinimum ? "✓" : "—"} ${h.completedMainAction ? "✓" : "—"} ${h.answeredEveningQuestion ? "✓" : "—"}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5 text-center">
          <p className="text-[#555560] text-sm">История появится после первого сохранённого чек-ина.</p>
        </div>
      )}
    </div>
  );
}