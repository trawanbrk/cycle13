import { SUITS } from "@/lib/constants";

export default function LogicBlock() {
  const suits = Object.values(SUITS);

  return (
    <div className="space-y-6">
      {/* Formula */}
      <div className="rounded-xl border border-[#2a2a32] bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] p-6 text-center">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
          Главная формула
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg">
          <span style={{ color: SUITS[1].color }}>Очистить</span>
          <span className="text-[#555560]">&rarr;</span>
          <span style={{ color: SUITS[2].color }}>Соединить / зарядить</span>
          <span className="text-[#555560]">&rarr;</span>
          <span style={{ color: SUITS[3].color }}>Сделать</span>
          <span className="text-[#555560]">&rarr;</span>
          <span style={{ color: SUITS[4].color }}>Получить результат</span>
        </div>
      </div>

      {/* Structure */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4">
          <div className="text-2xl font-bold text-[#C89B3C]">13</div>
          <div className="text-sm text-[#888892]">циклов в году</div>
          <div className="text-xs text-[#555560] mt-1">
            Каждый цикл = 28 дней = 4 недели
          </div>
        </div>
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4">
          <div className="text-2xl font-bold text-[#C89B3C]">52</div>
          <div className="text-sm text-[#888892]">недели в году</div>
          <div className="text-xs text-[#555560] mt-1">
            13 циклов &times; 4 недели = 52 недели
          </div>
        </div>
        <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-4">
          <div className="text-2xl font-bold text-[#C89B3C]">364</div>
          <div className="text-sm text-[#888892]">дня в системе</div>
          <div className="text-xs text-[#555560] mt-1">
            + 1 Джокер-неделя = ревизия
          </div>
        </div>
      </div>

      {/* Deck connection */}
      <div className="rounded-xl border border-[#2a2a32] bg-[#1a1a20] p-5">
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
          Связь с колодой
        </div>
        <div className="space-y-2 text-sm text-[#888892]">
          <p>
            <span className="text-[#e8e8ec]">52 карты</span> в колоде ={" "}
            <span className="text-[#e8e8ec]">52 недели</span> в году.
          </p>
          <p>
            <span className="text-[#e8e8ec]">4 масти</span> = 4 фазы внутри каждого
            цикла: Пики (очистить), Черви (соединить), Трефы (сделать), Бубны
            (получить результат).
          </p>
          <p>
            <span className="text-[#e8e8ec]">13 номиналов</span> (Туз &mdash; Король) ={" "}
            <span className="text-[#e8e8ec]">13 циклов</span> в году.
          </p>
          <p>
            <span className="text-[#e8e8ec]">Джокер</span> = 53-я неделя, неделя
            ревизии и обнуления.
          </p>
        </div>
      </div>

      {/* Suits */}
      <div>
        <div className="text-xs text-[#555560] uppercase tracking-wider mb-3">
          Что означают масти
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {suits.map((suit) => (
            <div
              key={suit.id}
              className="rounded-lg border border-[#2a2a32] bg-[#1a1a20] p-4 flex items-center gap-3"
            >
              <span className="text-4xl" style={{ color: suit.color }}>
                {suit.symbol}
              </span>
              <div>
                <div className="font-semibold text-[#e8e8ec]">
                  {suit.name} &mdash; {suit.meaning}
                </div>
                <div className="text-xs text-[#888892] italic mt-1">
                  {suit.question}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-[#2a2a32] bg-[#0f0f12] p-4 text-center text-sm text-[#555560]">
        Это символико-операционная модель, а не доказанная историческая система и
        не гадание. Её задача &mdash; дать недельный ритм фокуса, действий и
        результата.
      </div>
    </div>
  );
}