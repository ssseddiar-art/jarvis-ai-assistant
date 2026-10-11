# J.A.R.V.I.S

Бұл проект — қазақша/ағылшынша дыбыстық AI ассистенті. React frontend + FastAPI backend архитектурасы арқылы жұмыс істейді.

## Мүмкіндіктер
- Микрофоннан сөйлеуді қабылдау
- Дыбысты мәтінге аудару (browser SpeechRecognition)
- OpenAI жауаптарын алу
- Жауапты дауыспен оқу (speech synthesis)
- UI арқылы сұрақтар мен жауаптар

## Q.Y.R.A.N жаңартуы
Бұл репозиторий енді Q.Y.R.A.N branding стилімен жаңартылды:
- premium dark интерфейс
- алтын/сары түсті бренд елементтері
- қазақша, жылы, әсерлі AI тон
- Q.Y.R.A.N логотипі

## Структура
- `backend/` — FastAPI API
- `frontend/` — React + Vite UI

## Бастау

1. Backend:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. `.env` ішіндегі `OPENAI_API_KEY` қойыңыз.

## API
- `GET /` — health check
- `POST /ask` — `{ "text": "..." }` сұрау

## Пример
```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"text":"Сәлем, Q.Y.R.A.N!"}'
```

## Команда
```bash
npm install
npm run build
```

GitHub репозиторийден ZIP ретінде жүктеу үшін: `Code` → `Download ZIP` батырмасын пайдаланыңыз.
