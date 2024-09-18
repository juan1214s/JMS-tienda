# JMS Tienda

JMS Tienda es un proyecto de comercio electrónico desarrollado en Node.js. Permite a los usuarios comprar productos en línea, subir imágenes de los productos, enviar correos electrónicos de bienvenida y recuperación de contraseñas, y realizar pagos a través de Stripe. Además, integra un chatbot que responde preguntas sobre la base de datos del sistema en lenguaje natural.

## Características

- **Subida de imágenes de productos**: Utiliza `multer` para gestionar la subida de imágenes de los productos que se muestran en la tienda.
- **Envío de correos electrónicos**: Utiliza `Nodemailer` para enviar correos electrónicos de bienvenida a los nuevos usuarios y para la recuperación de contraseñas.
- **Pasarela de pagos**: Integración con Stripe para permitir pagos seguros con tarjetas de crédito.
- **Chatbot con GPT**: Integra la API de ChatGPT para responder preguntas de los usuarios sobre la tienda y los productos en lenguaje humano. El chatbot accede a la base de datos para generar respuestas basadas en la información almacenada.
- **Autenticación JWT**: Utiliza JWT para gestionar la autenticación de usuarios y proteger las rutas sensibles.
- **Rutas protegidas**: Acceso restringido a ciertas rutas para garantizar la seguridad de la aplicación.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **Express.js**: Framework de Node.js para la gestión de rutas y controladores.
- **Multer**: Middleware para la gestión de la subida de archivos (imágenes de productos).
- **Nodemailer**: Herramienta para el envío de correos electrónicos.
- **Stripe**: Plataforma de pago integrada para procesar transacciones.
- **ChatGPT API**: Inteligencia artificial para responder preguntas sobre la tienda.
- **JWT (JSON Web Tokens)**: Sistema de autenticación basado en tokens para proteger las rutas.
- **MySQL**: Base de datos relacional para almacenar los productos, usuarios y transacciones.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/jms-tienda.git
# Configuración de la base de datos
PORT=3200
HOST=localhost
USER=root
PASSWORD=
DATABASE=jms

# Clave secreta para Stripe
STRIPE_SECRET_KEY=tu clave secreta de stripe

# Clave secreta para JWT
JWT_SECRET=tiendaJuanManuel

# Configuración de correo electrónico
EMAIL_USER=tu correo 
EMAIL_PASS=tu contraseña del correo 
