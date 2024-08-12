//productos
export const insertProductQuery = "INSERT INTO product (name, description, price, model, stock, brand_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
export const getProductsQuery = " SELECT product.id, product.name, product.price, product.description, product.model, product.stock, brand.name AS brand_name, image.id AS image_id, image.file_path, category.name AS category_name FROM  product JOIN brand ON product.brand_id = brand.id JOIN image ON product.id = image.product_id JOIN category ON product.category_id = category.id";
export const deleteProductQuery = "DELETE FROM product WHERE id = ?";
export const validateProductExistsQuery = "SELECT * FROM product WHERE id = ?";
export const getProductByIdQuery = "SELECT product.id, product.name, product.price, product.description, product.model, product.stock, brand.name AS brand_name, image.id AS image_id, image.file_path, category.name AS category_name FROM  product JOIN brand ON product.brand_id = brand.id JOIN image ON product.id = image.product_id JOIN category ON product.category_id = category.id WHERE product.id = ?"
export const updateProductQuery = "UPDATE product SET name = ?, description = ?, price = ?, model = ?, stock = ?, brand_id = ?, category_id = ? WHERE id = ?;"

//imagenes
export const insertImageQuery = "INSERT INTO image (product_id, file_path) VALUES (?, ?)";
export const deleImagesQuery = "DELETE FROM image WHERE product_id = ?";
export const getsAssociatedImagesQuery = "SELECT file_path FROM image WHERE product_id = ?";

//marcas
export const getBrandsQuery = "SELECT * FROM brand";
export const createBrandQuery = "INSERT INTO brand (name) VALUES (?)";
export const validateBrandExistsQuery = "SELECT * FROM brand WHERE name = ?";
export const validateBrandExistsByIdQuery = "SELECT * FROM brand WHERE id = ?";
export const deleteBrandQuery = "DELETE FROM brand WHERE id = ?";
export const updateBrandQuery = "UPDATE brand SET name = ? where id = ?"

//categorias
export const getCategoryQuery = "SELECT * FROM category";
export const createCategoryQuery = "INSERT INTO category (name) VALUES (?)";
export const validateCategoryExistsQuery = "SELECT * FROM category WHERE name = ?";
export const validateCategoryExistsByIdQuery = "SELECT * FROM category WHERE id = ?";
export const deleteCategoryQuery = "DELETE FROM category WHERE id = ?";
export const updateCategoryQuery = "UPDATE category SET name = ? where id = ?";

//cart 
export const validateCartExistsQuery = "SELECT * FROM cart WHERE user_id = ?";
export const createCartQuery = "INSERT INTO cart (user_id) VALUES (?)";
export const getCartQuery = "SELECT c.id AS cart_id, c.user_id, c.created_at, ci.id AS cart_item_id, ci.quantity, p.id AS product_id, p.name, p.description, p.price, p.model,b.id AS brand_id, b.name AS brand_name, image.id AS image_id, image.file_path FROM cart c JOIN cart_item ci ON c.id = ci.cart_id JOIN product p ON ci.product_id = p.id JOIN brand b ON p.brand_id = b.id JOIN image ON p.id = image.product_id WHERE c.user_id = ?; "

//cart_item
export const deleteCartItemQuery = "DELETE FROM cart_item WHERE id = ?";
export const valitaCartItemExistsQuery = "SELECT * FROM cart_item where id = ?";
export const createCartItemQuery = "INSERT INTO cart_item (cart_id, product_id, quantity) VALUES (?, ?, ?)";
export const productExistsCartQuery = "SELECT * FROM cart_item WHERE product_id = ? AND cart_id = ?";
export const updateQuantityProductExistQuery = "UPDATE cart_item SET quantity = quantity + ? WHERE product_id = ? AND cart_id = ?"

//elimina cada dia los carritos vacios
export const emptyCartsQuery = "SELECT c.id FROM cart c LEFT JOIN cart_item ci ON c.id = ci.cart_id WHERE ci.cart_id IS NULL";
export const deleteCartQuery = "DELETE FROM cart WHERE id IN (?)";

//filtra por categorías y marcas
export const filterCategoryQuery = "SELECT c.id AS category_id, c.name AS category_name, p.id AS product_id, p.name, p.description, p.price, p.model, b.id AS brand_id, b.name AS brand_name, i.id AS image_id, i.file_path AS file_path FROM category c JOIN product p ON c.id = p.category_id JOIN brand b ON b.id = p.brand_id JOIN image i ON i.product_id = p.id WHERE c.name = ?;"
export const filterBrandQuery = "SELECT  b.id AS brand_id, c.id AS category_id, c.name AS category_name, p.id AS product_id, p.name, p.description, p.price, p.model, b.id AS brand_id, b.name AS brand_name, i.id AS image_id, i.file_path AS file_path FROM brand b JOIN product p ON b.id = p.brand_id JOIN category c ON c.id = p.category_id JOIN image i ON i.product_id = p.id WHERE c.name = ?;"