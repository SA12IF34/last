from django.urls import path
from .views  import *

urlpatterns = [
    path('add-user/', add_user),
    path('users/', getUsers),
    path('users/<str:pk>/', getUser),
    path('login/', logIn), 
    path('logout/', logOut),
    path('cart/', addtocart),
    path('cart/<int:user>/', getFromCart),
    path('books/', books),
    path('books/<str:book>for<int:owner>/', book),
    path('boughts/', addtoboughts),
    path('boughts/<int:owner>/', getBoughts),
    path('checkoutchan/', checkout_session)
]   