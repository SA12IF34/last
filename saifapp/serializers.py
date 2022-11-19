from rest_framework import serializers
from .models import *

class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = '__all__'



class ImgSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = Image
        fields = '__all__'



class CreatedArticlesSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreatedArticle
        fields = '__all__'