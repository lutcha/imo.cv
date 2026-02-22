# Estratégia de Produto & UX Research - imo.cv

## 1. Análise de Concorrência e Referências

Com base em líderes de mercado como **Idealista.pt**, **Zillow (EUA)** e **Realtor.com (EUA)**, identificámos os pilares fundamentais para o sucesso da plataforma imo.cv:

### 5 Princípios-Chave de Sucesso:
1. **Confiança e Transparência**: Dados verificados dos agentes, fotografias de alta qualidade, e informações precisas sobre a localização e documentação do imóvel. Combater as fraudes comuns nas redes sociais.
2. **Experiência de Pesquisa Fluida e Visual**: A pesquisa por região ou através do mapa deve ser a principal forma de navegação. A mudança de filtros tem de ter resultados instantâneos, sem recarregar a página.
3. **Volume e Qualidade de Dados**: A plataforma só ganha tração se tiver a oferta mais abrangente do mercado. Dados estruturados (áreas, ano de construção, com/sem garagem) são essenciais para filtros eficientes.
4. **Foco no Canal Mobile**: O acesso principal, quer por compradores quer por inquilinos em Cabo Verde, será feito através de smartphones. Assim, a experiência primária deve ser otimizada para toque (swipes, bottom bars).
5. **Integração B2B Ininterrupta**: A plataforma tem de ser a principal ferramenta de trabalho do agente. Quanto mais tempo o agente passar no backoffice da imo.cv, mais os seus dados e leads são processados dentro do ecossistema.

### Funcionalidades de CRM Imobiliário ("Must-haves"):
- **Caixa de Entrada Unificada (Gestão de Leads)**: Captura automática dos contactos via formulário do anúncio, WhatsApp ou email.
- **Pipeline de Vendas Visual**: Um *Kanban board* configurável (ex: *Novo Contacto* -> *Qualificação* -> *Visita Agendada* -> *Proposta* -> *Fechado*).
- **Histórico Completo do Cliente**: Registo de todas as interações, chamadas, imóveis visitados e preferências de cada contacto.
- **Match Automático (Smart Matching)**: O sistema deve cruzar automaticamente as preferências registadas de um comprador com novos imóveis que a agência angariou.

---

## 2. Definição de Funcionalidades Core (Backlog do Produto)

### Para o Utilizador Final (Compradores / Inquilinos)
- **Pesquisa Avançada e Semântica**: Filtros granulares como tipo de negócio (venda, arrendamento, férias), tipologia (T1, T2...), orçamento, área útil, etc.
- **Geolocalização e "Desenhar no Mapa"**: Integração com Mapbox ou Google Maps, permitindo que o utilizador desenhe um polígono livre numa zona específica para ver apenas as ofertas desse perímetro.
- **Alertas Personalizados Inteligentes**: Subscrição de buscas (ex: "Enviar email/Push Notification quando surgir T2 no Palmarejo até X escudos").
- **Favoritos e Comparação**: Guardar propriedades em listas, adicionar notas pessoais e uma "Tabela de Comparação" direta (preço/m2, features, ano de construção).

### Para o Agente Imobiliário (Área de Trabalho Multi-Tenant)
- **Dashboard Gerencial (Analytics)**: Ecrã inicial com KPIs chave: visualizações diárias de anúncios, leads gerados por anúncio, taxa de conversão, e lembretes de tarefas para o dia.
- **Gestão de Listagens Rápida (CRUD)**: Fluxo otimizado para adicionar novos imóveis pelo telemóvel, uploads paralelos e em lote de fotos, compressão automática das imagens e marcação de "Vendido/Arrendado".
- **CRM e Pipeline**: Gestão completa da carteira de clientes compradores e vendedores, agendamento de visitas integrado com calendário, e acompanhamento do funil de conversão.

---

## 3. Estratégia de Dados e Recomendação Inteligente

**Princípio Fundamental:** *"Usar dados para criar valor, transparência e confiança no mercado fragmentado de Cabo Verde".*

### Recomendação de Preços (AVM - Automated Valuation Model)
- **Abordagem Inicial (Baseada em Estatística e Regras):**
  - **Inputs:** Localização (ilha, concelho, bairro/zona), tipo de imóvel, área total/útil, quartos. 
  - **Lógica:** Cálculo da média ponderada (e mediana) do preço por metro quadrado de imóveis com características similares listados e vendidos nos últimos 6 meses num raio geográfico específico.
  - **Output:** Oferta de um "Preço Estimado imo.cv" com um intervalo de confiança (mínimo, recomendado, máximo).
- **Evolução para Machine Learning:**
  - Após a captura de >5.000 listagens, treinar modelos de *Random Forest* ou *Gradient Boosting* que incluam pesos como proximidade de pontos de interesse (praias, serviços centrais) e histórico do anunciante.

### Sistema de Recomendação para Utilizadores
- **Baseado em Comportamento (Collaborative & Content Filtering):**
  - Quando o utilizador visualiza um imóvel, a plataforma sugere: *"Imóveis semelhantes nesta zona"* (mesmo preço/tipologia).
  - Análise do histórico (ex: se o utilizador pesquisa constantemente moradias em "São Vicente"), o feed da página inicial altera-se para apresentar ofertas com esse padrão.

---

## 4. Estratégia de UX/UI

### Princípios de Design e Implementação
- **Mobile-First Real**: A navegação principal será feita na base do ecrã (*Bottom Navigation Bar*) para fácil acesso do polegar. Os cartões de imóveis ocuparão quase toda a largura, permitindo deslizar horizontalmente (swipe) apenas pelas imagens sem necessitar de abrir a página inteira.
- **Simplicidade e Redução de Atrito**: O processo de contactar um agente deve ser direto. Devem existir botões *Call-to-Action* proeminentes como "Ligar" e "WhatsApp", reduzindo preenchimentos longos de formulários.
- **Confiança e Qualidade Visual**: Uma interface muito limpa (*Clean UI*), utilizando muito "white space", e uma paleta de cores moderna e fidedigna. Elementos textuais como selos de "Agente Verificado" ou "Perfil Oficial" deverão ganhar destaque visual para combater a desconfiança que hoje existe nos grupos do Facebook.
- **Velocidade de Carregamento**: Otimização técnica severa — *lazy loading* de imagens e mapas, compressão pesada via formatos como WebP, renderização server-side (Next.js/Nuxt) para acesso instantâneo. Em Cabo Verde as redes 3G/4G podem flutuar, logo, um primeiro *load* leve é crítico.
