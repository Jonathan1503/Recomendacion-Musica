from rest_framework import viewsets
from .serializer import UsuarioSerializer
from .models import Usuario
import json
from .login import getUsuarioCorreo as gu
from .login import getArtistas as ga
from .login import getSoloArtistas as gsa
from .login import crearUsuario as cu
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login(request):
    return gu(json.loads(request.body))
@csrf_exempt
def getArtists(request):
    return ga()
@csrf_exempt
def getSoloArtists(request):
    return gsa()
@csrf_exempt
def crearUsuario(request):
    return cu(json.loads(request.body))


    
class UsuarioViewSet (viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    
