from rest_framework import serializers
from .models import *


class StudentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = '__all__'
        



class TeachersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Teacher
        fields = '__all__'