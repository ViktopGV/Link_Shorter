# 🔗 Link Shortener

Простой сервис для сокращения ссылок с использованием **FastAPI** на бэкенде и **React** на фронтенде.

---

### 1. ⚙️ Настройка окружения
```bash
cp .env.example .env
```
### 2. 🐍 Запуск бэкенда
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
uvicorn app.main:app --reload
```
Открой документацию по API:
👉 http://127.0.0.1:8000/docs

### 3. ⚛️ Запуск фронтенда
```bash
cd frontend
npm install
npm run dev
```
Открой клиент:
👉 http://localhost:5173/

### 📌 Возможности
Сокращение длинных URL

Переход по короткой ссылке → редирект на оригинальную

Подсчёт количества переходов

Валидация ссылок

Swagger UI для тестирования API

🛠 Используемые технологии

Backend: FastAPI, SQLAlchemy, SQLite

Frontend: React, Axios, Vite
