"""This module defines class UserLogin."""
from django.http import JsonResponse
from django.utils import timezone
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from user_activity.models import UserActivity


class UserLogin(APIView):
    """This class defines a method for user login"""
    def post(self, request):
        """
        This method returns access and refresh tokens for a user
        if the provided data for login is found in the database.
        It returns a http error code of 400 if the provided data
        for login is not found in the database.
        """
        #pylint: disable=no-member

        if request.content_type != 'application/json':
            return JsonResponse({'error': 'The Content-Type must be json.'}, status=415)

        username = request.data.get('username')
        password = request.data.get('password')
        if username is None:
            return JsonResponse({'error': 'Username must be provided.'}, status=400)
        if password is None:
            return JsonResponse({'error': 'Password must be provided.'}, status=400)

        user = authenticate(username=username, password=password)

        if user is None:
            return JsonResponse({'error': 'User not found.'}, status=400)

        refresh = RefreshToken.for_user(user)

        refresh['username'] = user.username
        refresh['is_superuser'] = user.is_superuser
        refresh['is_manager'] = user.is_manager
        refresh['first_name'] = user.first_name
        refresh['last_name'] = user.last_name
        refresh['email'] = user.email
        refresh['phone_number'] = user.phone_number
        refresh['team_manager'] = str(user.team_manager)
        refresh['created_at'] = str(user.created_at)
        refresh['referral_code'] = user.referral_code

        access = str(refresh.access_token)

        response = JsonResponse({'access': access}, status=200)
        refresh_token_lifetime = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
        max_age_seconds = refresh_token_lifetime.total_seconds()
        response.set_cookie(
            key='refresh',
            value=str(refresh),
            httponly=True,
            max_age=max_age_seconds,
            secure=True,
            samesite=None,
        )

        user.last_login = timezone.now()
        user.save()

        UserActivity.objects.create(
            user = user,
            activity_type = 'Login',
        )

        return response
