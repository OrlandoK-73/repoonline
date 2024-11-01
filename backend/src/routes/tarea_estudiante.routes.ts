import { Router } from "express";
import TareaEstudianteController from "../controllers/tarea_estudiante.controller";
const tarea_estudiante = Router();

tarea_estudiante.get('/', TareaEstudianteController.getInstance().getAll);
tarea_estudiante.get('/:id', TareaEstudianteController.getInstance().getSingle);
tarea_estudiante.get('/notas/:estudianteId/:asignacionMaestroId', TareaEstudianteController.getInstance().getNotasTareasPorEstudiante);
tarea_estudiante.get('/notas_generales/:estudianteId', TareaEstudianteController.getInstance().getNotasPorEstudiante);
tarea_estudiante.post('/', TareaEstudianteController.getInstance().create);
tarea_estudiante.put('/:id', TareaEstudianteController.getInstance().update);
tarea_estudiante.delete('/:id', TareaEstudianteController.getInstance().delete);

export default tarea_estudiante;