# Hogwarts CRUD (PHP + React)

Учебный проект с PHP REST API, React SPA и базой данных MySQL для работы с сущностями `spell`, `student` и `mastery`.

## Стек

- PHP 8.4
- MySQL 8
- React 19 + Vite
- SCSS
- OSPanel

## Требования

- OSPanel с активным доменом `hogwarts-react.local`
- Node.js и npm
- MySQL 8

## Быстрый старт

1. Убедитесь, что проект находится по пути `C:\OSPanel\home\hogwarts_react.local`.
2. Запустите OSPanel и активируйте домен `hogwarts-react.local`.
3. Создайте базу данных `hogwarts`.
4. Импортируйте дамп `dump-hogwarts-202604011352.sql`.

Через `phpMyAdmin`:

- создайте БД `hogwarts`
- откройте вкладку `Импорт`
- выберите файл `dump-hogwarts-202604011352.sql`
- выполните импорт

Через консоль:

```bash
mysql -u root hogwarts < dump-hogwarts-202604011352.sql
```

5. Проверьте `.env` в корне проекта:

```env
DB_HOST=MySQL-8.0
DB_PORT=3306
DB_NAME=hogwarts
DB_USER=root
DB_PASS=
```

6. Установите зависимости фронтенда:

```bash
cd frontend
npm install
```

7. Запустите Vite:

```bash
npm run dev
```

Фронтенд будет доступен по адресу `http://localhost:5173`.

## Что есть в SQL-дампе

Файл `dump-hogwarts-202604011352.sql` содержит:

- структуру таблиц `spell`, `student`, `mastery`
- тестовые данные
- внешние ключи
- триггер `trg_after_insert_mastery`

Важно: дамп не создаёт базу данных автоматически, поэтому `hogwarts` нужно создать заранее.

## API

Проверьте, что PHP-эндпоинты открываются без ошибок:

- `http://hogwarts-react.local/api/spell/index.php`
- `http://hogwarts-react.local/api/student/index.php`
- `http://hogwarts-react.local/api/mastery/index.php`

Ожидаемый результат: корректный JSON-ответ без PHP ошибок.

## Проверка интерфейса

Откройте `http://localhost:5173` и проверьте:

- главную страницу с разделами заклинаний, студентов и освоений
- загрузку таблиц
- создание, редактирование и удаление записей
- отображение success/error сообщений

## Команды

```bash
cd frontend

# разработка
npm run dev

# production build
npm run build

# линтер
npm run lint
```

## Структура проекта

- `api/` - PHP API
- `frontend/` - React-приложение
- `dump-hogwarts-202604011352.sql` - дамп структуры и тестовых данных БД
- `.env` - локальные настройки подключения к БД
- `.env.example` - пример переменных окружения
