from unittest.util import _MAX_LENGTH
from django.db import models

class Usuario(models.Model):
    userid= models.CharField(max_length=100)
    nombre= models.CharField(max_length=100)
    correo= models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    ultimas= models.JSONField()
    recomendaciones= models.JSONField()

class Artista (models.Model):
    nombre= models.CharField(max_length=100)
    canciones= models.JSONField()

class SoloArtista(models.Model):
    nombre= models.CharField(max_length=100)
    
