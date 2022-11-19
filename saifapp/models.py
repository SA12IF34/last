import imghdr
from pyexpat import model
from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):

    title = models.CharField(max_length=200)
    paragraph = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    author_name  = models.CharField(max_length=150)
    creation_date = models.DateField(auto_now=True)

    def __str__(self):

        return f"{self.title} || {self.author_name}"



class Image(models.Model) :
    
    img = models.TextField()
    img_article = models.ForeignKey(Article, on_delete=models.CASCADE)
    line_number = models.IntegerField()
    


class CreatedArticle(models.Model):

    title = models.CharField(max_length=200)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    author = models.CharField(max_length=200)

    def __str__(self):

        return f"{self.title} for {self.author}"

    

  