---
name: avm-models
description: Covers imo.cv AVM (Automated Valuation Model): feature engineering, hybrid/XGBoost models, uncertainty (AVMU), and training pipeline. Use when working on price estimation, market data, or AVM APIs.
---

# AVM Models – imo.cv

Reference: [Data Scientist Agent](../agents/data-scientist.md) for full architecture and code.

## When to Use

- Implementing or changing price estimation endpoints.
- Adding features for AVM (property, location, market, temporal).
- Training, versioning, or evaluating AVM models.
- Exposing confidence intervals or comparables.

## Phases

1. **Hybrid**: Hedonic regression + KNN comparables; blend 70% hedonic / 30% comparables.
2. **XGBoost**: Island-specific or global; log(price) target; MAPE/MAE evaluation.
3. **AVMU**: Uncertainty quantification; 95% CI and confidence score from prediction error model.

## Targets

- MAPE < 15%, MAE < 2M CVE.
- Prediction latency < 2s.
- Weekly retraining (Celery); model registry for versions.

## Escalation

Changes to pricing algorithm or model strategy should be reviewed per [Supervisor](../agents/supervisor.md) escalation rules.
