from django.urls import path
from .views  import *

urlpatterns = [
    path('blogerapi/', posts),
    path("blogerapi/<int:pk>/", get_post),
    path('sicks/', sicks), 
    path('doctors/', doctors),
    path('doctors/<str:name>/', doctor),
    path('sicks/<str:num>/', aSickInTheRoom),
    path('add-user/', add_user),
    path('users/', getUsers),
    path('users/<str:pk>/', getUser),
    path('login/', logIn), 
    path('logout/', logOut),
    path('cart/', addtocart),
    path('books/', books),
    path('books/<str:book>for<int:owner>/', book),
    path('boughts/', addtoboughts)
]   