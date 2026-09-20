import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash";
import { insertUser, search } from "../models/users.models";
import { UserBody } from "../types/user.types";

export async function addUser(req:FastifyRequest<{Body: UserBody}>, res:FastifyReply) {
    const { nome, login, senha, email, telefone, cpf } = req.body

    try {
        // Validação de campos
        const fieldsToCheck: [string, string | number | undefined][] = [
            ['login', login],
            ['email', email],
            ['cpf', cpf],
            ['telefone', telefone]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value)
            if (existing.rows.length >= 1) {
                res.code(409).send({ error: `${column}: ${value} já cadastrado(a).`})
                return
            }
        }

        const hashedPassword = await hashPassword(senha)

        const result = await insertUser({nome, login, hashedPassword, email, telefone, cpf})

        if(!result.rows[0].id) {
            console.error('Erro ao inserir usuário');
            return
        }

        res.code(201).send({ success: `Usuário login ${login} criado com sucesso.` })
    } catch (err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.' })
    }
}