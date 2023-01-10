"""
serializers module

helps in serialization and deserialization for CustomUser model
"""
from rest_framework import serializers
from .models import Transaction



class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('transaction_type', 'product_id','customer_id','quantity','created_at','updated_at')