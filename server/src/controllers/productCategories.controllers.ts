import type { FastifyRequest, FastifyReply } from 'fastify';
import { ProductCategoriesBody } from '../types/productCategories.types';
import { insertProductCategory } from '../models/productCategory.models';

export async function newProductCategory(req:FastifyRequest<{Body: ProductCategoriesBody}>, res:FastifyReply) {
    const { produto_id, categoria_id } = req.body

    try {
        const result = await insertProductCategory({ produto_id, categoria_id})

        if(!result.rows[0].produto_id) {
            console.error('Erro ao inserir categoria de produto');
            return
        }

        res.code(201).send({ success: `Produto id ${produto_id} inserido na categoria com sucesso.`})
    } catch (err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.' })
    }
}


