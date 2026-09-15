import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductBody } from "../types/product.types";
import { insertProduct, search } from "../models/products.models";

export async function createProduct(req:FastifyRequest<{Body: ProductBody}>, res:FastifyReply) {
    const { 
        sku, ean, name, description, short_description, category_id, brand_id, 
        product_type, unit, is_active, is_published 
    } = req.body

    try {
        // Validação
        const fieldsToCheck: [ProductBody][] = [
            ['sku': sku],
            ['ean': ean],
            ['name': name]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value)
            if (existing.rows.length >= 1) {
                res.code(409).send({ error: `Produto com ${column}: ${value} já cadastrado(a).`})
                return
            }
        }

        const result = await insertProduct({ sku, ean, name, description, short_description, category_id, brand_id, 
        product_type, unit, is_active, is_published })

        if(!result.rows[0].id) {
            console.error('Erro ao inserir produto');
            return
        }

        res.code(201).send({ success: `Produto criado com sucesso.` })
    } catch (err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.' })
    }
}