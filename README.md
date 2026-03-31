# Hogwarts CRUD (PHP + React)

Учебный проект: PHP REST API + React SPA для работы с БД `hogwarts`.

## Требования

- OSPanel с доменом `hogwarts.local`
- PHP 8.x + MySQL
- Node.js + npm
  https://nodejs.org/en/download

## Быстрый старт

1. Убедитесь, что проект лежит в `C:\OSPanel\home\hogwarts_react.local`.
2. Проверьте/заполните файл `.env` (уже создан):

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=hogwarts
DB_USER=root
DB_PASS=
```

3. Запустите OSPanel и включите домен `hogwarts.local`.
4. Установите фронтенд-зависимости:

```bash
cd frontend
npm install
```

5. Запустите фронтенд:

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:5173`.

## Как протестировать проект

### 1) Проверка API напрямую

Откройте в браузере:

- `http://hogwarts.local/api/spell/index.php`
- `http://hogwarts.local/api/student/index.php`
- `http://hogwarts.local/api/mastery/index.php`

Ожидаемо: JSON-ответы без PHP ошибок.

### 2) Проверка UI

Откройте `http://localhost:5173` и проверьте:

- Главная страница с 3 карточками (Заклинания, Студенты, Освоение).
- Навигация подсвечивает активный пункт.
- Таблицы загружаются и нумерация идет через `#`.
- Add/Edit формы работают.
- После успешного сохранения показывается success-сообщение и через ~2 сек редирект к списку.
- Удаление работает через модальное окно подтверждения.
- При дубликатах в `spell/mastery` показывается `alert--error`.

### 3) Полезные проверки в DevTools

- Вкладка `Network`: статусы 200/201/204, без 500.
- Вкладка `Console`: без ошибок React/JS.

## Команды

```bash
# dev
cd frontend
npm run dev

# production build
npm run build
```

## Структура

- `api/` — PHP endpoint-ы (`spell`, `student`, `mastery`)
- `frontend/` — React + Vite + SCSS
- `.env` — локальные настройки БД
- `.env.example` — шаблон
