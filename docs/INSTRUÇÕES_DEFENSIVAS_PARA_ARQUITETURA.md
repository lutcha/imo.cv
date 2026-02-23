# 🛡️ **INSTRUÇÕES DEFENSIVAS PARA ARQUITETURA – imo.cv**
## *Protegendo o que funciona enquanto evoluímos com Next.js 24*

---

## 📌 **PRINCÍPIO FUNDAMENTAL: "PRIMUM NON NOCERE" (Primeiro, não causar dano)**

> **⚠️ NUNCA** modifique código funcional sem:
> 1. Testes que cubram 100% do comportamento atual
> 2. Plano de rollback documentado e testado
> 3. Aprovação explícita do Product Owner
> 4. Deploy em staging com validação humana

> **✅ SEMPRE**:
> - Adicione novas funcionalidades como **opt-in** primeiro (feature flags)
> - Mantenha APIs **backward compatible** (versione antes de mudar)
> - Faça mudanças **pequenas e incrementais**
> - Use **canary deployments** para features críticas

---

## 🔒 **CHECKLIST DE SEGURANÇA ANTES DE QUALQUER MUDANÇA**

### ✅ **Fase 1: Avaliação de Impacto (Obrigatória)**
```markdown
[ ] 1. Esta mudança quebra funcionalidades existentes?
    → Testar manualmente todas as user journeys afetadas

[ ] 2. Existe teste automatizado cobrindo o comportamento atual?
    → Se não, escrever teste ANTES de modificar

[ ] 3. Qual é o custo de reversão?
    → Se > 30 minutos, requer aprovação do Arquiteto Humano

[ ] 4. Esta mudança afeta múltiplos tenants?
    → Testar isoladamente com tenant de teste primeiro

[ ] 5. Impacto em performance (especialmente 3G/4G)?
    → Medir LCP/TTI antes e depois em rede throttled

[ ] 6. Dependências de terceiros (WhatsApp API, Mapbox)?
    → Verificar status das APIs e rate limits
```

### ✅ **Fase 2: Preparação Defensiva**
```markdown
[ ] 1. Criar feature flag para nova funcionalidade
    → Ex: NEXT_PUBLIC_FF_NEW_SEARCH=true

[ ] 2. Implementar fallback para cenários de falha
    → Ex: Se Mapbox falhar → usar fallback estático

[ ] 3. Adicionar métricas de monitoramento específicas
    → Ex: track('search_v2_error', { error: e.message })

[ ] 4. Documentar passos de rollback
    → Ex: "Desativar feature flag + limpar cache Redis"

[ ] 5. Preparar script de rollback testado em staging
    → Ex: rollback-search-v2.sh
```

### ✅ **Fase 3: Validação em Staging**
```markdown
[ ] 1. Deploy em staging com feature flag DESATIVADA
[ ] 2. Testar funcionalidades existentes (regressão)
[ ] 3. Ativar feature flag para 1 usuário de teste
[ ] 4. Validar métricas de performance (Lighthouse 3G)
[ ] 5. Testar cenários de falha (simular API offline)
[ ] 6. Obter aprovação do Product Owner
```

---

## ⚙️ **ESTRATÉGIAS DEFENSIVAS PARA NEXT.JS 24**

### **1. Server Components – Proteção Contra Hydration Mismatches**
```typescript
// ❌ PERIGOSO: Misturar lógica de servidor/cliente sem cuidado
export default async function PropertyList() {
  const properties = await fetchProperties() // Server
  
  return (
    <div>
      {/* Cliente tenta acessar window aqui → HYDRATION ERROR */}
      <ClientComponent properties={properties} />
    </div>
  )
}

// ✅ DEFENSIVO: Isolar lógica de cliente com 'use client' explícito
// components/properties/PropertyList.client.tsx
'use client'

import { useEffect, useState } from 'react'

export function PropertyListClient({ initialProperties }) {
  const [properties, setProperties] = useState(initialProperties)
  
  // Lógica de cliente segura
  useEffect(() => {
    // Safe to use window here
  }, [])
  
  return <div>...</div>
}

// app/properties/page.tsx (Server Component)
export default async function PropertiesPage() {
  const properties = await fetchProperties()
  
  return (
    // Passar dados via props (não via contexto/contexto)
    <PropertyListClient initialProperties={properties} />
  )
}
```

