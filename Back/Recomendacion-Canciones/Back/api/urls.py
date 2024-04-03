from django.urls import path,include
from rest_framework import routers
from api import views

router=routers.DefaultRouter()
router.register(r'usuarios',views.UsuarioViewSet)

urlpatterns = [
   path('', views.login, name='login'),
   path('artistas', views.getArtists, name='getArtists'),
   path('soloartistas', views.getSoloArtists, name='getSoloArtists'),
   path('register', views.crearUsuario, name='crearUsuario'),

    #path('login', views.login, name='login')
]

