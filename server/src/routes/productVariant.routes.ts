import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middlewares";
import { createProductVariant } from "../controllers/productVariant.controllers";

async function addProductVariant(req:FastifyRequest, res:FastifyReply) {
    await createProductVariant(req, res)
}

export async function productVariantRoutes(fastify:FastifyInstance) {
    fastify.post('/product/variant', { preHandler: authenticate }, addProductVariant)
}
