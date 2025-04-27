import os
import sentry_sdk
from sentry_sdk.integrations.asgi import SentryAsgiMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
import requests
import pandas as pd
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Initialize Sentry and instrument OpenTelemetry
sentry_sdk.init(dsn=os.getenv("SENTRY_DSN", ""), traces_sample_rate=1.0)

app = FastAPI(title="RecruitX Reporting Service")
app.add_middleware(SentryAsgiMiddleware)
FastAPIInstrumentor.instrument_app(app)

# Base URL for experiment service
EXP_SERVICE_URL = os.getenv("EXPERIMENT_SERVICE_URL", "http://localhost:8001")

@app.get("/api/reports/experiments/stats")
async def get_experiment_stats():
    resp = requests.get(f"{EXP_SERVICE_URL}/api/experiments/history")
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch experiment history")
    history = resp.json()
    if not history:
        return {"stats": {}}
    df = pd.DataFrame(history)
    metrics_df = pd.json_normalize(df["metrics"])
    mean_metrics = metrics_df.mean().to_dict()
    return {"stats": mean_metrics}

@app.get("/api/reports/experiments/excel")
async def download_experiment_excel():
    resp = requests.get(f"{EXP_SERVICE_URL}/api/experiments/history")
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch experiment history")
    data = resp.json()
    df = pd.json_normalize(data)
    buf = io.BytesIO()
    with pd.ExcelWriter(buf, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="ExperimentHistory")
    buf.seek(0)
    headers = {"Content-Disposition": "attachment; filename=experiment_history.xlsx"}
    return StreamingResponse(buf, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers=headers)

@app.get("/api/reports/experiments/pdf")
async def download_experiment_pdf():
    resp = requests.get(f"{EXP_SERVICE_URL}/api/experiments/history")
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch experiment history")
    data = resp.json()
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    width, height = letter
    margin = 50
    y = height - margin
    c.setFont("Helvetica-Bold", 16)
    c.drawString(margin, y, "RecruitX Experiment History Report")
    y -= 30
    c.setFont("Helvetica", 10)
    # Table header
    if data:
        headers = list(data[0]["params"].keys()) + ["objective"]
        header_line = " | ".join(headers)
        c.drawString(margin, y, header_line)
        y -= 20
        for row in data:
            params = row.get("params", {})
            metrics = row.get("metrics", {})
            row_vals = [str(params.get(k, "")) for k in headers[:-1]] + [str(metrics.get("objective", ""))]
            line = " | ".join(row_vals)
            c.drawString(margin, y, line)
            y -= 15
            if y < margin:
                c.showPage()
                y = height - margin
    c.save()
    buf.seek(0)
    headers = {"Content-Disposition": "attachment; filename=experiment_history.pdf"}
    return StreamingResponse(buf, media_type="application/pdf", headers=headers)
