from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

SYSTEM_PROMPT = """
Сіз Q.Y.R.A.N — жаңа буындағы қазақша цифрлық AI көмекші.
Сіздің стильіңіз:
- табиғи қазақша
- жылы, әсерлі
- мәдениетті
- нақты, қысқа, түсінікті
- практикалық, нәтижелі

Сіздің негізгі миссия:
1. Пайдаланушының сұрағын толық түсіну.
2. Енгізілген контекстті ескеру.
3. Қажет болса, нақты қосымша сұрақ қою.
4. Шешімді қысқа, бірақ толық, практикалық түрде беру.
5. Білімсіздікті мойындап, жалған ақпарат бермеу.
6. Қазақ тілінде, табиғи және жылы стильде сөйлесу.
"""

app = FastAPI(title="Q.Y.R.A.N", version="1.0.0")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*")
origins = ["*"] if allowed_origins == "*" else allowed_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None

memory_store: Dict[str, List[str]] = {}
task_store: List[str] = []


class PromptRequest(BaseModel):
    text: str
    history: Optional[List[dict]] = []


class TaskRequest(BaseModel):
    title: str


@app.get("/")
def root():
    return {"status": "Q.Y.R.A.N is online"}


@app.post("/ask")
def ask(req: PromptRequest):
    if not client:
        return {"reply": "OPENAI_API_KEY жоқ. .env ішіндегі key-ті қосыңыз."}

    context_text = build_context(req.history or [])
    user_input = req.text
    full_prompt = user_input
    if context_text:
        full_prompt = f"Контекст:\n{context_text}\n\nПайдаланушы: {user_input}"

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": full_prompt},
            ],
            temperature=0.7,
            max_tokens=1000,
        )

        reply = response.choices[0].message.content
        session_key = "default"
        memory_store.setdefault(session_key, [])
        memory_store[session_key].append(user_input)
        memory_store[session_key].append(reply)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Қате шықты: {str(e)}")


@app.get("/tasks")
def get_tasks():
    return {"tasks": task_store}


@app.post("/tasks")
def add_task(req: TaskRequest):
    title = req.title.strip()
    if not title:
        raise HTTPException(status_code=400, detail="Тапсырма мәтіні бос болмауы керек.")
    task_store.append(title)
    return {"ok": True, "tasks": task_store}


@app.delete("/tasks/{index}")
def delete_task(index: int):
    try:
        task_store.pop(index)
        return {"ok": True, "tasks": task_store}
    except IndexError:
        raise HTTPException(status_code=404, detail="Тапсырма табылмады")


def build_context(history: List[dict]) -> str:
    if not history:
        return ""

    lines: List[str] = []
    for item in history[-10:]:
        role = item.get("role")
        content = item.get("content", "")
        if not content:
            continue
        if role == "user":
            lines.append(f"Пайдаланушы: {content}")
        elif role == "assistant":
            lines.append(f"Q.Y.R.A.N: {content}")
    return "\n".join(lines)
