from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import *

from .models import *
from .serializers import *

import requests





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
        
        
        requests.post(
		"https://api.mailgun.net/v3/sandbox867139736e344d0497b3d9c63dd32ba7.mailgun.org/messages",
		auth=("api", "c3d86e0b1474dc11a89edae57c9c6a14-c2efc90c-920bc955"),
		data={"from": f"{request.data['name']} <{request.data['email']}>",
			"to": "‪Saif Ayesh‬‏ <ayeshsaif367@gmail.com>",
			"subject": f"subscribtion request for blog",
			"text": f"{request.data['reasone']}"})
        
        

        return Response({"result": "request is sent"})


class Message(APIView):

    def get(self, request):
        
        return Response(data={"news": "nothing to see here"})
    
    def post(self, request):
        
        try:
            requests.post(
		"https://api.mailgun.net/v3/sandbox867139736e344d0497b3d9c63dd32ba7.mailgun.org/messages",
		auth=("api", "c3d86e0b1474dc11a89edae57c9c6a14-c2efc90c-920bc955"),
		data={"from": f"{request.data['name']} <{request.data['email']}>",
			"to": "‪Saif Ayesh‬‏ <ayeshsaif367@gmail.com>",
			"subject": f"{request.data['subject']}",
			"text": f"{request.data['body']}"})

            

        except :
            return Response(data = {"error": "some error occured"}, status=HTTP_400_BAD_REQUEST)

            

        return Response(data={"good": "email is sent"}, status=HTTP_200_OK) 