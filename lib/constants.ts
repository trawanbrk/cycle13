// Cycle13 — Constants

export const START_DATE = "2025-12-29"; // Fixed anchor: Monday, start of first full week around Jan 1 2026

export const CYCLE_DAYS = 28;
export const WEEK_DAYS = 7;
export const TOTAL_CYCLES = 13;
export const JOKER_WEEK_START = "2026-12-28";
export const JOKER_WEEK_END = "2027-01-03";
export const NEXT_CYCLE_START = "2027-01-04";

export type Suit = "spades" | "hearts" | "clubs" | "diamonds";
export type Mode = "personality" | "business" | "body" | "money" | "relationships" | "creation";

export interface SuitInfo {
  id: Suit;
  symbol: string;
  name: string;
  shortName: string;
  meaning: string;
  question: string;
  keywords: string[];
  color: string;
  weekNumber: number;
}

export interface RankInfo {
  id: number;
  name: string;
  shortName: string;
  meaning: string;
  keywords: string[];
}

export interface ModeInfo {
  id: Mode;
  name: string;
  icon: string;
}

export const SUITS: Record<number, SuitInfo> = {
  1: {
    id: "spades",
    symbol: "♠",
    name: "Пики",
    shortName: "♠",
    meaning: "Очистить",
    question: "Что убрать, чтобы появилось место для главного?",
    keywords: ["чистка", "дисциплина", "отсечение", "фокус", "диагностика", "отказ от лишнего"],
    color: "#6B7B9E", // cold steel blue
    weekNumber: 1,
  },
  2: {
    id: "hearts",
    symbol: "♥",
    name: "Черви",
    shortName: "♥",
    meaning: "Соединить / зарядить",
    question: "С кем и через какую энергию я иду дальше?",
    keywords: ["люди", "энергия", "отношения", "доверие", "мотивация", "связи"],
    color: "#B8453A", // deep red / burgundy
    weekNumber: 2,
  },
  3: {
    id: "clubs",
    symbol: "♣",
    name: "Трефы",
    shortName: "♣",
    meaning: "Сделать",
    question: "Что я должен сделать руками, чтобы идея стала реальностью?",
    keywords: ["действия", "работа", "обучение", "система", "запуск", "ремесло"],
    color: "#3A8B5A", // green / emerald
    weekNumber: 3,
  },
  4: {
    id: "diamonds",
    symbol: "♦",
    name: "Бубны",
    shortName: "♦",
    meaning: "Получить результат",
    question: "Что я получил, что доказано цифрами, и что дальше масштабировать?",
    keywords: ["деньги", "результат", "ресурс", "материализация", "метрики", "выводы"],
    color: "#C89B3C", // amber / gold
    weekNumber: 4,
  },
};

export const RANKS: RankInfo[] = [
  { id: 1, name: "Туз", shortName: "Туз", meaning: "Старт, импульс, семя, начало", keywords: ["старт", "импульс", "начало"] },
  { id: 2, name: "Двойка", shortName: "2", meaning: "Выбор, дуальность, партнёрство, развилка", keywords: ["выбор", "дуальность", "партнёрство"] },
  { id: 3, name: "Тройка", shortName: "3", meaning: "Рост, движение, первые результаты", keywords: ["рост", "движение", "первые результаты"] },
  { id: 4, name: "Четвёрка", shortName: "4", meaning: "Структура, фундамент, порядок, система", keywords: ["структура", "фундамент", "порядок"] },
  { id: 5, name: "Пятёрка", shortName: "5", meaning: "Изменения, конфликт, адаптация, слом старого", keywords: ["изменения", "адаптация", "слом старого"] },
  { id: 6, name: "Шестёрка", shortName: "6", meaning: "Баланс, восстановление, гармонизация", keywords: ["баланс", "восстановление", "гармонизация"] },
  { id: 7, name: "Семёрка", shortName: "7", meaning: "Стратегия, глубина, анализ, поиск верного курса", keywords: ["стратегия", "глубина", "анализ"] },
  { id: 8, name: "Восьмёрка", shortName: "8", meaning: "Сила, деньги, управление, ресурс", keywords: ["сила", "деньги", "управление", "ресурс"] },
  { id: 9, name: "Девятка", shortName: "9", meaning: "Завершение этапа, мудрость, урожай", keywords: ["завершение", "мудрость", "урожай"] },
  { id: 10, name: "Десятка", shortName: "10", meaning: "Переход на новый уровень, системность, перезапуск", keywords: ["переход уровня", "система", "перезапуск"] },
  { id: 11, name: "Валет", shortName: "Валет", meaning: "Ученик, проба, молодой импульс, движение", keywords: ["ученик", "проба", "движение"] },
  { id: 12, name: "Дама", shortName: "Дама", meaning: "Зрелость, принятие, внутренняя сила", keywords: ["зрелость", "принятие", "внутренняя сила"] },
  { id: 13, name: "Король", shortName: "Король", meaning: "Итог, власть, управление, завершение большого цикла", keywords: ["итог", "власть", "завершение"] },
];

export const MODES: ModeInfo[] = [
  { id: "personality", name: "Личность", icon: "👤" },
  { id: "business", name: "Бизнес", icon: "💼" },
  { id: "body", name: "Тело", icon: "🧘" },
  { id: "money", name: "Деньги", icon: "💰" },
  { id: "relationships", name: "Отношения", icon: "🤝" },
  { id: "creation", name: "Создание", icon: "✨" },
];

export const MODE_NAMES: Record<Mode, string> = {
  personality: "Личность",
  business: "Бизнес",
  body: "Тело",
  money: "Деньги",
  relationships: "Отношения",
  creation: "Создание",
};

// Cycle dates for 2026
export const CYCLE_DATES: { start: string; end: string; rankId: number }[] = [
  { start: "2025-12-29", end: "2026-01-25", rankId: 1 },
  { start: "2026-01-26", end: "2026-02-22", rankId: 2 },
  { start: "2026-02-23", end: "2026-03-22", rankId: 3 },
  { start: "2026-03-23", end: "2026-04-19", rankId: 4 },
  { start: "2026-04-20", end: "2026-05-17", rankId: 5 },
  { start: "2026-05-18", end: "2026-06-14", rankId: 6 },
  { start: "2026-06-15", end: "2026-07-12", rankId: 7 },
  { start: "2026-07-13", end: "2026-08-09", rankId: 8 },
  { start: "2026-08-10", end: "2026-09-06", rankId: 9 },
  { start: "2026-09-07", end: "2026-10-04", rankId: 10 },
  { start: "2026-10-05", end: "2026-11-01", rankId: 11 },
  { start: "2026-11-02", end: "2026-11-29", rankId: 12 },
  { start: "2026-11-30", end: "2026-12-27", rankId: 13 },
];
