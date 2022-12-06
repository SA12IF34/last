from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout
from rest_framework.status import *
from django.shortcuts import redirect
from .models import *
from .serializers import *
import stripe



@api_view(['POST'])
def add_user(request):

    if request.method == 'POST':
        serializer = AddUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            user = LoginSerializer().create({"username" : request.data['username'], "email": request.data['email'], "password": request.data['password']})

            if user is not None:
                login(request, user)

            user2 = User.objects.get(username=request.data['username'])
            serializer2 = UsersSerializer(instance=user2)
            
            return Response(data=serializer2.data, status=HTTP_201_CREATED)
        
        return Response(serializer.errors)



@api_view(['POST'])
def logIn(request):

    if request.method == 'POST':
        
        try:
            serializer = LoginSerializer()
         
            
            user = serializer.create(request.data)
            if user:
                login(request, user)

                user2 = User.objects.get(username=request.data['username'])
                serializer2 = UsersSerializer(instance=user2)
                print("good")
                return Response(data=serializer2.data, status=HTTP_200_OK)

            else:
                print("not good")
                return Response(data={"shit": "this shit is not found"})
        except :
            return Response({"good": False})


@api_view(['POST'])
def logOut(request):
    if request.method == 'POST':
        try :
            logout(request)
    
            return Response(data={"cool": "shit"}, status=HTTP_202_ACCEPTED)
        except :
            return Response(data={"shit": "shit"})


 
@api_view(['GET'])
def getUsers(request):
     
    all_users = User.objects.all()
    serializer = UsersSerializer(instance=all_users, many=True)

    return Response(data=serializer.data, status=HTTP_200_OK)


@api_view(['GET'])
def getUser(request, pk):
    
    user = User.objects.get(username=pk)
    serializer = UsersSerializer(instance=user)

    return Response(data=serializer.data)


@api_view(['POST'])
def addtocart(request):
    
    if request.method == 'POST':
        try:
            serializer = CartSerializer()

            result = serializer.create(data=request.data)
    
            return Response(data=result, status=HTTP_201_CREATED)
        except:
            return Response({"error": "something happend"})
    
    return Response(data={"shit": "shit"})


@api_view(['GET'])
def getFromCart(request, user):
    
    books = Cart.objects.filter(owner=user)
    serializer = BooksSerializer(instance=books, many=True)

    return Response(data=serializer.data, status=HTTP_200_OK)


@api_view(['GET'])
def books(request):

    
    all_books = Cart.objects.all()
    saif = BooksSerializer(instance=all_books, many=True)

    return Response(data=saif.data, status=HTTP_200_OK)

@api_view(['GET', 'DELETE'])
def book(request, book, owner):

    try:
        user = User.objects.get(id=owner)
        book = Cart.objects.get(owner=user, book_name=book)
    except:
        return Response(status=HTTP_404_NOT_FOUND)

    if request.method == "GET":
        

        book_serializer = BooksSerializer(instance=book)
        owner_serializer = GetUserSerializer(instance=user)

        data = book_serializer.data
        data.update({"owner_name": owner_serializer.data['username']}) 

        return Response(data=data, status=HTTP_200_OK)
    
    if request.method == "DELETE":

        book.delete()

        return Response(status=HTTP_204_NO_CONTENT)
        


@api_view(['GET','POST'])
def addtoboughts(request):
    
    if request.method == 'GET':
        books = Bought.objects.all()
        serializer = BooksSerializer(instance=books, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)

    if request.method == 'POST':

        user = User.objects.get(id=request.data['owner'])

        serializer = BoughtSerializer()

        request.data['owner'] = user.username

        data = serializer.create(data=request.data)

        return Response(data=data, status=HTTP_201_CREATED)

#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------

stripe.api_key = 'sk_test_51MA63vE7D45S4zL6PyiB2XnKmSOBsO5tobb0gjFzENwTqjna6tlpBqo3SsLgCVF4VxY4kkShyDxZeh6DHtrqcml400Kl7WmTwe'

DOMAIN1 = 'http://saifchan.site/ecommerce-project/success'
DOMAIN2 = 'http://saifchan.site/ecommerce-project'

@api_view(['POST'])
def checkout_session(request):
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': 'price_1MARjrE7D45S4zL6OyBj1Whv',
                    'quantity': 1
                }
            ],
            mode='payment',
            success_url=DOMAIN1+'?',
            cancel_url=DOMAIN2+'?canceled=true',
        )
    except Exception as e:
        print(e.args)
        return Response(exception=e)
    print(checkout_session.url)
    return redirect(checkout_session.url, code=303)
 