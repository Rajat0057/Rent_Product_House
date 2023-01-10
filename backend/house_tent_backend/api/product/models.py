from django.db import models

# Create your models here.

class Product(models.Model):
    """
    This class is Product model
    """
    title = models.CharField(max_length=60)
    quantity_total = models.IntegerField()
    quantity_booked = models.IntegerField()
    quantity_available = models.IntegerField()
    price = models.DecimalField(max_digits = 10, decimal_places = 2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        """
        This is a meta class
        """
        verbose_name_plural = "Product"