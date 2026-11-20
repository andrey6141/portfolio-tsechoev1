import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "Обо мне" },
  { href: "/#work", label: "Проекты" },
  { href: "/#stack", label: "Стек" },
  { href: "/#contact", label: "Контакты" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full border border-line-strong font-mono text-[0.7rem] tracking-wider transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
            ЦА
          </span>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Цечоев&nbsp;А. — Web&nbsp;Developer
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[0.72rem] uppercase tracking-[0.16em] text-silver transition-colors hover:text-foreground"
            >
              <span className="mr-1.5 text-faint">0{i + 1}</span>
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          className="relative z-50 flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line-strong md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-4 bg-foreground transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-foreground transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Мобильное меню — отдельный полноэкранный экран */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-28 transition-[clip-path] duration-700 md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav className="flex flex-col">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-5"
            >
              <span className="display-xl text-[2.6rem]">{l.label}</span>
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <p className="kicker">Открыт к новым проектам</p>
      </div>
    </header>
  );
}