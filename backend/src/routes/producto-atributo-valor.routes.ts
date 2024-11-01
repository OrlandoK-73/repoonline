import { Router } from "express";
import ProductoAtributoValorController from "../controllers/producto-atributo-valor.controller";
const producto_atributo_valor = Router();

producto_atributo_valor.get('/', ProductoAtributoValorController.getInstance().getAll);
producto_atributo_valor.get('/:id', ProductoAtributoValorController.getInstance().getSingle);
producto_atributo_valor.post('/', ProductoAtributoValorController.getInstance().create);
producto_atributo_valor.put('/:id', ProductoAtributoValorController.getInstance().update);
producto_atributo_valor.delete('/:id', ProductoAtributoValorController.getInstance().delete);

export default producto_atributo_valor;