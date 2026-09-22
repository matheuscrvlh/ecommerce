import type { FastifyRequest, FastifyReply } from "fastify";
import { CategoryBody } from "../types/category.types";
import { insertCategory, search } from "../models/categories.models";

export async function newCategory(req:FastifyRequest<{Body: CategoryBody}>, res:FastifyReply) {
    const { nome, slug, categoria_pai_id } = req.body

    try {
        const fieldsToCheck: [string, string | number | undefined][] = [
            ['nome', nome],
            ['slug', slug],
            ['categoria_pai_id', categoria_pai_id]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value)
            if (existing.rows.length >= 1) {
                res.code(409).send({ error: `Categoria ${value} já cadastrado.`})
                return
            }
        }

        const result = await insertCategory({ nome, slug, categoria_pai_id })

        if(!result.rows[0].id) {
            res.code(500).send({ error: `Erro interno do servidor.`})
        }

        res.code(201).send({ success: 'Categoria criada com sucesso.'})
    } catch(err) {
        console.error(err) 
        res.code(500).send({ error: 'Erro interno do servidor.'})
    }
}