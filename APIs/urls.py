from django.urls import path
from .views import *

urlpatterns = [
    path('students/', StudentsAPI.as_view()),
    path('students/<str:nn>/', StudentAPI.as_view()),
    path('teachers/<str:nn>/', TeacherAPI.as_view())
]