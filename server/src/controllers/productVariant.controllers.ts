import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductVariantBody } from "../types/productVariant.types";
import { insertProductVariant, search } from "../models/productVariant.models";

export async function createProductVariant(req:FastifyRequest<{Body: ProductVariantBody}>, res:FastifyReply) {
    const { produto_id, sku, ean, cor, tamanho, preco, preco_comparativo, ativo } = req.body

    try {
        const fieldsToCheck: [string, string | number | undefined][] = [
            ['produto_id', produto_id],
            ['sku', sku],
            ['ean', ean]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value);
            if(existing.rows.length >= 1) {
                res.code(409).send({ error: `Produto com ${column}: ${value} já cadastrado(a).`})
                return
            }
        }

        const result = await insertProductVariant({ produto_id, sku, ean, cor, tamanho, preco, preco_comparativo, ativo })

        if(!result.rows[0].produto_id) {
            console.error('Erro ao inserir produto');
            return
        }

        res.code(201).send({ success: `Produto ${produto_id} cadastrado com sucesso.`})
    } catch (err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.' })
    }
}