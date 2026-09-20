import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash";
import { insertClient, search } from "../models/clients.models";
import { ClientBody } from "../types/client.types";

export async function newClient(req:FastifyRequest<{Body: ClientBody}>, res:FastifyReply) {
    const { nome, senha, cpf, email, telefone } = req.body

    try {
        // Validação de campos
        const fieldsToCheck: [string, string | number | undefined][] = [
            ['nome', nome],
            ['cpf', cpf],
            ['email', email],
            ['telefone', telefone],
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

        const result = await insertClient({nome, hashedPassword, cpf, email, telefone})

        if(!result.rows[0].id) {
            console.error('Erro ao inserir usuário');
            return
        }

        res.code(201).send({ success: 'Usuário cadastrado com sucesso.'})
    } catch(err) {
        console.error(err) 
        res.code(500).send({ error: 'Erro interno do servidor.'})
    }
}