import { Reveal } from "./motion";

const stack = [
  { name: "HTML5", role: "Семантическая разметка", text: "Чистая структура страниц, доступность и SEO-основа." },
  { name: "CSS3", role: "Визуал и анимации", text: "Сетки, адаптивные макеты, переходы и сложные эффекты." },
  { name: "JavaScript", role: "Интерактивность", text: "Каталоги, фильтры, формы, слайдеры и живые интерфейсы." },
  { name: "Node.js", role: "Серверная часть", text: "API, обработка заявок, авторизация и административные панели." },
  { name: "Python", role: "Боты и автоматизация", text: "Асинхронные сервисы, работа с базами данных и внешними API." },
  { name: "Telegram Bot", role: "Разработка ботов", text: "Меню, команды, пользователи, лимиты и управление прямо в Telegram." },
  { name: "Адаптив", role: "Все устройства", text: "Отдельно продуманные версии для смартфона, планшета и компьютера." },
  { name: "UI / UX", role: "Интерфейсы", text: "Понятная навигация, иерархия и внимание к пользовательскому пути." },
];

export function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-20 border-t border-line bg-surface px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex items-center justify-between border-b border-line pb-5">
          <p className="kicker">
            <span className="text-foreground">(04)</span> Технологии
          </p>
          <p className="kicker">{stack.length} инструментов</p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="display-xl text-[clamp(3rem,6.5vw,6.5rem)]">
              Стек <br />
              <span className="serif-accent text-silver">и подход</span>
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground md:text-lg">
              Инструменты, с которыми я создаю сайты, интерфейсы и Telegram-ботов — от вёрстки до серверной логики.
            </p>
          </Reveal>

          {/* Индекс-таблица: строка раскрывается и инвертируется при наведении */}
          <ol className="md:col-span-8">
            {stack.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 50}>
                <div className="group relative overflow-hidden border-b border-line first:border-t">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100" />
                  <div className="relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 transition-colors duration-500 group-hover:text-background md:grid-cols-[4rem_1fr_14rem] md:py-7">
                    <span className="font-mono text-xs text-faint transition-colors group-hover:text-background/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(1.7rem,3.6vw,3.4rem)] font-bold leading-none tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2">
                      {s.name}
                    </span>
                    <span className="kicker text-right transition-colors group-hover:text-background/70">{s.role}</span>
                  </div>
                  <p className="relative grid max-h-0 grid-cols-[2.5rem_1fr] gap-4 overflow-hidden text-background opacity-0 transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:max-h-24 group-hover:pb-6 group-hover:opacity-100 md:grid-cols-[4rem_1fr]">
                    <span />
                    <span className="max-w-lg">{s.text}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* Бегущая строка */}
      <div className="relative mt-24 overflow-hidden border-y border-line py-6 md:mt-32">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-10 text-3xl font-semibold tracking-[-0.03em] text-faint md:text-5xl">
              {s.name}
              <span className="serif-accent text-silver">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}