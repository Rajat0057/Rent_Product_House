from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from .authentication import *
from .utils import *

from .serializers import EmailUserSerializer

from .models import Customer







# This api for the create new user 
@api_view(["POST"])
@permission_classes((AllowAny,))
def signup(request):
    """Accepts an name, email, password in post body and
    create the new user object and return a user user details"""
    try:
        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)
        first_name = data.get('first_name', None)
        last_name = data.get('last_name', None)
        if email and password and first_name and last_name:
            try:
                user = Customer.objects.get(email = email)
                if user:
                    print('email_signup: ', data)
                    return Response({'success':False,'detail': 'Email already exists'}, status = HTTP_400_BAD_REQUEST)
            except Customer.DoesNotExist:
                if '@' not in email:
                   print('email_signup: ', data)
                   return Response({'success':False,'detail': 'Invalid email'}, status = HTTP_400_BAD_REQUEST)  
                else:
                    
                    user = Customer.objects.create(email = email, password = password, first_name = first_name , last_name=last_name)
                    user.save()
                    user_serialized = EmailUserSerializer(user)

                    print('email_signup: ', user_serialized.data)
                    return Response({
                                'success':True,
                                'user': user_serialized.data,

                            }, status = HTTP_200_OK)
        else:
            print('email_signup: ', data)
            return Response({'success':False,'detail': 'Please provide all the required fields'}, status = HTTP_400_BAD_REQUEST)
    except Exception as error:
        print('email_signup: ', error)
        print('email_signup: ', data)
        return Response({'success':False,'detail': 'Unable to signup. Try again '}, status = HTTP_500_INTERNAL_SERVER_ERROR)



# This api for the login the existing user  
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    """Accepts an email, password in post body and
    verified the user is authenticated or not"""
    try:
        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)
        if email and password:
            try:
                user =  Customer.objects.get(email = email)
                if user:
                    if user.password==password:
                        user_serialized = EmailUserSerializer(user)
                        access_token = generate_access_token(user)
                        refresh_token = generate_refresh_token(user)
                        print('email_login: ', user_serialized.data)
                        return Response({
                                    'success':True,
                                    'user': user_serialized.data,
                                    'access_token': access_token,
                                    'refresh_token': refresh_token
                                    
                                }, status = HTTP_200_OK)
                    else:
                        print('email_login: ', data)
                        return Response({'success':False,'detail': 'Incorrect password.'}, status = HTTP_400_BAD_REQUEST)
            except Customer.DoesNotExist:
                print('email_login: ', data)
                return Response({'success':False,'detail': 'User does not exist. Please signup.'}, status = HTTP_400_BAD_REQUEST)
        else:
            print('email_login: ', data)
            return Response({'success':False,'detail': 'Please enter all the required fields.'}, status = HTTP_400_BAD_REQUEST)
    except Exception as error:
        print('email_login: ', error)
        print('email_login: ', data)
        return Response({'success':False,'detail': 'Unable to login. Please try again.'}, status=HTTP_500_INTERNAL_SERVER_ERROR) 

