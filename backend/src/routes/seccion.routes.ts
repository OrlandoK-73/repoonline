import { Router } from "express";
import SeccionController from "../controllers/seccion.controller";
const seccion = Router();

seccion.get('/', SeccionController.getInstance().getAll);
seccion.get('/:id', SeccionController.getInstance().getSingle);
seccion.post('/', SeccionController.getInstance().create);
seccion.put('/:id', SeccionController.getInstance().update);
seccion.delete('/:id', SeccionController.getInstance().delete);

export default seccion;