import { db } from "../database/db";
import { ClientBody } from "../types/clients.types";

export async function search(column: string|number, data:string|number) {
    const search = await db.query(`
        SELECT * FROM clients WHERE ${column} = $1
    `, [data])

    return search
}

export async function insertClient(data:ClientBody) {
    const { name, hashedPassword, cpf, email, phone } = data

    const result = await db.query(`
        INSERT INTO clients
        (name, password, cpf, email, phone)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id
    `, [name, hashedPassword, cpf, email, phone])

    return result
}