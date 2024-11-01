import { Router } from "express";
import AsignacionMaestroController from "../controllers/asignacion_maestro.controller";
const asignacion_maestro = Router();

asignacion_maestro.get('/', AsignacionMaestroController.getInstance().getAll);
asignacion_maestro.get('/:id', AsignacionMaestroController.getInstance().getSingle);
asignacion_maestro.get('/maestro/:id', AsignacionMaestroController.getInstance().getAllPorMaestro);
asignacion_maestro.post('/', AsignacionMaestroController.getInstance().create);
asignacion_maestro.put('/:id', AsignacionMaestroController.getInstance().update);
asignacion_maestro.delete('/:id', AsignacionMaestroController.getInstance().delete);

export default asignacion_maestro;