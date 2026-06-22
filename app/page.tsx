"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import CurrentCard from "@/components/CurrentCard";
import ProgressBar from "@/components/ProgressBar";
import ModeSwitcher from "@/components/ModeSwitcher";
import WeeklyProtocolCard from "@/components/WeeklyProtocol";
import ActionChecklist from "@/components/ActionChecklist";
import FocusNote from "@/components/FocusNote";
import CopyPlanButton from "@/components/CopyPlanButton";
import TestDateBanner from "@/components/TestDateBanner";
import MoonPhaseBadge from "@/components/MoonPhaseBadge";
import Link from "next/link";
import { getCurrentCycleContext, type CycleContext } from "@/lib/cycle";
import { getWeeklyProtocol } from "@/lib/protocols";
import { getMoonPhase } from "@/lib/moon";
import type { Mode } from "@/lib/constants";
import {
  getSelectedMode,
  setSelectedMode,
  getFocusNote,
  setFocusNote,
  getChecklist,
  setChecklist,
} from "@/lib/storage";
import type { PlanContext } from "@/lib/export-plan";

function HomeContent() {
  const searchParams = useSearchParams();
  const testDate = searchParams.get("date");

  const [ctx, setCtx] = useState<CycleContext | null>(null);
  const [mode, setMode] = useState<Mode>("business");
  const [focusNote, setFocusNoteState] = useState("");
  const [checklist, setChecklistState] = useState([false, false, false]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const date = testDate ? new Date(testDate) : new Date();
    if (testDate && isNaN(date.getTime())) {
      // Invalid date param, use current date
      setCtx(getCurrentCycleContext(new Date()));
    } else {
      setCtx(getCurrentCycleContext(date));
    }

    const savedMode = getSelectedMode();
    if (savedMode) setMode(savedMode);

    setMounted(true);
  }, [testDate]);

  useEffect(() => {
    if (!ctx || ctx.isJoker) return;
    setFocusNoteState(getFocusNote(ctx.cardCode, ctx.weekStartStr));
    setChecklistState(getChecklist(ctx.cardCode, mode, ctx.weekStartStr));
  }, [ctx, mode]);

  if (!ctx) {
    return (
      <AppShell>
        <div className="text-center text-[#888892] py-20">Загрузка...</div>
      </AppShell>
    );
  }

  const protocol = ctx.isJoker
    ? null
    : getWeeklyProtocol(ctx.rank.id, ctx.suitInfo.id, mode, ctx.cardCode);

  const moon = getMoonPhase(ctx.date);

  const planCtx: PlanContext | null = protocol
    ? {
        dateString: ctx.dateString,
        cardCode: ctx.cardCode,
        cardName: ctx.cardName,
        cycleNumber: ctx.cycleNumber,
        weekNumber: String(ctx.weekNumber),
        weekStartStr: ctx.weekStartStr,
        weekEndStr: ctx.weekEndStr,
        mode,
        protocol,
        focusNote,
        checklist,
      }
    : null;

  return (
    <AppShell>
      <div className="space-y-6">
        {testDate && <TestDateBanner date={testDate} />}

        {/* Date */}
        <div className="text-[#888892] text-sm">
          Сегодня: <span className="text-[#e8e8ec] font-mono">{ctx.dateString}</span>
        </div>

        {/* Current card */}
        <CurrentCard ctx={ctx} />

        {/* Progress + Moon */}
        {!ctx.isJoker && (
          <div className="grid sm:grid-cols-2 gap-4">
            <ProgressBar ctx={ctx} />
            <MoonPhaseBadge date={ctx.date} />
          </div>
        )}

        {/* Main question */}
        {!ctx.isJoker && (
          <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
            <div className="text-xs text-[#555560] uppercase tracking-wider mb-2">
              Главный вопрос недели
            </div>
            <p className="text-lg text-[#e8e8ec] font-medium">
              {ctx.suitInfo.question}
            </p>
          </div>
        )}

        {/* Mode switcher */}
        {!ctx.isJoker && (
          <div className="space-y-2">
            <div className="text-xs text-[#555560] uppercase tracking-wider">
              Режим применения
            </div>
            <ModeSwitcher
              selectedMode={mode}
              onChange={(m) => {
                setMode(m);
                setSelectedMode(m);
              }}
            />
          </div>
        )}

        {/* Weekly protocol */}
        {!ctx.isJoker && protocol && (
          <WeeklyProtocolCard protocol={protocol} mode={mode} />
        )}

        {/* Checklist */}
        {!ctx.isJoker && protocol && (
          <ActionChecklist
            actions={protocol.actions}
            checklist={checklist}
            onChange={(cl) => {
              setChecklistState(cl);
              if (ctx) setChecklist(ctx.cardCode, mode, ctx.weekStartStr, cl);
            }}
          />
        )}

        {/* Focus note */}
        {!ctx.isJoker && (
          <FocusNote
            initialValue={focusNote}
            onSave={(note) => {
              setFocusNoteState(note);
              if (ctx) setFocusNote(ctx.cardCode, ctx.weekStartStr, note);
            }}
          />
        )}

        {/* Copy / Download */}
        {!ctx.isJoker && planCtx && <CopyPlanButton ctx={planCtx} />}

        {/* CTA */}
        <div className="grid sm:grid-cols-3 gap-3 pt-4">
          <Link
            href="/year-map"
            className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors"
          >
            📅 Карта года
          </Link>
          <Link
            href="/cycle"
            className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors"
          >
            🔄 Текущий цикл
          </Link>
          <Link
            href="/logic"
            className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4 text-center text-sm text-[#888892] hover:text-[#e8e8ec] hover:bg-[#22222a] transition-colors"
          >
            🧩 Логика системы
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="text-center text-[#888892] py-20">Загрузка...</div>
        </AppShell>
      }
    >
      <HomeContent />
    </Suspense>
  );
}