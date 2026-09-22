import { db } from "../database/db";
import { ProductCategoriesBody } from "../types/productCategories.types";

export async function insertProductCategory(data: ProductCategoriesBody) {
    const { produto_id, categoria_id } = data

    const result = await db.query(`
        INSERT INTO produto_categoria
        (produto_id, categoria_id)
        VALUES
        ($1, $2)
        RETURNING produto_id
    `,[produto_id, categoria_id])

    return result
}