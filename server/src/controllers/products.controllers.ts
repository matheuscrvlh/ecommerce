import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductBody } from "../types/product.types";
import { insertProduct, search } from "../models/products.models";

export async function createProduct(req:FastifyRequest<{Body: ProductBody}>, res:FastifyReply) {
    const { 
        marca_id, nome, slug, descricao, descricao_curta, tipo_produto, ativo, publicado 
    } = req.body

    try {
        // Validação
        const fieldsToCheck: [string, string][] = [
            ['nome', nome],
            ['slug', slug]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value)
            if (existing.rows.length >= 1) {
                res.code(409).send({ error: `Produto com ${column}: ${value} já cadastrado(a).`})
                return
            }
        }

        const result = await insertProduct({ marca_id, nome, slug, descricao, descricao_curta, tipo_produto, ativo, publicado  })

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