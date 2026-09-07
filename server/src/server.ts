import 'dotenv/config'
import Fastify from "fastify"
import { db } from './database/db.ts'
import { usersRoutes } from './routes/users.routes.ts'

const app = Fastify()

if(!process.env.DATABASE_URL) {
    console.log('Erro ao encontrar DATABASE_URL em .env')
}

app.register(usersRoutes);

async function start() {
    await app.listen({ port: 3000 });
    console.log('Server rodando em 3000.');

    await db.query(`SELECT NOW()`)
    console.log('Supabase conectado.')
}
start()