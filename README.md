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

2. cd jms-tienda

3.npm install

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
Rutas del API
El sistema de la tienda JMS Tienda cuenta con varias rutas para gestionar productos, marcas, usuarios, ventas y más. A continuación, se detalla el conjunto de rutas disponibles en la API:

Marcas (Brands)
GET /brands: Obtener todas las marcas.
POST /brands: Crear una nueva marca.
DELETE /brands/:id: Eliminar una marca específica por su ID.
PUT /brands/:id: Actualizar una marca específica por su ID.

Productos (Products)

POST /product: Crear un nuevo producto (utiliza Multer para la carga de imágenes).
DELETE /product/:id: Eliminar un producto específico por su ID.
GET /product: Obtener todos los productos.
GET /productById/:id: Obtener un producto específico por su ID.
PUT /product/:id: Actualizar un producto específico por su ID (utiliza Multer para la carga de imágenes).
Autenticación (Login)
POST /login: Inicio de sesión de usuarios.
POST /recover-password: Recuperar contraseña.

Ventas (Sales)

GET /sales: Obtener todas las ventas.
GET /sales/:id: Obtener una venta específica por su ID.
Categorías (Categories)
POST /categories: Crear una nueva categoría.
DELETE /categories/:id: Eliminar una categoría específica por su ID.
PUT /categories/:id: Actualizar una categoría específica por su ID.
GET /categories: Obtener todas las categorías.
GET /filterCategory: Filtrar categorías.

Usuarios (Users)

POST /users: Crear un nuevo usuario.
DELETE /users/:id: Eliminar un usuario específico por su ID.
GET /users: Obtener todos los usuarios.
GET /users/:id: Obtener un usuario específico por su ID.
PUT /users/:id: Actualizar un usuario específico por su ID.
Pagos con Stripe (Stripe Payments)
POST /create-stripe/:id: Crear un pago con Stripe para un usuario.
POST /verify-stripe: Verificar el éxito de un pago.

Filtros

GET /filterBrand: Filtrar productos por marca.
GET /filterCategory: Filtrar productos por categoría.
