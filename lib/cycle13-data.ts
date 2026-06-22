// Cycle13 — Source of Truth: единая структура данных для 52 недель
import { SUITS, RANKS, type Suit, type RankInfo } from "./constants";
import { getMoonPhase } from "./moon";

// ── Types ──────────────────────────────────────────────

export type MoonMode = "new" | "waxing" | "full" | "waning";
export type WeekStatus = "past" | "active" | "future";

export interface ScorecardItem {
  metric: string;
  plan: string;
}

export interface Cycle13Week {
  id: string;
  cycleNumber: number;
  cycleRank: string;
  weekIndexInCycle: 1 | 2 | 3 | 4;
  globalWeekIndex: number;
  card: string;
  rank: string;
  suit: Suit;
  startDate: string;
  endDate: string;
  moonMode: MoonMode;
  status: WeekStatus;
  shortFocus: string;
  plainMeaning: string;
  mainQuestion: string;
  dailyMinimum: string;
  dailyActions: string[];
  weeklyActions: string[];
  avoid: string[];
  weekResult: string[];
  eveningQuestion: string;
  scorecard: ScorecardItem[];
}

// ── Moon modes — source of truth ─────────────────────

export const MOON_MODES: Record<MoonMode, { name: string; emoji: string; meaning: string; action: string; verbs: string[] }> = {
  new: {
    name: "Новолуние",
    emoji: "🌑",
    meaning: "старт, намерение, обнуление",
    action: "выбрать направление, начать мягко",
    verbs: ["выбрать", "начать", "сформулировать", "наметить", "обнулить"],
  },
  waxing: {
    name: "Растущая луна",
    emoji: "🌒",
    meaning: "усиление, рост, набор энергии",
    action: "развивать, добавлять, усиливать",
    verbs: ["усилить", "развить", "добавить", "нарастить", "продвинуть"],
  },
  full: {
    name: "Полнолуние",
    emoji: "🌕",
    meaning: "пик, проявление, ясность",
    action: "проявить, увидеть результат, принять решение",
    verbs: ["проявить", "увидеть", "принять решение", "показать", "собрать ясность"],
  },
  waning: {
    name: "Убывающая луна",
    emoji: "🌗",
    meaning: "завершение, очистка, выводы",
    action: "закрыть, отпустить, подвести итоги",
    verbs: ["закрыть", "отпустить", "завершить", "очистить", "подвести итог", "убрать лишнее"],
  },
};

// ── Scorecard templates by suit ───────────────────────

const SCORECARDS: Record<Suit, ScorecardItem[]> = {
  spades: [
    { metric: "Убранные хвосты", plan: "3" },
    { metric: "Принятые решения", plan: "2" },
    { metric: "Очищенные задачи", plan: "3" },
    { metric: "Отключённые лишние обязательства", plan: "1" },
    { metric: "Главный результат недели", plan: "1" },
  ],
  hearts: [
    { metric: "Осознанные контакты", plan: "3" },
    { metric: "Закрытые подвисшие разговоры", plan: "1–3" },
    { metric: "Контакты, которые усиливают", plan: "5" },
    { metric: "Источники эмоционального шума", plan: "3" },
    { metric: "Вечерние фиксации", plan: "5 дней" },
  ],
  clubs: [
    { metric: "Рабочие блоки сделаны", plan: "5" },
    { metric: "Обучение", plan: "1" },
    { metric: "Системные улучшения", plan: "1" },
    { metric: "Задачи с результатом", plan: "3" },
    { metric: "Главный результат недели", plan: "1" },
  ],
  diamonds: [
    { metric: "Деньги посчитаны", plan: "1" },
    { metric: "Результат зафиксирован", plan: "1" },
    { metric: "Закрытые дела", plan: "3" },
    { metric: "Решение: масштабировать / улучшить / закрыть", plan: "1" },
    { metric: "Главный результат недели", plan: "1" },
  ],
};

// ── Daily actions: suit × moon ────────────────────────

