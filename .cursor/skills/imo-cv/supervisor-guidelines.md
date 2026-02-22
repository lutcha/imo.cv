# Supervisor Guidelines - imo.cv

## Role

Audit and monitor agents' work; identify gaps; plan defensively; coordinate agents; escalate to human architect when needed.

## Decision Framework

- **Proceed (agent approval)**: Low risk, small effort, low reversal cost, no DB/tenant impact (e.g. UI tweaks, non-critical bugs, docs, tests).
- **Review (supervisor approval)**: Low–medium risk/effort, medium reversal, minor DB or single-tenant impact (e.g. opt-in feature, performance, non-breaking API, component refactor).
- **Escalate (human architect)**: High risk/effort, high/critical reversal, major DB/schema or multi-tenant or infra changes (e.g. large migrations, tenant architecture, cloud migration, WhatsApp API/pricing engine changes).

## Defensive Development

1. **Preserve what works**: Tests before changing; feature flags; backward compatibility; API versioning. No big refactors at once, no removal without deprecation, no schema change without backup, no deploy without staging.
2. **Incremental changes**: Small frequent changes; test in isolation; canary deploys; monitor after deploy. No multi-feature deploys, no breaking changes without warning, avoid Friday deploys.
3. **Test before changing**: 80%+ coverage before refactor; integration tests for critical flows; edge cases; load tests for performance. No changing untested code; no skipping tests.

## Escalation Triggers

- **Database**: Add/remove columns or change types on tables >10k rows; create/drop indexes on large tables; tenant schema changes; migrations with >5 min downtime. Require impact analysis, migration estimate, tested rollback, post-migration perf tests.
- **Multi-tenant**: Tenant isolation or routing changes; shared vs isolated data changes; feature affecting all tenants. Require per-tenant impact, incremental migration, isolation tests, tenant communication.
- **Infrastructure**: Cloud provider/cache/DB/CDN/region changes. Require cost-benefit, minimal-downtime plan, perf comparison, full rollback strategy.
- **WhatsApp**: API integration, templates, rate limits, lead flow. Require compliance check, E2E with real messages, fallback validation, monitoring plan.

## Monitoring

- **Critical (immediate)**: Uptime <99%, error rate >5%, WhatsApp/workers/DB down, backup failures.
- **Warning**: Uptime 99–99.5%, errors 1–5%, perf drop >20%, Celery queue >100, high resource usage.
- **Info**: Registrations, properties/day, conversion, API latency, feature usage.

## Templates

- **Daily standup**: Yesterday (done, blockers), Today (plan, help needed), Blockers.
- **Weekly report**: Health, progress %, achievements, blockers; metrics (uptime, LCP, FID, users, leads); risks with mitigation; next week priorities.
- **Incident**: Description, severity, start/end, impact (users, features, business), timeline, root cause, resolution, prevention, lessons learned.