### **2. Turbopack – Proteção Contra Breaking Changes**
```markdown
⚠️ TURBOPACK NÃO SUPORTA:
- Webpack loaders customizados
- Certos plugins de Babel
- Algumas bibliotecas que usam eval()

✅ ESTRATÉGIA DEFENSIVA:
1. Manter webpack.config.js como fallback
2. Usar turbopack apenas em desenvolvimento
3. Build de produção com Next.js padrão (não turbopack --build)
4. Testar sempre build de produção antes de deploy

// next.config.mjs
const nextConfig = {
  // Não remover webpack config até validação completa
  webpack: (config) => {
    // Manter compatibilidade com loaders existentes
    return config
  },
  
  // Turbopack apenas para dev
  experimental: {
    turbopack: process.env.NODE_ENV === 'development'
  }
}
```

### **3. App Router – Proteção de Rotas Críticas**
```typescript
// ✅ ESTRATÉGIA DEFENSIVA: Versionar rotas críticas antes de mudar

// Antes de mudar /app/property/[id]/page.tsx:
// 1. Criar nova rota em /app/v2/property/[id]/page.tsx
// 2. Manter rota antiga funcionando
// 3. Redirecionar gradualmente via middleware

// middleware.ts
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  // Redirecionar 5% do tráfego para v2 (canary)
  if (url.pathname.startsWith('/property/') && Math.random() < 0.05) {
    url.pathname = url.pathname.replace('/property/', '/v2/property/')
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

// Após validação completa (2 semanas):
// 1. Migrar 100% do tráfego para v2
// 2. Manter v1 por 30 dias para rollback
// 3. Remover v1 apenas após confirmação de estabilidade
```

### **4. Image Optimization – Proteção para 3G/4G em Cabo Verde**
```typescript
// ✅ ESTRATÉGIA DEFENSIVA: Adaptar qualidade por rede

'use client'

import { use, useEffect, useState } from 'react'

export function AdaptiveImage({ src, alt, priority = false }) {
  const [quality, setQuality] = useState(75) // Default 4G
  
  useEffect(() => {
    // Detectar tipo de rede (Next.js 24 suporta navigator.connection)
    const connection = (navigator as any).connection
    if (connection) {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        setQuality(40) // Qualidade baixa para 2G/3G
      } else if (connection.effectiveType === '3g') {
        setQuality(60) // Qualidade média para 3G
      }
      // 4G+ mantém 75%
    }
  }, [])
  
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      priority={priority}
      quality={quality} // ← Adaptar dinamicamente
      placeholder="blur"
      blurDataURL="/placeholder-low.jpg"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

---

## 🔄 **PLANO DE ROLLBACK – 5 MINUTOS OU MENOS**

### **Template de Rollback para Qualquer Deploy**
```bash
#!/bin/bash
# rollback.sh – Executar em < 5 minutos

set -e

echo "⚠️ INICIANDO ROLLBACK – $(date)"
echo "Commit atual: $(git rev-parse HEAD)"

# Passo 1: Desativar feature flags críticas
echo "1. Desativando feature flags..."
curl -X POST https://api.imo.cv/admin/feature-flags/disable \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"flags": ["new_search_v2", "avm_beta"]}'

# Passo 2: Reverter containers
echo "2. Revertendo containers..."
docker-compose pull backend:previous frontend:previous
docker-compose up -d --force-recreate

# Passo 3: Limpar cache crítico
echo "3. Limpando cache Redis..."
redis-cli -h redis FLUSHDB

# Passo 4: Validar rollback
echo "4. Validando rollback..."
sleep 10
curl -s http://localhost:3000/health | grep '"status":"ok"' || exit 1

