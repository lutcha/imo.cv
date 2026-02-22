---
name: design-system
description: Defines imo.cv UI design system: colors (Trust/Hope/Dream), typography, spacing, components, CVE/EUR formatting. Use when designing or implementing UI components, themes, or localization for Cape Verde.
---

# Design System – imo.cv

Reference: [UX/UI Designer Agent](../agents/ux-ui-designer.md) for full specs.

## When to Use

- Implementing or updating UI components (buttons, cards, forms).
- Applying colors, typography, or spacing.
- Formatting currency (CVE, EUR) or dates for Cape Verde.
- Adding dark mode or accessibility (WCAG 2.1 AA).

## Quick Reference

| Token type   | Examples |
|-------------|----------|
| **Primary** | Blue 50–900 (Trust), Green 500/600 (Hope), Gold 500/600 (Dream) |
| **Semantic** | success, warning, danger, info |
| **Font**    | Inter; sizes xs (12px) → 6xl (60px) |
| **Spacing** | 4px base: space-1 (4px) → space-12 (48px) |
| **Radius**  | radius-sm (4px) → radius-full |

## Currency (CVE / EUR)

- **CVE**: no decimals, `toLocaleString('pt-CV')` + " CVE" (e.g. 1.500.000 CVE).
- **EUR**: 2 decimals, pt-CV locale (e.g. 15.000,00 €).

## Constraints

- Mobile-first; thumb-friendly navigation.
- 3G-friendly: progressive loading, skeletons.
- Consistent spacing and typography hierarchy.
