import express from "express";
import cors from "cors";
import morgan from "morgan";
import imagesRoutes from "./routes/product.routes.mjs";
import brandsRoutes from "./routes/brands.mjs"
import categoryRoutes from "./routes/category.mjs"

const app = express();

// Carpeta de archivos estáticos
app.use('/uploads', express.static('uploads'));

// Muestra por la terminal la petición
app.use(morgan('dev'));

// Middleware para manejar CORS
app.use(cors());

// Permite el formato JSON
app.use(express.json());

// Permite formularios
app.use(express.urlencoded({ extended: true }));

// Ruta de las imágenes
app.use('/JMS/product', imagesRoutes);
app.use('/JMS/brands', brandsRoutes);
app.use('/JMS/category', categoryRoutes);

export default app;
