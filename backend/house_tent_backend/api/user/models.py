from django.db import models
from django import forms

# Create your models here.

class Customer(models.Model):
    
    """
    This class is User model
    """
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=80,unique=True)
    password= models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name

    class Meta:
        """
        This is a meta class
        """
        verbose_name_plural = "Customer"
