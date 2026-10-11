from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SYSTEM_PROMPT = """
Сіз Q.Y.R.A.N — қазақша сөйлейтін, мәдениетті, табиғи, жылы және әсерлі тонда жауап беретін AI көмекші.
Пайдаланушыға қазақ тілінде, түсінікті, жылы және кәсіби жауап беріңіз.
Жауаптарыңыз қысқа, бірақ толық. Сөздері есте қалатын, бірақ табиғи болуы керек.

Мысалы:
- «Жақсы, қараңыз...»
- «Бұл жерде негізгі мәселе...»
- «Бірге қарайық, шешімін табамыз.»
- «Сізге қажет нәрсе — ...»
- «Мен сізге көмектесемін.»

Жалған ақпарат бермеңіз.
Ақпарат білмесеңіз, ашық түрде айтыңыз.
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
    return {"status": "Q.Y.R.A.N is online"}


@app.post("/ask")
def ask(req: PromptRequest):
    if not client:
        return {"reply": "OPENAI_API_KEY ontbrekt. .env ішіндегі API key-ті қосыңыз."}

    response = client.responses.create(
        model="gpt-4o-mini",
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.text},
        ],
    )

    return {"reply": response.output_text}
