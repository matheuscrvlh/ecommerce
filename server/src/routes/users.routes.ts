import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { addUser } from '../controllers/users.controllers.ts'

async function postUser(req:FastifyRequest, res:FastifyReply) {
    await addUser(req, res)
}

export async function usersRoutes(fastify: FastifyInstance) {
    fastify.post('/user', postUser);
}