echo "✅ ROLLBACK COMPLETO – $(date)"
```

### **Regras de Rollback Automático**
```typescript
// lib/monitoring/rollback-guard.ts
export class RollbackGuard {
  static async checkPostDeploy(metrics: DeploymentMetrics) {
    // Rollback automático se:
    const shouldRollback = 
      metrics.errorRate > 0.05 ||          // > 5% erros
      metrics.lcp > 3000 ||                // LCP > 3s em 4G
      metrics.tti > 4000 ||                // TTI > 4s em 4G
      metrics.leadConversion < 0.1         // Conversão < 10%
    
    if (shouldRollback) {
      console.error('⚠️ CRITICAL METRICS BREACHED – Triggering auto-rollback')
      await triggerRollback()
      await notifyTeam('Auto-rollback triggered', metrics)
    }
  }
}
```

---

## 🧪 **TESTES OBRIGATÓRIOS ANTES DE MUDAR CÓDIGO EXISTENTE**

### **Checklist de Testes Defensivos**
```markdown
✅ TESTES DE REGRESSÃO (Obrigatórios)
[ ] Teste E2E do fluxo de usuário completo:
    - Homepage → Busca → Detalhe → Contacto via WhatsApp
[ ] Teste de performance em 3G simulado (Lighthouse)
[ ] Teste de acessibilidade (WCAG 2.1 AA)
[ ] Teste em dispositivos reais (Android/iOS)

✅ TESTES DE SEGURANÇA
[ ] SQL injection nos filtros de busca
[ ] XSS em campos de descrição de imóvel
[ ] CSRF em formulários de contacto
[ ] Isolamento de dados multi-tenant (agentes não veem dados de outras agências)

✅ TESTES DE RESILIÊNCIA
[ ] API do WhatsApp offline → fallback para SMS
[ ] Mapbox offline → fallback para mapa estático
[ ] Redis offline → fallback para DB queries
[ ] PostgreSQL lento → timeout controlado
```

### **Exemplo: Teste de Isolamento Multi-Tenant**
```python
# tests/test_tenant_isolation.py
@pytest.mark.django_db
def test_agent_cannot_access_other_agency_properties():
    """Teste CRÍTICO: Isolamento de dados entre agências"""
    agency1 = Agency.objects.create(name="Agência 1", subdomain="ag1")
    agency2 = Agency.objects.create(name="Agência 2", subdomain="ag2")
    
    # Criar imóvel na agência 1
    prop1 = Property.objects.create(
        agency=agency1,
        title="Imóvel Ag1",
        price=1000000,
        island="Santiago",
        location=Point(-23.5138, 15.1152)
    )
    
    # Tentar aceder como agência 2 → DEVE falhar
    with pytest.raises(PermissionDenied):
        Property.objects.for_agency(agency2).get(id=prop1.id)
    
    # Verificar que agência 1 consegue aceder
    prop = Property.objects.for_agency(agency1).get(id=prop1.id)
    assert prop.title == "Imóvel Ag1"
```

---

## 📡 **MONITORAMENTO PÓS-DEPLOY – 48 HORAS CRÍTICAS**

### **Dashboard de Saúde Pós-Deploy**
```typescript
// types/monitoring.ts
interface PostDeployHealthCheck {
  // Métricas críticas (verificar a cada 5 minutos nas primeiras 2h)
  critical: {
    uptime: number;          // Deve ser > 99.9%
    errorRate: number;       // Deve ser < 1%
    whatsappDelivery: number; // Deve ser > 95%
    leadConversion: number;  // Não deve cair > 20% vs baseline
  };
  
  // Métricas de performance (verificar a cada 15 minutos)
  performance: {
    lcp4G: number;           // Deve ser < 1.8s
    lcp3G: number;           // Deve ser < 2.5s
    tti4G: number;           // Deve ser < 2.0s
    bundleSize: number;      // Não deve aumentar > 10%
  };
  
  // Métricas de negócio (verificar a cada hora)
  business: {
    propertiesListed: number; // Crescimento esperado
    activeAgents: number;     // Não deve cair
    leadsGenerated: number;   // Não deve cair > 15%
  };
}

