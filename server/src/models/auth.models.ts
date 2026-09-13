import { db } from "../database/db";

export async function search(user:string) {
    const search = await db.query(`
        SELECT id, login, password FROM users WHERE login = $1
    `, [user])

    return search
}