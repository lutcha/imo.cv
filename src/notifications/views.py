from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from core.models import Notification


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_notifications(request):
    qs = Notification.objects.filter(user=request.user).order_by('is_read', '-created_at')[:50]
    data = [
        {
            'id': n.id,
            'type': n.type,
            'title': n.title,
            'body': n.body,
            'is_read': n.is_read,
            'action_url': n.action_url,
            'created_at': n.created_at.isoformat(),
        }
        for n in qs
    ]
    return Response(data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_read(request, pk):
    Notification.objects.filter(user=request.user, pk=pk).update(is_read=True)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_all_read(request):
    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response(status=status.HTTP_204_NO_CONTENT)
