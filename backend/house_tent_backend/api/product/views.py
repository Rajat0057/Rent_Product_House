from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from api.user.authentication import JWTAuthentication
from .serializers import ProductSerializer

from api.transaction.models import Transaction
from .models import Product



# This api for the create the new product
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def create(request):
    """Accepts an title, quantity_booked, price, and quantity_total in post body and
    create the new product object and return a new product detail"""
    data = request.data
    try:
        title = data.get('title',None)
        quantity_booked = data.get('quantity_booked',None)
        price = data.get('price',None)
        quantity_total = data.get('quantity_total',None)
        quantity_available = data.get('quantity_available',None)
        new_product_data = Product.objects.create(title = title, quantity_booked = quantity_booked, quantity_available=quantity_available, price = price, quantity_total = quantity_total)
        new_product_data.save()
        
        serializer = ProductSerializer(new_product_data)
        print('create_Product_data: ', serializer.data)
        return Response({'success': True, 'detail': serializer.data}, status=HTTP_200_OK)

    except Exception as error:
        print('create_Product: ', error)
        print('create_Product: ', data)
        return Response({'success':False,'detail': 'Unable to create New Product. Please try again to create product'}, status = HTTP_500_INTERNAL_SERVER_ERROR)


# This api for the get the product details
@api_view(['GET'])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def get_product(request):
    """Accepts the product id or none in the get body and
    return the particular product details or all product details"""
    try:
        data = request.data
        product_id = request.GET.get('product_id', None)
        if product_id:
            try:
                product = Product.objects.get(id = product_id)
                if product:
                    product_serialized = ProductSerializer(product)
                    print('get_products: ', product_serialized.data)
                    return Response({
                                'success':True,
                                'product': product_serialized.data,
                            }, status = HTTP_200_OK)
            except Product.DoesNotExist:
                print('get_products: ', data)
                return Response({'success':False,'detail': 'Product does not exist.'}, status = HTTP_400_BAD_REQUEST)
        else:
            products = Product.objects.all()
            products_serialized = ProductSerializer(products, many = True)
            print('get_products: ', products_serialized.data)
            return Response({
                        'success':True,
                        'products': products_serialized.data,
                    }, status = HTTP_200_OK)
    except Exception as error:
        print('get_products: ', error)
        print('get_products: ', data)
        return Response({'success':False,'detail': 'Unable to get products. Please try again.'}, status = HTTP_500_INTERNAL_SERVER_ERROR)


