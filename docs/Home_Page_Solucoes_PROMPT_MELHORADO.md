# 🧠 **PROMPT MELHORADO – HOME PAGE DA PLATAFORMA IMO.CV**

## 🎯 **MISSÃO**
Criar uma home page lógica, defensiva e orientada ao cliente para a plataforma imo.cv, apresentando as soluções como produtos separados com planos de preços específicos para cada tipo de cliente.

---

## 🛡️ **PRINCÍPIOS DEFENSIVOS (OBRIGATÓRIOS)**

### ✅ **Antes de qualquer alteração na home page:**
```markdown
[ ] 1. Verificar se a mudança quebra funcionalidades existentes
[ ] 2. Escrever testes para comportamento atual antes de modificar
[ ] 3. Ter plano de rollback documentado e testado
[ ] 4. Aprovação do Product Owner
[ ] 5. Testar em 3G/4G (simular em Chrome DevTools)
```

### ✅ **Durante a implementação:**
```markdown
[ ] 1. Implementar em feature flag (ex: `NEXT_PUBLIC_FEATURE_HOMEPAGE_V2=true`)
[ ] 2. Usar componentes reutilizáveis com fallbacks
[ ] 3. Garantir mobile-first (3G friendly)
[ ] 4. Testar em dispositivos reais (Android/iOS)
[ ] 5. Adicionar métricas de monitoramento específicas
```

### ✅ **Antes do deploy:**
```markdown
[ ] 1. Testar em staging com dados reais
[ ] 2. Validar isolamento de dados (não vazar informações entre tenants)
[ ] 3. Testar fallbacks (APIs offline, Redis down)
[ ] 4. Obter aprovação do Product Owner
[ ] 5. Preparar script de rollback testado
```

---

## 🧭 **ESTRUTURA LÓGICA DA HOME PAGE (Seguindo a solicitação de Luis Frederico)**

### **1. Cabeçalho (Navigation Bar)**
```jsx
// components/layout/Header.tsx
export default function Header() {
  // Defensivo: 
  // - Mobile-first navigation
  // - Fallback para JavaScript desativado
  // - Testado em 3G/4G
  
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <Logo />
            <span className="ml-2 font-bold text-lg">imo.cv</span>
          </a>
          
          {/* Menu responsivo (mobile-first) */}
          <MobileMenu />
          
          {/* Desktop menu */}
          <DesktopMenu />
        </div>
      </nav>
    </header>
  )
}
```

### **2. Seção Principal (Hero Section)**
```jsx
// components/home/HeroSection.tsx
export default function HeroSection() {
  // Defensivo:
  // - Imagens otimizadas para 3G/4G
  // - Fallback para imagens carregarem
  // - Texto legível sem imagens
  
  return (
    <section className="bg-gradient-to-r from-trust-blue-50 to-hope-green-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          A plataforma imobiliária <span className="text-trust-blue-600">oficial de Cabo Verde</span>
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Organizamos, profissionalizamos e digitalizamos o mercado imobiliário cabo-verdiano
        </p>
        
        {/* Defensivo: 
            - Botões com fallback para 3G (carregamento rápido)
            - Priorização de ações por tipo de cliente */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" href="/agencia">Para Agências</Button>
          <Button variant="secondary" href="/condominio">Para Condomínios</Button>
          <Button variant="outline" href="/market-intelligence">Para Investidores</Button>
        </div>
      </div>
    </section>
  )
}
```

