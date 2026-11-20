/** Обложка VIDEO MASTER, нарисованная кодом: экран Telegram-чата с реальными ответами бота */
export function BotCover() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-surface">
      <div className="grid-lines absolute inset-0 opacity-30" />
      <span className="display-xl pointer-events-none absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 whitespace-nowrap text-[9vw] text-outline opacity-40 md:text-[6.5vw]">
        VIDEO MASTER
      </span>
      <div className="relative w-[58%] max-w-[300px] rounded-[2rem] border border-line-strong bg-background p-3 shadow-deep transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
        <div className="flex items-center gap-2 border-b border-line px-2 pb-3 pt-1">
          <span className="grid size-7 place-items-center rounded-full bg-foreground font-mono text-[0.6rem] font-bold text-background">
            VM
          </span>
          <div className="leading-tight">
            <p className="text-[0.7rem] font-semibold">VIDEO MASTER</p>
            <p className="font-mono text-[0.55rem] text-muted-foreground">бот</p>
          </div>
        </div>
        <div className="space-y-2 px-1 py-3 text-[0.62rem] leading-snug">
          <p className="ml-auto w-fit rounded-xl rounded-br-sm bg-graphite-hover px-2.5 py-1.5">/start</p>
          <p className="w-[88%] rounded-xl rounded-bl-sm bg-graphite px-2.5 py-1.5 text-silver">
            👋 Добро пожаловать в VIDEO MASTER! Отправь ссылку YouTube, чтобы проверить информацию о видео.
          </p>
          <p className="ml-auto w-fit rounded-xl rounded-br-sm bg-graphite-hover px-2.5 py-1.5">youtu.be/…</p>
          <p className="w-[70%] rounded-xl rounded-bl-sm bg-graphite px-2.5 py-1.5 text-silver">🎬 Название · Автор · ID</p>
        </div>
        <div className="grid grid-cols-2 gap-1 px-1 pb-1 font-mono text-[0.5rem] text-muted-foreground">
          {["🎬 Скачать видео", "👤 Мой профиль", "🎁 Мои лимиты", "❓ Помощь"].map((b) => (
            <span key={b} className="truncate rounded-md border border-line px-1.5 py-1 text-center">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}