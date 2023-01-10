from django.contrib import admin
from django.urls import path
from api.user.views import signup,login


urlpatterns = [
    path('signup/',signup),
    path('login/',login)
    
]