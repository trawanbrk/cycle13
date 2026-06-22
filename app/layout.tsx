import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#0f0f12] text-[#e8e8ec] antialiased">
        {children}
      </body>
    </html>
  );
}