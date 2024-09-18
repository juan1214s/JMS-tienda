/////////////////////////////////////////////////////////////////// Consultas relacionadas con productos

// Inserta un nuevo producto en la tabla 'product'
export const insertProductQuery = "INSERT INTO product (name, description, price, model, stock, brand_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

// Obtiene todos los productos junto con sus marcas, imágenes y categorías asociadas
export const getProductsQuery = `
  SELECT product.id, product.name, product.price, product.description, product.model, product.stock, 
         brand.name AS brand_name, image.id AS image_id, image.file_path, 
         category.name AS category_name 
  FROM product 
  JOIN brand ON product.brand_id = brand.id 
  JOIN image ON product.id = image.product_id 
  JOIN category ON product.category_id = category.id
`;

// Elimina un producto de la tabla 'product' basado en su ID
export const deleteProductQuery = "DELETE FROM product WHERE id = ?";

// Valida si un producto existe en la tabla 'product' basado en su ID
export const validateProductExistsQuery = "SELECT * FROM product WHERE id = ?";

// Obtiene un producto específico junto con su marca, imagen y categoría asociadas por su ID
export const getProductByIdQuery = `
  SELECT product.id, product.name, product.price, product.description, product.model, product.stock, 
         brand.name AS brand_name, image.id AS image_id, image.file_path, 
         category.name AS category_name 
  FROM product 
  JOIN brand ON product.brand_id = brand.id 
  JOIN image ON product.id = image.product_id 
  JOIN category ON product.category_id = category.id 
  WHERE product.id = ?
`;

// Actualiza un producto existente en la tabla 'product' con nuevos datos
export const updateProductQuery = `
  UPDATE product 
  SET name = ?, description = ?, price = ?, model = ?, stock = ?, brand_id = ?, category_id = ? 
  WHERE id = ?;
`;


//////////////////////////////////////////////////////////// Consultas relacionadas con imágenes

// Inserta una nueva imagen asociada a un producto en la tabla 'image'
export const insertImageQuery = "INSERT INTO image (product_id, file_path) VALUES (?, ?)";

// Elimina todas las imágenes asociadas a un producto específico
export const deleImagesQuery = "DELETE FROM image WHERE product_id = ?";

// Obtiene todas las rutas de archivo de imágenes asociadas a un producto específico
export const getsAssociatedImagesQuery = "SELECT file_path FROM image WHERE product_id = ?";

// Consultas relacionadas con marcas

// Obtiene todas las marcas de la tabla 'brand'
export const getBrandsQuery = "SELECT * FROM brand";

// Inserta una nueva marca en la tabla 'brand'
export const createBrandQuery = "INSERT INTO brand (name) VALUES (?)";

// Valida si una marca existe en la tabla 'brand' basado en su nombre
export const validateBrandExistsQuery = "SELECT * FROM brand WHERE name = ?";

// Valida si una marca existe en la tabla 'brand' basado en su ID
export const validateBrandExistsByIdQuery = "SELECT * FROM brand WHERE id = ?";

// Elimina una marca de la tabla 'brand' basado en su ID
export const deleteBrandQuery = "DELETE FROM brand WHERE id = ?";

// Actualiza una marca existente en la tabla 'brand' con un nuevo nombre
export const updateBrandQuery = "UPDATE brand SET name = ? where id = ?";


///////////////////////////////////////////////////7 Consultas relacionadas con categorías

// Obtiene todas las categorías de la tabla 'category'
export const getCategoryQuery = "SELECT * FROM category";

// Inserta una nueva categoría en la tabla 'category'
export const createCategoryQuery = "INSERT INTO category (name) VALUES (?)";

// Valida si una categoría existe en la tabla 'category' basado en su nombre
export const validateCategoryExistsQuery = "SELECT * FROM category WHERE name = ?";

// Valida si una categoría existe en la tabla 'category' basado en su ID
export const validateCategoryExistsByIdQuery = "SELECT * FROM category WHERE id = ?";

// Elimina una categoría de la tabla 'category' basado en su ID
export const deleteCategoryQuery = "DELETE FROM category WHERE id = ?";

// Actualiza una categoría existente en la tabla 'category' con un nuevo nombre
export const updateCategoryQuery = "UPDATE category SET name = ? where id = ?";

// Consultas relacionadas con el carrito de compras (cart)

// Valida si un carrito existe para un usuario específico en la tabla 'cart'
export const validateCartExistsQuery = "SELECT * FROM cart WHERE user_id = ?";

// Crea un nuevo carrito en la tabla 'cart' para un usuario específico
export const createCartQuery = "INSERT INTO cart (user_id) VALUES (?)";

