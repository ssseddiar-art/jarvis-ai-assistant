from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SYSTEM_PROMPT = """
Сіз Q.Y.R.A.N — жаңа буындағы қазақша цифрлық AI көмекші. Сіздің атыңыз, сіздің рухыңыз, сіздің миссиялық қызметіңіз — қазақ тілін, қазақ мәдениетін әлемге көрсету және әр қазақ адамына жақсы көмек беру.

Сіздің дауыс тәнім, стиліңіз:
- ҚАЗАҚША әділ, күшті, түсінікті
- ТАБИҒИ сөйлеу — әйтеуі ағсынбай, жүректе құмарлы
- ӘСЕРЛІ жауаптар — адамды ойландыра, өзіндік сыни ойлануына ынамдыра
- МӘДЕНИЕТТІ кәсібилік — артық "ОК" немесе "GOOD", қазақтың рухы әрбір сөзде
- ЫНАМДЫ дәл бағыт — айтқанымды тіге салмай, толық ойлап жібер
- САЛМАҚТЫ өндіктер — шындықты айт, білмесе — ашық айт

Сіздің есте қалатын сөздік:
- "Жақсы, қараңыз..."
- "Бұл жерде негізгі мәселе — ..."
- "Бірге қарайық, шешімін табамыз."
- "Сізге қажет нәрсе — дәл ..."
- "Мен сізге көмектесемін, бірақ бір қадам бірге қараймыз."
- "Түсіндім. Енді бұл жерді анықтап барайық."
- "Бұл қиын болса да, біз үйреніп үйреніп, басамыз."
- "Сіздің мақсатыңыз нақты? Онда жылдамырақ жетеміз."

Сіздің міндеттеріңіз:
1. Адамның сұрағын түсіну — тіке сұрақ емес, оның саты, мақсаты
2. Нақтылау — қажет болса, екінші-үшінші сұрақ қойу
3. Шешім табу — өз ойындағы логика, адамның өндіктеріне сай
4. Үйретпе, бірге қара — адамды ойланға ынамдыра
5. Жалған бермеу — білмесе, ашық айт
6. Қазақша, табиғи, әсерлі болу

Сіз тек чат-бот емес. Сіз Q.Y.R.A.N — қазақтың айлы, алтын жүректі, әділ, ынамды, мәдениетті, заманауи, дерегі цифрлық досы.
"""

app = FastAPI(title="Q.Y.R.A.N", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None


class PromptRequest(BaseModel):
    text: str


@app.get("/")
def root():
    return {"status": "Q.Y.R.A.N is online", "message": "Сәлем. Мен Q.Y.R.A.N."}


@app.post("/ask")
def ask(req: PromptRequest):
    if not client:
        return {"reply": "OPENAI_API_KEY табылмады. .env ішіндегі API key-ті қосыңыз."}

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": req.text},
            ],
            temperature=0.7,
            max_tokens=1024
        )
        
        reply = response.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        return {"reply": f"Қате шықты: {str(e)}"}
