# FinApp

Небольшое pet-приложение для управления финансами.  
Состоит из страниц для учета счетов, транзакций и категорий, с сохранением данных в `localStorage` через **redux-persist**.
**https://finapp-iota.vercel.app/**
## 🚀 Стек технологий

- **React 19** + **React Router 7** – UI и маршрутизация
- **Redux Toolkit** + **redux-persist** – управление состоянием и хранение данных
- **Shadcn/ui** + **Tailwind CSS** – UI-компоненты и стили
- **React Hook Form** + **Zod** – работа с формами и валидация
- **Vite** + **TypeScript** – сборка и разработка

## 📂 Структура приложения

### Store (`store.ts`)
- `accountsSlice` – управление счетами
- `transactionsSlice` – управление транзакциями
- `categoriesSlice` – категории расходов/доходов
- данные сохраняются в `localStorage` с помощью `redux-persist`

### Router (`router.ts`)
- `/` → `Dashboard` (главная)
- `/accounts` → `Accounts` (страница счетов)
- `/categories` → `Categories` (категории)
- `/transactions` → `Transactions` (транзакции)
- общий лэйаут: `RootLayout`

## 📦 Скрипты

```bash
npm run dev       # запуск dev-сервера
npm run build     # сборка проекта
npm run preview   # предпросмотр собранного билда
npm run lint      # линтинг eslint
```
## 🛠 Установка и запуск

```bash
# клонирование репозитория
git clone https://github.com/your-username/finapp.git
cd finapp

# установка зависимостей
npm install

# запуск dev-сервера
npm run dev
```

## 🔮 Планы по развитию

- [ ] Добавить авторизацию
- [ ] Подключить бэкенд / API
- [ ] Экспорт/импорт данных
- [ ] Темизация (светлая/тёмная)
- [ ] Деплой на Pages/netlify/vercel
