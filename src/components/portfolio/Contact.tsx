import { ArrowUpRight } from "lucide-react";
import { contacts } from "@/config/contacts";
import { Reveal } from "./motion";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-44">
      <div className="spotlight pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1600px]">
        <Reveal className="flex items-center justify-between border-b border-line pb-5">
          <p className="kicker">
            <span className="text-foreground">(05)</span> Контакты
          </p>
          <p className="kicker">Открыт к сотрудничеству</p>
        </Reveal>

        <h2 className="display-xl mt-14 text-[clamp(3rem,10.5vw,11.5rem)] leading-[0.95] md:mt-24">
          <Reveal as="span" className="block">Давайте</Reveal>
          <Reveal as="span" className="block md:pl-[12vw]" delay={100}>
            <span className="text-outline">создадим</span>
          </Reveal>
          <Reveal as="span" className="block" delay={200}>
            что-то <span className="serif-accent text-silver normal-case">впечатляющее.</span>
          </Reveal>
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="max-w-sm text-xl leading-relaxed text-silver md:text-2xl">
              Открыт к интересным проектам, сотрудничеству и новым возможностям.
            </p>
          </Reveal>

          <ul className="md:col-span-8">
            {contacts.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 70}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="Написать"
                    className="group flex items-center justify-between gap-6 border-b border-line py-7 first:border-t md:py-9"
                  >
                    <span className="text-[clamp(2rem,4.5vw,4.2rem)] font-bold leading-none tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-3">
                      {c.label}
                    </span>
                    <span className="flex items-center gap-5">
                      <span className="hidden font-mono text-sm text-muted-foreground sm:inline">{c.handle}</span>
                      <span className="grid size-12 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background md:size-16">
                        <ArrowUpRight className="size-5" />
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-6 border-b border-line py-7 text-faint first:border-t md:py-9">
                    <span className="text-[clamp(2rem,4.5vw,4.2rem)] font-bold leading-none tracking-[-0.045em]">
                      {c.label}
                    </span>
                    <span className="kicker">скоро</span>
                  </div>
                )}
              </Reveal>
            ))}
          </ul>
        </div>

        <footer className="mt-28 flex flex-col gap-6 border-t border-line pt-6 md:mt-40 md:flex-row md:items-center md:justify-between">
          <p className="kicker">© {new Date().getFullYear()} Цечоев Абдурахман</p>
          <p className="kicker">Web Developer · Портфолио</p>
          <a href="#top" className="kicker hover:text-foreground">
            Наверх ↑
          </a>
        </footer>
      </div>
    </section>
  );
}