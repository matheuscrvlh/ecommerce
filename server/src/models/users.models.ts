import { db } from "../database/db";
import { UserBody } from "../types/users.types";

export async function search(column: string|number, data: string|number) {
    const search = await db.query(`
        SELECT * FROM users WHERE ${column} = $1
    `, [data])

    return search
}

export async function insertUser(data: UserBody) {
    const { name, login, password, email, phone, cpf } = data

    const result = await db.query(`
        INSERT INTO users
        (name, login, password, email, number, cpf)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `, [name, login, password, email, phone, cpf]);

    return result
}