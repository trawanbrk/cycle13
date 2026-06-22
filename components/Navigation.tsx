"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/year-map", label: "Карта года" },
  { href: "/cycle", label: "Текущий цикл" },
  { href: "/logic", label: "Логика" },
  { href: "/moon", label: "Лунный ритм" },
  { href: "/about", label: "О проекте" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#2a2a32] bg-[#0f0f12]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-[#C89B3C]">◈</span>
            <span>Cycle OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[#22222a] text-[#e8e8ec]"
                      : "text-[#888892] hover:text-[#e8e8ec] hover:bg-[#1a1a20]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {/* Mobile menu */}
          <details className="md:hidden">
            <summary className="cursor-pointer text-[#888892] text-sm px-2 py-1">
              Меню
            </summary>
            <div className="absolute top-14 left-0 right-0 bg-[#0f0f12] border-b border-[#2a2a32] py-2 px-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm ${
                      isActive
                        ? "bg-[#22222a] text-[#e8e8ec]"
                        : "text-[#888892] hover:text-[#e8e8ec] hover:bg-[#1a1a20]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}