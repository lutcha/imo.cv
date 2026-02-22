# Design System - imo.cv

## Paleta de Cores

### Primary (Confiança + Esperança + Sonho)

- **Azul Profundo** (Confiança): `#1e3a8a` (800), `#172554` (900). Scale 50–900.
- **Verde Esperança** (Crescimento): `#10b981` (500). Scale 50–900.
- **Dourado Sonho** (Luxo): `#f59e0b` (500). Scale 50–900.

### Semantic

- `--success`: #10b981
- `--warning`: #f59e0b
- `--danger`: #ef4444
- `--info`: #3b82f6

## Typography

- Font: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Scale: xs (0.75rem) through 6xl (3.75rem)

## Spacing & Radius

- Base unit: 4px. Use space-1 (4px) to space-32 (128px).
- Radius: sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px), full.

## Shadows

- sm, md, lg, xl, 2xl (standard). `--shadow-glow`, `--shadow-glow-gold` for emphasis.

## Component Specs

### Buttons

- **Primary**: gradient 135deg #1e3a8a → #3b82f6, white text, rounded-md, hover lift + glow.
- **Secondary**: white bg, border 2px #1e3a8a, text #1e3a8a.
- **WhatsApp**: bg #25D366, white, rounded-lg, shadow green; hover lift + stronger shadow.

## Dark Mode

- Toggle via Zustand (uiStore); persist in localStorage; toggle `dark` on `document.documentElement`.
- Dark: bg primary/secondary/tertiary (#0f172a, #1e293b, #334155), text primary/secondary/tertiary, border #334155.

## Localization (currency/date)

- CVE: no decimals, `toLocaleString('pt-CV')` + " CVE".
- EUR: 2 decimals, pt-CV locale.
- USD: 2 decimals, en-US.
- Date: DD/MM/YYYY via `toLocaleDateString('pt-CV', { day: '2-digit', month: '2-digit', year: 'numeric' })`.

Municipalities: see [localization.md](localization.md).
