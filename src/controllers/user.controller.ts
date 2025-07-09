import { Request, Response } from "express";
import { getMajors } from "../services/major";
import { checkAuth, createUser } from "../services/user";
import { loginDTO } from "../types/user";

const index = async (req: Request, res:Response) => {}

const create = async (req: Request, res:Response) => {
    if(req.method === 'GET'){
        const majors = await getMajors()
        res.render("user/create", {
            majors
        })
    }else{
        try{
            const newUser = await createUser(req.body) 
            res.redirect("/")
        }catch(err){
            console.log(err)
        }
    } 
}

const read = async (req: Request, res:Response) => {}

const update = async (req: Request, res:Response) => {}

const remove = async (req: Request, res:Response) => {}

const login = async (req:Request, res:Response) => {
    if(req.method === 'GET'){
        res.render("user/login")
    }else{
        const { email, password } = req.body as loginDTO
        const ok = await checkAuth(email, password)
        if(!ok){
            res.render("user/login", {
                ok
            })
        }else{
            req.session.logado = true
            res.redirect("/hb3")
        }
    }
}

const logout = async (req:Request, res:Response) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid")
        res.redirect("/")
    })
}

export default {index, create, read, update, remove, login, logout}