import { db } from '../database/db.ts'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { hashPassword } from '../utils/hash.ts'

type userBody = {
    name: string,
    login: string,
    password: string,
    email: string,
    number: number,
    cpf: number
}

async function postUser(req:FastifyRequest<{Body: userBody}>, res:FastifyReply) {
    const { name, login, password, email, number, cpf } = req.body

    try {
        const search = await db.query(`
            SELECT login FROM users WHERE login = $1
        `, [login]);

        if(search.rows.length >= 1){
            res.code(404).send({ error: `Usuario ${login} já cadastrado.`});
            return
        }

        const hashedPassword = await hashPassword(password)

        const result = await db.query(`
            INSERT INTO users
            (name, login, password, email, number, cpf)
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `, [name, login, hashedPassword, email, number, cpf]);

        res.code(201).send({ success: `Usuário login ${login} criado com sucesso.` })
    } catch (err) {
        console.error(err)
        res.code(500).send({ error: 'Erro interno do servidor.' })
    }
}

export async function usersRoutes(fastify: FastifyInstance) {
    fastify.post('/user', postUser);
}