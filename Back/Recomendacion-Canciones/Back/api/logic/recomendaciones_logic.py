import random
import pandas as pd
import uuid
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import uuid
import json



#df= pd.read_csv("C:/Users/Jonathan/Desktop/Universidad/8vo/Recomendacion-Canciones/df_transformado.csv")
df=None
df_matriz_item_item=None
cosine_df= None
def ejecutar():
    global df, df_matriz_item_item, cosine_df
    df= pd.read_csv("C:/Users/Jonathan/Desktop/Universidad/8vo/Recomendacion-Canciones/taller.csv")
    df_matriz_item_item=df[['track','user_id']].drop_duplicates().pivot(index='track', columns='user_id', values='user_id')
    df_matriz_item_item = df_matriz_item_item.notnull().astype(int)
    df_matriz_item_item.fillna(0, inplace=True)
    series_suma2=df_matriz_item_item.sum(axis=1)
    aeliminar=series_suma2[series_suma2<3].index.tolist()
    df_matriz_item_item=df_matriz_item_item.drop(aeliminar)
    canciones_matriz= df_matriz_item_item.index.to_list()
    df = df[df['track'].isin(canciones_matriz)]
    item_similarities = cosine_similarity(df_matriz_item_item)
    item_similarities
    cosine_df=pd.DataFrame(item_similarities,index=df_matriz_item_item.index,columns=df_matriz_item_item.index)

def consultar_recomendacion_coseno(usuario,cancion):
  escuchadas= df[df["user_id"]==usuario]["track"].unique().tolist()
  sin_escuchar= cosine_df.drop(index=escuchadas)
  pelicula=sin_escuchar.loc[cancion] 
  return pelicula.sort_values(ascending=False).head(10)
def ultimas_escuchadas(usuario):
    df_usuario= df.loc[df['user_id'] == usuario][["track","time"]].sort_values(by=["time"], ascending= False)
    canciones=df_usuario.head(5)["track"].tolist()
    return canciones




def recomendaciones(usuario,lista_canciones):
   dict_rec={}
   for i in lista_canciones:
       canciones= consultar_recomendacion_coseno(usuario,i)
       print(canciones)
       lista_rec= canciones.index.tolist()
       dict_rec[i]=lista_rec
   return dict_rec
def nuevasRecomendaciones(lista_canciones):
    dict_rec={}
    for cancion in lista_canciones:
        canciones= cosine_df.loc[cancion].sort_values(ascending=False).head(10)
        lista_rec= canciones.index.tolist()
        dict_rec[cancion]=lista_rec
    return dict_rec

def generar_usuario(usuario,contador):
    userid_g= usuario
    nombre_g= "usuario "+ str(int(usuario.split("_")[1]))
    correo_g= nombre_g.replace(' ', '') + "@hotmail.com"
    password_g="123"
    ult= ultimas_escuchadas(usuario)
    rec=recomendaciones(usuario,ult)
    usuario_dict={"model":"api.Usuario","pk":contador,"fields":
                  {
                     "userid":userid_g,
                     "nombre":nombre_g,
                     "correo":correo_g,
                     "password":password_g,
                     "ultimas":ult,
                     "recomendaciones":rec,

                  }}
    return usuario_dict
def crear_ultimas( lista_artistas):
    ultimas=[]
    for i in range(0,5):
        artista= random.randrange(0,len(lista_artistas)-1,1)
        canciones=canciones_artista(lista_artistas[artista])
        cancion=  random.randrange(0,len(canciones)-1,1)
        ultimas.append(canciones[cancion])
    return ultimas

        

def crear_usuario(usuario):
   
    ejecutar()
    userid_g= usuario["nombre"]+"0000"
    nombre_g=usuario["nombre"]
    correo_g= usuario["correo"]
    password= usuario["password"]
    ult= crear_ultimas(usuario["artistas"])
    rec= nuevasRecomendaciones(ult)
    usuario_dict={
                     "userid":userid_g,
                     "nombre":nombre_g,
                     "correo":correo_g,
                     "password":password,
                     "ultimas":ult,
                     "recomendaciones":rec,}
    return usuario_dict

    
    

def poblar():
    contador=1
    lista_usuarios=df["user_id"].unique().tolist()
    usuarios_lista = []
    for usuario in lista_usuarios:
       usuario_info= generar_usuario(usuario,contador)
       usuarios_lista.append(usuario_info)
       contador+=1
       print(contador)
    with open("C:/Users/Jonathan/Desktop/Universidad/8vo/Recomendacion-Canciones/sample.json", "w") as outfile:
        json_object = json.dumps(usuarios_lista, indent=4)
        outfile.write(json_object)
    
def canciones_artista(artista):
    return df.loc[df['artist'] == artista]["track"].unique().tolist()

def poblar_artistas():
    contador=1
    artistas_lista=[]
    artistas= df["artist"].unique().tolist()
    for artista in artistas:
        lista_canciones_artista=canciones_artista(artista)
        artista_dict={"model":"api.Artista","pk":contador,"fields":
                  {
                    "nombre":artista,
                    "canciones":lista_canciones_artista
                  }}
        artistas_lista.append(artista_dict)
        contador+=1
    with open("C:/Users/Jonathan/Desktop/Universidad/8vo/Recomendacion-Canciones/sample2.json", "w") as outfile:
        json_object = json.dumps(artistas_lista, indent=4)
        outfile.write(json_object)
def poblar_solo_artistas():
    contador=1
    artistas_lista=[]
    artistas= df["artist"].unique().tolist()
    for artista in artistas:
       
        artista_dict={"model":"api.SoloArtista","pk":contador,"fields":
                  {
                    "nombre":artista
                  }}
        artistas_lista.append(artista_dict)
        contador+=1
    with open("C:/Users/Jonathan/Desktop/Universidad/8vo/Recomendacion-Canciones/sample3.json", "w") as outfile:
        json_object = json.dumps(artistas_lista, indent=4)
        outfile.write(json_object)
   


    


   

   

