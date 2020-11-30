"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linksRepository_1 = __importDefault(require("../models/linksRepository"));
// gera a URL curta do link
function generateCode() {
    let text = '';
    // possíveis caracteres na URL curta
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // a URL curta deve ter 5 posiçoes
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function postLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body; // recebe body do tipo Link somente com a URL original
        link.code = generateCode(); // gera a URL curta
        link.hits = 0; // inicializa o hits
        const result = yield linksRepository_1.default.add(link); // link adicionado na tabela do BD
        if (!result)
            return res.sendStatus(400);
        link.id = result.id; // id é opc, por isso "!"
        res.status(201).json(link); // 201 = created, link da URL
    });
}
function getLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // ainda não estamos validando se a URL já existe na tabela
        const code = req.params.code;
        const link = yield linksRepository_1.default.findByCode(code); // busca o code na tabela do BD
        if (!link)
            res.sendStatus(404); // 404 = not found
        else
            res.json(link);
    });
}
function hitLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        const link = yield linksRepository_1.default.hit(code); // busca na tabela do BD
        if (!link)
            res.sendStatus(404); // não encontrou o link
        else {
            res.json(link); // se encontrou, retorna o link
        }
    });
}
exports.default = {
    postLink,
    getLink,
    hitLink
};
