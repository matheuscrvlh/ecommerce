import { db } from "../database/db";
import { ProductVariantBody } from "../types/productVariant.types";

export async function search(column:string, data: string | number | undefined) {
    const result = await db.query(`
        SELECT * FROM produto_variante WHERE ${column} = $1
    `,[data])

    return result
}

export async function insertProductVariant(data:ProductVariantBody) {
    const { produto_id, sku, ean, cor, tamanho, preco, preco_comparativo, ativo } = data

    const result = await db.query(`
        INSERT INTO produto_variante
        (produto_id, sku, ean, cor, tamanho, preco, preco_comparativo, ativo)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING produto_id
    `,[produto_id, sku, ean, cor, tamanho, preco, preco_comparativo, ativo])

    return result
}