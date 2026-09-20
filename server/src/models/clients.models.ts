import { db } from "../database/db";
import { ClientBody } from "../types/client.types";

export async function search(column: string|number, data:string|number) {
    const search = await db.query(`
        SELECT * FROM clientes WHERE ${column} = $1
    `, [data])

    return search
}

export async function insertClient(data:ClientBody) {
    const { nome, hashedPassword, cpf, email, telefone } = data

    const result = await db.query(`
        INSERT INTO clientes
        (name, password, cpf, email, phone)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id
    `, [nome, hashedPassword, cpf, email, telefone])

    return result
}