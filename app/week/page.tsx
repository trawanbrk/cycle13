import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import AppShell from "@/components/AppShell";
import WeekContent from "@/components/WeekContent";

export const metadata: Metadata = {
  title: `${SEO.title} — Неделя`,
  description: "Текущая неделя: карта, лунный режим, действия, scorecard и рефлексия.",
};

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function WeekPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const testDate = params.date || null;
  return (
    <AppShell>
      <WeekContent testDate={testDate} />
    </AppShell>
  );
}