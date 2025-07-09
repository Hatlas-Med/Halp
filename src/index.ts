import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import validateEnv from "./utils/validateEnv"
import logger from "./middlewares/logger"
import router from "./router/router"
import { engine } from "express-handlebars"
import cookieParser from "cookie-parser"
import { v4 as uuidv4 } from "uuid"
import session from "express-session"

declare module "express-session"{
    interface SessionData{
        logado: boolean
    }
}

const app = express()
dotenv.config()
validateEnv()

const PORT = process.env.PORT ?? 6688

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`),
    layoutsDir: `${__dirname}/views/layout`
}))
app.set("view engine", "handlebars")
app.set("views", `${process.cwd()}/src/views`)

app.use(logger("simple"))

app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/js", express.static(`${process.cwd()}/public/js`))
app.use("/img", express.static(`${process.cwd()}/public/img`))
app.use("/game", express.static(`${process.cwd()}/public/game`))



app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    genid: () => uuidv4(),
    secret: process.env.SECRET_SESSION!,
    resave: true,
    cookie: { maxAge: 6*60*60 },
    saveUninitialized: true
})) 
app.use(router)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}.`)
})
