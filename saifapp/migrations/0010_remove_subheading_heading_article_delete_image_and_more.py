# Generated by Django 4.1 on 2022-10-01 14:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('saifapp', '0009_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subheading',
            name='heading_article',
        ),
        migrations.DeleteModel(
            name='Image',
        ),
        migrations.DeleteModel(
            name='Subheading',
        ),
    ]
