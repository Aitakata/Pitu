"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* ****************************** */
/* configura o BD e sobe o app    */
/* ****************************** */
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
database_1.default.sync(); // sincroniza o Javascript com o BD
console.log('Database running at 3306');
app_1.default.listen(3001); // o server espera cmds na porta 3000
console.log('Server running at 3001!');
