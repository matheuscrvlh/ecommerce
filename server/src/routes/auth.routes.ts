import { db } from '../database/db.ts';
import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

type loginBody = {
    user: string,
    password: string
}

async function login(req:FastifyRequest<{Body: loginBody}>, res:FastifyReply) {
    const { user, password } = req.body

    try {
        const search 
    }
}