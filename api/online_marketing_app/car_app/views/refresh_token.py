"""This module defines class TokenRefresh"""
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from car_app.models import User
from car_app.views.views_helper_functions import decode_refresh_token


class TokenRefresh(APIView):
    """This class defines a method that refreshes an access token."""
    def post(self, request):
        """This method returns a new access token"""

        result = decode_refresh_token(request)

        if isinstance(result, JsonResponse):
            return result

        user_id, refresh_token = result

        try:
            User.objects.get(id=user_id)
        except User.DoesNotExist: # pylint: disable=no-member
            return JsonResponse({'error': 'Provided token has no valid user.'}, status=401)

        token = RefreshToken(refresh_token)
        access_token = token.access_token

        return JsonResponse({'access': str(access_token)}, status=200)
