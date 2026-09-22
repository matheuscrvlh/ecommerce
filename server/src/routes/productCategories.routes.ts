import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middlewares";
import { newProductCategory } from "../controllers/productCategories.controllers";

async function addProductCategory(req:FastifyRequest, res:FastifyReply) {
    await newProductCategory(req, res)
}

export async function productCategoriesRoutes(fastify:FastifyInstance) {
    fastify.post('/product/category', { preHandler: authenticate }, addProductCategory)
}