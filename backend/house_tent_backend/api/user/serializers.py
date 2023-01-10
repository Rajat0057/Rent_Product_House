"""
serializers module

helps in serialization and deserialization for User model
"""
from rest_framework import serializers
from api.user.models import Customer


class EmailUserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

class EmailUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'first_name', 'last_name',  'email', 'password')



