# Q.Y.R.A.N

🦅 **Q.Y.R.A.N** — жаңа буындағы қазақша цифрлық AI көмекші.

> Мен Q.Y.R.A.N. Қазақтың рухын, алтын жүрегін, әділ ойлануын әлемге көрсетемін.

## 🌟 Төртінші қызмет
- ✅ **Қазақша табиғи сөйлеу** — кәсіби, әсерлі, жылы
- ✅ **Премиум интерфейс** — футуристік, темноте, алтын брендинг
- ✅ **Дыбыстық режим** — микрофон + TTS
- ✅ **Қызықты диалог** — сұрағыңызды нәтижеге дейін ұстап отыру
- ✅ **Мәдениетті** — қазақ мәдениетін құрметтеген AI

## 🚀 Тез басқа

### Backend:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Браузер:
```
http://localhost:5173
```

### OpenAI API Key
`.env` ішіне:
```env
OPENAI_API_KEY=sk_...
```

## 🔌 API
- `GET /` — health check
- `POST /ask` — `{ "text": "..." }`

## 📝 Мысал
```bash
curl -X POST http://localhost:8000/ask \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Сәлем, Q.Y.R.A.N!"}'
```

## 🎯 Мәселе
- Код жазу және debugging
- Жоспарлау және архитектура
- Мәтін және құжат өңдеу
- Өйту және консультация
- Өндік дауыс және табиғи AI

## 📦 Технология
- **Frontend:** React + Vite + TypeScript
- **Backend:** FastAPI (Python)
- **AI:** OpenAI GPT-4o-mini
- **Voice:** Web Speech API
- **Design:** Premium dark theme with gold accents

## 👨‍💻 GitHub
```
git clone https://github.com/ssseddiar-art/jarvis-ai-assistant.git
cd jarvis-ai-assistant
```

## ⚖️ License
Open source — сіздің өндіктеріңіз үшін.

---

**Q.Y.R.A.N** — қазақ тілінің, қазақ мәдениетінің, қазақ ойлауының AI көлеңкесі.
