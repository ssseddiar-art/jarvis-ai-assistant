from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

app = FastAPI(title="J.A.R.V.I.S", version="1.0.0")

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
    return {"status": "J.A.R.V.I.S is online"}


@app.post("/ask")
def ask(req: PromptRequest):
    if not client:
        return {"reply": "OPENAI_API_KEY ontbrekt. .env ішіндегі API key-ті қосыңыз."}

    response = client.responses.create(
        model="gpt-4o-mini",
        input=req.text,
    )

    return {"reply": response.output_text}
