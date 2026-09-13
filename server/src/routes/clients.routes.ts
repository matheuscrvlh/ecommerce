import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { newClient } from "../controllers/clients.controllers";

async function addClient(req:FastifyRequest, res:FastifyReply) {
    await newClient(req, res)
}

export async function clientsRoutes(fastify:FastifyInstance) {
    fastify.post('/client', addClient)
}