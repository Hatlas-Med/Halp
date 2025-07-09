import { User, PrismaClient } from "@prisma/client"
import { createUserDTO } from "../types/user"
import { compare, genSalt, hash } from "bcryptjs"

const prisma = new PrismaClient()

export const createUser = async (user: createUserDTO):Promise<User> => {
    const salt = await genSalt()
    const password = await hash(user.password, salt)
    const newUser = {...user, password}
    return prisma.user.create({ data:newUser })
}

export const checkAuth = async (email: string, password: string):Promise<boolean> => {
    const user = await prisma.user.findFirst({ where: { email} })
    if(user){
        return await compare(password, user.password)
    }
    return false
}