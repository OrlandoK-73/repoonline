import { Router } from "express";
import ProductoTipoController from "../controllers/producto-tipo.controller";
const producto_tipo = Router();

producto_tipo.get('/', ProductoTipoController.getInstance().getAll);
producto_tipo.get('/:id', ProductoTipoController.getInstance().getSingle);
producto_tipo.post('/', ProductoTipoController.getInstance().create);
producto_tipo.put('/:id', ProductoTipoController.getInstance().update);
producto_tipo.delete('/:id', ProductoTipoController.getInstance().delete);

export default producto_tipo;