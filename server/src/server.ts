import 'dotenv/config'
import Fastify from "fastify"
import { db } from './database/db.ts'
import { usersRoutes } from './routes/users.routes.ts'
import { authRoutes } from './routes/auth.routes.ts'

const app = Fastify()

if(!process.env.DATABASE_URL) {
    console.log('Erro ao encontrar DATABASE_URL em .env')
    process.exit(1)
}
if(!process.env.JWT_SECRET) {
    console.log('Erro ao encontrar JWT_SECRET em .env')
    process.exit(1)
}

app.register(usersRoutes);
app.register(authRoutes);

async function start() {
    await app.listen({ port: 3000 });
    console.log('Server rodando em 3000.');

    await db.query(`SELECT NOW()`)
    console.log('Supabase conectado.')
}
start()