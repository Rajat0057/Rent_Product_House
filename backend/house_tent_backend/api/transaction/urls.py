from django.contrib import admin
from django.urls import path
from api.transaction.views import get_transaction_details,store_product

urlpatterns = [
    path('transaction_details/', get_transaction_details),
    #  path('transaction/', transaction_detail),
    path('store_product/', store_product),
    
]