### **3. Seção de Soluções (Soluções por Tipo de Cliente)**
```jsx
// components/home/SolutionsSection.tsx
export default function SolutionsSection() {
  // Defensivo:
  // - Componentes isolados (não quebram se um falhar)
  // - Carregamento progressivo
  // - Testado em diferentes tipos de conexão
  
  const solutions = [
    {
      id: 'crm',
      title: 'CRM para Agências Imobiliárias',
      description: 'Plataforma completa para gestão de imóveis, leads e clientes',
      features: [
        'Dashboard de desempenho',
        'Funil de vendas Kanban',
        'Gestão de leads por WhatsApp',
        'Relatórios de conversão'
      ],
      plans: [
        {
          name: 'Starter',
          price: '4.500 CVE',
          features: [
            '5 imóveis',
            'CRM básico',
            '3 usuários'
          ]
        },
        {
          name: 'Pro',
          price: '9.000 CVE',
          features: [
            'Ilimitado',
            'Analytics avançado',
            'Pipeline completo'
          ]
        }
      ]
    },
    {
      id: 'condominio',
      title: 'Gestão de Condomínios',
      description: 'Sistema completo para administradores de condomínios',
      features: [
        'Pagamento online',
        'Reserva de áreas comuns',
        'Relatórios financeiros',
        'Votação digital'
      ],
      plans: [
        {
          name: 'Básico',
          price: '500 CVE/unidade',
          features: [
            'Gestão de unidades',
            'Emissão de faturas',
            'Comunicação centralizada'
          ]
        },
        {
          name: 'Premium',
          price: '800 CVE/unidade',
          features: [
            'Tudo no Básico',
            'Relatórios financeiros',
            'Sistema de votação'
          ]
        }
      ]
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      description: 'Dados e insights do mercado imobiliário de Cabo Verde',
      features: [
        'Índice de preços por ilha',
        'Heatmaps de demanda',
        'Relatórios trimestrais',
        'Tendências de mercado'
      ],
      plans: [
        {
          name: 'Essential',
          price: '10.000 CVE',
          features: [
            'Acesso básico',
            '1 relatório/mês',
            'Dados por ilha'
          ]
        },
        {
          name: 'Professional',
          price: '25.000 CVE',
          features: [
            'Acesso completo',
            'Relatórios personalizados',
            'API de dados'
          ]
        }
      ]
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Soluções para cada necessidade</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha a solução que melhor se adapta ao seu negócio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map(solution => (
            <SolutionCard 
              key={solution.id} 
              solution={solution}
              // Defensivo: 
              // - Fallback para cada solução
              // - Carregamento progressivo
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### **4. Seção de Testemunhos (Confiança)**
```jsx
// components/home/TestimonialsSection.tsx
export default function TestimonialsSection() {
  // Defensivo:
  // - Carregamento em background
  // - Fallback para imagens
  // - Testado em 3G
  
  const testimonials = [
    {
      name: "Ana Silva",
      role: "Proprietária de Agência",
      company: "Imobiliaria Praia",
      quote: "O CRM do imo.cv transformou nossa gestão de leads. Aumentamos 40% nossa taxa de conversão em 3 meses.",
      image: "/testimonials/ana.jpg"
    },
    {
      name: "João Fernandes",
      role: "Administrador de Condomínio",
      company: "Condomínio Palmarejo",
      quote: "A gestão de condomínios é agora simples e transparente. Os moradores adoram o sistema de votação digital.",
      image: "/testimonials/joao.jpg"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confiança construída com resultados reais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              testimonial={testimonial}
              // Defensivo: 
              // - Imagem com fallback
              // - Texto legível sem imagens
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### **5. Seção de Perguntas Frequentes (Defensivo)**
```jsx
// components/home/FAQSection.tsx
export default function FAQSection() {
  // Defensivo:
  // - Componente isolado (não quebra se API falhar)
  // - Informação essencial sem JavaScript
  // - Testado em 3G
  
  const faqs = [
    {
      question: "Como funciona a integração com WhatsApp?",
      answer: "Nossa plataforma captura automaticamente leads do WhatsApp Business API. Os agentes recebem notificações em tempo real e podem responder diretamente no sistema."
    },
    {
      question: "Posso usar o sistema sem conhecimento técnico?",
      answer: "Sim! O imo.cv foi projetado para ser intuitivo. Oferecemos treinamento inicial e suporte 24/7 para ajudar na transição."
    },
    {
      question: "Como é a migração dos meus dados atuais?",
      answer: "Oferecemos um processo simples de migração. Nossa equipe ajuda a importar seus imóveis, leads e clientes."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas antes de começar
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              // Defensivo: 
              // - Fallback para JavaScript desativado
              // - Informação essencial visível sem interação
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 📊 **MÉTRICAS DE SUCESSO (Para a Home Page)**

| Métrica | Alvo 3G | Alvo 4G |
|---------|---------|---------|
| **LCP** | < 2.5s | < 1.8s |
| **FCP** | < 1.8s | < 1.2s |
| **TTI** | < 3.5s | < 2.5s |
| **TBT** | < 200ms | < 150ms |
| **CLS** | < 0.1 | < 0.05 |
| **Bundle Size** | < 500KB | < 400KB |
| **Lead Conversion** | > 15% | > 25% |
| **Mobile Session Duration** | > 2.5 min | > 3.5 min |

---

## ✅ **CHECKLIST DE DEPLOY (Home Page)**

- [ ] Testar em 3G/4G (simular em Chrome DevTools)
- [ ] Testar em dispositivos reais (Android/iOS)
- [ ] Verificar isolamento de dados (não vazar informações)
- [ ] Testar fallbacks (APIs offline, Redis down)
- [ ] Validar acessibilidade (WCAG 2.1 AA)
- [ ] Testar em diferentes idiomas (português, crioulo)
- [ ] Monitorar métricas de desempenho pós-deploy
- [ ] Preparar script de rollback testado

---

## 📱 **ADAPTAÇÃO PARA CABO VERDE (Contexto Local)**

```jsx
// utils/cv-localization.ts
export const CV_LOCALIZATION = {
  currencyFormatter: (amount: number, currency: string = 'CVE') => {
    if (currency === 'CVE') {
      // CVE não tem centavos - arredondar para milhares
      return `${Math.round(amount / 1000) * 1000}.000 CVE`
    }
    return new Intl.NumberFormat('pt-CV', {
      style: 'currency',
      currency
    }).format(amount)
  },
  
  islandList: [
    { id: 'santiago', name: 'Santiago', featured: true },
    { id: 'sal', name: 'Sal', featured: true },
    { id: 'boa_vista', name: 'Boa Vista', featured: true },
    { id: 'sao_vicente', name: 'São Vicente', featured: false },
    { id: 'fogo', name: 'Fogo', featured: false },
    { id: 'maio', name: 'Maio', featured: false },
    { id: 'santo_antonio', name: 'Santo Antão', featured: false },
    { id: 'sao_nicolau', name: 'São Nicolau', featured: false },
    { id: 'brava', name: 'Brava', featured: false }
  ],
  
  // Defensivo: 
  // - Fallback para ilhas não existentes
  // - Validação de dados
  validateIsland: (island: string) => {
    const validIslands = CV_LOCALIZATION.islandList.map(i => i.id)
    return validIslands.includes(island) ? island : 'santiago'
  }
}
```

---

## 🚨 **PROTOCOLO DE CRITICIDADE (Se algo der errado)**

1. **Detecção (0-5 min):** 
   - [ ] Identificar problema
   - [ ] Determinar impacto (usuários afetados)
   - [ ] Notificar supervisor imediatamente

2. **Contenção (5-30 min):** 
   - [ ] Ativar fallback (feature flag desativado)
   - [ ] Notificar stakeholders afetados
   - [ ] Designar owner para resolução

3. **Resolução (30-120 min):** 
   - [ ] Diagnosticar causa raiz
   - [ ] Implementar fix temporário
   - [ ] Testar em staging
   - [ ] Deploy com cautela

4. **Recuperação (2-24h):** 
   - [ ] Monitorar sistema pós-fix
   - [ ] Validar que problema está resolvido
   - [ ] Comunicar resolução

5. **Aprendizado (24-72h):** 
   - [ ] Post-mortem meeting
   - [ ] Documentar lições aprendidas
   - [ ] Atualizar runbooks

---

## ✅ **CONCLUSÃO**

Este prompt estrutura uma home page lógica, defensiva e orientada ao cliente para a plataforma imo.cv, seguindo as instruções de Luis Frederico e as práticas defensivas necessárias. A home page apresenta as soluções (CRM, Gestão de Condomínios, Market Intelligence) como produtos separados, com planos de preços específicos para cada tipo de cliente, mantendo a adaptação ao contexto cabo-verdiano.

**Princípio Dourado:** "Melhor devagar e seguro do que rápido e quebrado" - especialmente importante em mercados com conectividade limitada como Cabo Verde.