const DAILY_ACTIONS: Record<Suit, Record<MoonMode, string[]>> = {
  spades: {
    new: [
      "Наметь, что нужно убрать на этой неделе — составь список из 3 пунктов.",
      "Закрой одну маленькую задачу, которая висит уже больше недели.",
      "Запиши, что мешает прямо сейчас — один главный источник хаоса.",
    ],
    waxing: [
      "Убери одну лишнюю задачу из расписания сегодня.",
      "Откажись от одного обязательства, которое не даёт результата.",
      "Очисти один рабочий стол — файлы, вкладки, чаты.",
    ],
    full: [
      "Посмотри прямо на узкое место — что мешает движению сильнее всего.",
      "Прими одно решение по слабому направлению: закрыть, заморозить или оставить.",
      "Убери из календаря встречу или задачу, которая не двигает вперёд.",
    ],
    waning: [
      "Закрой один хвост, который тянется уже давно.",
      "Убери один источник хаоса: почта, задачи, файлы, чаты.",
      "Запиши, что больше не тянешь в следующий цикл — один пункт.",
    ],
  },
  hearts: {
    new: [
      "Наметь 3 людей, с которыми важно усилить или восстановить контакт на этой неделе.",
      "Напиши одному человеку, с которым давно не общался, но связь важна.",
      "Запиши, какой разговор сейчас важнее всего — один.",
    ],
    waxing: [
      "Напиши 5 людям, которые сейчас важны для твоего движения, энергии или доверия.",
      "Сделай один шаг к подвисшему разговору — напиши, позвони или договорись.",
      "Отметь напротив каждого контакта: усиливает / забирает / требует ясности.",
    ],
    full: [
      "Проведи один честный разговор, который давно откладывается.",
      "Покажи идею или предложение 2–3 людям и собери отклик.",
      "Прими решение по одному контакту: усилить / ограничить / отпустить.",
    ],
    waning: [
      "Закрой один подвисший контакт или разговор — напиши, позвони или честно отпусти.",
      "Убери один источник лишнего общения: чат, обязательство или контакт, который забирает ресурс.",
      "Запиши, кто дал энергию за день, а кто забрал — один вывод по окружению.",
    ],
  },
  clubs: {
    new: [
      "Наметь одну главную задачу недели, которую сделаешь руками.",
      "Определи, какую систему или рутину нужно запустить.",
      "Запиши 3 шага к первому действию недели.",
    ],
    waxing: [
      "Сделай одно конкретное действие по главной задаче — не откладывай.",
      "Запусти один тест или эксперимент, который проверит гипотезу.",
      "Собери один артефакт: страницу, скрипт, таблицу, черновик.",
    ],
    full: [
      "Прояви результат — покажи, опубликуй или отправь то, что сделал.",
      "Собери обратную связь по одному действию или продукту.",
      "Прими решение: продолжать / менять / закрыть направление.",
    ],
    waning: [
      "Заверши одну задачу, которая близка к финалу — доделай и закрой.",
      "Очисти рабочее пространство: файлы, задачи, вкладки, заметки.",
      "Запиши, что сделано за неделю — один главный результат.",
    ],
  },
  diamonds: {
    new: [
      "Наметь, что нужно посчитать и зафиксировать на этой неделе.",
      "Определи один главный финансовый или результативный фокус.",
      "Запиши 3 цифры, которые важны для текущего этапа.",
    ],
    waxing: [
      "Сделай 3 касания по людям, где может быть доход или результат.",
      "Собери цифры по одной сделке, направлению или проекту.",
      "Зафиксируй один промежуточный результат — цифру, факт, вывод.",
    ],
    full: [
      "Посчитай результат по одному направлению — выручка, конверсии, метрики.",
      "Прими одно решение: масштабировать / улучшить / закрыть.",
      "Покажи цифры кому-то, кто должен их видеть — партнёр, команда, себе.",
    ],
    waning: [
      "Закрой одно незакрытое дело с результатом — посчитай, зафиксируй, реши.",
      "Убери одно убыточное или слабое направление — перестань тратить ресурс.",
      "Запиши главный финансовый вывод недели — один.",
    ],
  },
};

// ── Weekly actions: suit × moon ──────────────────────