// Obtiene el carrito de compras de un usuario, incluyendo los productos, marcas, imágenes asociadas y la cantidad de cada producto
export const getCartQuery = `
  SELECT ci.id AS cartItem_id, c.id AS cart_id, c.user_id, c.created_at, ci.id AS cart_item_id, ci.quantity, 
         p.id AS product_id, p.name, p.description, p.price, p.model, 
         b.id AS brand_id, b.name AS brand_name, image.id AS image_id, image.file_path 
  FROM cart c 
  JOIN cart_item ci ON c.id = ci.cart_id 
  JOIN product p ON ci.product_id = p.id 
  JOIN brand b ON p.brand_id = b.id 
  JOIN image ON p.id = image.product_id 
  WHERE c.user_id = ?;
`;


////////////////////////////////////////////////////////77 Consultas relacionadas con los elementos del carrito (cart_item)

// Elimina un elemento del carrito basado en su ID
export const deleteCartItemQuery = "DELETE FROM cart_item WHERE id = ?";

// Valida si un elemento existe en el carrito basado en su ID
export const valiteCartItemExistsQuery = "SELECT * FROM cart_item where id = ?";

// Inserta un nuevo elemento en el carrito, asociando un producto y su cantidad a un carrito específico
export const createCartItemQuery = "INSERT INTO cart_item (cart_id, product_id, quantity) VALUES (?, ?, ?)";

// Verifica si un producto ya existe en un carrito específico
export const productExistsCartQuery = "SELECT * FROM cart_item WHERE product_id = ? AND cart_id = ?";

// Actualiza la cantidad de un producto existente en un carrito sumando a la cantidad actual
export const updateQuantityProductExistQuery = "UPDATE cart_item SET quantity = quantity + ? WHERE product_id = ? AND cart_id = ?";

// Actualiza la cantidad de un producto específico en un elemento del carrito
export const updateQuantityCartItemQuery = "UPDATE cart_item SET quantity = ? WHERE id = ?";

// Elimina los carritos vacíos (sin elementos) diariamente

// Selecciona los IDs de los carritos que están vacíos (sin elementos asociados)
export const emptyCartsQuery = "SELECT c.id FROM cart c LEFT JOIN cart_item ci ON c.id = ci.cart_id WHERE ci.cart_id IS NULL";

// Elimina los carritos vacíos que no tienen ningún elemento asociado
export const deleteCartQuery = "DELETE FROM cart WHERE id IN (?)";


///////////////////////////////////////////////// Consultas para filtrar productos por categoría y marca

// Filtra productos por categoría, incluyendo marcas e imágenes asociadas
export const filterCategoryQuery = `
  SELECT c.id AS category_id, c.name AS category_name, p.id AS product_id, p.name, p.description, p.price, p.model, 
         b.id AS brand_id, b.name AS brand_name, i.id AS image_id, i.file_path AS file_path 
  FROM category c 
  JOIN product p ON c.id = p.category_id 
  JOIN brand b ON b.id = p.brand_id 
  JOIN image i ON i.product_id = p.id 
  WHERE c.name = ?;
`;

// Filtra productos por marca, incluyendo categorías e imágenes asociadas
export const filterBrandQuery = `
  SELECT b.id AS brand_id, b.name AS brand_name, p.id AS product_id, p.name AS name, p.description AS description, 
         p.price AS price, p.model AS model, p.stock AS stock, 
         c.id AS category_id, c.name AS category_name, i.id AS image_id, i.file_path AS file_path 
  FROM brand b 
  JOIN product p ON b.id = p.brand_id  
  JOIN category c ON c.id = p.category_id  
  JOIN image i ON i.product_id = p.id 
  WHERE b.name = ?;
`;

/////////////////////////////////////////// consultas relacionadas con las tablas sales y sale_items

export const getSalesByIdQuery = "SELECT u.username AS nombre, u.phone AS telefono, u.email AS correo, u.adress AS direccion, si.name AS producto, si.quantity AS cantidad FROM users u JOIN sales s ON u.id = s.user_id JOIN sales_items si ON s.id = si.sale_id where u.id = ?";
export const getSalesQuery = "SELECT u.username AS nombre, u.phone AS telefono, u.email AS correo, u.adress AS direccion, si.name AS producto, si.quantity AS cantidad, s.total, s.status FROM users u JOIN sales s ON u.id = s.user_id JOIN sales_items si ON s.id = si.sale_id";

//////////////////////////////////consultas de la tabla usuarios

export const createUserQuery = "INSERT INTO users (username, phone, adress, password, email) VALUES (?, ?, ?, ?, ?)";
export const validateEmailExistsQuery = "SELECT * FROM users WHERE email = ?";
export const deleteUserQuery = "DELETE FROM users WHERE id = ?";
export const validateUserExistsQuery = "SELECT * FROM users WHERE id = ?";
export const getUserByIdQuery = "SELECT * FROM users WHERE id = ?";
export const getUsersQuery = "SELECT * FROM users";
export const updateUserQuery = "UPDATE `users` SET username = ?, phone = ?, adress = ?, password = ?, email = ? WHERE `id` = ?;"
export const recoverPasswordQuery = "SELECT * FROM users WHERE email = ? AND phone = ?";