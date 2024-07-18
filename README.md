# Backend para Aplicaciones interactivas UADE - Frameland

## Para correrlo
1. Instalar NodeJS (https://nodejs.org/en) y VS Code (https://code.visualstudio.com/download)
2. Abrir VS Code
3. Abrir la carpeta
4. Abril la terminal
5. Instalar las dependencias `npm install`
6. Clonar el archivo de `.env.template` y renombrarlo a `.env`
7. Cambiar las variables de entorno acorde a tu configuración
8. Correr el servidor `npm run dev`

> [!TIP]
> En el template de .env hay que completar con una url a la base de datos, la contraseña y el puerto en el cual se va a querer correr el proyecto


## Estructura de la base de datos

#### USUARIOS

<pre>
{
  "name": String,
  "email": String,
  "password": String,
  "favoriteMovies": [],
  "toWatchMovies": [],
  "watchedMovies": []
}
</pre>

#### LISTAS
<pre>
{
  "title": String,
  "image": String,
  "media_type": String,
  "movieId": String,
  "user": Schema.Types.ObjectId
}
</pre>
