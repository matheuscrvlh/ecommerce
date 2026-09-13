import type { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

declare module 'fastify' {
    interface FastifyRequest {
        user: string
    }
}

export async function authenticate(req:FastifyRequest, res:FastifyReply) {
    const authHeader = req.headers.authorization

    try {
        const token = authHeader?.split(' ')[1]

        if(!token) {
            res.code(401).send({ error: 'Usuário sem token.'})
            return
        }

        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedPayload.user
    } catch(err) {
        if(err instanceof jwt.TokenExpiredError) {
            res.code(401).send({ error: 'Token expirado.'})
            return 
        }
        if(err instanceof jwt.JsonWebTokenError) {
            res.code(401).send({ error: 'Token inválido.'})
            return 
        }

        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.'})
    }
}