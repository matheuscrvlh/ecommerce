export type ClientBody = {
    name: string
    password?: string
    hashedPassword?:string 
    cpf: number
    email: string
    phone: number
}