// Alertas automáticos
if (health.errorRate > 0.05) {
  triggerRollback();
  notifySlack('#alerts', `⚠️ Error rate ${health.errorRate}% - ROLLBACK TRIGGERED`);
}
```

---

## 🌍 **CONSIDERAÇÕES DEFENSIVAS PARA CABO VERDE**

### **1. Conectividade Instável – Proteção em Camadas**
```typescript
// lib/utils/offline-strategy.ts
export class OfflineStrategy {
  // Camada 1: Cache agressivo para dados estáticos
  static async cacheCriticalData() {
    const cache = await caches.open('imo-cv-critical-v1')
    await cache.addAll([
      '/offline.html',
      '/placeholder.jpg',
      '/fonts/inter.woff2',
      '/api/islands',      // Lista de ilhas (raramente muda)
      '/api/municipalities' // Lista de concelhos
    ])
  }
  
  // Camada 2: Queue de operações offline
  static async queueLead(leadData: LeadData) {
    if (!navigator.onLine) {
      // Armazenar no IndexedDB para envio quando online
      await db.leads.add({ ...leadData, queuedAt: new Date() })
      
      // Notificar usuário
      showToast('✅ Lead guardado! Enviaremos quando a internet voltar.')
      
      return { queued: true }
    }
    
    // Online – enviar normalmente
    return await api.createLead(leadData)
  }
  
  // Camada 3: Fallback para SMS se WhatsApp falhar
  static async sendWhatsAppWithFallback(phone: string, message: string) {
    try {
      await whatsappApi.sendMessage(phone, message)
      track('whatsapp_sent', { success: true })
    } catch (error) {
      track('whatsapp_failed', { error: error.message })
      
      // Fallback para SMS (custo maior, mas funciona)
      await smsApi.send(phone, message)
      track('sms_fallback_used')
      
      // Notificar equipe para investigar WhatsApp API
      notifySlack('#tech', `⚠️ WhatsApp API down – usando SMS fallback`)
    }
  }
}
```

### **2. Contexto Cultural – Validação de Localização**
```typescript
// lib/validation/cv-localization.ts
export const CV_LOCALIZATION_GUARD = {
  // Proteger contra formatação incorreta de CVE
  validateCurrencyCVE(amount: number): string {
    // CVE não tem centavos – arredondar para milhar
    const rounded = Math.round(amount / 1000) * 1000
    
    // Alerta se valor parece incorreto (ex: 1.500.000.00 em vez de 1.500.000)
    if (amount % 1000 !== 0 && amount > 100000) {
      track('currency_format_warning', { 
        original: amount, 
        rounded,
        reason: 'CVE should not have decimals'
      })
    }
    
    return `${rounded.toLocaleString('pt-CV')} CVE`
  },
  
  // Proteger contra concelhos inexistentes
  validateMunicipality(island: string, municipality: string): boolean {
    const validMunicipalities = {
      'Santiago': ['Praia', 'Santa Catarina', 'Santa Cruz', 'São Domingos', 'São Miguel', 'Ribeira Grande de Santiago', 'Tarrafal', 'São Salvador do Mundo'],
      'Sal': ['Sal'],
      // ... outras ilhas
    }
    
    const isValid = validMunicipalities[island]?.includes(municipality)
    
    if (!isValid) {
      track('invalid_municipality', { island, municipality })
      notifySlack('#data-quality', `⚠️ Invalid municipality: ${municipality} for island ${island}`)
    }
    
    return isValid
  }
}
```

---

## 🚨 **PROTOCOLO DE COMUNICAÇÃO DE CRISE – 5 MINUTOS**

### **Fluxo de Ação Imediata**
```markdown
MINUTO 0-1: DETECÇÃO
- [ ] Sistema detecta métrica crítica fora do limite
- [ ] Alerta automático no Slack #alerts + SMS para tech lead

MINUTO 1-2: CONTENÇÃO
- [ ] Ativar feature flag de emergência: NEXT_PUBLIC_FF_EMERGENCY_MODE=true
- [ ] Esta flag desativa features novas e ativa fallbacks
- [ ] Parar deploy em progresso (se houver)

