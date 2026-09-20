import { db } from "../database/db";

export async function search(user:string) {
    const search = await db.query(`
        SELECT id, login, senha FROM usuarios WHERE login = $1
    `, [user])

    return search
}