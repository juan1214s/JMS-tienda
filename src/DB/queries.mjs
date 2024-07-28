export const insertProductQuery = "INSERT INTO product (name, description, price, model, brand_id) VALUES (?, ?, ?, ?, ?)";
export const insertImageQuery = "INSERT INTO image (product_id, file_path) VALUES (?, ?)";
export const insertBrandQuery = "SELECT id, name FROM brand";
export const deleteProductQuery = "DELETE FROM image WHERE product_id = ?";
export const deleImagesQuery = "DELETE FROM image WHERE product_id = ?";
export const getsAssociatedImagesQuery = ""