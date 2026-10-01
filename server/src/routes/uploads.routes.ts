import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middlewares";

async function uploads(req:FastifyRequest, res:FastifyReply) {
    const data = await req.files()
    if (!data) return res.code(400).send({ error: 'Arquivo não enviado' })

    return res.code(200).send({ success: 'Arquivo recebido' })
}

export function uploadsRoutes(fastify: FastifyInstance) {
    fastify.post('/uploads', { preHandler: authenticate }, uploads);
}