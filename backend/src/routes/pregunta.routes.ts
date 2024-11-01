import { Router } from "express";
import PreguntaController from "../controllers/pregunta.controller";
const pregunta = Router();

pregunta.get('/', PreguntaController.getInstance().getAll);
pregunta.get('/tarea/:id', PreguntaController.getInstance().getAllPorTarea);
pregunta.get('/:id', PreguntaController.getInstance().getSingle);
pregunta.post('/', PreguntaController.getInstance().create);
pregunta.put('/:id', PreguntaController.getInstance().update);
pregunta.delete('/:id', PreguntaController.getInstance().delete);

export default pregunta;