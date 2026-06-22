interface Props {
  date: string;
}

export default function TestDateBanner({ date }: Props) {
  return (
    <div className="rounded-lg bg-[#C89B3C]/10 border border-[#C89B3C]/30 px-4 py-2 mb-4 text-sm text-[#C89B3C]">
      ⚙ Тестовый режим даты: {date}
    </div>
  );
}