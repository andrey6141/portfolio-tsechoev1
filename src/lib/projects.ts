// Обложки лежат в public/images, чтобы сайт работал на любом хостинге (Cloudflare и т.п.).
const ironCover = { url: "/images/iron-force-cover.jpg" };
const ironCatalog = { url: "/images/iron-catalog-cover.jpg" };
const noirCover = { url: "/images/noir-form-cover.jpg" };
const vantaCover = { url: "/images/vanta-motors-cover.jpg" };

export type Project = {
  slug: string;
  index: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  /** Обложка — снимок реального сайта. У Telegram-бота обложка рисуется кодом. */
  cover: string | null;
  gallery: string[];
  /** Живая версия сайта внутри портфолио */
  liveUrl: string | null;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "iron-force",
    index: "01",
    name: "IRON FORCE",
    type: "Корпоративный сайт · каталог",
    tagline: "Премиальная строительная техника",
    description:
      "Сайт компании по продаже премиальной строительной техники: промышленный дизайн, каталог с поиском и фильтрами, карточки машин, форма заявок и административная панель.",
    features: [
      "Каталог строительной техники",
      "Современный промышленный дизайн",
      "Анимации и 3D-эмблема",
      "Интерактивные элементы",
      "Форма заявок",
      "Административная панель",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "SQLite", "Three.js"],
    cover: ironCover.url,
    gallery: [ironCover.url, ironCatalog.url],
    liveUrl: "/sites/iron-force/index.html",
    note: "В портфолио сайт работает в демо-режиме: каталог, заявки и админ-панель хранят данные в вашем браузере. Вход в админку — логин demo, пароль demo.",
  },
  {
    slug: "noir-form",
    index: "02",
    name: "NOIR / FORM",
    type: "Интернет-магазин",
    tagline: "Парфюмерия характера",
    description:
      "Интернет-магазин нишевой парфюмерии с премиальным тёмным интерфейсом, выразительной типографикой и каталогом ароматов.",
    features: [
      "Каталог товаров",
      "Современный премиальный интерфейс",
      "Стильный дизайн",
      "Административная панель",
      "Управление товарами",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    cover: noirCover.url,
    gallery: [noirCover.url],
    liveUrl: "/sites/noir-form/index.html",
  },
  {
    slug: "video-master",
    index: "03",
    name: "VIDEO MASTER",
    type: "Telegram-бот",
    tagline: "Бот для работы с YouTube-видео",
    description:
      "Telegram-бот, который проверяет ссылки YouTube и показывает публичную информацию о видео. Пользователи, лимиты и история хранятся в базе, а владелец управляет ботом командами прямо в Telegram.",
    features: [
      "Telegram-интерфейс с меню",
      "Система пользователей и лимиты",
      "Управление через Telegram",
      "Административная панель для владельца",
      "Работа с информацией о видео",
    ],
    stack: ["Python", "aiogram 3", "PostgreSQL", "SQLAlchemy", "Redis", "FastAPI", "Docker"],
    cover: null,
    gallery: [],
    liveUrl: null,
  },
  {
    slug: "vanta-motors",
    index: "04",
    name: "VANTA MOTORS",
    type: "Сайт автоцентра",
    tagline: "Премиальные автомобили с характером",
    description:
      "Сайт премиального автомобильного центра: тёмная гамма, каталог автомобилей с подробной информацией, форма заявки и современная навигация.",
    features: [
      "Премиальный автомобильный дизайн",
      "Каталог автомобилей",
      "Информация об автомобилях",
      "Форма заявки",
      "Современная навигация",
      "Тёмная цветовая гамма",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    cover: vantaCover.url,
    gallery: [vantaCover.url],
    liveUrl: "/sites/vanta-motors/index.html",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n]!, next: projects[(i + 1) % n]! };
}