import { Response, Request } from "express"
import { loremIpsum } from "lorem-ipsum"
import { checkAuth } from "../services/user"
import { loginDTO } from "../types/user"

const index = (req: Request, res: Response) => {
    res.render("game", {
    })
}

const about =  (req: Request, res: Response) =>{
    res.render("about", {
        mensagem: 'Este é um jogo programado para a disciplina de Programação em Web, a imagem abaixo é uma imagem promocional tirada de uma arte oficial da série Gradius. O jogo não possui nenhuma relação com o projeto Gradius.'
    })
}

const bemVindo = (req: Request, res: Response) =>{
    res.send(`Bem Vindo(a) ${req.params.nome}`)
}

const hb1 = (req:Request, res:Response) =>{
    res.render("hb1", {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
        layout:false,
    })
}

const hb2 = (req:Request, res:Response) =>{
    res.render("hb2", {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    })
}

const hb3 = (req: Request, res: Response) =>{
    const disciplinas = [
        { nome: "Algoritmo e Estrutura de Dados 1", cg: 90},
        { nome: "Banco de Dados", cg: 60},
        { nome: "Introdução à Computação", cg: 90},
    ]

    const profs = [
        { nome: "David Fernandes", sala: 2338 },
        { nome: "Edleno Moura", sala: 2336 },
        { nome: "Pio", sala: 2330 },
    ]

    res.render("hb3", {
        disciplinas,
        profs,
        mostrarMensagem: true,
        mensagem: "Bem Vindo(a) ao Icomp"
    })
}

const hb4 = (req:Request, res:Response) =>{
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ]

    res.render("hb4", {
        technologies,
    })
}

const lorem = (req:Request, res:Response) =>{
    res.send(loremIpsum({count:parseInt(req.params.numero), format:"html", suffix:"\n", units:"paragraphs"}))
}

const testeCookie = (req:Request, res:Response) => {
    if(!('teste-cookie' in req.cookies)){
        res.cookie('teste-cookie', 'valor qualquer')
        res.send('Você nunca passou por aqui')
    }else{
        res.send('Você já passou por aqui')
    }
}


export default { index, about, bemVindo, hb1, hb2, hb3, hb4, lorem, testeCookie }

