from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .models import *
from .serializers import *

class StudentsAPI(APIView):
    
    def get(self, request, format=None):
        students = Student.objects.all()
        serializer = StudentsSerializer(instance=students, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)
    
    def post(self, request, format=None):
        request.data['first_name'].capitalize()
        request.data['last_name'].capitalize()
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(data=serializer.data, status=HTTP_201_CREATED)

class StudentAPI(APIView):
    
    def get(self, request, nn):
        if "-" in nn:
            name = nn.split("-")
            student = Student.objects.get(first_name=name[0], last_name=name[-1])
        else :
            student = Student.objects.get(national_number=nn)
            
        serializer = StudentsSerializer(instance=student)

        return Response(data=serializer.data, status=HTTP_200_OK)
        

class TeacherAPI(APIView):
    
    def get(self, request, nn):

        teacher = Teacher.objects.get(national_number=nn)
        serializer = TeachersSerializer(instance=teacher)

        return Response(data=serializer.data, status=HTTP_200_OK)
