from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *



class GetUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']

class AddUserSerializer(serializers.Serializer):

    username = serializers.CharField(
        label="Username",
        write_only=True
    )

    email = serializers.EmailField(
        label="Email",
        write_only=True
    )

    password = serializers.CharField(
        label="Password",
        
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only = True
    )


    def create(self, data):

        user = User.objects.create(username=data['username'], email=data['email'], password=data['password'])

        user.set_password(data['password'])
        user.save()

    

        return user
    



class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(
        label= "Username",
        write_only = True
    )

    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        write_only=True
    )

    email = serializers.EmailField(
        label="Email",
        write_only=True
    )

     

    def create(self, data):

        try:
            ensure = User.objects.filter(username=data['username'], email=data['email']).exists()
            
            if ensure:

                user = authenticate(username=data['username'], email=data['email'], password=data['password'])

                return user
        except :
            return False
        
        
class UsersSerializer(serializers.ModelSerializer):

    class Meta :
        model = User
        fields = ['id', 'username', 'email']


class CartSerializer(serializers.Serializer):


 
    owner = serializers.DecimalField(max_digits=8, decimal_places=8 ,write_only=True)
    book_name = serializers.CharField(write_only=True)
    book_id = serializers.CharField(write_only=True)

    def create(self, data):

        user = User.objects.get(id=data['owner'])

        newBook = Cart(book_name=data['book_name'], book_id=data['book_id'])

        newBook.owner = user

        newBook.save()

        return data


class BooksSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = '__all__'



class BoughtSerializer(serializers.Serializer):

    owner = serializers.CharField(write_only=True)
    book_name = serializers.CharField(write_only=True)
    book_id = serializers.CharField(write_only=True)

    def create(self, data):

        user = User.objects.get(username=data['owner'])

        newBook = Bought(book_name=data['book_name'], book_id=data['book_id'])

        newBook.owner = user

        newBook.save()

        try:
            book = Cart.objects.get(book_name=data['book_name'])
            book.delete()
        except Cart.DoesNotExist:
            pass

        return data


