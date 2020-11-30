/* ************************ */
/*   Inicialização do BD    */
/* ************************ */
import {Sequelize} from 'sequelize';
// Sequelize('mysql:<usr>:<password>@<endereco_server>:<porta>/<base de dados>')
const sequelize = new Sequelize('mysql://root:Sebrae123@localhost:3306/pitu');

export default sequelize;