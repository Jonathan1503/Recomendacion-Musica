import datetime
from django.http import JsonResponse
from .models import SoloArtista, Usuario, Artista
import jwt
from recomendacion import settings
from django.core import serializers
from .logic.recomendaciones_logic import crear_usuario as cu
def getUsuarioCorreo(req):
        correo_a= req["correo"]
        password= req["password"]
        print(correo_a)
        try:
            usuario = Usuario.objects.get(correo=correo_a)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Correo no encontrado'}, status=404)

        if password != usuario.password:
            return JsonResponse({'error': 'Contrasenha incorrecta'}, status=401)

        # Si el correo y la contraseña son válidos, genera un token JWT
        payload = {
            'usuario_id': usuario.userid,
            'correo': usuario.correo,
        }
       
        usuario_json= serializers.serialize('json',[usuario])
        exp_time=datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        token = jwt.encode({'some':payload, 'exp':exp_time}, settings.SECRET_KEY, algorithm='HS256')


        response_data = {
            'datos': usuario_json,
            'token': token,
        }

        return JsonResponse(response_data, status=200)
def getArtistas(req):
     artistas= Artista.objects.all()
     artistas_json= serializers.serialize('json', artistas)
     return JsonResponse(artistas_json, status=200, safe=False)
def getSoloArtistas():
     artistas= SoloArtista.objects.all()
     print(artistas)
     artistas_json= serializers.serialize('json', artistas)
     return JsonResponse(artistas_json, status=200, safe=False)
def crearUsuario(usuario):
     ud=cu(usuario)
     usuario_creado= Usuario(userid=ud["userid"],nombre=ud["nombre"],correo=ud["correo"],password=ud["password"],
                             ultimas=ud["ultimas"],recomendaciones=ud["recomendaciones"])
     usuario_creado.save()
     return JsonResponse(serializers.serialize('json',[usuario_creado]), status=200,safe=False)
    
     

