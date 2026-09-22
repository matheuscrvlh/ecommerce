import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/auth.middlewares';
import { newCategory } from '../controllers/categories.controllers';

async function addCategory(req:FastifyRequest, res:FastifyReply) {
    await newCategory(req, res)
}

export async function categoriesRoutes(fastify:FastifyInstance) {
    fastify.post('/category', { preHandler: authenticate }, addCategory)
}