# This api for the update the any product values
@api_view(["PUT"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def update_product(request):
    """Accepts the product id, title, quantity_booked, quantity_total and price, and update the
    particular product value"""
    try:
        data = request.data
        product_id = data.get('product_id', None)
        title = data.get('title', None)
        quantity_booked = data.get('quantity_booked', None)
        quantity_total = data.get('quantity_total', None)
        quantity_available = data.get('quantity_available', None)
        price = data.get('price', None)
        if product_id and title and quantity_total and quantity_booked and price and quantity_available:
            try:
                product = Product.objects.get(id = product_id)
                if product:
                    product.title = title
                    product.quantity_booked = quantity_booked
                    product.quantity_total = quantity_total
                    product.quantity_available=quantity_available
                    product.price = price
                    product.save()
                    product_serialized = ProductSerializer(product)
                    print('update_product: ', product_serialized.data)
                    return Response({
                                'success':True,
                                'product': product_serialized.data,
                            }, status = HTTP_200_OK)
            except Product.DoesNotExist:
                print('update_product: ', data)
                return Response({'success':False,'detail': 'Product does not exist.'}, status = HTTP_400_BAD_REQUEST)
        else:
            print('update_product: ', data)
            return Response({'success':False,'detail': 'Please enter all the required fields.'}, status = HTTP_400_BAD_REQUEST)
    except Exception as error:
        print('update_product: ', error)
        print('update_product: ', data)
        return Response({'success':False,'detail': 'Unable to update product. Please try again to update.'}, status=HTTP_500_INTERNAL_SERVER_ERROR)
  
 
# This api for the delete the any product object   
@api_view(["DELETE"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def delete_product(request):
    """Accepts the product id and delete the specific particular object"""
    try:
        data = request.data
        product_id = request.GET.get('product_id', None)
        if product_id:
            try:
                product = Product.objects.get(id = product_id)
                if product:
                    product.delete()
                    print('delete_product: ', data)
                    return Response({
                                'success':True,
                                'detail': 'Product deleted successfully.',
                            }, status = HTTP_200_OK)
            except Product.DoesNotExist:
                print('delete_product: ', data)
                return Response({'success':False,'detail': 'Product does not exist.'}, status = HTTP_400_BAD_REQUEST)
        else:
            print('delete_product: ', data)
            return Response({'success':False,'detail': 'Please enter all the required fields.'}, status = HTTP_400_BAD_REQUEST)
    except Exception as error:
        print('delete_product: ', error)
        print('delete_product: ', data)
        return Response({'success':False,'detail': 'Unable to delete product. Please try again to delete'}, status = HTTP_500_INTERNAL_SERVER_ERROR)
    
    
#  This api for the rent any specific product
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def rent_product(request):
    """Accepts the user name, title, price, quantity and booked the new rent order and update with the product 
    object values like quantity_booked """
    try:
        data = request.data
        product_id = data.get('product_id', None)
        quantity = data.get('quantity', None)
        if product_id:
            try:
                product=Product.objects.get(id=product_id)
                if product:
                    # quantity = quantity
                    product.quantity_total =  product.quantity_total
                    product.quantity_booked = product.quantity_booked
                    product.quantity_available = product.quantity_available
                    quantity = int(quantity)
                    print(quantity)
                    if quantity <= product.quantity_available:
                        product.quantity_booked = product.quantity_booked + quantity
                        product.quantity_available = product.quantity_available - quantity  
                        product.save()
                        print("order is booked and now quantity is", product.quantity_total, product.quantity_booked)
                        product_serialized=ProductSerializer(product)
                        print('rent_product: ', product_serialized.data)
                        return Response({
                                            'success':True,
                                            'product': product_serialized.data,
                                        }, status=HTTP_200_OK)
                    else:
                        print("insufficient total quantity")  
                        return Response({
                                            'success':False,
                                            'product': product_serialized.data,
                                        }, status=HTTP_400_BAD_REQUEST)  
            except Product.DoesNotExist:
                print('rent_product: ', data)
                return Response({'success':False,'detail': 'Product does not exist.'}, status=HTTP_400_BAD_REQUEST)
        else:
            print('rent_product: ', data)
            return Response({'success':False,'detail': 'Please enter all the required fields.'}, status=HTTP_400_BAD_REQUEST)              
    
    except Exception as error:
        print('rent_product: ', error)
        print('rent_product: ', data)
        return Response({'success':False,'detail': 'Unable to update product. Please try again to book product.'}, status = HTTP_500_INTERNAL_SERVER_ERROR)

# This api show the available quantity of the products   
@api_view(["GET"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def inventory_summary(request):
    """This api show the available quantity of the products"""
    try:
        data = request.data
        product = Product.objects.all() 
        products_serializer = ProductSerializer(product, many=True)
        print('inventory_summary: ', products_serializer.data)
        return Response({
                    'success':True,
                    'products': products_serializer.data,
                }, status=HTTP_200_OK)
    except Exception as error:
        print('inventory_summary: ', error)
        print('inventory_summary: ', data)
        return Response({'success':False,'detail': 'Unable to get inventory summary. Please Try Again.'}, status=HTTP_500_INTERNAL_SERVER_ERROR)

# This api update the product quantity when any user rent out any product
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def out_product(request):
    """Accepts the product id and quantity for update with the product object values like quantity_booked """
    try:
        data = request.data
        product_id = data.get('product_id', None)
        quantity = data.get('quantity', None)
        if product_id:
            try:
                product=Product.objects.get(id=product_id)
                if product:
                    quantity=int(quantity)
                    product.quantity_booked = product.quantity_booked - quantity
                    product.quantity_available = product.quantity_available + quantity  
                    product.save()
                    print("order is release and now quantity is", product.quantity_total, product.quantity_booked)
                    product_serialized=ProductSerializer(product)
                    print('rent_product: ', product_serialized.data)
                    return Response({
                                            'success':True,
                                            'product': product_serialized.data,
                                        }, status=HTTP_200_OK)
                    
            except Product.DoesNotExist:
                print('rent_product: ', data)
                return Response({'success':False,'detail': 'Product does not exist.'}, status=HTTP_400_BAD_REQUEST)
        else:
            print('rent_product: ', data)
            return Response({'success':False,'detail': 'Please enter all the required fields.'}, status=HTTP_400_BAD_REQUEST)              
   
    except Exception as error:
        print('rent_product: ', error)
        print('rent_product: ', data)
        return Response({'success':False,'detail': 'Unable to update product. Please try again to out the product.'}, status = HTTP_500_INTERNAL_SERVER_ERROR)
