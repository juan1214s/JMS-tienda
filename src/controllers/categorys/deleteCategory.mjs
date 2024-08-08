import { connectToDatabase } from "../../DB/db.mjs";
import { deleteCategoryQuery, validateCategoryExistsByIdQuery } from "../../DB/queries.mjs";

export const deleteCategory = async (req, res)=>{
    let connection;
    try {
        const {id} = req.params;
        const categoryId = Number(id)

        if (isNaN(categoryId)) {
            return res.status(400).json({error: 'ID categoria invalido.'});
        }

        connection = await connectToDatabase();

        const [categoryExists] = await connection.execute(validateCategoryExistsByIdQuery, [categoryId]);
        
        if (categoryExists.length === 0) {
            return res.status(404).json({error: 'La categoria no existe.'});
        }

        await connection.execute(deleteCategoryQuery, [categoryId]);

        res.status(200).json({message: 'Categoria eliminada correctamente.'})
    } catch (error) {
        console.log(`Error al eliminar la categoria: ${error}`);
        res.status(500).json({error: 'Error interno al eliminar la categoria.'});
    }finally{
        if (connection) {
            await connection.end();
        }
    }
}