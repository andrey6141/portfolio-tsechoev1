import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Maximize2 } from "lucide-react";
import { getNeighbours, getProject } from "@/lib/projects";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal, SplitChars } from "@/components/portfolio/motion";
import { TelegramDemo } from "@/components/portfolio/TelegramDemo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProject(loaderData.slug) : null;
    if (!p) return { meta: [{ title: "Проект не найден" }, { name: "robots", content: "noindex" }] };
    const title = `${p.name} — ${p.tagline} · Цечоев Абдурахман`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="kicker">404</p>
      <h1 className="display-xl text-6xl">Проект не найден</h1>
      <Link to="/" hash="work" className="btn-ghost">
        Ко всем проектам
      </Link>
    </div>
  ),
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const { prev, next } = getNeighbours(slug);

  return (
    <div>
      <Nav />
      <main className="px-5 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="fade-up flex items-center justify-between border-b border-line pb-5">
            <Link to="/" hash="work" className="kicker flex items-center gap-2 hover:text-foreground">
              <ArrowLeft className="size-3.5" /> Все проекты
            </Link>
            <p className="kicker">
              {p.index} / 04 · {p.type}
            </p>
          </div>

          <h1 className="display-xl mt-12 text-[clamp(3.2rem,12vw,13rem)] md:mt-20">
            <SplitChars text={p.name} baseDelay={150} step={40} />
          </h1>

          <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12">
            <p className="serif-accent fade-up text-3xl text-silver md:col-span-4 md:text-4xl" style={{ animationDelay: "500ms" }}>
              {p.tagline}
            </p>
            <p
              className="fade-up text-lg leading-relaxed text-muted-foreground md:col-span-5 md:text-xl"
              style={{ animationDelay: "650ms" }}
            >
              {p.description}
            </p>
            <div className="fade-up md:col-span-3 md:text-right" style={{ animationDelay: "800ms" }}>
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-solid" data-cursor="Открыть">
                  Открыть сайт <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>

          {/* Живая версия проекта */}
          <section className="mt-16 md:mt-24">
            {p.liveUrl ? (
              <Reveal variant="clip">
                <div className="overflow-hidden rounded-lg border border-line bg-graphite shadow-deep">
                  <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-line-strong" />
                      <span className="size-2.5 rounded-full bg-line-strong" />
                      <span className="size-2.5 rounded-full bg-line-strong" />
                    </div>
                    <span className="truncate font-mono text-xs text-faint">{p.liveUrl}</span>
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Открыть на весь экран" className="text-muted-foreground hover:text-foreground">
                      <Maximize2 className="size-4" />
                    </a>
                  </div>
                  <iframe
                    src={p.liveUrl}
                    title={`Живая версия ${p.name}`}
                    loading="lazy"
                    className="block h-[70svh] w-full bg-background md:h-[82vh]"
                  />
                </div>
                <p className="kicker mt-4">Это рабочая версия сайта — его можно листать и нажимать прямо здесь.</p>
              </Reveal>
            ) : (
              <div className="grid items-center gap-12 rounded-lg border border-line bg-surface px-5 py-12 md:grid-cols-12 md:px-12 md:py-20">
                <Reveal className="md:col-span-5">
                  <p className="kicker">Попробуйте бота</p>
                  <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
                    Демо прямо <span className="serif-accent text-silver">в браузере</span>
                  </h2>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                    Нажимайте кнопки меню и отправляйте ссылки — ответы взяты из исходного кода бота. Переключатель
                    «Владелец» показывает команды административной панели.
                  </p>
                  <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
                    {[
                      ["Фреймворк", "aiogram 3"],
                      ["База данных", "PostgreSQL"],
                      ["Кэш", "Redis"],
                      ["Запуск", "Docker Compose"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-surface p-4">
                        <p className="kicker">{k}</p>
                        <p className="mt-1 font-semibold">{v}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal className="md:col-span-7" delay={150}>
                  <TelegramDemo />
                </Reveal>
              </div>
            )}
            {p.note && <p className="mt-6 max-w-2xl rounded-md border border-line bg-surface p-5 text-silver">{p.note}</p>}
          </section>

          {/* Функциональность и стек */}
          <section className="mt-24 grid gap-14 md:mt-36 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="kicker">Функциональность</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] md:text-5xl">Что внутри</h2>
            </Reveal>
            <ol className="md:col-span-8">
              {p.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 50}>
                  <div className="group grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-6 first:border-t">
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {f}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          <section className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="kicker">Технологии</p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3 md:col-span-8">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-line-strong px-5 py-2.5 text-lg transition-colors hover:bg-foreground hover:text-background">
                  {s}
                </span>
              ))}
            </Reveal>
          </section>

          {/* Навигация между проектами */}
          <nav className="mt-28 grid border-t border-line md:mt-40 md:grid-cols-2">
            {[
              { label: "Предыдущий", p: prev },
              { label: "Следующий", p: next },
            ].map(({ label, p: n }, i) => (
              <Link
                key={label}
                to="/projects/$slug"
                params={{ slug: n.slug }}
                data-cursor="Перейти"
                className={`group block py-10 md:py-16 ${i === 1 ? "border-t border-line md:border-l md:border-t-0 md:pl-10 md:text-right" : "md:pr-10"}`}
              >
                <p className="kicker">{label} проект</p>
                <p className="display-xl mt-4 text-[clamp(2.4rem,5vw,5rem)] transition-colors duration-500 group-hover:text-outline">
                  {n.name}
                </p>
              </Link>
            ))}
          </nav>

          <footer className="flex items-center justify-between border-t border-line py-6">
            <p className="kicker">© {new Date().getFullYear()} Цечоев Абдурахман</p>
            <Link to="/" hash="contact" className="kicker hover:text-foreground">
              Связаться →
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}