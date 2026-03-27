"""
Permissões específicas do módulo de condomínios.

Hierarquia de acesso:
  SYSTEM_ADMIN / AGENCY_ADMIN  → acesso total
  CONDOMINIUM_MANAGER          → acesso apenas aos condomínios onde é manager
  AGENT                        → leitura; não pode fazer operações destrutivas
  Residente (JWT custom)       → portal do morador apenas
"""
from rest_framework import permissions


ADMIN_ROLES = {'SYSTEM_ADMIN', 'AGENCY_ADMIN'}
MANAGER_ROLE = 'CONDOMINIUM_MANAGER'


class IsCondominiumManagerOrAdmin(permissions.BasePermission):
    """
    Permite:
      - SYSTEM_ADMIN / AGENCY_ADMIN: sempre
      - CONDOMINIUM_MANAGER: apenas se for o manager do condomínio da view
      - Outros: apenas métodos seguros (GET, HEAD, OPTIONS)
    """
    message = 'Apenas o gestor do condomínio ou um administrador pode realizar esta operação.'

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role in ADMIN_ROLES:
            return True
        # Safe methods allowed for everyone authenticated
        if request.method in permissions.SAFE_METHODS:
            return True
        # CONDOMINIUM_MANAGER and AGENT can write — object-level check below
        return True

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role in ADMIN_ROLES:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        # Determine the condominium from the object
        condominium = _get_condominium(obj)
        if condominium is None:
            return True
        if request.user.role == MANAGER_ROLE:
            return condominium.manager_id == request.user.pk
        # AGENTs can write (they manage on behalf of agency) — restrict further if needed
        return True


class IsCondominiumManagerOrAdminAction(permissions.BasePermission):
    """
    Stricter: used on @action endpoints that mutate state
    (open/close assembly, bulk fee creation, etc.)
    Only SYSTEM_ADMIN, AGENCY_ADMIN, or the condominium's own manager.
    """
    message = 'Apenas o gestor do condomínio ou um administrador pode realizar esta acção.'

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.role in ADMIN_ROLES | {MANAGER_ROLE, 'AGENT'}

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role in ADMIN_ROLES:
            return True
        condominium = _get_condominium(obj)
        if condominium is None:
            return True
        return condominium.manager_id == request.user.pk


def _get_condominium(obj):
    """Extract the Condominium instance from any condominium-related object."""
    from .models import Condominium
    if isinstance(obj, Condominium):
        return obj
    return getattr(obj, 'condominium', None)
