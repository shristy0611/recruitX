# RecruitX Matching Service

FastAPI microservice for embedding, matching, and summarization of job-candidate data.

## Setup

```bash
cd services/match-service
pip install -r requirements.txt
```

## Running

```bash
export OPENAI_API_KEY=your_key
uvicorn main:app --reload --port 8002
```

## Endpoints

- POST `/vectorize`
  - Adds a document embedding.
  - Body: `{ "id": "doc1", "text": "Your text here" }`

- POST `/match`
  - Retrieves nearest neighbors for a vector.
  - Body: `{ "vector": [/*float array*/], "top_k": 5 }`

- POST `/summarize`
  - Generates a match summary using OpenAI.
  - Body: `{ "job_text": "Job description", "candidate_text": "Candidate profile" }`
