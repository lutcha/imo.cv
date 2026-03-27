from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .models import Agency
from .serializers import AgencySerializer, AgencyMeSerializer


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'


class AgencyMeView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/agencies/me/  — retorna a agência do agente autenticado
    PATCH /api/agencies/me/ — atualiza campos editáveis do perfil da agência
    """
    serializer_class = AgencyMeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = self.request.user
        if not user.agency_id:
            from rest_framework.exceptions import NotFound
            raise NotFound("Nenhuma agência associada a este utilizador.")
        return user.agency
