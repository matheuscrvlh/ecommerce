import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middlewares";
import { createBrand } from "../controllers/brands.controllers";

async function addBrand(req:FastifyRequest, res:FastifyReply) {
    await createBrand(req, res)
}

export async function brandsRoutes(fastify:FastifyInstance) {
    fastify.post('/brand', { preHandler: authenticate }, addBrand)
}