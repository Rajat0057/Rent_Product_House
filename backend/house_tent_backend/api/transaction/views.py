from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


import json

from api.user.authentication import JWTAuthentication

from api.product.models import Product
from api.user.models import Customer
from api.transaction.models import Transaction

# from .serializers import ProductSerializer
from .serializers import TransactionSerializer






# This api get the details of the transaction models
@api_view(["GET"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def get_transaction_details(request):
    """ This api get the details of the transaction models """  
    try:
        data = request.data
        transaction = Transaction.objects.all()
        print("1--------",transaction)
        transaction_serialized = TransactionSerializer(transaction, many = True)
        print(transaction_serialized.data)
        for i in range(len(transaction_serialized.data)):
            customer_id = transaction_serialized.data[i]["customer_id"]
            product_id = transaction_serialized.data[i]["product_id"]
            customer = Customer.objects.get(id=customer_id)
            product = Product.objects.get(id=product_id)
            transaction_serialized.data[i]["product_price"] = product.price
            transaction_serialized.data[i]["product_title"] = product.title
            transaction_serialized.data[i]["first_name"] = customer.first_name
            transaction_serialized.data[i]["last_name"] = customer.last_name
        print(product.price,product.title)
        print(customer.first_name)
        print(customer.last_name)
        
        return Response({
                        'success':True,
                        'products': transaction_serialized.data,
                    }, status = HTTP_200_OK)
        
    except Exception as error:
        print('get_transaction_details: ', error)
        print('get_transaction_details: ', data)
        return Response({'success':False,'detail': 'Unable to get transaction details. Please contact support.'}, status=HTTP_500_INTERNAL_SERVER_ERROR)



# This api create the new object in the transaction when any order book or release
# @csrf_exempt

@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes([JWTAuthentication])
def store_product(request):
    
    """This api create the new object in the transaction when any order book or release """    
    try:
        data = request.data
        product_id = data.get('product_id')
        customer_id = data.get('customer_id')
        transaction_type = data.get('type')
        quantity = data.get('quantity')        
        product = Product.objects.get(id=product_id)
        customer = Customer.objects.get(id=customer_id)
        if product and customer:
            print("1------------->",product_id,customer_id,quantity,transaction_type)
            Transaction.objects.create( customer_id = customer, product_id = product , transaction_type=transaction_type, quantity = quantity)
            return Response({'success': True, 'detail': "order booked successfully"}, status=HTTP_200_OK)
                
    except Exception as error:
        print('error in transaction_detail: ', error)
        print('error in transaction_detail: ', data)
        return Response({'success':False,'detail': 'Unable to get transaction detail. Please contact support'},status=HTTP_500_INTERNAL_SERVER_ERROR)
        
                