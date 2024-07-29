//productos
export const insertProductQuery = "INSERT INTO product (name, description, price, model, brand_id) VALUES (?, ?, ?, ?, ?)";
export const getProductsQuery = " SELECT product.id, product.name, product.price, product.description, brand.name, image.id AS brand_name, image.file_path  FROM product JOIN brand ON product.brand_id = brand.id JOIN image ON product.id = image.product_id ";
export const deleteProductQuery = "DELETE FROM product WHERE id = ?";
export const validateProductExistsQuery = "SELECT * FROM product WHERE id = ?";
export const getProductIdQuery = "SELECT product.id, product.name, product.price, product.description, brand.name AS brand_name FROM product JOIN brand ON product.brand_id = brand.id WHERE product.id = ?"

//imagenes
export const insertImageQuery = "INSERT INTO image (product_id, file_path) VALUES (?, ?)";
export const deleImagesQuery = "DELETE FROM image WHERE product_id = ?";
export const getsAssociatedImagesQuery = "SELECT file_path FROM image WHERE product_id = ?";

//marcas
export const getBrandsQuery = "SELECT * FROM brand";



