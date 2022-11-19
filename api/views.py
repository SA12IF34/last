from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout
from rest_framework.status import *
from .models import *
from .serializers import *


@api_view(['GET', 'POST'])
def posts(request):

    if request.method == 'GET':
        all_posts = Posts.objects.all()
        serializer = PostsSerializer(instance=all_posts, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)

    if request.method == 'POST':
        serializer = PostsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=HTTP_201_CREATED)
        
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    

    
@api_view(['GET', 'PUT', 'DELETE'])
def get_post(request, pk):

    try:
        post = Posts.objects.get(id=pk)
    except Posts.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = PostsSerializer(post)

        return Response(data=serializer.data)

    if request.method == 'PUT':
        
        new_post = request.data
        
        serializer = PostsSerializer(post, data=new_post)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=HTTP_200_OK)
        
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


    if request.method == 'DELETE':
        post.delete()

        return Response(status=HTTP_204_NO_CONTENT) 


@api_view(['GET', 'POST'])
def sicks(request):
    if request.method == 'GET':
        all_sicks = Sick.objects.all()
        serializer = SicksSerializer(instance=all_sicks, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)
    
    if request.method == 'POST':
        data = request.data
        serializer = SicksSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response(data=serializer.data, status=HTTP_201_CREATED)
        
        return Response(data={"shit": "shit"})

         

@api_view(['GET', 'POST'])
def doctors(request):
    
    if request.method == 'GET':
        doctors = Doctor.objects.all()
        serialize = DoctorsSerializer(instance=doctors, many=True)

        return Response(data=serialize.data, status=HTTP_200_OK)

    if request.method == 'POST':
        serialize = DoctorsSerializer(data=request.data)

        if serialize.is_valid():
            serialize.save()

            return Response(data=serialize.data, status=HTTP_201_CREATED)

        return Response(serialize.errors)


@api_view(['GET'])
def doctor(request, name):
    try:
        doctor = Doctor.objects.get(name=name)
        serialize = DoctorsSerializer(instance=doctor)
    except Doctor.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    

    return Response(data=serialize.data)


@api_view(['GET'])
def aSickInTheRoom(request, num):
    
    try:
        sickchan = Sick.objects.get(room_number=num)
        serializer = SicksSerializer(instance=sickchan)
    except Sick.DoesNotExist:
        return Response(status=HTTP_204_NO_CONTENT)
    

    return Response(data=serializer.data)


@api_view(['POST'])
def add_user(request):

    if request.method == 'POST':
        serializer = AddUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            user = LoginSerializer().create({"username" : request.data['username'], "email": request.data['email'], "password": request.data['password']})

            if user is not None:
                login(request, user)

            return Response(data={"auth": True}, status=HTTP_201_CREATED)
        
        return Response(serializer.errors)
 


@api_view(['POST'])
def logIn(request):

    if request.method == 'POST':
        
        try:
            serializer = LoginSerializer()
        
            
            user = serializer.create(request.data)
            if user:
                login(request, user)

                return Response(data={"auth": True}, status=HTTP_200_OK)

            else:

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

@login_required(login_url="/projects/books-shop/sign-up/")
@api_view(['GET', 'POST'])
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