# backend/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import requests
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
OLLAMA_API_URL = "http://localhost:11434/api/generate"

class PromptRequest(BaseModel):
    prompt: str

@app.post("/chat")
def chat_with_ai(request: PromptRequest):
    payload = {
        "model": "llama3",
        "prompt": request.prompt
    }
    response = requests.post(OLLAMA_API_URL, json=payload, stream=True)

    final_response = ""
    for line in response.iter_lines():
        if line:
            data = json.loads(line)
            if "response" in data:
                final_response += data["response"]
    print("FINAL AI RESPONSE:", final_response)

    return {"response": final_response.strip()}
