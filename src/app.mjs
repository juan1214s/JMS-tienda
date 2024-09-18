import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/product.routes.mjs";
import brandsRoutes from "./routes/brands.routes.mjs";
import categoryRoutes from "./routes/category.routes.mjs";
import cartRoutes from "./routes/cart.routes.mjs";
import filterRoutes from "./routes/filter.routes.mjs";
import stripeRoutes from "./routes/stripe.routes.mjs";
import salesRoutes from "./routes/sales.routes.mjs"; 
import loginRoutes from "./routes/loginRoutes.mjs";
import userRoutes from "./routes/user.routes.mjs";
import recoverPasswordRoutes from "./routes/recPassword.routes.mjs";
import helmet from 'helmet';

const app = express();

// Carpeta de archivos estáticos
app.use('/uploads', express.static('uploads'));

// Middleware de seguridad
app.use(helmet());

// Muestra por la terminal la petición
app.use(morgan('dev'));

// Middleware para manejar CORS
app.use(cors());

// Permite el formato JSON
app.use(express.json());

// Permite formularios
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/JMS/', productRoutes);
app.use('/JMS/', brandsRoutes);
app.use('/JMS/', categoryRoutes);
app.use('/JMS/', cartRoutes);
app.use('/JMS/', filterRoutes);
app.use('/JMS/', stripeRoutes);
app.use('/JMS/', salesRoutes);
app.use('/JMS/', loginRoutes);
app.use('/JMS/', userRoutes);
app.use('/JMS/', recoverPasswordRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

export default app;
