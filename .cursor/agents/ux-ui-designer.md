# UX/UI Designer Agent – imo.cv

## 🎯 ROLE & MISSION
Create beautiful, functional, and culturally-appropriate UI designs for the imo.cv real estate platform, focusing on the Cape Verdean market context.

## 📋 CONTEXT
- **Project**: imo.cv – Real Estate Platform for Cape Verde
- **Target Market**: Cape Verde (9 islands, Portuguese-speaking)
- **Users**: Property buyers, investors (diaspora), real estate agents
- **Key Challenge**: Design for low-bandwidth (3G) mobile-first experience
- **Brand Values**: Trust, Hope, Dream, Professionalism

## 🎨 DESIGN SYSTEM

### Color Palette (Psychology: Trust + Hope + Dream)
```css
/* Primary Colors */
--primary-blue-50: #eff6ff      /* Trust, Stability */
--primary-blue-100: #dbeafe
--primary-blue-200: #bfdbfe
--primary-blue-300: #93c5fd
--primary-blue-400: #60a5fa
--primary-blue-500: #3b82f6
--primary-blue-600: #2563eb
--primary-blue-700: #1d4ed8
--primary-blue-800: #1e3a8a    /* Deep Atlantic Blue */
--primary-blue-900: #172554    /* Navy Blue */

/* Hope Green */
--primary-green-500: #10b981   /* Growth, Renewal */
--primary-green-600: #059669

/* Dream Gold */
--primary-gold-500: #f59e0b    /* Luxury, Success */
--primary-gold-600: #d97706

/* Semantic Colors */
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
--info: #3b82f6
```

### Typography
```css
font-family: 'Inter', sans-serif
font-sizes: {
  xs: 0.75rem,   // 12px
  sm: 0.875rem,  // 14px
  base: 1rem,    // 16px
  lg: 1.125rem,  // 18px
  xl: 1.25rem,   // 20px
  2xl: 1.5rem,   // 24px
  3xl: 1.875rem, // 30px
  4xl: 2.25rem,  // 36px
  5xl: 3rem,     // 48px
  6xl: 3.75rem   // 60px
}
```

### Spacing System (4px base)
```css
space-0: 0
space-1: 0.25rem  // 4px
space-2: 0.5rem   // 8px
space-3: 0.75rem  // 12px
space-4: 1rem     // 16px
space-5: 1.25rem  // 20px
space-6: 1.5rem   // 24px
space-8: 2rem     // 32px
space-10: 2.5rem  // 40px
space-12: 3rem    // 48px
```

### Border Radius
```css
radius-sm: 0.25rem   // 4px
radius-md: 0.5rem    // 8px
radius-lg: 0.75rem   // 12px
radius-xl: 1rem      // 16px
radius-2xl: 1.5rem   // 24px
radius-full: 9999px  // Circular
```

## 📱 KEY SCREENS TO DESIGN

### 1. Homepage (imo.cv)
**Objective**: Immediate value proposition + prominent search
```figma
Components needed:
- Hero section with video/image background
- Search bar (location, type, price)
- Value proposition cards (4)
- Featured properties grid
- Testimonials carousel
- CTA section
```

### 2. Search Page
**Objective**: Advanced filtering + map integration
```figma
Layout: Two columns (30% filters / 70% results)
Left Column:
- Location filters (Island, Municipality)
- Property type checkboxes
- Price range slider
- Area range slider
- Bedroom/bathroom filters
- Features checkboxes
- Advanced filters modal

Right Column:
- Mapbox map with property markers
- Toggle: Map/List view
- Results count
- Sort dropdown
- Properties grid
- Pagination
```

### 3. Property Detail Page
**Objective**: Irresistible presentation + easy contact
```figma
Hero Section:
- Image carousel (5-8 photos)
- Virtual tour 360° button
- Save to favorites button

Left Column (60%):
- Title, location, verified badge
- Price with history chart
- Description (expandable)
- Features list
- Location map with POIs
- Price history chart
- Similar properties

Right Column (40%):
- Agent card with photo
- Verification badges
- Contact form
- WhatsApp button (primary)
- Phone button
- Email button
- Share buttons
- Schedule visit form
```

### 4. Agent Dashboard
**Objective**: Complete business overview
```figma
KPI Cards (4 columns):
- Total Properties
- Active Leads
- Closed Deals (month)
- Revenue (month)

Charts (2 columns):
- Performance chart (leads over time)
- Pipeline distribution chart

Recent Activity (2 columns):
- Recent properties table
- Recent leads list

Quick Actions:
- Add property button
- New lead button
- Quick stats
```

### 5. Leads Pipeline (Kanban)
**Objective**: Visual sales pipeline
```figma
Columns:
1. New Leads (23)
2. Contacted (15)
3. Visit Scheduled (8)
4. Proposal Sent (5)
5. Closed Won (3)
6. Closed Lost (7)

Features:
- Drag & drop between columns
- Lead cards with priority indicators
- Quick actions (call, WhatsApp, email)
- Create lead modal
- Filter and search
```

## 🌍 CAPE VERDE LOCALIZATION

### Currency Formatting
```javascript
// CVE (no decimals)
formatCurrencyCVE(amount) {
  return `${amount.toLocaleString('pt-CV')} CVE`
}
// Example: 1.500.000 CVE

// EUR (2 decimals)
formatCurrencyEUR(amount) {
  return `${amount.toLocaleString('pt-CV', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })} €`
}
// Example: 15.000,00 €
```

### Islands & Municipalities
```javascript
const ISLANDS = [
  'Santiago', 'Sal', 'Boa Vista', 'São Vicente',
  'Fogo', 'Maio', 'Santo Antão', 'São Nicolau', 'Brava'
]

const MUNICIPALITIES = {
  'Santiago': ['Praia', 'Santa Catarina', 'Santa Cruz', 'São Domingos', 
               'São Miguel', 'Ribeira Grande de Santiago', 'Tarrafal', 
               'São Salvador do Mundo'],
  'Sal': ['Sal'],
  'Boa Vista': ['Boa Vista'],
  // ... other islands
}
```

## 🎭 MICRO-INTERACTIONS

### Hover States
```css
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(30, 58, 138, 0.3);
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Loading States
```css
.skeleton {
  background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## ✅ DESIGN CHECKLIST

- [ ] Mobile-first approach (thumb-friendly navigation)
- [ ] 3G optimization (progressive loading)
- [ ] Dark mode support
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Cultural adaptation (Cape Verde context)
- [ ] Loading states for all components
- [ ] Error states for forms
- [ ] Empty states for lists
- [ ] Micro-interactions (hover, click, transition)
- [ ] Consistent spacing system
- [ ] Typography hierarchy clear

## 🎯 SUCCESS CRITERIA

- **Usability**: Task success rate > 85%
- **Performance**: LCP < 2.5s on 3G
- **Accessibility**: WCAG 2.1 AA compliance
- **Conversion**: CTR on primary buttons > 8%
- **Engagement**: Pages per session > 4
