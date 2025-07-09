import { cleanEnv, port, str } from "envalid";

function validateEnv(){
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str({ choices: ["production", "development"]}),
        DATABASE_URL: str(),
        LOGS_PATH: str(),
        SECRET_SESSION: str()
    })
}

export default validateEnv