import {Router} from 'express';   // sómente o componente Router da biblioteca express
import linksController from '../controllers/links';  // onde se encontra a logica 
const router = Router();

// salvando um link (URL original) enviado pelo front-end
router.post('/links', linksController.postLink);

// o front-end passa a URL curta e espera a URL original
router.get('/links/:code', linksController.hitLink);

// acessando os dados, incluindo as estatísticas do link
router.get('/links/:code/stats', linksController.getLink);

export default router;