import { Router } from "express";
import GradoController from "../controllers/grado.controller";
const grado = Router();

grado.get('/', GradoController.getInstance().getAll);
grado.get('/:id', GradoController.getInstance().getSingle);
grado.post('/', GradoController.getInstance().create);
grado.put('/:id', GradoController.getInstance().update);
grado.delete('/:id', GradoController.getInstance().delete);

export default grado;