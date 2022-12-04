from django.db import models
from django.contrib.auth.models import User




class Auth(models.Model):
    name = models.CharField(max_length=100)
    authenticated = models.BooleanField()

    def __str__(self):

        return f"{self.name} || {self.authenticated}"
    

 

class Cart(models.Model):
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    book_name = models.CharField(max_length=200)
    book_id = models.CharField(max_length=200)


    def __str__(self):

        return f"{self.book_name} | {self.owner}"


class Bought(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    book_name = models.CharField(max_length=200)
    book_id = models.CharField(max_length=200)

    def __str__(self):
    
        return f"{self.book_name} | {self.owner}"