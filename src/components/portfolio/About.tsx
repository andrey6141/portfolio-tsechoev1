import { Reveal } from "./motion";

const principles = [
  { title: "Опыт разработки — 4 года", text: "Сайты разных направлений, собственные проекты и постоянная практика." },
  { title: "Внимание к деталям", text: "Отступы, состояния, анимации и тексты — всё доводится до аккуратного результата." },
  { title: "Индивидуальный подход", text: "Каждый проект проектируется под задачу и аудиторию, а не под шаблон." },
  { title: "Современный дизайн", text: "Чистая типографика, выразительная композиция и живые интерфейсы." },
  { title: "Адаптивная разработка", text: "Сайт удобен на компьютере, ноутбуке, планшете и смартфоне." },
  { title: "Постоянное развитие", text: "Изучаю новые веб-технологии и сразу применяю их в работе." },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex items-center justify-between border-b border-line pb-5">
          <p className="kicker">
            <span className="text-foreground">(02)</span> Обо мне
          </p>
          <p className="kicker">Цечоев Абдурахман</p>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          {/* Большая цифра опыта */}
          <Reveal className="md:col-span-5">
            <div className="relative">
              <span className="display-xl block text-[clamp(11rem,30vw,26rem)] leading-[0.75] text-outline">4</span>
              <div className="mt-6 flex items-end gap-4 md:absolute md:bottom-6 md:left-[52%] md:mt-0">
                <p className="text-2xl leading-tight md:text-3xl">
                  <span className="serif-accent text-4xl md:text-5xl">года</span>
                  <br />в программировании
                </p>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-7 md:pt-6">
            <Reveal>
              <p className="text-[clamp(1.6rem,2.8vw,2.7rem)] font-medium leading-[1.15] tracking-[-0.025em]">
                Я веб-разработчик, занимаюсь программированием уже{" "}
                <span className="serif-accent text-silver">четыре года.</span> За это время получил опыт создания
                сайтов различных направлений, изучал веб-технологии и работал над собственными проектами.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 text-lg leading-relaxed text-muted-foreground sm:grid-cols-2">
              <Reveal delay={100}>
                <p>
                  Обучался в образовательных школах <span className="text-foreground">Skills Hub</span> и{" "}
                  <span className="text-foreground">KiberOne</span>. Специализируюсь на разработке современных
                  веб-сайтов, создании интерфейсов, frontend-разработке и реализации функциональных решений для
                  бизнеса.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Мне важно не просто создать красивую страницу, а разработать полноценный продукт, который будет
                  удобен пользователям, хорошо выглядеть на всех устройствах и решать реальные задачи.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Принципы — строками, а не карточками */}
        <ul className="mt-24 border-t border-line md:mt-36">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 60}>
              <div className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-2 overflow-hidden border-b border-line py-7 md:grid-cols-[6rem_1fr_1fr] md:py-9">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-y-100" />
                <span className="relative font-mono text-sm text-faint">0{i + 1}</span>
                <h3 className="relative text-2xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                  {p.title}
                </h3>
                <p className="relative col-start-2 max-w-md text-muted-foreground md:col-start-3 md:text-lg">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}