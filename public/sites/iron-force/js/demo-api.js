/*
 * Демо-режим IRON FORCE для портфолио.
 * Оригинальный проект работает с Node.js API (server/). Здесь запросы к /api
 * обрабатываются прямо в браузере, а данные хранятся в localStorage посетителя,
 * чтобы каталог, заявки и админ-панель можно было попробовать без сервера.
 */
(function () {
  var KEY = 'iron-force-demo-v1';
  var SESSION = 'iron-force-demo-admin';
  var SEED = [
    ['Гусеничный экскаватор X240','Экскаваторы','IRON FORCE',2024,'176 л.с.','24 000 кг',12800000,18500,'В наличии','Тестовая позиция','Универсальный экскаватор для земляных и строительных работ.','https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1200&q=85'],
    ['Бульдозер D8 Pro','Бульдозеры','IRON FORCE',2023,'354 л.с.','38 500 кг',24600000,32000,'Под заказ','Тестовая позиция','Мощная машина для планировки и перемещения грунта.','https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85'],
    ['Фронтальный погрузчик FL950','Погрузчики','IRON FORCE',2025,'220 л.с.','17 200 кг',9800000,14500,'В наличии','Тестовая позиция','Производительный погрузчик для карьеров и площадок.','https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&w=1200&q=85'],
    ['Автокран AC60','Автокраны','IRON FORCE',2022,'300 л.с.','41 000 кг',19300000,27000,'В наличии','Тестовая позиция','Автокран для монтажных и инфраструктурных задач.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85'],
    ['Карьерный самосвал HT40','Самосвалы','IRON FORCE',2024,'420 л.с.','32 000 кг',16400000,22000,'Под заказ','Тестовая позиция','Самосвал для транспортировки сыпучих материалов.','https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85']
  ];
  var FIELDS = ['name','category','brand','year','power','weight','price','rent_price','status','condition','description','image'];

  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.equipment) return s; } catch (e) {}
    var state = { nextId: 1, nextInquiry: 1, equipment: [], inquiries: [] };
    SEED.forEach(function (row) {
      var item = { id: state.nextId++ };
      FIELDS.forEach(function (f, i) { item[f] = row[i]; });
      item.created_at = new Date().toISOString();
      state.equipment.push(item);
    });
    save(state);
    return state;
  }
  function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
  function json(data, status) {
    return new Response(JSON.stringify(data), { status: status || 200, headers: { 'Content-Type': 'application/json' } });
  }
  function isAdmin() { return sessionStorage.getItem(SESSION) === '1'; }
  function pick(d) { var o = {}; FIELDS.forEach(function (f) { if (d[f] !== undefined) o[f] = d[f]; }); return o; }
  function readFile(file) {
    return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsDataURL(file); });
  }

  async function handle(path, method, body) {
    var s = load(), m;
    if (path === '/api/equipment' && method === 'GET') return json(s.equipment.slice().reverse());
    if ((m = path.match(/^\/api\/equipment\/(\d+)$/)) && method === 'GET') {
      var it = s.equipment.find(function (x) { return x.id == m[1]; });
      return it ? json(it) : json({ error: 'Техника не найдена' }, 404);
    }
    if (path === '/api/inquiries' && method === 'POST') {
      var d = JSON.parse(body || '{}');
      if (!d.name || !d.phone) return json({ error: 'Укажите имя и телефон' }, 400);
      s.inquiries.unshift({ id: s.nextInquiry++, name: d.name, phone: d.phone, email: d.email || '', equipment: d.equipment || '', deal: d.deal || '', comment: d.comment || '', status: 'Новая', created_at: new Date().toLocaleString('ru-RU') });
      save(s);
      return json({ ok: true, message: 'Заявка сохранена (демо-режим) — она появится в админ-панели.' });
    }
    if (path === '/api/admin/login' && method === 'POST') {
      var c = JSON.parse(body || '{}');
      if (c.username === 'demo' && c.password === 'demo') { sessionStorage.setItem(SESSION, '1'); return json({ ok: true }); }
      return json({ error: 'Демо-доступ: логин demo, пароль demo' }, 401);
    }
    if (path.indexOf('/api/admin/') === 0 && !isAdmin()) return json({ error: 'Требуется вход' }, 401);
    if (path === '/api/admin/logout') { sessionStorage.removeItem(SESSION); return json({ ok: true }); }
    if (path === '/api/admin/me') return json({ ok: true, user: 'demo' });
    if (path === '/api/admin/inquiries') return json(s.inquiries);
    if ((m = path.match(/^\/api\/admin\/inquiries\/(\d+)$/)) && method === 'PATCH') {
      var st = JSON.parse(body || '{}').status;
      s.inquiries.forEach(function (x) { if (x.id == m[1]) x.status = st; }); save(s); return json({ ok: true });
    }
    if (path === '/api/admin/equipment' && method === 'POST') {
      var n = pick(JSON.parse(body || '{}')); n.id = s.nextId++; n.created_at = new Date().toISOString();
      s.equipment.push(n); save(s); return json(n);
    }
    if ((m = path.match(/^\/api\/admin\/equipment\/(\d+)$/))) {
      if (method === 'PUT') { var u = pick(JSON.parse(body || '{}')); s.equipment = s.equipment.map(function (x) { return x.id == m[1] ? Object.assign(x, u) : x; }); save(s); return json({ ok: true }); }
      if (method === 'DELETE') { s.equipment = s.equipment.filter(function (x) { return x.id != m[1]; }); save(s); return json({ ok: true }); }
    }
    if (path === '/api/admin/upload' && body instanceof FormData) {
      var f = body.get('photo'); if (!f || !f.size) return json({ error: 'Выберите JPG, PNG или WebP' }, 400);
      return json({ url: await readFile(f) });
    }
    return json({ error: 'Неизвестный запрос' }, 404);
  }

  var nativeFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input.url;
    var u = new URL(url, location.href);
    if (u.origin === location.origin && u.pathname.indexOf('/api/') === 0) {
      return handle(u.pathname, ((init && init.method) || 'GET').toUpperCase(), init && init.body);
    }
    return nativeFetch(input, init);
  };
})();