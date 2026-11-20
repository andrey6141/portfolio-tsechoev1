/**
 * Контакты для секции «Связаться».
 * Заполните значения — кнопки станут активными автоматически.
 * Пустое значение показывает кнопку как «скоро».
 */
export type ContactLink = {
  label: string;
  /** Что показать рядом с названием, например @username или адрес почты */
  handle: string;
  /** Полная ссылка: https://t.me/username, mailto:mail@site.ru, https://github.com/... */
  href: string;
};

export const contacts: ContactLink[] = [
  { label: "Telegram", handle: "@tsab77", href: "https://t.me/tsab77" },
  { label: "Email", handle: "", href: "" },
  { label: "GitHub", handle: "", href: "" },
  { label: "VK", handle: "", href: "" },
];

/** Основная ссылка для кнопки «Связаться со мной» на первом экране */
export const primaryContact = contacts.find((c) => c.href) ?? null;