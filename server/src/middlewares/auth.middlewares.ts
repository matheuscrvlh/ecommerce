import { db } from "../database/db.ts"
import type { FastifyRequest, FastifyReply } from 'fastify'

async function authenticate(req:FastifyRequest, res:FastifyReply) {
    const token
}