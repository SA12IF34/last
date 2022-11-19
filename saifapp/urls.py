from django.urls import path
from .views import *


urlpatterns = [
    path('articles/', ArticlesAPI.as_view()),
    path('articles/<str:name>/', ArticleAPI.as_view()),
    path('created-articles/', CreatedArticlesAPI.as_view()),
    path('created-articles/<str:author>/', UserArticlesAPI.as_view()),
    path('imgs/', ImgsAPI.as_view()),
    path('imgs/<int:article>/', ImgAPI.as_view()),
    path('subscribe/', SubscribeAPI.as_view()),
]  