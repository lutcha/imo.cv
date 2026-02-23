# Plano: Melhorar página inicial e navegação

Referência: ecrãs em `stitch/` e `stitch-screens/`, em particular **01-property-search-map-view** (navegação e pesquisa) e **08–11 imocv-marketplace-homepage** (homepage).

---

## 1. Estado atual (resumo)

### Página inicial (`app/(public)/page.tsx`)
- Hero com gradiente azul, título “Mercado Imobiliário de Cabo Verde”, subtítulo, SearchBar (variant hero), botões “Ver imóveis” e “Pesquisar no mapa”.
- Secção de 3 cards (Pesquisa inteligente, Agentes verificados, 100% gratuito).
- Secção “Imóveis em destaque” com PropertyList (6) em grid + “Ver todos”.
- CTA final “És agente ou agência?” + link Área Agente.

### Navegação (Header)
- Logo “imo.cv”, SearchBar inline (só desktop), links “Pesquisar” e “Área Agente”.
- Selector de idioma (PT/EN/FR), dark mode, Login/Registar ou user + Sair.
- Menu mobile com SearchBar + links.

### Footer
- Logo, descrição, links: Pesquisar imóveis, Sobre nós, Contacto, Blog.
- Copyright.

---

## 2. O que os screens de referência sugerem

### 01-property-search-map-view (Header/Nav)
- **Nav principal**: Buy | Rent | Agents | CRM Portal (equivalente: Comprar | Arrendar | Agentes | Área Agente).
- **Search** no header: placeholder “Search island, city, or ZIP” (ilha, cidade ou zona).
- **CTA destacado**: “List Property” (Anunciar imóvel) – botão primário.
- **Avatar** para perfil (já temos login/registo).

### Homepage (implícito nos títulos 08–11)
- Hero com proposta de valor e pesquisa em destaque.
- Destaque de imóveis e confiança (verificados, gratuito).
- CTA para agentes.

---

## 3. O que está em falta (checklist)

### Navegação (Header)
| Item | Estado | Prioridade |
|------|--------|------------|
| Links Comprar / Arrendar (ou filtro rápido no search) | Parcial (search tem listing type) | Média |
| Link “Agentes” (página ou secção) | Não existe | Baixa |
| CTA “Anunciar imóvel” visível no header (como no stitch) | Não existe | **Alta** |
| Placeholder da search no header alinhado ao stitch (“Ilha, cidade ou zona”) | Ajustar texto | Baixa |

### Página inicial (Homepage)
| Item | Estado | Prioridade |
|------|--------|------------|
| Hero com i18n (título/subtítulo em PT/EN/FR) | Texto fixo em PT | **Alta** |
| Secção de confiança (números, selos, “agentes verificados”) | Só 3 cards genéricos | Média |
| Destaque por ilha ou “Novos anúncios” (além de “em destaque”) | Só um bloco | Baixa |
| CTA “Anunciar imóvel” na homepage (além do CTA agente) | Só “Área Agente” | Média |
| Rodapé com i18n e links úteis (Sobre, Contacto, etc.) | Footer sem i18n; /about e /contact podem 404 | Média |

### Footer
| Item | Estado | Prioridade |
|------|--------|------------|
| Textos do footer em i18n | Não | Média |
| Páginas Sobre nós (/about) e Contacto (/contact) | Provavelmente inexistentes | Média |
| Link “Anunciar” ou “Área Agente” no footer | Não | Baixa |

### Geral
| Item | Estado | Prioridade |
|------|--------|------------|
| Consistência de cores/estilo com stitch (primary laranja #ec7f13 vs nosso azul) | Projeto usa primary-blue; manter ou documentar decisão | Baixa |
| Responsividade e acessibilidade da nova nav | Manter e validar | Alta |

---

## 4. Próximos passos recomendados (ordem de execução)

### Fase 1 – Navegação (rápido impacto)
1. **Header**: Adicionar CTA “Anunciar imóvel” (link para `/agente/imoveis/novo` ou `/agente/login` se não autenticado), visível em desktop e mobile.
2. **Header**: Opcional – links “Comprar” e “Arrendar” que levam a `/search?listing_type=sale` e `/search?listing_type=rent`.
3. **SearchBar (inline)**: Ajustar placeholder para tipo “Ilha, cidade ou zona” e usar chave i18n.

### Fase 2 – Homepage
4. **Hero**: Colocar título e subtítulo em i18n (chaves `home.heroTitle`, `home.heroSubtitle`, etc.).
5. **Homepage**: Adicionar pequeno CTA “Anunciar imóvel” junto aos botões do hero (ou repetir no topo).
6. **Secção de confiança**: Manter os 3 cards; opcional – adicionar números (ex.: “X imóveis”, “Y agentes”) quando a API o permitir.

### Fase 3 – Footer e rotas
7. **Footer**: Passar textos para i18n; adicionar link “Área Agente” / “Anunciar”.
8. **Rotas**: Criar páginas placeholder `/about` e `/contact` (ou remover do footer até existirem) para evitar 404.

### Fase 4 – Polimento
9. **Link “Agentes”**: Decidir se é página de listagem de agentes ou apenas link para “Área Agente”; se for listagem, criar rota e placeholder.
10. **Revisão**: Testar fluxo completo (home → search, home → anunciar, idiomas, mobile).

---

## 5. Riscos e decisões defensivas

- **Cores**: Manter primary-blue do projeto; não alterar para laranja do stitch sem alinhar com o restante (tailwind, dark mode).
- **Rotas novas**: `/about` e `/contact` como placeholders com layout público e título/parágrafo; depois preencher com conteúdo real.
- **i18n**: Adicionar apenas chaves novas (home.*, nav.listProperty, etc.); não remover chaves existentes.
- **Header**: Não remover SearchBar inline nem selector de idioma; apenas adicionar CTA e, se quisermos, links Comprar/Arrendar.

---

## 6. Ficheiros a alterar (previsão)

| Ficheiro | Alterações |
|----------|------------|
| `web/components/common/Header.tsx` | CTA “Anunciar imóvel”, opcionalmente links Comprar/Arrendar |
| `web/app/(public)/page.tsx` | i18n no hero e CTA; eventual pequeno CTA “Anunciar” |
| `web/lib/i18n/translations/{pt,en,fr}.json` | Novas chaves: home.*, nav.listProperty, footer.*, search.placeholderLocation |
| `web/components/common/SearchBar.tsx` | Placeholder com i18n |
| `web/components/common/Footer.tsx` | i18n + link Área Agente/Anunciar |
| `web/app/(public)/about/page.tsx` | Novo (placeholder) |
| `web/app/(public)/contact/page.tsx` | Novo (placeholder) |

---

## 7. Conclusão

- **Falta implementar**: CTA “Anunciar imóvel” no header, i18n na homepage e no footer, placeholders About/Contact, e pequenos ajustes de copy (placeholder da search, links Comprar/Arrendar opcionais).
- **Próximo passo imediato**: Executar **Fase 1** (Header + CTA + placeholder search) e **Fase 2** (i18n hero + CTA na homepage); em seguida Fase 3 (Footer + rotas) e Fase 4 (polimento e link Agentes).

Quando confirmares este plano, avanço com a implementação pela ordem das fases acima.
