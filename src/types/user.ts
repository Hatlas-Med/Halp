import { User } from "@prisma/client"

export type createUserDTO = Pick<User, "name" | "password" | "majorId" | "email">
export type loginDTO = Pick<User, "email" | "password">