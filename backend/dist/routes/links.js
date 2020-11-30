"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // sómente o componente Router da biblioteca express
const links_1 = __importDefault(require("../controllers/links")); // onde se encontra a logica 
const router = express_1.Router();
// salvando um link (URL original) enviado pelo front-end
router.post('/links', links_1.default.postLink);
// o front-end passa a URL curta e espera a URL original
router.get('/links/:code', links_1.default.hitLink);
// acessando os dados, incluindo as estatísticas do link
router.get('/links/:code/stats', links_1.default.getLink);
exports.default = router;