const WEEKLY_ACTIONS: Record<Suit, Record<MoonMode, string[]>> = {
  spades: {
    new: [
      "Составь список всего, что нужно убрать за неделю — задачи, контакты, обязательства.",
      "Определи главное узкое место — где теряется больше всего ресурса.",
      "Закрой 2–3 хвоста, которые тянутся больше месяца.",
      "Откажись от одного слабого направления или проекта.",
      "Очисти календарь, рабочее пространство и голову от лишнего.",
    ],
    waxing: [
      "Убери 3 лишние задачи или обязательства, которые не дают результата.",
      "Закрой или заморози 1 слабое направление.",
      "Определи главное узкое место в системе — что мешает движению.",
      "Очисти процесс — убери лишние шаги, встречи, согласования.",
      "Оставь только то, что реально двигает вперёд.",
    ],
    full: [
      "Посмотри прямо на узкое место — что мешает сильнее всего.",
      "Прими решение по каждому слабому направлению: закрыть / заморозить / оставить.",
      "Убери из системы то, что забирает ресурс и не даёт результата.",
      "Очисти календарь — оставь только важные встречи и задачи.",
      "Зафиксируй: что убрано, что решено, что больше не тянешь.",
    ],
    waning: [
      "Закрой все хвосты, которые можно закрыть за неделю.",
      "Убери из системы всё лишнее — задачи, процессы, контакты.",
      "Прими решение по тому, что больше не тянешь в следующий цикл.",
      "Очисти рабочее пространство полностью — файлы, задачи, вкладки.",
      "Запиши: что убрано, что закрыто, что решено.",
    ],
  },
  hearts: {
    new: [
      "Наметь 5–7 людей, с которыми важно усилить или восстановить контакт.",
      "Определи один разговор, который важнее всего на этой неделе.",
      "Начни мягко — напиши 2–3 людям без давления и обязательств.",
      "Запиши, где есть энергия, а где её нет в текущем окружении.",
      "Сформулируй, какое доверие нужно восстановить или построить.",
    ],
    waxing: [
      "Напиши 5 людям, которые сейчас важны для движения, энергии или доверия.",
      "Сделай 3 шага к подвисшим разговорам — напиши, позвони, договорись.",
      "Отметь напротив каждого контакта: усиливает / забирает / требует ясности.",
      "Проведи один честный разговор, который двигает отношения вперёд.",
      "Собери ресурс — восстанови один контакт, который даёт энергию.",
    ],
    full: [
      "Проведи 1–3 честных разговора, которые давно откладываются.",
      "Покажи идею или предложение 3 людям и собери отклик.",
      "Прими решение по контактам: кого усилить, кого ограничить, кого отпустить.",
      "Убери одну слабую связь, которая забирает ресурс.",
      "Зафиксируй: кто усиливает, кто забирает, какой разговор закрыт.",
    ],
    waning: [
      "Закрой 1–3 подвисших разговора — напиши, позвони или честно отпусти.",
      "Убери 1–2 источника лишнего общения: чаты, обязательства, контакты.",
      "Определи 5 людей, которые реально усиливают — запиши их.",
      "Определи 3 источника эмоционального шума — сократи или убери.",
      "Зафиксируй: кто дал энергию, кто забрал, какой вывод по окружению.",
    ],
  },
  clubs: {
    new: [
      "Наметь одну главную задачу недели, которую сделаешь руками.",
      "Определи, какую систему или рутину нужно запустить.",
      "Запиши 3 шага к первому действию.",
      "Составь план на неделю — 5 конкретных рабочих блоков.",
      "Определи, чему нужно научиться для следующего шага.",
    ],
    waxing: [
      "Сделай 5 конкретных действий по главной задаче — не откладывай.",
      "Запусти 1 тест или эксперимент, который проверит гипотезу.",
      "Собери 1 артефакт: страницу, скрипт, таблицу, черновик.",
      "Сделай 10 касаний по целевой аудитории или клиентам.",
      "Создай или улучши одну систему, которая будет работать дальше.",
    ],
    full: [
      "Прояви результат — покажи, опубликуй или отправь то, что сделал.",
      "Собери обратную связь по одному действию или продукту.",
      "Прими решение: продолжать / менять / закрыть направление.",
      "Запусти то, что готово — не откладывай публикацию или запуск.",
      "Зафиксируй: что сделано, что запущено, какой отклик получен.",
    ],
    waning: [
      "Заверши 3 задачи, которые близки к финалу — доделай и закрой.",
      "Очисти рабочее пространство: файлы, задачи, вкладки, заметки.",
      "Запиши, что сделано за неделю — один главный результат.",
      "Закрой один проект или направление, которое не даёт результата.",
      "Зафиксируй: что завершено, что закрыто, что изучено.",
    ],
  },
  diamonds: {
    new: [
      "Наметь, что нужно посчитать и зафиксировать на этой неделе.",
      "Определи один главный финансовый или результативный фокус.",
      "Запиши 3 цифры, которые важны для текущего этапа.",
      "Составь план сбора данных по всем ключевым направлениям.",
      "Определи, какое решение нужно принять по результатам недели.",
    ],
    waxing: [
      "Сделай 3 касания по людям, где может быть доход или результат.",
      "Собери цифры по одной сделке, направлению или проекту.",
      "Зафиксируй один промежуточный результат — цифру, факт, вывод.",
      "Посчитай доход за неделю и сравни с планом.",
      "Собери цифры по всем ключевым направлениям.",
    ],
    full: [
      "Посчитай результат по одному направлению — выручка, конверсии, метрики.",
      "Прими одно решение: масштабировать / улучшить / закрыть.",
      "Покажи цифры кому-то, кто должен их видеть — партнёр, команда, себе.",
      "Собери все метрики за неделю в одном месте.",
      "Зафиксируй: что доказано, что масштабировать, что закрыть.",
    ],
    waning: [
      "Закрой одно незакрытое дело с результатом — посчитай, зафиксируй, реши.",
      "Убери одно убыточное или слабое направление — перестань тратить ресурс.",
      "Запиши главный финансовый вывод недели — один.",
      "Закрой 2–3 незакрытые договорённости или сделки.",
      "Зафиксируй: сколько заработано, что доказано, что масштабировать.",
    ],
  },
};

