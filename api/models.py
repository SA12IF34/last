from django.db import models
from django.contrib.auth.models import User

class Posts(models.Model):

    author = models.CharField(max_length=100, blank=False)
    content = models.TextField(blank=True)
    creationdate = models.DateField(auto_now=True) 



class Sick(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    room_number = models.DecimalField(decimal_places=0, max_digits=3)
    logging_in_time = models.DateField(auto_now=True)
    logging_out_time = models.CharField(max_length=120)
 

class Doctor(models.Model):
    name = models.CharField(max_length=180, blank=False)
    job = models.CharField(max_length=80, blank=False)

    def __str__(self) -> str:
        return f"{self.name}"


class Room(models.Model):
    name = models.CharField(max_length=180, blank=True)
    logging_out_time = models.DateField()


    def __str__(self):
        return f"room {self.id}"



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