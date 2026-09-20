import { db } from "../database/db";
import { ProductBody } from "../types/product.types";

export function search(column:string, data:string | number) {
    const search = db.query(`
        SELECT * FROM produto WHERE ${column} = $1
        `,[data])

    return search
}

export async function insertProduct(data:ProductBody) {
    const { marca_id, nome, slug, descricao, descricao_curta, tipo_produto, ativo, publicado } = data

    const result = db.query(`
        INSERT INTO produto
        (marca_id, nome, slug, descricao, descricao_curta, tipo_produto, ativo, publicado)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `, [marca_id, nome, slug, descricao, descricao_curta, tipo_produto, ativo, publicado])

    return result
}