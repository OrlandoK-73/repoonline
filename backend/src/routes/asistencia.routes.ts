import { Router } from "express";
import AsistenciaController from "../controllers/asistencia.controller";
const asistencia = Router();

asistencia.get('/', AsistenciaController.getInstance().getAll);
asistencia.get('/:id', AsistenciaController.getInstance().getSingle);
asistencia.get('/estudiante/:asignacionMaestroId/:estudianteId', AsistenciaController.getInstance().getAllAsistenciasPorEstudiante);
asistencia.post('/', AsistenciaController.getInstance().create);
asistencia.put('/:id', AsistenciaController.getInstance().update);
asistencia.delete('/:id', AsistenciaController.getInstance().delete);

export default asistencia;