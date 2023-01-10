from django.urls import path, include
from .import views

urlpatterns = [
    path('user/', include('api.user.urls')),
    path('product/', include('api.product.urls')),
    path('transaction/', include('api.transaction.urls')),
]