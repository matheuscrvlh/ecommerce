import type { FastifyRequest, FastifyReply } from "fastify";
import { BrandBody } from "../types/brand.types";
import { insertBrand, search } from "../models/brands.models";

export async function createBrand(req:FastifyRequest<{Body: BrandBody}>, res:FastifyReply) {
    const { nome, slug, url_logo } = req.body

    try {
        const fieldsToCheck: [string, string | undefined][] = [
            ['nome', nome],
            ['slug', slug],
            ['url_logo', url_logo]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value);
            if(existing.rows.length >= 1) {
                res.code(409).send({ error: `Usuário ${nome} já cadastrado.`})
                return
            }
        }

        const result = await insertBrand({ nome, slug, url_logo})

        if (!result.rows[0].id) {
            console.log('Erro ao inserir usuário')
            return
        }

        res.code(201).send({ success: `Produto ${nome} criado com sucesso.`})
    } catch(err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.'})
    }
}