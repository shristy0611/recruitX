from fastapi import FastAPI
from pydantic import BaseModel
import mlflow
import optuna
import wandb
from typing import Any, Dict, List
import os
import sentry_sdk
from sentry_sdk.integrations.asgi import SentryAsgiMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from starlette_exporter import PrometheusMiddleware, handle_metrics

# Initialize Sentry and instrument OpenTelemetry
sentry_sdk.init(dsn=os.getenv("SENTRY_DSN", ""), traces_sample_rate=1.0)

app = FastAPI(title="RecruitX Experiment Service")
app.add_middleware(SentryAsgiMiddleware)
FastAPIInstrumentor.instrument_app(app)

# Prometheus metrics
app.add_middleware(PrometheusMiddleware)
app.add_route("/metrics", handle_metrics)

class ExperimentLaunchParams(BaseModel):
    n_trials: int
    param_grid: Dict[str, List[float]]  # hyperparameter grid

@app.post("/api/experiments/launch")
async def launch_experiment(params: ExperimentLaunchParams):
    # Initialize Weights & Biases
    wandb.init(project="RecruitX-Experiments", config=params.param_grid)
    # Set MLflow experiment
    mlflow.set_experiment("RecruitX-Experiments")

    study = optuna.create_study(direction="maximize")

    def objective(trial: optuna.Trial) -> float:
        # Suggest hyperparameters
        sug: Dict[str, Any] = {}
        for name, values in params.param_grid.items():
            sug[name] = trial.suggest_categorical(name, values)
        # Dummy metric: sum of param values (replace with real training/eval)
        metric = sum(float(v) for v in sug.values())
        # Log to MLflow and W&B
        mlflow.log_metrics(sug)
        mlflow.log_metric("objective", metric)
        wandb.log({"objective": metric, **sug})
        return metric

    study.optimize(objective, n_trials=params.n_trials)
    best = study.best_params
    return {"study_name": study.study_name, "best_params": best}

@app.get("/api/experiments/history")
async def get_experiment_history():
    # Fetch all runs from MLflow
    runs = mlflow.search_runs(experiment_names=["RecruitX-Experiments"])
    history: List[Dict[str, Any]] = []
    for _, row in runs.iterrows():
        params = {k.replace("params.", ""): row[k] for k in row.index if k.startswith("params.")}
        metrics = {k.replace("metrics.", ""): row[k] for k in row.index if k.startswith("metrics.")}
        history.append({"run_id": row["run_id"], "params": params, "metrics": metrics})
    return history