MINUTO 2-3: DIAGNÓSTICO RÁPIDO
- [ ] Verificar logs em tempo real (Datadog/Sentry)
- [ ] Identificar componente culpado (frontend/backend/infra)
- [ ] Decidir: rollback total vs rollback parcial

MINUTO 3-5: RESOLUÇÃO
- [ ] Executar script de rollback pré-testado
- [ ] Validar saúde do sistema (health check)
- [ ] Notificar stakeholders: "Incidente resolvido em X minutos"

MINUTO 5+: DOCUMENTAÇÃO
- [ ] Criar incident report no Notion
- [ ] Agendar post-mortem em 24h
- [ ] Atualizar runbooks com lições aprendidas
```

### **Template de Comunicação para Stakeholders**
```markdown
ASSUNTO: [RESOLVIDO] Incidente no imo.cv – {data} {hora}

STATUS: ✅ RESOLVIDO (tempo de resolução: 3m 22s)

IMPACTO:
- Usuários afetados: ~2% do tráfego (feature flag canary)
- Funcionalidades afetadas: Busca avançada (fallback para busca básica ativado)
- Leads perdidos: 0 (queue offline funcionou)

AÇÃO TOMADA:
1. Feature flag "new_search_v2" desativada às 14:23:15
2. Tráfego redirecionado para versão estável
3. Sistema 100% estável desde 14:26:37

PRÓXIMOS PASSOS:
- Post-mortem agendado para amanhã 10h
- Correção será testada em staging por 72h antes de novo deploy

DETALHES TÉCNICOS:
- Root cause: Memory leak no componente SearchFilters.client.tsx
- Correção: Remover useEffect sem cleanup + adicionar React.memo
- Prevenção: Adicionar teste de memória no CI/CD
```

---

## ✅ **CHECKLIST FINAL DE DESENVOLVIMENTO DEFENSIVO**

### **Antes de Escrever Código**
```markdown
[ ] Li a documentação da feature existente?
[ ] Entendi o fluxo de dados completo?
[ ] Identifiquei todos os pontos de falha possíveis?
[ ] Preparei plano de rollback documentado?
[ ] Criei feature flag para nova funcionalidade?
```

### **Durante o Desenvolvimento**
```markdown
[ ] Escrevi teste para comportamento existente ANTES de modificar?
[ ] Implementei fallback para cenários de erro?
[ ] Adicionei métricas de monitoramento específicas?
[ ] Testei em rede 3G simulada (Chrome DevTools)?
[ ] Validei acessibilidade (screen readers)?
```

### **Antes do Deploy**
```markdown
[ ] Testei em staging com dados reais?
[ ] Validei isolamento multi-tenant?
[ ] Testei fallbacks (APIs offline, Redis down)?
[ ] Obtive aprovação do Product Owner?
[ ] Preparei script de rollback testado?
```

### **Após o Deploy**
```markdown
[ ] Monitorando métricas críticas a cada 5min (primeiras 2h)?
[ ] Verificando logs em tempo real?
[ ] Validando conversão de leads vs baseline?
[ ] Pronto para rollback em < 5 minutos?
```

---

## 📜 **DECLARAÇÃO DE PRINCÍPIOS DEFENSIVOS**

> **"Em Cabo Verde, onde a conectividade é desafiadora e a confiança é tudo, preferimos entregar 90% de uma feature estável hoje do que 100% de uma feature quebrada amanhã."**

> **"Cada linha de código adicionada deve justificar sua existência através de valor para o usuário ou resiliência do sistema – nunca por 'porque é moderno'."**

> **"O verdadeiro teste de maturidade técnica não é quantas features lançamos, mas quantas vezes evitamos um incidente crítico através de planejamento defensivo."**

---

**Este documento deve ser revisado trimestralmente e atualizado com lições aprendidas de cada incidente. A cultura defensiva é mais importante que qualquer tecnologia – protege o negócio, os usuários e a reputação da plataforma.** 🛡️🌴