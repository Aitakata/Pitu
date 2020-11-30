/* ****************************** */
/* configura o BD e sobe o app    */
/* ****************************** */
import app from './app';
import database from './database';

database.sync();        // sincroniza o Javascript com o BD
console.log('Database running at 3306');

app.listen(3001);   // o server espera cmds na porta 3000
console.log('Server running at 3001!');
