"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const links_1 = __importDefault(require("./routes/links"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default(); // cria uma nova aplicação em express
app.use(express_1.default.json()); // diz que a nossa app vai usar json 
app.use(cors_1.default()); // habilitar o cors p/q o front-end(FE) se comunique c/o BE
app.use(links_1.default); // usar as rotas que definimos em links
exports.default = app;
