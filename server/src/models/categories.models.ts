import { db } from "../database/db";
import { CategoryBody } from "../types/category.types";

export async function search(column:string, data:string | number) {
    const result = await db.query(`
        SELECT * FROM categoria WHERE ${column} = $1
    `,[data])

    return result
}

export async function insertCategory(data: CategoryBody) {
    const { nome, slug, categoria_pai_id } = data

    const result = await db.query(`
        INSERT INTO categoria
        (nome, slug, categoria_pai_id)
        VALUES
        ($1, $2, $3)
        RETURNING id
    `,[nome, slug, categoria_pai_id])

    return result
}