// ── Daily minimum by suit ─────────────────────────────

const SUIT_DAILY: Record<Suit, string> = {
  spades: "Убери одно лишнее — задачу, контакт, обязательство или хвост.",
  hearts: "Закрой один подвисший контакт или разговор: напиши, позвони или честно отпусти.",
  clubs: "Сделай одно конкретное действие руками — не откладывай.",
  diamonds: "Зафиксируй один результат в цифрах или решении.",
};

// ── Avoid by suit — practical, not abstract ──────────

const SUIT_AVOID: Record<Suit, string[]> = {
  spades: [
    "не тащить старые хвосты",
    "не начинать новое до чистки старого",
    "не игнорировать очевидный беспорядок",
  ],
  hearts: [
    "не общаться из чувства вины",
    "не спасать всех вместо себя",
    "не терпеть неясность в важном разговоре",
  ],
  clubs: [
    "не учиться вместо действия",
    "не делать 10 задач без одного результата",
    "не улучшать систему, которую ещё не используешь",
  ],
  diamonds: [
    "не считать активность результатом",
    "не откладывать фиксацию денег и итога",
    "не оставлять незакрытые договорённости",
  ],
};

// ── Evening question by suit ──────────────────────────

const SUIT_EVENING: Record<Suit, string> = {
  spades: "Что я убрал сегодня, чтобы появилось место для главного?",
  hearts: "Какая связь сегодня дала мне энергию, а какая забрала?",
  clubs: "Какое действие я сделал руками, чтобы идея стала реальностью?",
  diamonds: "Что я получил сегодня, что доказано цифрами?",
};

// ── Week result by suit ───────────────────────────────

const SUIT_RESULT: Record<Suit, string[]> = {
  spades: ["что убрано", "какие хвосты закрыты", "какие решения приняты", "что больше не тянем"],
  hearts: ["кто усиливает", "кто забирает ресурс", "какие разговоры закрыты", "какой круг доверия яснее"],
  clubs: ["какие задачи сделаны", "что запущено", "что изучено", "какая система создана"],
  diamonds: ["сколько заработано", "что доказано", "что завершено", "что масштабировать"],
};

// ── Week focus by suit ────────────────────────────────

const SUIT_FOCUS: Record<Suit, string> = {
  spades: "очистить, диагностировать, отсечь лишнее",
  hearts: "разобраться с людьми, энергией и доверием",
  clubs: "сделать, запустить, построить систему",
  diamonds: "посчитать, зафиксировать, принять решение",
};

