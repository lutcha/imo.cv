from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email', '').strip().lower()
    password = request.data.get('password', '')

    if not email or not password:
        return Response(
            {'detail': 'Email e palavra-passe são obrigatórios.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Users are created with username = email
    try:
        user = User.objects.get(username=email)
    except User.DoesNotExist:
        # Also try looking up by email field
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'detail': 'Email ou palavra-passe incorretos.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    if not user.check_password(password):
        return Response(
            {'detail': 'Email ou palavra-passe incorretos.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.is_active:
        return Response(
            {'detail': 'Conta desativada.'},
            status=status.HTTP_403_FORBIDDEN,
        )

    tokens = get_tokens_for_user(user)
    return Response({
        'access': tokens['access'],
        'refresh': tokens['refresh'],
        'user': {
            'id': user.pk,
            'email': user.email or user.username,
            'name': user.get_full_name() or user.username,
            'is_staff': user.is_staff,
        },
    })
