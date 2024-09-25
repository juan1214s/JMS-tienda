import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificar que el token esté presente en el encabezado
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado o malformado.' });
    }

    const token = authHeader.split(' ')[1];

    // Verificar si la clave secreta está definida
    if (!JWT_SECRET_KEY) {
        return res.status(500).json({ message: 'Error del servidor, clave secreta no configurada.' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;  
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado.', error: error.message });
    }
};
