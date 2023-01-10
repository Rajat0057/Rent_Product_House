from django.contrib import admin
from django.urls import path
from api.product.views import create,get_product,update_product,delete_product,rent_product,inventory_summary,out_product


urlpatterns = [
    path('create/',create),
    path('get_product/',get_product),
    path('update_product/',update_product),
    path('delete_product/',delete_product),
    path('rent_product/',rent_product),
    path('inventory_summary/',inventory_summary),
    path('out_product/',out_product),
    
    
]