# Chattbot Interactivo

## Objetivo

Este proyecto, denominado "Chattbot Interactivo", es una implementación rápida y efectiva de un sistema de chat manejado con Node.js. El objetivo principal es demostrar la capacidad de manejar lógicas y peticiones complejas en un entorno de chat, utilizando condicionales, librerías y procesos más avanzados a medida que el proyecto crece. Se ha incorporado lógica para manejar información sobre clima, fútbol y un juego interactivo para adivinar Pokémon, utilizando diferentes APIs y servicios externos.

## Documentación

### Librerías Usadas

- **express**: Framework de Node.js para la construcción de aplicaciones web y APIs.
- **socket.io**: Biblioteca para la comunicación en tiempo real entre cliente y servidor.
- **axios**: Cliente HTTP para realizar peticiones a APIs externas.
- **body-parser**: Middleware para analizar cuerpos de solicitudes HTTP.
- **cookie-parser**: Middleware para analizar cookies.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **path**: Módulo de Node.js para manejar y transformar rutas de archivos.
- **openai**: Cliente para interactuar con la API de OpenAI.
- **fs**: Módulo del sistema de archivos de Node.js para leer y escribir archivos.
- **dotenv**: Biblioteca para cargar variables de entorno desde un archivo `.env`.

## Tecnologías Involucradas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework de aplicación web para Node.js.
- **Socket.IO**: Biblioteca que permite la comunicación en tiempo real bidireccional entre clientes web y servidores.
- **API de OpenAI**: Utilizada para comprender y procesar las intenciones del usuario.
- **PokeAPI**: API para obtener datos sobre Pokémon.
- **API de OpenWeatherMap**: API para obtener información meteorológica.
- **JSON**: Formato de intercambio de datos utilizado para almacenar información de fútbol.

## Dirección

El proyecto comenzó como un simple chat con lógica básica de backend, pero a medida que se fue desarrollando, se exploraron múltiples posibilidades de expansión. Algunas de estas expansiones quedaron sin completar, otras tuvieron éxito y algunas fallaron. Sin embargo, todas estas exploraciones contribuyeron a la evolución y la creatividad del proyecto. Gracias a la propuesta libre y abierta a la interpretación, se permitió una gran cantidad de experimentación y aprendizaje.

## Funcionalidades Principales

1. **Consulta de Clima**: Los usuarios pueden solicitar información meteorológica de cualquier ciudad.
2. **Información de Fútbol**: Los usuarios pueden pedir información sobre las ligas de fútbol de España, Argentina y Uruguay.
3. **Juego de Pokémon**: Los usuarios pueden jugar a adivinar un Pokémon, recibiendo pistas sobre diferentes características del Pokémon seleccionado aleatoriamente.

## Estructura del Proyecto

- **src**
  - **models**: Contiene el modelo de datos y el archivo JSON con la información de fútbol.
  - **routes**: Define las rutas del servidor.
  - **services**: Contiene los servicios para interactuar con las APIs externas y procesar la lógica del chat.
  - **utils**: Funciones utilitarias y manejadores de errores.
  - **views**: Plantillas para las vistas del servidor.
  - **app.js**: Configuración principal del servidor Express.
  - **server.js**: Configuración del servidor HTTP y Socket.IO.

## Ejecución del Proyecto

Para ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Instala las dependencias usando `npm install`.
3. Crea un archivo `.env` en la raíz del proyecto y añade tu clave API de OpenAI y otras variables de entorno necesarias.
4. Ejecuta el servidor con `npm start`.

El servidor se ejecutará en el puerto 3000 de manera predeterminada, y podrás interactuar con el chatbot a través del cliente web.

## Instrucciones del Juego

En principio son claras y pensadas para que el usuario las pueda seguir desde la pantalla, pero se busco siempre utilizando logica y peticiones mas manuales, un soporte de la openAI para darle soporte al entendimiento de las consultas del usuario.

En el juego se detallan los pasos a seguir, que comienza generadose internamente un llamada a la api de pokemon, interviniendo en la misma con un numero randomizado dentro del espectro de pokemons que maneja. Logrando asi un pokemon aleatorio con el que se comenzar el juego y el usuario recibira una pista.

Si desea mas pistas como se indica en la propuesta, debera ir solicitandolas con un "otro" como se indica aunque tambien se codeo un "siguiente" como valido, pero solo se le presento al cliente la posibilidad de la keyword "otro"

## Registro y Login usuarios

Dado que ya presento experiencia previa en proyectos con el manejo de usuarios, productos y demas, me intereso desde el vamos implementar un login con passport, realizando un logueo a nivel local y realizar las authentication mediante JWT, preferentemente guardando la misma en una cookie.

Luego de implementado esto se y estando funcional se intento manejar la authenticacion para que puediera personalizar mas el contacto y guardar el chat, sin embargo esto fue un desafio mas grande de lo que esperaba y luego por una cuestion de tiempo, decidi no parar el proyecto por seguir intentando enlazar esto y continuar en el desarrollo y apliacion del proyecto en otras de las partes que tantas ansias me generaba. 

Definitvamente es algo que desperto mi curiosidad y estare investigando a futuro, ya que si bien he manejado proyectos en nodeJs a medida que estudio, no habia incrusionado en el chat y sus interacciones con factores de un proyecto de BE como es el sistema de login.

---


