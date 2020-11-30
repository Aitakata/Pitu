import {Request, Response} from 'express';
import {Link} from '../models/link';
import linksRepository from '../models/linksRepository';


// gera a URL curta do link
function generateCode() {
    let text = '';
    // possíveis caracteres na URL curta
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // a URL curta deve ter 5 posiçoes
    for (let i=0; i < 5; i++) 
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

async function postLink(req: Request, res: Response) {
    const link = req.body as Link;  // recebe body do tipo Link somente com a URL original
    link.code = generateCode();     // gera a URL curta
    link.hits = 0;                  // inicializa o hits
    const result = await linksRepository.add(link);      // link adicionado na tabela do BD
    if (!result) return res.sendStatus(400);
    link.id = result.id!;           // id é opc, por isso "!"
    res.status(201).json(link);     // 201 = created, link da URL
}

async function getLink(req: Request, res: Response) {
    // ainda não estamos validando se a URL já existe na tabela
    const code = req.params.code as string;
    const link = await linksRepository.findByCode(code);        // busca o code na tabela do BD
    if (!link) 
        res.sendStatus(404);    // 404 = not found
    else 
        res.json(link); 
}

async function hitLink(req: Request, res: Response) {
    const code = req.params.code as string;
    const link = await linksRepository.hit(code);    // busca na tabela do BD

    if (!link)
        res.sendStatus(404);    // não encontrou o link
    else {
        res.json(link);        // se encontrou, retorna o link
    }
}

export default {
    postLink,
    getLink,
    hitLink
}