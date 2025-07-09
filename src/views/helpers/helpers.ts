import { DiscType } from "./helpersType";

export function discList(discs: DiscType[]){
    return `<ul>${discs.map((d) => `<li>${d.nome} - ${d.cg}</li>`).join("\n")}</ul>`
}