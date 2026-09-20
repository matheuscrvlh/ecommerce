export type ClientBody = {
    nome: string
    senha?: string
    hashedPassword?:string 
    cpf: number
    email: string
    telefone: number
}