import { db } from "../database/db";

type NewUser = {
    name: string
    login: string
    hashedPassword: string
    email: string
    number: number
    cpf: number
}

export async function search(column: string|number, data: string|number) {
    const search = await db.query(`
        SELECT * FROM users WHERE ${column} = $1
    `, [data])

    return search
}

export async function insertUser(data: NewUser) {
    const { name, login, hashedPassword, email, number, cpf } = data

    const result = await db.query(`
        INSERT INTO users
        (name, login, password, email, number, cpf)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `, [name, login, hashedPassword, email, number, cpf]);

    return result
}