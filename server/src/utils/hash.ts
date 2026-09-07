import { hash, compare } from 'bcryptjs'

export async function hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);

    return hashedPassword
}

export async function verifyPassword(password: string, hash: string) {
    const verifyPassword = await compare(password, hash)

    return verifyPassword
}