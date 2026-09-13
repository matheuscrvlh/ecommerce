import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash";
import { insertClient, search } from "../models/clients.models";
import { ClientBody } from "../types/clients.types";

export async function newClient(req:FastifyRequest<{Body: ClientBody}>, res:FastifyReply) {
    const { name, password, cpf, email, phone } = req.body

    try {
        // Validação de campos
        const fieldsToCheck: [SearchColumn, string | number | undefined][] = [
            ['name', name],
            ['cpf', cpf],
            ['email', email],
            ['phone', phone],
        ]

        for (const [column, value] of fieldsToCheck) {
            if (value === undefined) continue

            const existing = await search(column, value)
            if (existing.rows.length >= 1) {
                res.code(409).send({ error: `${column}: ${value} já cadastrado(a).`})
                return
            }
        }

        const hashedPassword = await hashPassword(password)

        const result = await insertClient({name, hashedPassword, cpf, email, phone})

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