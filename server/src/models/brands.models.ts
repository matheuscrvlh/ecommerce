import { db } from "../database/db";
import { BrandBody } from "../types/brand.types";

export async function search(column: string, data:string | number) {
    const result = await db.query(`
        SELECT * FROM marca WHERE ${column} = $1
    `,[data])

    return result
}

export async function insertBrand(data:BrandBody) {
    const { nome, slug, url_logo } = data

    const result = await db.query(`
        INSERT INTO marca
        (nome, slug, url_logo) 
        VALUES
        ($1, $2, $3)
        RETURNING id
    `,[nome, slug, url_logo])

    return result
}