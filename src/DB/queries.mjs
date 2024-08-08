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
export const validataCategoryExistsQuery = "SELECT * FROM category WHERE name = ?";
export const validateCategoryExistsByIdQuery  = "SELECT * FROM category WHERE id = ?";
export const deleteCategoryQuery = "DELETE FROM category WHERE id = ?";
export const updateCategoryQuery = "UPDATE category SET name = ? where id = ?"
