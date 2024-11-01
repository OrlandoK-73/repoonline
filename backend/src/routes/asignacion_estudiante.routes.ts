import { Router } from "express";
import AsignacionEstudianteController from "../controllers/asignacion_estudiante.controller";
const asignacion_estudiante = Router();

asignacion_estudiante.get('/', AsignacionEstudianteController.getInstance().getAll);
asignacion_estudiante.get('/estudiante/:gradoId/:seccionId/:anio', AsignacionEstudianteController.getInstance().getAllEstudiantes);
asignacion_estudiante.get('/:id', AsignacionEstudianteController.getInstance().getSingle);
asignacion_estudiante.post('/', AsignacionEstudianteController.getInstance().create);
asignacion_estudiante.put('/:id', AsignacionEstudianteController.getInstance().update);
asignacion_estudiante.delete('/:id', AsignacionEstudianteController.getInstance().delete);

export default asignacion_estudiante;