// ── Week content generator ────────────────────────────

function generateWeek(
  cycleNumber: number,
  weekIndexInCycle: 1 | 2 | 3 | 4,
  globalWeekIndex: number,
  startDate: string,
  endDate: string,
  moonMode: MoonMode,
  status: WeekStatus,
): Cycle13Week {
  const rankInfo: RankInfo = RANKS[cycleNumber - 1] || RANKS[0];
  const suitInfo = SUITS[weekIndexInCycle];
  const card = `${rankInfo.shortName}${suitInfo.shortName}`;
  const moon = MOON_MODES[moonMode];

  const plainMeaning = `Неделя ${card}: ${rankInfo.name.toLowerCase()} — ${rankInfo.keywords[0]}. ${suitInfo.name} — ${suitInfo.meaning.toLowerCase()}. Лунный режим: ${moon.name.toLowerCase()} — ${moon.action}.`;

  return {
    id: `c${cycleNumber}w${weekIndexInCycle}`,
    cycleNumber,
    cycleRank: rankInfo.name,
    weekIndexInCycle,
    globalWeekIndex,
    card,
    rank: rankInfo.name,
    suit: suitInfo.id,
    startDate,
    endDate,
    moonMode,
    status,
    shortFocus: SUIT_FOCUS[suitInfo.id],
    plainMeaning,
    mainQuestion: suitInfo.question,
    dailyMinimum: SUIT_DAILY[suitInfo.id],
    dailyActions: DAILY_ACTIONS[suitInfo.id][moonMode],
    weeklyActions: WEEKLY_ACTIONS[suitInfo.id][moonMode],
    avoid: SUIT_AVOID[suitInfo.id],
    weekResult: SUIT_RESULT[suitInfo.id],
    eveningQuestion: SUIT_EVENING[suitInfo.id],
    scorecard: SCORECARDS[suitInfo.id],
  };
}

// ── 52 weeks calendar (generated) ────────────────────

