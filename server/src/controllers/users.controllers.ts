import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash";
import { insertUser, search } from "../models/users.models";

type userBody = {
    name: string,
    login: string,
    password: string,
    email: string,
    number: number,
    cpf: number
}

export async function addUser(req:FastifyRequest<{Body: userBody}>, res:FastifyReply) {
    const { name, login, password, email, number, cpf } = req.body

    try {
        // Validação de campos
        const fieldsToCheck: [SearchColumn, string | number | undefined][] = [
            ['login', login],
            ['email', email],
            ['cpf', cpf],
            ['number', number]
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value)
            if (existing.rows.length >= 1) {
                res.code(409).send({ error: `${column} já cadastrado.`})
                return
            }
        }

        const hashedPassword = await hashPassword(password)

        const result = await insertUser({name, login, hashedPassword, email, number, cpf})

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