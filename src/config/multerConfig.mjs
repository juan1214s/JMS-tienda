import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/imagesProduct'); // Carpeta de destino de los archivos subidos
  },
  filename: function (req, file, cb) {
    //aca indico con q nombre deseo q se guarde el archivo y le pongo una extención
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
});

// Configuración de multer
const uploadImagenProduct = multer({ storage: storage });

export default uploadImagenProduct;

