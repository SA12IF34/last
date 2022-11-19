from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .models import *
from .serializers import *
import requests


sender_chan = "saifchan122@gmail.com"
receiver_chan = "saifchan@mail.com"
password_chan = "upciyzqynkywvcnx"




class ArticlesAPI(APIView):

    def get(self, request, format=None):
        articles = Article.objects.all()
        serializer = ArticleSerializer(instance=articles, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)

    
    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)

        if serializer.is_valid() :
            serializer.save()

            return Response(data=serializer.data, status=HTTP_201_CREATED)
        else :
            print(serializer.data)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)



 
class ArticleAPI(APIView):
    
    def get(self, reqeust, name):
        try:
            article = Article.objects.get(title=name)
            serializer = ArticleSerializer(instance=article)
        except Article.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        return Response(data=serializer.data, status=HTTP_200_OK)
 

class CreatedArticlesAPI(APIView):

    def get(self, request):
        articles = CreatedArticle.objects.all()
        serializer = CreatedArticlesSerializer(instance=articles, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = CreatedArticlesSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=HTTP_201_CREATED)

class UserArticlesAPI(APIView):

    def get(self, request, author):
        # user = User.objects.get(username=name)
        
        articles = CreatedArticle.objects.filter(author=author)
        serializer = CreatedArticlesSerializer(instance=articles, many=True)
        print(articles)
        # print(serializer)
        return Response(data=serializer.data, status=HTTP_200_OK)




class ImgsAPI(APIView):

    def get(self, request, format=None):
        imgs = Image.objects.all()
        serializer = ImgSerializer(instance=imgs, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)

    def post(self, request, format=None):
        serializer = ImgSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(data=serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ImgAPI(APIView):

    def get(self, request, article):

        imgchan = Image.objects.filter(img_article=article)
        serializer = ImgSerializer(instance=imgchan, many=True)

        return Response(data=serializer.data, status=HTTP_200_OK)


class SubscribeAPI(APIView) :

    def get(self, request):

        return Response({"Hello": "Onichan"})
    
    def post(self, request):
        
        
        message = Mail(
            from_email=sender_chan,
            to_emails=receiver_chan,
            subject="Sub Request",
            html_content=f'<strong>{request.data["name"]} wants to be superuser, this is his/her Email {request.data["email"]} Request Content : [{request.data["reasone"]}]</strong>'
        )

        
        sg = SendGridAPIClient("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")
        response = sg.send(message)
        print(response.status_code)
        
        

        return Response({"result": "request is sent"})