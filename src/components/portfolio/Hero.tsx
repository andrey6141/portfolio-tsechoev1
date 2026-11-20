import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useMagnetic } from "./motion";
import { primaryContact } from "@/config/contacts";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const work = useMagnetic<HTMLAnchorElement>();
  const talk = useMagnetic<HTMLAnchorElement>();

  // Эффект глубины: слои двигаются с разной скоростью за мышью
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        el.style.setProperty("--px", `${(x - 0.5) * 2}`);
        el.style.setProperty("--py", `${(y - 0.5) * 2}`);
      });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
  });

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32"
    >
      {/* Фон */}
      <div className="spotlight pointer-events-none absolute inset-0" />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
        style={layer(-10)}
      />
      <div className="pointer-events-none absolute -right-[20vw] top-[8%] hidden aspect-square w-[62vw] md:block" style={layer(28)}>
        <div className="animate-spin-slow absolute inset-0 rounded-full border border-line" />
        <div className="absolute inset-[12%] rounded-full border border-line/70" />
        <div className="absolute inset-[26%] rounded-full border border-dashed border-line" />
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver" />
      </div>

      {/* Верхняя строка */}
      <div className="fade-up relative mx-auto flex w-full max-w-[1600px] items-start justify-between" style={{ animationDelay: "200ms" }}>
        <p className="kicker max-w-[16rem]">
          <span className="text-foreground">(01)</span> Портфолио веб-разработчика
        </p>
        <p className="kicker hidden text-right md:block">
          4 года в разработке
          <br />
          Открыт к проектам
          <span className="ml-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-foreground caret" />
        </p>
      </div>

      {/* Имя */}
      <div className="relative mx-auto mt-auto w-full max-w-[1600px]">
        <h1 className="display-xl select-none" style={layer(-6)}>
          <span className="block text-[19vw] md:text-[clamp(3.1rem,13.2vw,15.5rem)]">
            <NameLine text="ЦЕЧОЕВ" delay={300} />
          </span>
          <span className="block text-[11.6vw] md:pl-[9vw] md:text-[clamp(2.25rem,10.4vw,12.2rem)]">
            <NameLine text="АБДУРАХМАН" delay={520} outline />
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <div className="fade-up md:col-span-4" style={{ animationDelay: "1100ms" }}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Роль</p>
            <p className="mt-2 text-[clamp(2.2rem,4.4vw,4rem)] leading-none">
              <span className="serif-accent">Web</span>{" "}
              <span className="font-extrabold tracking-[-0.04em]">DEVELOPER</span>
            </p>
          </div>
          <p
            className="fade-up max-w-md text-lg leading-relaxed text-silver md:col-span-4 md:text-xl"
            style={{ animationDelay: "1250ms" }}
          >
            Создаю современные цифровые продукты, сайты и веб-приложения с продуманным дизайном и функциональностью.
          </p>
          <div
            className="fade-up flex flex-wrap gap-3 md:col-span-4 md:justify-end"
            style={{ animationDelay: "1400ms" }}
          >
            <a ref={work} href="#work" className="btn-solid" data-cursor="Смотреть">
              Мои проекты <ArrowDownRight className="size-4" />
            </a>
            <a
              ref={talk}
              href={primaryContact?.href ?? "#contact"}
              target={primaryContact ? "_blank" : undefined}
              rel="noreferrer"
              className="btn-ghost"
            >
              Связаться со мной <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-line pt-5 md:mt-16">
          <a href="#about" className="kicker flex items-center gap-3 hover:text-foreground">
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="scroll-line absolute inset-0 bg-foreground" />
            </span>
            Листайте
          </a>
          <p className="kicker hidden sm:block">HTML · CSS · JavaScript · Node.js · Python</p>
          <p className="kicker">2026</p>
        </div>
      </div>
    </section>
  );
}

/** Строка имени: буквы появляются каскадом и «подпрыгивают» при наведении */
function NameLine({ text, delay, outline }: { text: string; delay: number; outline?: boolean }) {
  return (
    <span aria-label={text} className="inline-flex overflow-hidden pb-[0.04em]">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`char cursor-default hover:-translate-y-[0.08em] ${
            outline ? "text-outline hover:text-foreground" : "hover:text-outline"
          }`}
          style={{ animationDelay: `${delay + i * 45}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}