import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication

# from datetime import timedelta
# from django.utils import timezone
from django.conf import settings
from rest_framework import exceptions
from rest_framework import status
from rest_framework.exceptions import APIException


class NoAuthToken(APIException):
    """ Exception class to provide values when auth token is not provided """
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "No authentication token provided"
    default_code = "no_auth_token"
    
class JWTAuthentication(BaseAuthentication):
    """
    If token is expired then it will be removed
    and new one with different key will be created
    """
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            raise NoAuthToken("No Auth Token Provided")
        token = auth_header.split(" ").pop()
        print("token:",token)
        self.authenticate_credentials(token)

    def authenticate_credentials(self, access_token):
        try:
            payload = jwt.decode(
                access_token, settings.SECRET_KEY, algorithms=['HS256']) 
            print("paylaod:",payload)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('access_token expired')
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing')

        if not payload:
            raise AuthenticationFailed("The Token is expired")

        return payload
