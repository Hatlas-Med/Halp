import { Request, Response, NextFunction } from "express"

export const checkAuth = (req:Request, res:Response, next:NextFunction) => {
    if(req.session.logado) next()
    else res.status(403).send("Abandon all hope, ye who enter here")
}