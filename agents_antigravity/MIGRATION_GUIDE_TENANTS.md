# 🚜 PLANO DE MIGRAÇÃO: PARA django-tenants

**Status:** PLANEAMENTO (Supervisor Auditado)
**Alvo:** Backend + DevOps

## 📋 PASSO A PASSO PARA EXECUÇÃO

### 1. Instalação e Configuração (`settings.py`)
1. Adicionar `django_tenants` ao topo de `INSTALLED_APPS`.
2. Configurar o motor da base de dados para `django_tenants.postgresql_backend`.
3. Definir as listas de apps:
   - **SHARED_APPS**: `django_tenants`, `core` (com Tenant/User), `agencies`, `admin`, `sessions`.
   - **TENANT_APPS**: `properties`, `leads`, `crm`.
4. Adicionar `django_tenants.middleware.main.TenantMainMiddleware` ao topo do `MIDDLEWARE`.

### 2. Ajustes nos Modelos (`core/models.py`)
1. Implementar o modelo `Tenant(TenantMixin)` e `Domain(DomainMixin)`.
2. O modelo `Agency` deve ser integrado ou associado ao `Tenant`.

### 3. Refatoração de Modelos Tenant-Specific
1. Remover a herança de `TenantModel` nos modelos de `properties` e `crm`.
2. Remover o campo `agency = ForeignKey(Agency...)`. No `django-tenants`, o isolamento é automático por schema.
3. **⚠️ Defensiva**: Não apagar os campos `agency` até que a migração de dados esteja 100% validada.

### 4. Execução das Migrações
1. `python manage.py makemigrations`
2. `python manage.py migrate_schemas --shared` (Cria a estrutura global no schema public)

---

## 🤖 INSTRUÇÕES AOS AGENTES

### Para o **Backend Engineer**:
- "Refatora os modelos nas apps `properties`, `leads` e `crm` para removerem o campo `agency`. Estes modelos agora pertencerão apenas aos schemas dos tenants."
- "Cria os modelos `Client` e `Domain` em `core/models.py` herdando de `TenantMixin` e `DomainMixin`."

### Para o **DevOps Engineer**:
- "Instala a dependência `django-tenants`."
- "Atualiza o `DATABASES` no `settings.py` para usar o router do `django-tenants`."

---
*Assinado,*
**Supervisor IA imo.cv**
