import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

/**
 * Интерактивная демонстрация VIDEO MASTER.
 * Ответы взяты из исходного кода бота (handlers/user.py и handlers/admin.py).
 * Это симуляция в браузере — настоящий бот работает на сервере с PostgreSQL и Redis.
 */
type Msg = { from: "user" | "bot"; text: string };

const START =
  "👋 Добро пожаловать в VIDEO MASTER!\n\nОтправь ссылку YouTube, чтобы проверить информацию о видео. Загрузка доступна для файлов, которые вы вправе скачивать и передавать.\n\n🎁 Бесплатно: 5 загрузок каждые 24 часа.";

const SAMPLE_URL = "https://youtu.be/dQw4w9WgXcQ";

const REPLIES: Record<string, string> = {
  "🎬 Скачать видео":
    "Отправьте ссылку YouTube для проверки информации. Для фактической передачи файла понадобится HTTPS-прямая ссылка на видеофайл, который вы вправе скачивать.",
  "👤 Мой профиль":
    "👤 Профиль VIDEO MASTER\nTelegram ID: 100000001\nБесплатно использовано: 0\nОсталось: 5\nСброс: после первой успешной загрузки",
  "🎁 Мои лимиты":
    "👤 Профиль VIDEO MASTER\nTelegram ID: 100000001\nБесплатно использовано: 0\nОсталось: 5\nСброс: после первой успешной загрузки",
  "📜 История скачиваний": "История пока пуста.",
  "❓ Помощь":
    "Бот показывает публичную информацию о YouTube-видео. Не скачивайте материалы без разрешения правообладателя. Максимальный размер файла — 49 МБ из-за ограничений Telegram Bot API.",
  [SAMPLE_URL]:
    "🎬 Rick Astley - Never Gonna Give You Up (Official Video)\nАвтор: Rick Astley\nID: dQw4w9WgXcQ\n\nYouTube подтвердил доступность метаданных.",
  "/admin":
    "🛡 VIDEO MASTER · ADMIN\nПользователей: —\nВсего запросов: —\nУспешных: —\n\nКоманды:\n/user TELEGRAM_ID — карточка пользователя\n/block TELEGRAM_ID — блокировка\n/unblock TELEGRAM_ID — разблокировка\n/bonus TELEGRAM_ID COUNT — добавить бесплатные загрузки",
};

const MENU = ["🎬 Скачать видео", "👤 Мой профиль", "🎁 Мои лимиты", "📜 История скачиваний", "❓ Помощь"];

function reply(text: string): string {
  if (REPLIES[text]) return REPLIES[text];
  if (/^\/start/.test(text)) return START;
  if (/^\/(user|block|unblock|bonus)\b/.test(text)) return "⛔ Нет доступа.\n\n(В демо вы обычный пользователь — команды владельца доступны только его Telegram ID.)";
  if (/(youtube\.com|youtu\.be)\//i.test(text))
    return "🎬 Ссылка YouTube распознана.\n\nНастоящий бот запросит у YouTube название, автора и ID видео. В демо попробуйте кнопку «🔗 Пример ссылки».";
  return "Пришлите корректную ссылку YouTube или прямую HTTPS-ссылку на разрешённый видеофайл.";
}

export function TelegramDemo() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [admin, setAdmin] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      let answer = reply(t);
      if (t === "/admin" && !admin) answer = "⛔ Нет доступа.";
      setMessages((m) => [...m, { from: "bot", text: answer }]);
      setTyping(false);
    }, 650);
  };

  const started = messages.length > 0;

  return (
    <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-[2.2rem] border border-line-strong bg-background p-2.5 shadow-deep">
      <div className="flex h-[620px] flex-col overflow-hidden rounded-[1.7rem] bg-surface">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-foreground font-mono text-xs font-bold text-background">
            VM
          </span>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-semibold">VIDEO MASTER</p>
            <p className="font-mono text-[0.65rem] text-muted-foreground">{typing ? "печатает…" : "бот"}</p>
          </div>
          <button
            onClick={() => setAdmin((v) => !v)}
            className={`rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider transition-colors ${
              admin ? "border-foreground bg-foreground text-background" : "border-line-strong text-muted-foreground"
            }`}
            aria-pressed={admin}
          >
            {admin ? "Владелец" : "Пользователь"}
          </button>
        </div>

        <div ref={scroller} className="flex-1 space-y-2.5 overflow-y-auto px-3 py-4 text-[0.82rem] leading-snug">
          {!started && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="max-w-[16rem] text-muted-foreground">
                Это демонстрация бота с ответами из его исходного кода. Нажмите «Старт».
              </p>
              <button onClick={() => send("/start")} className="btn-solid">
                Старт
              </button>
            </div>
          )}
          {messages.map((m, i) => (
            <p
              key={i}
              className={`fade-up w-fit max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 ${
                m.from === "user"
                  ? "ml-auto rounded-br-md bg-foreground text-background"
                  : "rounded-bl-md bg-graphite text-foreground"
              }`}
            >
              {m.text}
            </p>
          ))}
          {typing && (
            <p className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-graphite px-3.5 py-3">
              {[0, 1, 2].map((d) => (
                <span key={d} className="typing-dot size-1.5 rounded-full bg-silver" style={{ animationDelay: `${d * 150}ms` }} />
              ))}
            </p>
          )}
        </div>

        {started && (
          <div className="border-t border-line p-2">
            <div className="mb-2 grid grid-cols-2 gap-1.5">
              {MENU.map((b) => (
                <button
                  key={b}
                  onClick={() => send(b)}
                  className="truncate rounded-lg bg-graphite px-2 py-2 text-[0.72rem] transition-colors hover:bg-graphite-hover"
                >
                  {b}
                </button>
              ))}
              <button
                onClick={() => send(SAMPLE_URL)}
                className="truncate rounded-lg bg-graphite px-2 py-2 text-[0.72rem] transition-colors hover:bg-graphite-hover"
              >
                🔗 Пример ссылки
              </button>
              {admin && (
                <button
                  onClick={() => send("/admin")}
                  className="col-span-2 rounded-lg border border-line-strong px-2 py-2 text-[0.72rem] transition-colors hover:bg-graphite-hover"
                >
                  🛡 /admin — панель владельца
                </button>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Сообщение или ссылка YouTube"
                className="min-w-0 flex-1 rounded-full bg-graphite px-4 py-2.5 text-sm outline-none placeholder:text-faint focus:ring-1 focus:ring-ring"
              />
              <button type="submit" aria-label="Отправить" className="grid size-10 place-items-center rounded-full bg-foreground text-background">
                <Send className="size-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}