
from random import choices
from django.db import models

YEARS = ['FST', 'SND']

GRADE_CHOICES = [
    (YEARS[0], 'First'),
    (YEARS[1], 'Second')
]

SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F']
SECTION_CHOICES = [
    (SECTIONS[0], 'A'),
    (SECTIONS[1], 'B'),
    (SECTIONS[2], 'C'),
    (SECTIONS[3], 'D'),
    (SECTIONS[4], 'E'),
    (SECTIONS[5], 'F'),
]

SPECIALIZATION = ['Scientific', 'Literary', 'Industrial']
SPECIALIZATION_CHOICES = [
    (SPECIALIZATION[0], 'Scientific'),
    (SPECIALIZATION[1], 'Literary'),
    (SPECIALIZATION[2], 'Industrial'),
]


SUPERVISORED_GRADE = []

i=0
while i < len(SECTIONS) :
    for y in YEARS:
        j=0
        while j < len(SPECIALIZATION):
            SUPERVISORED_GRADE.append((f"{SPECIALIZATION[j]} {y} {SECTIONS[i]}", f"{SPECIALIZATION[j]} {y} {SECTIONS[i]}"))
            j+=1
    i+=1

class Student(models.Model):
    
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    national_number = models.CharField(max_length=12)
    grade = models.CharField(max_length=30, 
                                choices=GRADE_CHOICES, 
                                default=YEARS[0])
    specialization = models.CharField(max_length=30, choices=SPECIALIZATION_CHOICES)
    section = models.CharField(max_length=30, choices=SECTION_CHOICES)

    def __str__(self):
        return f'{self.first_name} {self.last_name} | {self.grade} {self.specialization} {self.section}'

 
class Teacher(models.Model):
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    national_number = models.CharField(max_length=12)
    supervisor_for_grade = models.CharField(max_length=200, choices=SUPERVISORED_GRADE)
    stuff = models.CharField(max_length=100)


    def __str__(self):
        return f"{self.first_name} {self.last_name}/{self.stuff} | {self.supervisor_for_grade}"