function buildAllWeeks(referenceDate?: Date): Cycle13Week[] {
  const weeks: Cycle13Week[] = [];
  const ref = referenceDate || new Date();
  const refDayIndex = getDayIndex(ref);
  const refGlobalWeek = Math.floor(refDayIndex / 7) + 1;

  const start = new Date(2025, 11, 29); // 2025-12-29

  for (let c = 1; c <= 13; c++) {
    for (let w = 1 as 1 | 2 | 3 | 4; w <= 4; w++) {
      const globalWeek = (c - 1) * 4 + w;
      const weekStart = new Date(start);
      weekStart.setDate(weekStart.getDate() + (globalWeek - 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const startDate = formatDate(weekStart);
      const endDate = formatDate(weekEnd);

      // Calculate moon mode from real approximate moon phase (middle of week)
      const weekMid = new Date(weekStart);
      weekMid.setDate(weekMid.getDate() + 3); // day 4 of week
      const moonPhase = getMoonPhase(weekMid);
      const moonMode = moonPhase.phase as MoonMode;

      let status: WeekStatus = "future";
      if (globalWeek < refGlobalWeek) status = "past";
      else if (globalWeek === refGlobalWeek) status = "active";

      weeks.push(
        generateWeek(c, w, globalWeek, startDate, endDate, moonMode, status),
      );
    }
  }

  return weeks;
}

// ── Helpers ───────────────────────────────────────────

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getDayIndex(date: Date): number {
  const start = parseDate("2025-12-29");
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const ms = d.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

// ── Joker week ────────────────────────────────────────

export const JOKER_WEEK = {
  startDate: "2026-12-28",
  endDate: "2027-01-03",
  card: "Джокер",
  title: "Джокер-неделя",
  description:
    "Неделя вне основного цикла. Время ревизии года, обнуления, очистки, сборки выводов и подготовки нового цикла.",
  actions: [
    "Подведи итог года — что сработало, что нет.",
    "Очисти всё лишнее — задачи, контакты, обязательства.",
    "Собери выводы в один документ или заметку.",
    "Подготовь фокус на новый цикл.",
  ],
  avoid: ["не начинать новое", "не тащить старое в новый цикл", "не игнорировать рефлексию"],
  eveningQuestion: "Что я вынес из этого года, что станет фундаментом следующего?",
};

// ── Public API ───────────────────────────────────────

export function getAllWeeks(referenceDate?: Date): Cycle13Week[] {
  return buildAllWeeks(referenceDate);
}

export function getWeekByDate(date: Date): Cycle13Week | null {
  const refDayIndex = getDayIndex(date);
  if (refDayIndex < 0) return null;

  const jokerStart = parseDate(JOKER_WEEK.startDate);
  const jokerEnd = parseDate(JOKER_WEEK.endDate);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d >= jokerStart && d <= jokerEnd) return null; // Joker week

  // After next cycle start (2027-01-04) — wrap around
  const nextCycleStart = parseDate("2027-01-04");
  let effectiveDayIndex = refDayIndex;
  if (d >= nextCycleStart) {
    effectiveDayIndex = Math.floor((d.getTime() - nextCycleStart.getTime()) / (1000 * 60 * 60 * 24));
  }

  const cycleNumber = Math.floor(effectiveDayIndex / 28) + 1;
  const weekInCycle = (Math.floor(effectiveDayIndex % 28 / 7) + 1) as 1 | 2 | 3 | 4;
  const globalWeek = (cycleNumber - 1) * 4 + weekInCycle;

  const weeks = buildAllWeeks(d);
  const week = weeks[globalWeek - 1] || null;
  if (!week) return null;

  // Override moon mode with real calculation for today's date
  const realMoon = getMoonPhase(d);
  const realMode = realMoon.phase as MoonMode;

  // If moon mode changed, regenerate actions for the correct moon mode
  if (realMode !== week.moonMode) {
    const rankInfo = RANKS[cycleNumber - 1] || RANKS[0];
    const suitInfo = SUITS[weekInCycle];
    const card = `${rankInfo.shortName}${suitInfo.shortName}`;
    const moon = MOON_MODES[realMode];

    return {
      ...week,
      moonMode: realMode,
      dailyActions: DAILY_ACTIONS[suitInfo.id][realMode],
      weeklyActions: WEEKLY_ACTIONS[suitInfo.id][realMode],
      plainMeaning: `Неделя ${card}: ${rankInfo.name.toLowerCase()} — ${rankInfo.keywords[0]}. ${suitInfo.name} — ${suitInfo.meaning.toLowerCase()}. Лунный режим: ${moon.name.toLowerCase()} — ${moon.action}.`,
    };
  }

  return week;
}

export function getWeeksByCycle(cycleNumber: number, referenceDate?: Date): Cycle13Week[] {
  const weeks = buildAllWeeks(referenceDate);
  return weeks.filter((w) => w.cycleNumber === cycleNumber);
}

export function getCycleWeeks(cycleNumber: number, referenceDate?: Date): Cycle13Week[] {
  return getWeeksByCycle(cycleNumber, referenceDate);
}

export function getYearMap(referenceDate?: Date): Cycle13Week[] {
  return buildAllWeeks(referenceDate);
}

export function isJokerWeek(date: Date): boolean {
  const jokerStart = parseDate(JOKER_WEEK.startDate);
  const jokerEnd = parseDate(JOKER_WEEK.endDate);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return d >= jokerStart && d <= jokerEnd;
}

export function getDayOfWeek(date: Date): string {
  const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  return days[date.getDay()];
}

export function getProgress(date: Date): { dayInWeek: number; dayInCycle: number; weekPercent: number; cyclePercent: number; cycleNumber: number; weekInCycle: number } {
  const refDayIndex = getDayIndex(date);
  const dayInCycle = refDayIndex % 28;
  const dayInWeek = dayInCycle % 7;
  const cycleNumber = Math.floor(refDayIndex / 28) + 1;
  const weekInCycle = Math.floor(dayInCycle / 7) + 1;
  return {
    dayInWeek: dayInWeek + 1,
    dayInCycle: dayInCycle + 1,
    weekPercent: Math.round(((dayInWeek + 1) / 7) * 100),
    cyclePercent: Math.round(((dayInCycle + 1) / 28) * 100),
    cycleNumber,
    weekInCycle,
  };
}

export { formatDate, parseDate, getDayIndex };