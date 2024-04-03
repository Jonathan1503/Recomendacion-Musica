from django.contrib import admin
from .models import Usuario, Artista, SoloArtista
# Register your models here.
admin.site.register(Usuario)
admin.site.register(Artista)
admin.site.register(SoloArtista)