"""
serializers module

helps in serialization and deserialization for CustomUser model
"""
from rest_framework import serializers
from api.product.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','title', 'quantity_booked',  'quantity_total', 'quantity_available','price','created_at','updated_at')