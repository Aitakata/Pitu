import express from 'express';
import linksRouter from './routes/links';
import cors from 'cors';

const app = express ();  // cria uma nova aplicação em express
app.use(express.json()); // diz que a nossa app vai usar json 
app.use(cors());         // habilitar o cors p/q o front-end(FE) se comunique c/o BE
app.use(linksRouter);    // usar as rotas que definimos em links

export default app;      