import { Router } from "express";
import CursoController from "../controllers/curso.controller";
const curso = Router();

curso.get('/', CursoController.getInstance().getAll);
curso.get('/:id', CursoController.getInstance().getSingle);
curso.post('/', CursoController.getInstance().create);
curso.put('/:id', CursoController.getInstance().update);
curso.delete('/:id', CursoController.getInstance().delete);

export default curso;