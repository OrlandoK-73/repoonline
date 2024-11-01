import { Router } from "express";
import TareaController from "../controllers/tarea.controller";
const tarea = Router();

tarea.get('/', TareaController.getInstance().getAll);
tarea.get('/:id', TareaController.getInstance().getSingle);
tarea.get('/asignacion/:id', TareaController.getInstance().getTareasPorAsignacion);
tarea.post('', TareaController.getInstance().create);
tarea.put('/:id', TareaController.getInstance().update);
tarea.delete('/:id', TareaController.getInstance().delete);

export default tarea;