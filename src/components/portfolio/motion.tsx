import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

/** Появление блока при прокрутке */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  variant,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "clip";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset["visible"] = "true";
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": variant ?? "",
      style: { "--delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}

/** Разбивает строку на буквы с каскадной анимацией */
export function SplitChars({
  text,
  baseDelay = 0,
  step = 35,
  className,
}: {
  text: string;
  baseDelay?: number;
  step?: number;
  className?: string;
}) {
  return (
    <span aria-label={text} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`char ${className ?? ""}`}
          style={{ animationDelay: `${baseDelay + i * step}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 3D-наклон элемента за мышью */
export function useTilt<T extends HTMLElement>(strength = 8): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
        el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return ref;
}

/** «Магнитная» кнопка — слегка тянется к курсору */
export function useMagnetic<T extends HTMLElement>(power = 0.3): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * power}px, ${y * power}px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [power]);
  return ref;
}