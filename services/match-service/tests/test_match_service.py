import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_vectorize_and_match():
    # Vectorize a document and verify match
    resp = client.post("/vectorize", json={"id": "doc1", "text": "hello world"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == "doc1"
    vector = data["vector"]
    # Match using the same vector
    resp2 = client.post("/match", json={"vector": vector, "top_k": 1})
    assert resp2.status_code == 200
    result = resp2.json()
    assert "matches" in result
    assert result["matches"][0]["id"] == "doc1"
    assert isinstance(result["matches"][0]["score"], float)

def test_summarize(monkeypatch):
    # Mock OpenAI ChatCompletion
    class DummyChoice:
        def __init__(self, content):
            self.message = type("M", (), {"content": content})
    class DummyResp:
        choices = [DummyChoice("Mock summary.")]
    def dummy_create(**kwargs):
        return DummyResp()
    monkeypatch.setattr("openai.ChatCompletion.create", dummy_create)
    resp = client.post("/summarize", json={
        "job_text": "Senior dev", 
        "candidate_text": "Experienced software engineer"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["summary"] == "Mock summary."
