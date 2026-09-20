import { db } from "../database/db";
import { UserBody } from "../types/user.types";

export async function search(column: string|number, data: string|number) {
    const search = await db.query(`
        SELECT * FROM usuarios WHERE ${column} = $1
    `, [data])

    return search
}

export async function insertUser(data: UserBody) {
    const { nome, login, senha, email, telefone, cpf } = data

    const result = await db.query(`
        INSERT INTO usuarios
        (name, login, password, email, number, cpf)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `, [nome, login, senha, email, telefone, cpf]);

    return result
}