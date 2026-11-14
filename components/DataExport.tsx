"use client";

import { useState } from "react";

export default function DataExport() {
  const [message, setMessage] = useState("");
  async function download() {
    try {
      const entries: Record<string, string> = Object.create(null);
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("cycle13:")) {
          const value = localStorage.getItem(key);
          if (value !== null) entries[key] = value;
        }
      }
      if (!globalThis.crypto?.subtle) throw new Error("SHA-256 unavailable");
      const sortedEntries = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
      const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(sortedEntries)));
      const sha256 = [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, "0")).join("");
      const data = { format: "cycle13-localstorage-export", version: 1, sourceOrigin: location.origin, exportedAt: new Date().toISOString(), entries: sortedEntries, count: Object.keys(entries).length, sha256 };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "cycle13-backup.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      setMessage(`Подготовлен файл с ${Object.keys(entries).length} записями. Храни его в безопасном месте.`);
    } catch {
      setMessage("Не удалось подготовить файл. Проверь доступ браузера к локальному хранилищу.");
    }
  }
  return <section className="space-y-2"><h2 className="text-lg text-[#e8e8ec] font-medium">Резервная копия</h2><p className="text-[#c8c8cc] text-sm">Скачать записи Cycle13 с этого браузера для переноса. Файл содержит личные данные и не отправляется на сервер.</p><button type="button" onClick={download} className="rounded border border-[#C89B3C] px-4 py-2 text-[#e8e8ec]">Скачать JSON</button><p role="status" className="text-sm text-[#c8c8cc]">{message}</p></section>;
}
