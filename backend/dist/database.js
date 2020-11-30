"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ************************ */
/*   Inicialização do BD    */
/* ************************ */
const sequelize_1 = require("sequelize");
// Sequelize('mysql:<usr>:<password>@<endereco_server>:<porta>/<base de dados>')
const sequelize = new sequelize_1.Sequelize('mysql://root:Sebrae123@localhost:3306/pitu');
exports.default = sequelize;
