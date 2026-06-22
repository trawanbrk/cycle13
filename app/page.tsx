import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import AppShell from "@/components/AppShell";
import TodayContent from "@/components/TodayContent";

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: SEO.title,
  description: SEO.description,
  openGraph: {
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    type: "website",
    siteName: SEO.siteName,
    images: [{ url: SEO.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    images: [{ url: SEO.ogImage }],
  },
  icons: { icon: "/favicon.ico" },
};

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const testDate = params.date || null;

  return (
    <AppShell>
      <TodayContent testDate={testDate} />
    </AppShell>
  );
}