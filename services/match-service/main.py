from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
import sentry_sdk
from sentry_sdk.integrations.asgi import SentryAsgiMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
import openai
from starlette_exporter import PrometheusMiddleware, handle_metrics

app = FastAPI(title="RecruitX Matching Service")

# Initialize Sentry and instrument OpenTelemetry
sentry_sdk.init(dsn=os.getenv("SENTRY_DSN", ""), traces_sample_rate=1.0)
app.add_middleware(SentryAsgiMiddleware)
FastAPIInstrumentor.instrument_app(app)

# Prometheus metrics
app.add_middleware(PrometheusMiddleware)
app.add_route("/metrics", handle_metrics)

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")
dimension = model.get_sentence_embedding_dimension()

# Initialize FAISS index
index = faiss.IndexFlatL2(dimension)
id_mapping: List[str] = []

# Request schemas
class Document(BaseModel):
    id: str
    text: str

class MatchRequest(BaseModel):
    vector: List[float]
    top_k: int = 5

class SummarizeRequest(BaseModel):
    job_text: str
    candidate_text: str

@app.post("/vectorize")
async def vectorize(doc: Document) -> Dict:
    embedding = model.encode(doc.text).astype("float32")
    index.add(np.array([embedding]))
    id_mapping.append(doc.id)
    return {"id": doc.id, "vector": embedding.tolist()}

@app.post("/match")
async def match(req: MatchRequest) -> Dict:
    vec = np.array([req.vector]).astype("float32")
    distances, indices = index.search(vec, req.top_k)
    matches = []
    for dist, idx in zip(distances[0], indices[0]):
        if idx < len(id_mapping):
            matches.append({"id": id_mapping[idx], "score": float(dist)})
    return {"matches": matches}

@app.post("/summarize")
async def summarize(req: SummarizeRequest) -> Dict[str, str]:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    prompt = (
        "You are a recruitment AI assistant. "
        f"Given the job description: {req.job_text} "
        f"and candidate profile: {req.candidate_text}, "
        "write a concise summary explaining why the candidate is a good match."
    )
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You summarize candidate-job matches."},
            {"role": "user", "content": prompt},
        ]
    )
    summary = resp.choices[0].message.content
    return {"summary": summary}
