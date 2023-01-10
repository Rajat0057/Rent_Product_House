from django.db import models
from api.product.models import Product
from api.user.models import Customer
from django.utils import timezone

# Create your models here.

class Transaction(models.Model):
    """
    This class is Transaction model
    """
    STATUS_CHOICES = (
        ("In", "In"),
        ("Out", "Out"),
    )
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    transaction_type = models.CharField(
        max_length=60, choices=STATUS_CHOICES ,db_column='type'
    )
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.quantity)

    class Meta:
        """
        This is a meta class
        """
        verbose_name_plural = "Transaction"


