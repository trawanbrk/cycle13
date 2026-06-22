export default function TestDateBanner({ date }: { date: string }) {
  return (
    <div className="rounded-lg border border-[#C89B3C]/40 bg-[#C89B3C]/10 px-4 py-2.5 mb-4 flex items-center gap-2">
      <span className="text-[#C89B3C]">⚠</span>
      <span className="text-sm text-[#e8e8ec]">
        Тестовый режим даты: <strong>{date}</strong>
      </span>
    </div>
  );
}