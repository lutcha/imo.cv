---
name: whatsapp-integration
description: Covers imo.cv WhatsApp Business API: sending messages, webhooks, templates, and lead creation. Use when implementing or changing WhatsApp flows, notifications, or lead capture.
---

# WhatsApp Integration – imo.cv

Reference: [Backend Engineer Agent](../agents/backend-engineer.md) for client and webhooks.

## When to Use

- Sending property alerts, lead replies, or notifications via WhatsApp.
- Handling incoming webhooks (messages, status).
- Creating or updating leads from WhatsApp conversations.
- Changing message templates or rate limiting.

## Key Components

- **WhatsAppClient**: `send_message(to, type, data)`, `send_text_message(to, text)`; auth via settings (token, phone_number_id).
- **Webhook**: Verify signature; parse payload; create/update Lead; optional reply.
- **Templates**: Use approved templates for proactive messages; comply with WhatsApp policy.

## Settings

- WHATSAPP_API_URL, WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID.

## Escalation

Changes to API integration, templates, or lead flow should be reviewed per [Supervisor](../agents/supervisor.md); ensure compliance and fallback strategy.
