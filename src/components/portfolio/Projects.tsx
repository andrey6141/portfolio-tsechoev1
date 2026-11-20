import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { BotCover } from "./BotCover";
import { Reveal, useTilt } from "./motion";

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-20 bg-background px-5 pb-20 pt-10 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex items-center justify-between border-b border-line pb-5">
          <p className="kicker">
            <span className="text-foreground">(03)</span> Избранные проекты
          </p>
          <p className="kicker">{String(projects.length).padStart(2, "0")} работы</p>
        </Reveal>

        <Reveal className="mt-12 md:mt-20">
          <h2 className="display-xl text-[clamp(3.4rem,11vw,11rem)]">
            Мои <span className="serif-accent text-silver">проекты</span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 md:mt-28 md:gap-40">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project: p, flip }: { project: Project; flip: boolean }) {
  const tilt = useTilt<HTMLDivElement>(5);
  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <Reveal variant="clip" className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <Link
          to="/projects/$slug"
          params={{ slug: p.slug }}
          data-cursor="Открыть"
          className="group block"
          aria-label={`Открыть проект ${p.name}`}
        >
          <div
            ref={tilt}
            className="relative overflow-hidden rounded-lg border border-line bg-graphite shadow-deep transition-transform duration-500 [transform-style:preserve-3d] [transition-timing-function:var(--ease-out-expo)]"
          >
            {/* «Окно браузера» */}
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="ml-3 truncate font-mono text-[0.65rem] text-faint">
                {p.liveUrl ?? "Telegram · бот"}
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              {p.cover ? (
                <img
                  src={p.cover}
                  alt={`Главная страница сайта ${p.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
              ) : (
                <BotCover />
              )}
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </Link>
      </Reveal>

      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <Reveal>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-sm text-faint">{p.index} / 04</span>
            <span className="kicker">{p.type}</span>
          </div>
          <h3 className="display-xl mt-5 text-[clamp(2.8rem,5.6vw,5.4rem)]">{p.name}</h3>
          <p className="serif-accent mt-3 text-2xl text-silver md:text-3xl">{p.tagline}</p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{p.description}</p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 border-t border-line py-2.5 text-sm text-silver">
                <span className="text-faint">—</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group/btn mt-10 inline-flex items-center gap-4 text-lg font-medium"
          >
            <span className="grid size-14 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover/btn:rotate-45 group-hover/btn:bg-foreground group-hover/btn:text-background">
              <ArrowUpRight className="size-5" />
            </span>
            <span className="relative">
              Посмотреть проект
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover/btn:scale-x-100" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}