import { Router } from "express";
import ProductoAtributoController from "../controllers/producto-atributo.controller";
const producto_atributo = Router();

producto_atributo.get('/', ProductoAtributoController.getInstance().getAll);
producto_atributo.get('/:id', ProductoAtributoController.getInstance().getSingle);
producto_atributo.post('/', ProductoAtributoController.getInstance().create);
producto_atributo.put('/:id', ProductoAtributoController.getInstance().update);
producto_atributo.delete('/:id', ProductoAtributoController.getInstance().delete);

export default producto_atributo;