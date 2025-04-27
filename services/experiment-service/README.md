# RecruitX Experiment Service

This FastAPI service handles hyperparameter tuning and experiment tracking using MLflow, Optuna, and Weights & Biases.

## Setup

```bash
cd services/experiment-service
pip install -r requirements.txt
```  

## Running

```bash
uvicorn main:app --reload --port 8001
```

## Endpoints

- POST `/api/experiments/launch`  
  Launches a hyperparameter tuning study. Expects JSON body:
  ```json
  {
    "n_trials": 10,
    "param_grid": {"lr": [0.01, 0.1], "batch_size": [16, 32]}
  }
  ```

- GET `/api/experiments/history`  
  Returns a list of past runs with params & metrics.
