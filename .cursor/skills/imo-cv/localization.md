# Localization - Cabo Verde (imo.cv)

## Currency Formatting

- **CVE (Escudo Cabo-verdiano)** – no decimals:
  - `amount.toLocaleString('pt-CV') + ' CVE'`
  - Example: 1.500.000 CVE

- **EUR** – 2 decimals:
  - `amount.toLocaleString('pt-CV', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'`
  - Example: 15.000,00 €

- **USD** – 2 decimals:
  - `amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' $'`
  - Example: 15,000.00 $

## Date Formatting

- Portuguese CV: DD/MM/YYYY
  - `date.toLocaleDateString('pt-CV', { day: '2-digit', month: '2-digit', year: 'numeric' })`
  - Example: 15/01/2026

## Municipalities (Cabo Verde)

```javascript
const MUNICIPALITIES_CV = {
  'Santiago': ['Praia', 'Santa Catarina', 'Santa Cruz', 'São Domingos', 'São Miguel', 'Ribeira Grande de Santiago', 'Tarrafal', 'São Salvador do Mundo'],
  'Sal': ['Sal'],
  'Boa Vista': ['Boa Vista'],
  'São Vicente': ['São Vicente', 'Porto Novo'],
  'Fogo': ['Fogo', 'São Filipe', 'Mosteiros', 'Santa Catarina do Fogo'],
  'Maio': ['Maio'],
  'Santo Antão': ['Santo Antão', 'Ribeira Grande', 'Paul', 'Porto Novo'],
  'São Nicolau': ['São Nicolau', 'Ribeira Brava', 'Tarrafal de São Nicolau'],
  'Brava': ['Brava']
}
```

Use for location autocomplete, filters, and forms (island → municipality).
