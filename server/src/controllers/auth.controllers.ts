import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { search } from "../models/auth.models";
import { verifyPassword } from "../utils/hash";

type LoginUser = {
    login: string
    senha: string
}

export async function login(req:FastifyRequest<{Body: LoginUser}>, res:FastifyReply) {
    const { login, senha } = req.body

    try {
        const searchUser = await search(login)
        if(searchUser.rows.length === 0) {
            res.code(401).send({ error: 'Usuário não encontrado.'})
            return
        }

        const isValid = await verifyPassword(senha, searchUser.rows[0].senha)
        if(!isValid) {
            res.code(401).send({ error: 'Senha inválida.'})
            return
        }

        const userPayload = {
            id: searchUser.rows[0].id,
            user: login,
        }

        const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '8h' })
        
        res.code(200).send({ token: token })
    } catch(err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.'})
    }
}