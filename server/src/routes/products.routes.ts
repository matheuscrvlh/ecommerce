import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middlewares";
import { createProduct } from "../controllers/products.controllers";

async function addProduct(req:FastifyRequest, res:FastifyReply) {
    await createProduct(req,res)
}

export async function productsRoutes(fastify:FastifyInstance) {
    fastify.post('/product', { preHandler: authenticate }, addProduct)
}